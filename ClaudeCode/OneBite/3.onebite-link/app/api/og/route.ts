import { NextRequest, NextResponse } from "next/server";

type OgData = {
  url: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
};

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&(amp|lt|gt|quot|#39|apos);/g, (match) => HTML_ENTITIES[match] ?? match)
    .replace(/&#(\d+);/g, (_match, code: string) =>
      String.fromCharCode(Number(code)),
    );
}

function extractMetaTags(html: string): Record<string, string> {
  const metaTagPattern = /<meta\b[^>]*>/gi;
  const tags = html.match(metaTagPattern) ?? [];
  const result: Record<string, string> = {};

  for (const tag of tags) {
    const keyMatch = tag.match(/(?:property|name)\s*=\s*["']([^"']+)["']/i);
    const contentMatch = tag.match(/content\s*=\s*["']([^"']*)["']/i);
    if (keyMatch && contentMatch) {
      result[keyMatch[1].toLowerCase()] = contentMatch[1];
    }
  }

  return result;
}

function extractTitleTag(html: string): string | undefined {
  return html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1];
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "url 쿼리 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json(
      { error: "올바른 URL 형식이 아닙니다." },
      { status: 400 },
    );
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return NextResponse.json(
      { error: "http 또는 https URL만 지원합니다." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OneBiteLinkBot/1.0; +https://onebite.link)",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "링크 페이지를 불러오지 못했습니다." },
        { status: 502 },
      );
    }

    const html = await response.text();
    const meta = extractMetaTags(html);

    const rawTitle =
      meta["og:title"] ?? extractTitleTag(html) ?? parsedUrl.hostname;
    const rawDescription = meta["og:description"] ?? meta["description"] ?? "";
    const rawImage = meta["og:image"] ?? meta["twitter:image"];

    const data: OgData = {
      url: parsedUrl.toString(),
      title: decodeHtmlEntities(rawTitle).trim(),
      description: decodeHtmlEntities(rawDescription).trim(),
      thumbnailUrl: rawImage
        ? new URL(rawImage, parsedUrl).toString()
        : undefined,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "오픈 그래프 정보를 가져오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
