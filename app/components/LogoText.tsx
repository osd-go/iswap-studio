import { BrandConfig } from "../types";

interface Props {
  brand: BrandConfig;
  /** Override font-size (px). Defaults to brand.fontSize */
  size?: number;
  /** Override text color */
  color?: string;
}

export function LogoText({ brand, size, color }: Props) {
  const fs = size ?? brand.fontSize;
  const textColor = color ?? brand.ink;
  const iChar = brand.textUppercase ? "I" : "ı";
  const restText = brand.textUppercase ? "SWAP" : "Swap";

  const webkitStroke =
    brand.strokeWidth > 0
      ? { WebkitTextStroke: `${brand.strokeWidth}px ${brand.strokeColor}` }
      : {};

  const shared: React.CSSProperties = {
    fontFamily: brand.fontFamily,
    fontSize: `${fs}px`,
    fontWeight: brand.fontWeight,
    letterSpacing: `${brand.letterSpacing}px`,
    fontStyle: brand.textItalic ? "italic" : "normal",
    color: textColor,
    textShadow:
      brand.textShadow > 0
        ? `0 ${brand.textShadow}px ${brand.textShadow * 3}px rgba(0,0,0,0.2)`
        : "none",
    transition: "all 0.3s ease",
    userSelect: "none",
    lineHeight: 1,
    ...webkitStroke,
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "baseline" }}>
      {/* dotless-i with custom square dot */}
      <span style={{ position: "relative", display: "inline-block", ...shared }}>
        {iChar}
        <span
          style={{
            position: "absolute",
            display: "block",
            width: `${brand.dotSize}px`,
            height: `${brand.dotSize}px`,
            borderRadius: `${brand.dotRadius}px`,
            background: brand.dotColor,
            left: "50%",
            transform: "translateX(-50%)",
            top: `${Math.round(fs * 0.04)}px`,
            transition: "all 0.3s ease",
          }}
        />
      </span>
      <span style={shared}>{restText}</span>
    </div>
  );
}
