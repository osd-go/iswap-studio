import { BrandConfig } from "../types";

interface Props {
  brand: BrandConfig;
  squareSize?: number;
  gap?: number;
  style?: React.CSSProperties;
}

export function LogoMark({ brand, squareSize = 80, gap = 10, style }: Props) {
  const radius = Math.round((brand.softness / 100) * squareSize * 0.52);
  const colors = [brand.coral, brand.saffron, brand.cobalt, brand.emerald];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: `${gap}px`,
        flexShrink: 0,
        ...style,
      }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            width: `${squareSize}px`,
            height: `${squareSize}px`,
            borderRadius: `${radius}px`,
            background: color,
            transition: "background 0.35s ease, border-radius 0.35s ease",
          }}
        />
      ))}
    </div>
  );
}
