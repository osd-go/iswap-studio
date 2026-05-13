export interface BrandConfig {
  // Colors
  coral: string;
  saffron: string;
  emerald: string;
  cobalt: string;
  paper: string;
  ink: string;
  // Logo mark feel
  softness: number; // 0-100 → border-radius
  energy: number;   // 0-100 → saturation + pulse
  // Logo text
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  letterSpacing: number;
  textItalic: boolean;
  textUppercase: boolean;
  textShadow: number;
  strokeWidth: number;
  strokeColor: string;
  // Dot above i
  dotColor: string;
  dotSize: number;
  dotRadius: number;
}

export const DEFAULTS: BrandConfig = {
  coral: "#E8513C",
  saffron: "#F0A830",
  emerald: "#3DC87A",
  cobalt: "#4F63D2",
  paper: "#F4F2EC",
  ink: "#0E0E10",
  softness: 44,
  energy: 0,
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  fontSize: 96,
  letterSpacing: -3,
  textItalic: false,
  textUppercase: false,
  textShadow: 0,
  strokeWidth: 0,
  strokeColor: "#E8513C",
  dotColor: "#E8513C",
  dotSize: 16,
  dotRadius: 4,
};

export const PALETTES = [
  { coral: "#E8513C", saffron: "#F0A830", emerald: "#3DC87A", cobalt: "#4F63D2" },
  { coral: "#E05252", saffron: "#E07AB0", emerald: "#9B5DE5", cobalt: "#C9A0DC" },
  { coral: "#FF4081", saffron: "#00E8C6", emerald: "#00C2FF", cobalt: "#9C27B0" },
  { coral: "#E53935", saffron: "#E8A020", emerald: "#43A047", cobalt: "#1565C0" },
  { coral: "#FF6B00", saffron: "#F9F000", emerald: "#00FF94", cobalt: "#FF00CC" },
  { coral: "#D81B60", saffron: "#8E24AA", emerald: "#1E88E5", cobalt: "#00ACC1" },
];

export const FONTS = [
  { label: "Inter",          value: "'Inter', sans-serif",           tag: "grotesk" },
  { label: "DM Sans",        value: "'DM Sans', sans-serif",         tag: "grotesk" },
  { label: "Space Grotesk",  value: "'Space Grotesk', sans-serif",   tag: "grotesk" },
  { label: "Manrope",        value: "'Manrope', sans-serif",         tag: "grotesk" },
  { label: "Sora",           value: "'Sora', sans-serif",            tag: "grotesk" },
  { label: "Outfit",         value: "'Outfit', sans-serif",          tag: "grotesk" },
  { label: "Bebas Neue",     value: "'Bebas Neue', sans-serif",      tag: "display" },
  { label: "Orbitron",       value: "'Orbitron', sans-serif",        tag: "display" },
  { label: "Barlow Cond.",   value: "'Barlow Condensed', sans-serif",tag: "display" },
  { label: "Oswald",         value: "'Oswald', sans-serif",          tag: "display" },
  { label: "Exo 2",          value: "'Exo 2', sans-serif",           tag: "display" },
  { label: "Anton",          value: "'Anton', sans-serif",           tag: "display" },
  { label: "Share Tech Mono",value: "'Share Tech Mono', monospace",  tag: "mono" },
  { label: "Space Mono",     value: "'Space Mono', monospace",       tag: "mono" },
  { label: "IBM Plex Mono",  value: "'IBM Plex Mono', monospace",    tag: "mono" },
  { label: "Fira Code",      value: "'Fira Code', monospace",        tag: "mono" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace",   tag: "mono" },
  { label: "VT323",          value: "'VT323', monospace",            tag: "mono" },
  { label: "Playfair",       value: "'Playfair Display', serif",     tag: "serif" },
  { label: "Lora",           value: "'Lora', serif",                 tag: "serif" },
  { label: "Cormorant",      value: "'Cormorant Garamond', serif",   tag: "serif" },
];
