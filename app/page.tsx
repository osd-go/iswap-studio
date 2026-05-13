"use client";

import { useState } from "react";
import { BrandConfig, DEFAULTS, PALETTES, FONTS } from "./types";
import { LogoMark } from "./components/LogoMark";
import { LogoText } from "./components/LogoText";

// ─── helpers ─────────────────────────────────────────────────────────────────
function mono(s: string, size = 11, color = "#999") {
  return (
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: `${size}px`,
        color,
        letterSpacing: "0.04em",
        textTransform: "uppercase" as const,
      }}
    >
      {s}
    </span>
  );
}

// ─── SECTION: Site Header ────────────────────────────────────────────────────
function SiteHeader({ brand }: { brand: BrandConfig }) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: brand.paper + "e0",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${brand.ink}12`,
      }}
    >
      {mono("iSwap · Brand System V1.0 · Baghdad, IQ", 11, brand.ink + "66")}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {mono("Design · Eng · Products", 10, brand.ink + "55")}
      </div>
    </header>
  );
}

// ─── SECTION: Hero ───────────────────────────────────────────────────────────
function HeroSection({ brand }: { brand: BrandConfig }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: brand.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 64px 80px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* decorative background squares */}
      <div
        style={{
          position: "absolute",
          right: "-60px",
          top: "50%",
          transform: "translateY(-55%)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      >
        {[brand.coral, brand.cobalt, brand.saffron].map((c, i) => (
          <div
            key={i}
            style={{
              width: "340px",
              height: "280px",
              borderRadius: `${Math.round((brand.softness / 100) * 100)}px`,
              background: c,
              marginRight: i % 2 === 0 ? "0" : "-80px",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* main lockup */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "48px",
          marginBottom: "56px",
          flexWrap: "wrap",
        }}
      >
        <LogoMark brand={brand} squareSize={148} gap={13} />
        <LogoText brand={brand} size={180} color={brand.ink} />
      </div>

      {/* tagline */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(22px, 2.4vw, 34px)",
          fontWeight: 700,
          lineHeight: 1.28,
          color: brand.ink,
          maxWidth: "680px",
          marginBottom: "36px",
          letterSpacing: "-0.5px",
        }}
      >
        A design and engineering studio from{" "}
        <span style={{ color: brand.cobalt }}>Baghdad.</span> We design and
        ship apps, websites, and{" "}
        <span style={{ color: brand.coral }}>digital systems.</span>
      </p>

      {/* category tags */}
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {[
          { label: "Design", color: brand.coral },
          { label: "Engineering", color: brand.saffron },
          { label: "Products", color: brand.emerald },
          { label: "Community", color: brand.cobalt },
        ].map(({ label, color }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: brand.ink,
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: color,
                transition: "background 0.3s",
              }}
            />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SECTION: Brand Grounds ──────────────────────────────────────────────────
function BrandGroundsSection({ brand }: { brand: BrandConfig }) {
  const grounds = [
    { label: "01 · On Paper", cardBg: brand.paper, fgColor: brand.ink, border: `1.5px solid ${brand.ink}18` },
    { label: "02 · On Ink",   cardBg: brand.ink,   fgColor: brand.paper, border: "none" },
    { label: "03 · On Cobalt",cardBg: brand.cobalt, fgColor: brand.paper, border: "none" },
  ];

  return (
    <section
      style={{
        background: brand.paper,
        padding: "80px 64px",
        borderTop: `1px solid ${brand.ink}12`,
        transition: "background 0.4s",
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "17px",
          fontWeight: 500,
          color: brand.ink + "77",
          marginBottom: "36px",
          letterSpacing: "-0.2px",
        }}
      >
        The lockup on each of the brand grounds
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
        {grounds.map(({ label, cardBg, fgColor, border }) => (
          <div
            key={label}
            style={{
              background: cardBg,
              border,
              borderRadius: "20px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              aspectRatio: "4/3",
              justifyContent: "space-between",
              transition: "background 0.4s",
            }}
          >
            {/* top label */}
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                color: fgColor + "66",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>

            {/* lockup centered */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                justifyContent: "center",
              }}
            >
              <LogoMark brand={brand} squareSize={52} gap={5} />
              <LogoText brand={brand} size={52} color={fgColor} />
            </div>

            {/* bottom meta */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  color: fgColor + "55",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                BG · {cardBg.toUpperCase()}
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  color: fgColor + "55",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                FG · {fgColor.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SECTION: Instagram ──────────────────────────────────────────────────────
function InstagramSection({ brand }: { brand: BrandConfig }) {
  return (
    <section
      style={{
        background: brand.paper,
        padding: "80px 64px 120px",
        borderTop: `1px solid ${brand.ink}12`,
        transition: "background 0.4s",
      }}
    >
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(48px, 6vw, 80px)",
          fontWeight: 800,
          color: brand.ink,
          letterSpacing: "-2px",
          marginBottom: "8px",
        }}
      >
        Instagram
      </h2>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "20px",
          color: brand.ink + "77",
          marginBottom: "56px",
          fontWeight: 400,
        }}
      >
        Same brand world in light and dark mode
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <PhoneMockup brand={brand} dark={false} label="07 · INSTAGRAM · LIGHT" />
        <PhoneMockup brand={brand} dark={true}  label="08 · INSTAGRAM · DARK" />
      </div>
    </section>
  );
}

// ─── Phone Mockup ─────────────────────────────────────────────────────────────
function PhoneMockup({ brand, dark, label }: { brand: BrandConfig; dark: boolean; label: string }) {
  const phoneBg   = dark ? brand.ink  : "#FFFFFF";
  const screenBg  = dark ? brand.ink  : "#FFFFFF";
  const textClr   = dark ? brand.paper : brand.ink;
  const subClr    = dark ? brand.paper + "99" : brand.ink + "88";
  const dividerClr= dark ? "#FFFFFF18" : "#00000010";
  const btnBg     = dark ? "#FFFFFF18" : "#00000010";
  const iconClr   = dark ? brand.paper : brand.ink;

  // Phone internal render = 390px wide; we scale it in a wrapper
  const PHONE_W = 390;

  const posts: {
    bg: string; type: "hero" | "case" | "bts-photo" | "tip" | "bts-code" | "callout";
    label?: string; name?: string; subtitle?: string;
    text?: string; highlight?: string; code?: string; cta?: string;
  }[] = [
    {
      bg: brand.ink, type: "hero",
      text: "A studio for the internet, built in Baghdad.", highlight: "Baghdad.",
    },
    {
      bg: brand.coral, type: "case",
      label: "CASE · 01 · IOS", name: "Venu", subtitle: "Café & Gaming OS",
    },
    {
      bg: brand.paper, type: "bts-photo",
      label: "BTS · STUDIO", text: "[ photo · monday · standup ]",
    },
    {
      bg: brand.saffron, type: "tip",
      label: "TIP · 01", text: "Your website is your second storefront.",
    },
    {
      bg: brand.ink, type: "case",
      label: "CASE · 02 · WEB", name: "Pixel Planet", subtitle: "E-commerce, Iraq.",
    },
    {
      bg: brand.emerald, type: "bts-code",
      label: "BTS · CODE", code: "const studio = {\n  city: 'Baghdad',\n}",
    },
    {
      bg: brand.paper, type: "case",
      label: "CASE · 03 · WEB", name: "Shawaka", subtitle: "Art Gallery, online.",
    },
    {
      bg: brand.cobalt, type: "tip",
      label: "TIP · 02", text: "Does your business have a digital system?",
    },
    {
      bg: brand.ink, type: "callout",
      text: "Now taking new clients.", cta: "DM us ↗",
    },
  ];

  const POST_SIZE = Math.floor((PHONE_W - 3) / 3); // ~129px

  function Post({ p }: { p: typeof posts[0] }) {
    const isDark = p.bg === brand.ink;
    const isLight = p.bg === brand.paper;
    const fg = isDark ? brand.paper : isLight ? brand.ink : brand.ink;
    const fgSub = isDark ? brand.paper + "aa" : brand.ink + "99";
    const sz = POST_SIZE;

    return (
      <div
        style={{
          width: sz, height: sz,
          background: p.bg,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          transition: "background 0.4s",
        }}
      >
        {p.type === "hero" && (
          <div style={{ padding: "8px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* mini logo mark */}
            <LogoMark brand={brand} squareSize={16} gap={2} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: brand.paper, lineHeight: 1.3, letterSpacing: "-0.3px" }}>
              {(p.text ?? "").split(p.highlight ?? "___").map((chunk, i, arr) => (
                <span key={i}>
                  {chunk}
                  {i < arr.length - 1 && <span style={{ color: brand.coral }}>{p.highlight}</span>}
                </span>
              ))}
            </p>
          </div>
        )}
        {p.type === "case" && (
          <div style={{ padding: "8px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", color: fg + "aa", letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.label}</span>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 800, color: fg, letterSpacing: "-0.5px", lineHeight: 1.1 }}>{p.name}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "8px", fontWeight: 500, color: fgSub, marginTop: "2px" }}>{p.subtitle}</div>
            </div>
          </div>
        )}
        {p.type === "bts-photo" && (
          <div style={{ padding: "8px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", color: fg + "99", letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.label}</span>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: fg, lineHeight: 1.6 }}>{p.text}</div>
          </div>
        )}
        {p.type === "tip" && (
          <div style={{ padding: "8px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", color: fg + "99", letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.label}</span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 700, color: fg, lineHeight: 1.35, letterSpacing: "-0.2px" }}>{p.text}</p>
          </div>
        )}
        {p.type === "bts-code" && (
          <div style={{ padding: "8px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", color: brand.ink + "99", letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.label}</span>
            <pre style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: brand.ink, lineHeight: 1.7, margin: 0, whiteSpace: "pre" }}>{p.code}</pre>
          </div>
        )}
        {p.type === "callout" && (
          <div style={{ padding: "8px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 800, color: brand.paper, lineHeight: 1.25, letterSpacing: "-0.4px" }}>{p.text}</p>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 600, color: brand.coral }}>{p.cta}</span>
          </div>
        )}
      </div>
    );
  }

  // Avatar: mini LogoMark in circle
  function Avatar() {
    const avatarInnerSize = 72;
    const sq = 26;
    const gap = 3;
    const totalSize = sq * 2 + gap;
    const offset = (avatarInnerSize - totalSize) / 2;
    const radius = Math.round((brand.softness / 100) * sq * 0.52);

    return (
      <div
        style={{
          width: avatarInnerSize,
          height: avatarInnerSize,
          borderRadius: "50%",
          background: brand.ink,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          border: `2px solid ${dark ? "#FFFFFF22" : "#00000011"}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: offset,
            left: offset,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: `${gap}px`,
          }}
        >
          {[brand.coral, brand.saffron, brand.cobalt, brand.emerald].map((c, i) => (
            <div key={i} style={{ width: sq, height: sq, borderRadius: radius, background: c, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: brand.ink + "77", marginBottom: "12px" }}>
        {label}
      </p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: brand.ink + "55", marginBottom: "20px" }}>
        {dark ? "Same brand, different lighting" : "Profile + first 9 posts"}
      </p>

      {/* Phone frame wrapper — renders at 390px, scaled for display */}
      <div style={{ width: "fit-content", overflow: "visible" }}>
        <div
          style={{
            transformOrigin: "top left",
            transform: "scale(0.72)",
            width: PHONE_W,
            background: phoneBg,
            borderRadius: "44px",
            overflow: "hidden",
            boxShadow: dark
              ? "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px #FFFFFF18"
              : "0 40px 100px rgba(0,0,0,0.18), 0 0 0 1px #00000015",
            transition: "background 0.4s",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Status bar */}
          <div style={{ padding: "14px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "15px", fontWeight: 600, color: textClr }}>9:41</span>
            <div style={{ width: "120px", height: "34px", background: "#000", borderRadius: "20px", position: "absolute", left: "50%", transform: "translateX(-50%)", top: "12px" }} />
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <svg width="18" height="12" viewBox="0 0 18 12" fill={textClr}><rect x="0" y="4" width="3" height="8" rx="1"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill={textClr}><rect x="0" y="2.5" width="12" height="8" rx="1.5"/><rect x="12.5" y="4.5" width="2.5" height="4" rx="1"/><rect x="1.5" y="4" width="9" height="5" rx="0.5" fill={dark ? brand.ink : "#fff"}/><rect x="1.5" y="4" width="6" height="5" rx="0.5"/></svg>
            </div>
          </div>

          {/* Instagram header */}
          <div style={{ padding: "12px 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: textClr }}>iswap.studio</span>
              <span style={{ fontSize: "14px", color: subClr }}>·</span>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <span style={{ fontSize: "22px", color: textClr, fontWeight: 300 }}>+</span>
              <span style={{ fontSize: "20px", color: textClr }}>≡</span>
            </div>
          </div>

          {/* Profile */}
          <div style={{ padding: "0 16px" }}>
            {/* Avatar + stats */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
              <Avatar />
              <div style={{ display: "flex", gap: "0", flex: 1, justifyContent: "space-around" }}>
                {[["24", "posts"], ["1,284", "followers"], ["189", "following"]].map(([num, lbl]) => (
                  <div key={lbl} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: textClr, lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: "12px", color: subClr, marginTop: "2px" }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: textClr, marginBottom: "2px" }}>iSwap Studio</div>
              <div style={{ fontSize: "12px", color: textClr, lineHeight: 1.45 }}>Design &amp; Engineering · Baghdad, IQ</div>
              <div style={{ fontSize: "12px", color: textClr, lineHeight: 1.45 }}>We design and ship apps, websites &amp; digital systems.</div>
              <div style={{ fontSize: "12px", color: textClr, lineHeight: 1.45, direction: "rtl", textAlign: "right", marginTop: "2px" }}>
                استوديو تصميم وهندسة من بغداد. نبني تطبيقات ومواقع وأنظمة رقمية.
              </div>
              <div style={{ fontSize: "12px", color: textClr, lineHeight: 1.6, marginTop: "2px", display: "flex", gap: "4px", flexWrap: "wrap", alignItems: "center" }}>
                {[{ dot: brand.coral, t: "design" }, { dot: brand.saffron, t: "eng" }, { dot: brand.emerald, t: "products" }, { dot: brand.cobalt, t: "community" }].map(({ dot, t }) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: dot, display: "inline-block" }} />
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: "12px", color: brand.cobalt, marginTop: "2px" }}>
                iswap.studio · hello@iswap.studio
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
              {["Following", "Message"].map(lbl => (
                <button key={lbl} style={{ flex: 1, padding: "8px 0", borderRadius: "8px", border: "none", background: btnBg, color: textClr, fontSize: "13px", fontWeight: 600, cursor: "default" }}>
                  {lbl}
                </button>
              ))}
              <button style={{ width: "38px", borderRadius: "8px", border: "none", background: btnBg, color: textClr, fontSize: "16px", cursor: "default" }}>+</button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderTop: `1px solid ${dividerClr}`, marginBottom: "1px" }}>
              {[["■", "POSTS"], ["▶", "REELS"], ["⊙", "TAGGED"]].map(([icon, lbl], i) => (
                <div
                  key={lbl}
                  style={{
                    flex: 1, textAlign: "center", padding: "10px 0",
                    borderTop: i === 0 ? `2px solid ${textClr}` : "2px solid transparent",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: i === 0 ? textClr : subClr }}>{icon}</span>
                  <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: i === 0 ? textClr : subClr }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Post grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(3, ${POST_SIZE}px)`,
              gap: "1.5px",
            }}
          >
            {posts.map((p, i) => <Post key={i} p={p} />)}
          </div>

          {/* Bottom safe area */}
          <div style={{ height: "34px", background: phoneBg }} />
        </div>
      </div>
    </div>
  );
}

// ─── Tweaks Panel ─────────────────────────────────────────────────────────────
function SliderRow({
  label, value, min = 0, max = 100, step = 1, unit = "%",
  onChange,
}: { label: string; value: number; min?: number; max?: number; step?: number; unit?: string; onChange: (v: number) => void }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", color: "#111", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: "13px", color: "#999" }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))} style={{ width: "100%" }} />
    </div>
  );
}

function TweaksPanel({
  brand, onChange, onReset, open, setOpen,
}: {
  brand: BrandConfig;
  onChange: (patch: Partial<BrandConfig>) => void;
  onReset: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [fontTag, setFontTag] = useState<"all" | "grotesk" | "display" | "mono" | "serif">("all");
  const filteredFonts = fontTag === "all" ? FONTS : FONTS.filter(f => f.tag === fontTag);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: "32px", right: "32px",
          background: "#fff", border: "none", borderRadius: "14px",
          padding: "13px 22px", fontSize: "15px", fontWeight: 600,
          cursor: "pointer", boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
          color: "#111", letterSpacing: "-0.2px", zIndex: 200,
        }}
      >
        ⚙ Tweaks
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed", bottom: "28px", right: "28px", zIndex: 200,
        width: "320px", maxHeight: "88vh", overflowY: "auto",
        background: "#F2F0EC", borderRadius: "20px",
        boxShadow: "0 8px 48px rgba(0,0,0,0.18)", padding: "22px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#111" }}>Tweaks</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={onReset} style={{ background: "none", border: "none", fontSize: "12px", color: "#888", cursor: "pointer", fontWeight: 600 }}>Reset</button>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#aaa", lineHeight: 1 }}>×</button>
        </div>
      </div>

      {/* Brand Palette */}
      <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>Brand Palette</div>
      <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "18px" }}>
        {PALETTES.map((p, i) => (
          <button
            key={i}
            onClick={() => onChange({ coral: p.coral, saffron: p.saffron, emerald: p.emerald, cobalt: p.cobalt })}
            style={{
              width: "40px", height: "56px", borderRadius: "10px", overflow: "hidden",
              padding: 0, cursor: "pointer", border: "3px solid transparent",
              display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr",
              outline: brand.coral === p.coral ? "2.5px solid #111" : "none", outlineOffset: "2px",
            }}
          >
            <div style={{ background: p.coral }} /><div style={{ background: p.saffron }} />
            <div style={{ background: p.cobalt }} /><div style={{ background: p.emerald }} />
          </button>
        ))}
      </div>

      {/* Logo Feel */}
      <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px" }}>Logo Feel</div>
      <SliderRow label="Softness" value={brand.softness} onChange={v => onChange({ softness: v })} />

      {/* Font */}
      <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>Font Style</div>
      <div style={{ display: "flex", gap: "5px", marginBottom: "8px", flexWrap: "wrap" }}>
        {(["all", "grotesk", "display", "mono", "serif"] as const).map(tag => (
          <button key={tag} onClick={() => setFontTag(tag)} style={{
            padding: "4px 9px", borderRadius: "7px", border: "none", cursor: "pointer",
            fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
            background: fontTag === tag ? "#111" : "#E4E1DC", color: fontTag === tag ? "#fff" : "#666",
          }}>{tag}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px", marginBottom: "16px" }}>
        {filteredFonts.map(f => (
          <button
            key={f.value}
            onClick={() => onChange({ fontFamily: f.value })}
            style={{
              padding: "8px 10px", borderRadius: "8px", border: "none", cursor: "pointer",
              fontSize: "13px", fontWeight: 600, fontFamily: f.value,
              background: brand.fontFamily === f.value ? "#111" : "#E4E1DC",
              color: brand.fontFamily === f.value ? "#fff" : "#333",
              textAlign: "left", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Thickness */}
      <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>Thickness</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "5px", marginBottom: "16px" }}>
        {[300, 400, 500, 600, 700, 800, 900].map(w => (
          <button key={w} onClick={() => onChange({ fontWeight: w })} style={{
            padding: "8px 0", borderRadius: "7px", border: "none", cursor: "pointer",
            fontSize: "12px", fontWeight: w, fontFamily: brand.fontFamily,
            background: brand.fontWeight === w ? "#111" : "#E4E1DC",
            color: brand.fontWeight === w ? "#fff" : "#444",
          }}>{w}</button>
        ))}
      </div>

      {/* Text size & spacing */}
      <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px" }}>Text</div>
      <SliderRow label="Spacing" value={brand.letterSpacing} min={-10} max={20} unit="px" onChange={v => onChange({ letterSpacing: v })} />
      <SliderRow label="Stroke"  value={brand.strokeWidth}   min={0}   max={8} step={0.5} unit="px" onChange={v => onChange({ strokeWidth: v })} />

      {/* Dot */}
      <div style={{ fontSize: "11px", fontWeight: 700, color: "#999", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "10px" }}>Dot</div>
      <SliderRow label="Size"   value={brand.dotSize}   min={6}  max={40} unit="px" onChange={v => onChange({ dotSize: v })} />
      <SliderRow label="Radius" value={brand.dotRadius} min={0}  max={20} unit="px" onChange={v => onChange({ dotRadius: v })} />
      <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
        {[brand.coral, brand.saffron, brand.emerald, brand.cobalt, "#111111", "#FFFFFF", "#FF4081", "#9B5DE5"].map(c => (
          <button key={c} onClick={() => onChange({ dotColor: c })} style={{
            width: "30px", height: "30px", borderRadius: "7px", background: c, border: "none", cursor: "pointer",
            outline: brand.dotColor === c ? "2.5px solid #111" : "2px solid #ccc", outlineOffset: "2px",
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [brand, setBrand] = useState<BrandConfig>(DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  const patch = (p: Partial<BrandConfig>) => setBrand(prev => ({ ...prev, ...p }));
  const reset = () => setBrand(DEFAULTS);

  return (
    <>
      <SiteHeader brand={brand} />
      <main>
        <HeroSection brand={brand} />
        <BrandGroundsSection brand={brand} />
        <InstagramSection brand={brand} />
      </main>
      <TweaksPanel brand={brand} onChange={patch} onReset={reset} open={tweaksOpen} setOpen={setTweaksOpen} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@100..900&family=DM+Sans:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&family=Manrope:wght@200..800&family=Sora:wght@100..800&family=Outfit:wght@100..900&family=Bebas+Neue&family=Orbitron:wght@400..900&family=Barlow+Condensed:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Anton&family=Share+Tech+Mono&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&family=Fira+Code:wght@300..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=VT323&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${brand.paper}; }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 2px; background: #D8D5CF; outline: none; cursor: pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.25); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
      `}</style>
    </>
  );
}
