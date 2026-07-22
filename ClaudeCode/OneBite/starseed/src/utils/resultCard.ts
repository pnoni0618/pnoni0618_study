import type { CompositionEntry } from "@/types/starseed";

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

function cssVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

const fontFamilyCache = new Map<string, string>();

/**
 * Resolves the site's actual (next/font-hashed) font stack for a Tailwind
 * font utility by probing a hidden element, so the canvas card matches
 * on-page typography without hardcoding a font name that changes per build.
 */
function resolveFontFamily(utilityClass: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const cached = fontFamilyCache.get(utilityClass);
  if (cached) return cached;

  const probe = document.createElement("span");
  probe.className = utilityClass;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const family = getComputedStyle(probe).fontFamily || fallback;
  document.body.removeChild(probe);

  fontFamilyCache.set(utilityClass, family);
  return family;
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Renders a shareable result card as a PNG blob on a canvas, mirroring the
 * glass-card + composition-bar look from `DonutChart` /
 * `StarseedCompositionChart` at a fixed share-sized resolution. Drawing on
 * canvas (rather than capturing the live DOM with something like
 * html2canvas) sidesteps `backdrop-filter`/CORS quirks and needs no extra
 * dependency.
 */
export async function createResultCardBlob(
  composition: CompositionEntry[],
  dominant: CompositionEntry
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  const deepSpace = cssVar("--deep-space", "#050816");
  const midnight2 = cssVar("--midnight-2", "#0c1030");
  const ink = cssVar("--ink", "#f6f5ff");
  const inkMuted = cssVar("--ink-muted", "#b9bbdc");
  const inkFaint = cssVar("--ink-faint", "#7d80a8");
  const gold = cssVar("--gold", "#f2c14e");
  const goldSoft = cssVar("--gold-soft", "#ffe9b8");
  const goldDeep = cssVar("--gold-deep", "#b3833d");
  const glowGold = cssVar("--glow-gold", "rgba(242, 193, 78, 0.35)");
  const glowPurple = cssVar("--glow-purple", "rgba(167, 139, 250, 0.35)");
  const borderGlass = cssVar("--border-glass", "rgba(238, 236, 255, 0.1)");
  const surfaceSolid = cssVar("--surface-solid", "#0d1130");

  const sansFont = resolveFontFamily("font-sans", "sans-serif");
  const serifFont = resolveFontFamily("font-serif", "serif");
  const displayFont = resolveFontFamily("font-display", "serif");

  roundedRectPath(ctx, 0, 0, CARD_WIDTH, CARD_HEIGHT, 56);
  ctx.clip();

  const bgGradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  bgGradient.addColorStop(0, deepSpace);
  bgGradient.addColorStop(1, midnight2);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Nebula glows, echoing `.nebula-blob`
  ctx.filter = "blur(120px)";
  ctx.fillStyle = glowPurple;
  ctx.beginPath();
  ctx.ellipse(180, 220, 260, 220, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = glowGold;
  ctx.beginPath();
  ctx.ellipse(CARD_WIDTH - 200, 480, 260, 220, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.filter = "none";

  ctx.textAlign = "center";
  ctx.fillStyle = goldSoft;
  ctx.font = `600 30px ${displayFont}`;
  ctx.fillText("S T A R S E E D   O R I G I N", CARD_WIDTH / 2, 140);

  ctx.font = `160px ${sansFont}`;
  ctx.fillText(dominant.icon, CARD_WIDTH / 2, 400);

  ctx.fillStyle = ink;
  ctx.font = `700 64px ${serifFont}`;
  ctx.fillText(`${dominant.name} 스타시드`, CARD_WIDTH / 2, 500);

  const percentGradient = ctx.createLinearGradient(CARD_WIDTH / 2 - 150, 0, CARD_WIDTH / 2 + 150, 0);
  percentGradient.addColorStop(0, goldSoft);
  percentGradient.addColorStop(0.5, gold);
  percentGradient.addColorStop(1, goldDeep);
  ctx.fillStyle = percentGradient;
  ctx.font = `800 88px ${serifFont}`;
  ctx.fillText(`${dominant.percent}%`, CARD_WIDTH / 2, 610);

  const barX = 100;
  const barY = 700;
  const barWidth = CARD_WIDTH - barX * 2;
  const barHeight = 44;
  const gap = 6;

  roundedRectPath(ctx, barX, barY, barWidth, barHeight, barHeight / 2);
  ctx.fillStyle = surfaceSolid;
  ctx.fill();

  ctx.save();
  roundedRectPath(ctx, barX, barY, barWidth, barHeight, barHeight / 2);
  ctx.clip();
  let cursorX = barX;
  for (const entry of composition) {
    const segmentWidth = (entry.percent / 100) * barWidth;
    ctx.fillStyle = cssVar(entry.colorVar, gold);
    ctx.fillRect(cursorX, barY, Math.max(segmentWidth - gap, 0), barHeight);
    cursorX += segmentWidth;
  }
  ctx.restore();

  const legendTop = barY + 100;
  const rowHeight = 64;
  composition.forEach((entry, index) => {
    const y = legendTop + index * rowHeight;

    ctx.textAlign = "left";
    ctx.fillStyle = cssVar(entry.colorVar, gold);
    ctx.beginPath();
    ctx.arc(barX + 12, y - 12, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = inkMuted;
    ctx.font = `40px ${sansFont}`;
    ctx.fillText(`${entry.icon}  ${entry.name}`, barX + 44, y);

    ctx.textAlign = "right";
    ctx.fillStyle = ink;
    ctx.font = `700 40px ${serifFont}`;
    ctx.fillText(`${entry.percent}%`, barX + barWidth, y);
  });

  const footerLineY = legendTop + composition.length * rowHeight + 20;
  ctx.strokeStyle = borderGlass;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(barX, footerLineY);
  ctx.lineTo(barX + barWidth, footerLineY);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = inkFaint;
  ctx.font = `32px ${sansFont}`;
  ctx.fillText(
    "당신의 성향을 분석하여 가장 닮은 스타시드를 찾아드립니다",
    CARD_WIDTH / 2,
    footerLineY + 60
  );

  ctx.fillStyle = goldSoft;
  ctx.font = `600 30px ${displayFont}`;
  const host = typeof window !== "undefined" ? window.location.host : "Starseed Origin";
  ctx.fillText(host, CARD_WIDTH / 2, CARD_HEIGHT - 60);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to render result card"));
    }, "image/png");
  });
}
