import { techBackgroundItems, type TechBgItem } from "@/data/data";

interface TechBackgroundProps {
  /** hero: nổi bật trong Hero | page: mờ, cố định toàn trang */
  variant?: "hero" | "page";
  className?: string;
}

function ReactIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      aria-hidden
      className="tech-bg__react-svg"
    >
      <circle r="2.05" fill="#61dafb" />
      <g fill="none" stroke="#61dafb" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function ScssBadge({ size }: { size: number }) {
  return (
    <div
      className="tech-bg__scss"
      style={{ fontSize: size * 0.35 }}
      aria-hidden
    >
      <span className="tech-bg__scss-curl">{"{"}</span>
      <span className="tech-bg__scss-label">SCSS</span>
      <span className="tech-bg__scss-curl">{"}"}</span>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="tech-bg__code" aria-hidden>
      <code>{code}</code>
    </pre>
  );
}

function TechBgPiece({ item }: { item: TechBgItem }) {
  const size = item.size ?? 48;

  return (
    <div
      className={`tech-bg__item tech-bg__item--${item.kind}`}
      style={{
        top: item.top,
        left: item.left,
        right: item.right,
        animationDuration: `${item.duration ?? 9}s`,
        animationDelay: `${item.delay ?? 0}s`,
      }}
    >
      {item.kind === "react" && <ReactIcon size={size} />}
      {item.kind === "scss" && <ScssBadge size={size} />}
      {item.kind === "code" && item.code && <CodeBlock code={item.code} />}
    </div>
  );
}

export default function TechBackground({
  variant = "hero",
  className = "",
}: TechBackgroundProps) {
  return (
    <div
      className={`tech-bg tech-bg--${variant} ${className}`.trim()}
      aria-hidden
    >
      <div className="tech-bg__grid" />
      {techBackgroundItems.map((item) => (
        <TechBgPiece key={item.id} item={item} />
      ))}
    </div>
  );
}
