interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-balance text-base leading-relaxed text-ink-muted">
          {description}
        </p>
      )}
    </div>
  );
}
