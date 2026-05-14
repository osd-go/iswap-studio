"use client";
import { useState, useCallback } from "react";

// ─── types ────────────────────────────────────────────────────────────────────
type C4 = [string, string, string, string];

// ─── svg primitives ───────────────────────────────────────────────────────────
const S = (x: number, y: number, s: number, c: string, r = 0, k = 0) =>
  <rect key={k} x={x} y={y} width={s} height={s} rx={r} ry={r} fill={c} />;
const Rc = (x: number, y: number, w: number, h: number, c: string, r = 0, k = 0) =>
  <rect key={k} x={x} y={y} width={w} height={h} rx={r} ry={r} fill={c} />;
const Ci = (cx: number, cy: number, rad: number, c: string, k = 0) =>
  <circle key={k} cx={cx} cy={cy} r={rad} fill={c} />;
const W = ({ children, size = 80 }: { children: React.ReactNode; size?: number }) =>
  <svg viewBox="0 0 80 80" width={size} height={size}>{children}</svg>;

// ─── 50 PALETTES — warm, vibrant, no purple, no white/light, no neon ─────────
const P50: { id: number; name: string; c: C4 }[] = [
  // ── close to original ───────────────────────────────────────────────────────
  { id:  1, name: "Baghdad Original",  c: ["#E8513C","#F0A830","#4F63D2","#3DC87A"] },
  { id:  2, name: "Tigris Sunrise",    c: ["#FF5733","#FFAA00","#1565C0","#27AE60"] },
  { id:  3, name: "Euphrates",         c: ["#EF233C","#FFBE0B","#023E8A","#38B000"] },
  { id:  4, name: "Souk at Noon",      c: ["#FF4E29","#FFC300","#0096C7","#06C270"] },
  { id:  5, name: "Basra Port",        c: ["#FF4757","#FFA502","#2F86EB","#2ED573"] },
  // ── warm dominant ───────────────────────────────────────────────────────────
  { id:  6, name: "Desert Spice",      c: ["#D62828","#F4A261","#457B9D","#2A9D8F"] },
  { id:  7, name: "Pomegranate",       c: ["#C1121F","#FF8800","#4361EE","#00B388"] },
  { id:  8, name: "Spice Route",       c: ["#C0392B","#E67E22","#2980B9","#27AE60"] },
  { id:  9, name: "Marrakesh",         c: ["#FF3E00","#FF8F00","#0047AB","#009966"] },
  { id: 10, name: "Baghdad Brick",     c: ["#D84315","#F9A825","#1565C0","#00875A"] },
  { id: 11, name: "Terracotta",        c: ["#BF3100","#D98200","#1A5FB4","#1B8A50"] },
  { id: 12, name: "Kilim",             c: ["#D03000","#E08800","#1E4494","#1E8050"] },
  { id: 13, name: "Pottery Wheel",     c: ["#A62800","#CC7700","#1550A0","#187048"] },
  // ── balanced warm/cool ──────────────────────────────────────────────────────
  { id: 14, name: "Arabian Nights",    c: ["#E74C3C","#F39C12","#1565C0","#1ABC9C"] },
  { id: 15, name: "Cedar Grove",       c: ["#FF4444","#FF9F43","#006CB4","#00C49F"] },
  { id: 16, name: "Coral Reef",        c: ["#FF6347","#FFA500","#0056A3","#00A86B"] },
  { id: 17, name: "Istanbul Red",      c: ["#E8453C","#FFAB40","#1976D2","#43A047"] },
  { id: 18, name: "Beirut Bloom",      c: ["#FF5722","#FFC107","#01579B","#00897B"] },
  { id: 19, name: "Cairo Gold",        c: ["#FF6D00","#FFC400","#0277BD","#388E3C"] },
  { id: 20, name: "Mediterranean",     c: ["#E8513C","#F9A825","#006994","#2ECC71"] },
  // ── blue dominant ───────────────────────────────────────────────────────────
  { id: 21, name: "Tigris Teal",       c: ["#E8513C","#F0A830","#006064","#00BCD4"] },
  { id: 22, name: "Mosul Blue",        c: ["#FF4444","#FF9500","#003580","#009E60"] },
  { id: 23, name: "Cobalt Spice",      c: ["#E84917","#F0A830","#0047AB","#3DC87A"] },
  { id: 24, name: "Navy Gold",         c: ["#D84315","#FFB300","#0D2B82","#009E60"] },
  { id: 25, name: "Ocean Fire",        c: ["#E8513C","#FF9800","#0064C8","#00A878"] },
  // ── teal / emerald dominant ─────────────────────────────────────────────────
  { id: 26, name: "Oasis",             c: ["#FF5C26","#FFAE00","#005FAD","#009977"] },
  { id: 27, name: "Palm Garden",       c: ["#E8513C","#F0A830","#0A5F38","#2ECC71"] },
  { id: 28, name: "Emerald City",      c: ["#D62828","#F4A261","#006994","#00A86B"] },
  { id: 29, name: "River Green",       c: ["#E0521C","#E09814","#1565C0","#00875A"] },
  { id: 30, name: "Forest Flame",      c: ["#CC3A1A","#E09000","#005B80","#00804E"] },
  // ── saturated / design energy ───────────────────────────────────────────────
  { id: 31, name: "Studio Fire",       c: ["#FF4400","#FFAA00","#0055FF","#00BB55"] },
  { id: 32, name: "Bold Move",         c: ["#E84040","#F0B240","#4060D2","#40C87A"] },
  { id: 33, name: "Design Energy",     c: ["#FF5500","#FFB000","#0044DD","#00AA55"] },
  { id: 34, name: "Craft Mark",        c: ["#D94F00","#E9A000","#0050B0","#009955"] },
  { id: 35, name: "Build Mode",        c: ["#FF4000","#FFAC00","#0044CC","#00AA44"] },
  // ── modern product energy ───────────────────────────────────────────────────
  { id: 36, name: "Figma-ish",         c: ["#FF7262","#FF8800","#1ABCFE","#0ACF83"] },
  { id: 37, name: "Duolingo Energy",   c: ["#FF4B2B","#FF9B00","#1CB0F6","#58CC02"] },
  { id: 38, name: "Product Hunt",      c: ["#DA4500","#F09A00","#1050C0","#00A040"] },
  { id: 39, name: "Launch Pad",        c: ["#F03A00","#F0B000","#0048D4","#00B050"] },
  { id: 40, name: "Ship It",           c: ["#E84E00","#EDAA00","#1044B8","#00963C"] },
  // ── place / seasonal ────────────────────────────────────────────────────────
  { id: 41, name: "Summer Souk",       c: ["#FF6200","#FFD600","#0060AA","#00A850"] },
  { id: 42, name: "Desert Storm",      c: ["#E85030","#E0A020","#2050C0","#30B060"] },
  { id: 43, name: "Tigris Warm",       c: ["#D84828","#D89818","#2848C8","#28B058"] },
  { id: 44, name: "Ancient Iraq",      c: ["#C84020","#C89010","#2040C0","#20A850"] },
  { id: 45, name: "Baghdad Dusk",      c: ["#E04030","#E09820","#3858D8","#38C068"] },
  // ── bold & clear ────────────────────────────────────────────────────────────
  { id: 46, name: "Warm Pop",          c: ["#FF5C00","#FFD000","#0060FF","#00CC66"] },
  { id: 47, name: "Rich Orange",       c: ["#EE4400","#FFAA00","#1144DD","#00AA55"] },
  { id: 48, name: "Deep Blue Flame",   c: ["#CC3300","#FF8800","#0033CC","#00AA44"] },
  { id: 49, name: "Studio Craft",      c: ["#FF4411","#FFBB00","#0055EE","#00BB55"] },
  { id: 50, name: "Full Circle",       c: ["#E8513C","#F0A830","#2244FF","#11BB66"] },
];

// ─── 50 LOGO STYLE MARKS ─────────────────────────────────────────────────────
type MFn = (c: C4, r: number) => React.ReactNode;
const L50: { id: number; name: string; cat: string; fn: MFn }[] = [
  // ── 4-SQUARE ARRANGEMENTS ──────────────────────────────────────────────────
  { id: 1, name: "Classic Grid", cat: "Geometric",
    fn: (c, r) => <W>{S(4,4,34,c[0],r)} {S(42,4,34,c[1],r)} {S(4,42,34,c[2],r)} {S(42,42,34,c[3],r)}</W> },

  { id: 2, name: "Stagger Brick", cat: "Geometric",
    fn: (c, r) => <W>
      {S(2,12,30,c[0],r,0)} {S(36,12,30,c[1],r,1)}
      {S(18,46,30,c[2],r,2)} {S(52,46,30,c[3],r,3)}
    </W> },

  { id: 3, name: "Diagonal Flow", cat: "Geometric",
    fn: (c, r) => <W>
      {S(2,2,28,c[0],r)} {S(22,18,28,c[1],r)}
      {S(30,36,28,c[2],r)} {S(50,52,28,c[3],r)}
    </W> },

  { id: 4, name: "Four Corners", cat: "Geometric",
    fn: (c, r) => <W>
      {S(2,2,24,c[0],r)} {S(54,2,24,c[1],r)}
      {S(2,54,24,c[2],r)} {S(54,54,24,c[3],r)}
    </W> },

  { id: 5, name: "Ring Orbit", cat: "Geometric",
    fn: (c, r) => <W>
      <g transform="translate(40,40)">
        {S(-14,-36,26,c[0],r,0)}
        {S(10,-14,26,c[1],r,1)}
        {S(-36,-14,26,c[2],r,2)}
        {S(-14,10,26,c[3],r,3)}
      </g>
    </W> },

  { id: 6, name: "Pinwheel", cat: "Geometric",
    fn: (c, r) => { const cr = Math.min(r, 6); return <W>
      <g transform="translate(40,40)">
        <g transform="rotate(0)">{S(-34,-34,30,c[0],cr,0)}</g>
        <g transform="rotate(90)">{S(-34,-34,30,c[1],cr,1)}</g>
        <g transform="rotate(180)">{S(-34,-34,30,c[2],cr,2)}</g>
        <g transform="rotate(270)">{S(-34,-34,30,c[3],cr,3)}</g>
      </g>
    </W>; } },

  { id: 7, name: "Plus Sign", cat: "Geometric",
    fn: (c, r) => <W>
      {S(24,2,32,c[0],r)} {S(2,24,32,c[1],r)}
      {S(46,24,32,c[2],r)} {S(24,46,32,c[3],r)}
    </W> },

  { id: 8, name: "Growing Steps", cat: "Geometric",
    fn: (c, r) => <W>
      {S(2,50,26,c[0],r,0)} {S(20,32,26,c[1],r,1)}
      {S(38,14,26,c[2],r,2)} {S(56,50,22,c[3],r,3)}
    </W> },

  { id: 9, name: "Overlap Weave", cat: "Geometric",
    fn: (c, r) => { const cr = Math.min(r, 7); return <W>
      {S(4,4,38,c[0],cr,0)} {S(28,4,38,c[1],cr,1)}
      {S(4,28,38,c[2],cr,2)} {S(28,28,38,c[3],cr,3)}
    </W>; } },

  { id: 10, name: "Diamond Grid", cat: "Geometric",
    fn: (c, r) => { const cr = Math.min(r, 5); return <W>
      <g transform="translate(40,40) rotate(45)">
        {S(-38,-38,34,c[0],cr,0)} {S(6,-38,34,c[1],cr,1)}
        {S(-38,6,34,c[2],cr,2)} {S(6,6,34,c[3],cr,3)}
      </g>
    </W>; } },

  // ── LETTERFORM MARKS ───────────────────────────────────────────────────────
  { id: 11, name: "Bold i", cat: "Letterform",
    fn: (c) => <W>
      {S(30,8,20,c[0],4)}
      {Rc(36,34,8,38,c[1],4)}
    </W> },

  { id: 12, name: "Square i", cat: "Letterform",
    fn: (c, r) => <W>
      {S(24,6,14,c[0],r)}
      {S(24,26,32,c[1],r)}
    </W> },

  { id: 13, name: "Pixel i", cat: "Letterform",
    fn: (c) => <W>
      {[0,1,2,3].map(i => S(34,6+i*10,12,i===0?c[0]:c[1],2,i))}
      {S(28,46,24,c[2],2)}
    </W> },

  { id: 14, name: "Bold S", cat: "Letterform",
    fn: (c) => <W>
      <text x="40" y="62" fontFamily="Arial Black,sans-serif" fontSize="68"
        fontWeight="900" textAnchor="middle" fill={c[0]}>S</text>
    </W> },

  { id: 15, name: "iS Fused", cat: "Letterform",
    fn: (c) => <W>
      <text x="40" y="62" fontFamily="Arial Black,sans-serif" fontSize="50"
        fontWeight="900" textAnchor="middle" fill={c[0]}>iS</text>
    </W> },

  { id: 16, name: "Stacked iS", cat: "Letterform",
    fn: (c) => <W>
      <text x="40" y="36" fontFamily="Arial Black,sans-serif" fontSize="38"
        fontWeight="900" textAnchor="middle" fill={c[0]}>i</text>
      <text x="40" y="70" fontFamily="Arial Black,sans-serif" fontSize="38"
        fontWeight="900" textAnchor="middle" fill={c[1]}>S</text>
    </W> },

  { id: 17, name: "Cutout i Block", cat: "Letterform",
    fn: (c, r) => <W>
      {S(10,8,60,c[0],r)}
      {Rc(34,20,12,40,c[1],4)}
      {S(32,8,16,c[2],3)}
    </W> },

  { id: 18, name: "Double i", cat: "Letterform",
    fn: (c, r) => <W>
      {S(18,8,12,c[0],r)} {S(50,8,12,c[1],r)}
      {Rc(24,26,8,46,c[2],4)} {Rc(48,26,8,46,c[3],4)}
    </W> },

  // ── ABSTRACT / MOTION ──────────────────────────────────────────────────────
  { id: 19, name: "Swap Arrows", cat: "Abstract",
    fn: (c) => <W>
      <path d="M20,20 A22,22 0 1,1 60,40" stroke={c[0]} strokeWidth="8" fill="none" strokeLinecap="round"/>
      <polygon points="58,28 72,38 58,50" fill={c[0]}/>
      <path d="M60,60 A22,22 0 1,1 20,40" stroke={c[1]} strokeWidth="8" fill="none" strokeLinecap="round"/>
      <polygon points="22,50 8,40 22,28" fill={c[1]}/>
    </W> },

  { id: 20, name: "Exchange", cat: "Abstract",
    fn: (c) => <W>
      <path d="M8,28 H66" stroke={c[0]} strokeWidth="8" fill="none" strokeLinecap="round"/>
      <polygon points="62,18 76,28 62,38" fill={c[0]}/>
      <path d="M72,52 H14" stroke={c[1]} strokeWidth="8" fill="none" strokeLinecap="round"/>
      <polygon points="18,42 4,52 18,62" fill={c[1]}/>
    </W> },

  { id: 21, name: "Toggle Switch", cat: "Abstract",
    fn: (c, r) => <W>
      {Rc(4,22,72,36,c[0],18,0)}
      {S(8,26,28,c[1],12,1)}
      {S(44,26,28,c[2],Math.min(r,10),2)}
    </W> },

  { id: 22, name: "Swoosh", cat: "Abstract",
    fn: (c) => <W>
      <path d="M10,70 Q40,-10 70,40" stroke={c[0]} strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M10,40 Q40,90 70,10" stroke={c[1]} strokeWidth="10" fill="none" strokeLinecap="round"/>
    </W> },

  { id: 23, name: "Infinity Swap", cat: "Abstract",
    fn: (c) => <W>
      <path d="M40,40 C40,20 12,10 12,30 C12,50 40,60 40,40 C40,20 68,10 68,30 C68,50 40,60 40,40"
        stroke={c[0]} strokeWidth="7" fill="none" strokeLinecap="round"/>
    </W> },

  { id: 24, name: "Cross Arrow", cat: "Abstract",
    fn: (c) => <W>
      <path d="M20,40 H60" stroke={c[0]} strokeWidth="7" fill="none" strokeLinecap="round"/>
      <polygon points="56,30 70,40 56,50" fill={c[0]}/>
      <path d="M40,20 V60" stroke={c[1]} strokeWidth="7" fill="none" strokeLinecap="round"/>
      <polygon points="30,24 40,8 50,24" fill={c[1]}/>
    </W> },

  { id: 25, name: "Zigzag", cat: "Abstract",
    fn: (c, r) => { const cr = Math.min(r,4); return <W>
      <polyline points="8,60 24,20 40,60 56,20 72,60"
        stroke={c[0]} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {S(2,54,12,c[1],cr,0)} {S(34,54,12,c[2],cr,1)} {S(66,54,12,c[3],cr,2)}
    </W>; } },

  { id: 26, name: "Spiral In", cat: "Abstract",
    fn: (c, r) => <W>
      {S(8,8,64,c[0],r)}
      {S(18,18,44,c[1],r)}
      {S(28,28,24,c[2],r)}
      {S(36,36,8,c[3],r)}
    </W> },

  { id: 27, name: "Launch", cat: "Abstract",
    fn: (c, r) => { const cr = Math.min(r,6); return <W>
      {S(24,38,32,c[0],cr,0)}
      <path d="M40,38 L40,8 M32,18 L40,6 L48,18" stroke={c[1]} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {S(20,56,14,c[2],cr,1)} {S(46,56,14,c[3],cr,2)}
    </W>; } },

  { id: 28, name: "Ripple Squares", cat: "Abstract",
    fn: (c, r) => { const cr = Math.min(r,8); return <W>
      {S(6,6,68,c[0],cr+4,0)} {S(15,15,50,c[1],cr+2,1)}
      {S(24,24,32,c[2],cr,2)} {S(32,32,16,c[3],Math.min(cr,5),3)}
    </W>; } },

  // ── NEGATIVE SPACE ─────────────────────────────────────────────────────────
  { id: 29, name: "Square Frame", cat: "Negative",
    fn: (c, r) => { const cr = Math.min(r, 8); return <W>
      {S(4,4,34,c[0],cr,0)} {S(42,4,34,c[1],cr,1)}
      {S(4,42,34,c[2],cr,2)} {S(42,42,34,c[3],cr,3)}
      <rect x="18" y="18" width="44" height="44" rx={cr} fill="#F4F2EC"/>
    </W>; } },

  { id: 30, name: "Cutout Grid", cat: "Negative",
    fn: (c, r) => { const cr = Math.min(r, 8); return <W>
      <rect x="4" y="4" width="72" height="72" rx={cr} fill={c[0]}/>
      <rect x="16" y="16" width="22" height="22" rx={Math.max(0,cr-3)} fill="#F4F2EC"/>
      <rect x="42" y="16" width="22" height="22" rx={Math.max(0,cr-3)} fill="#F4F2EC"/>
      <rect x="16" y="42" width="22" height="22" rx={Math.max(0,cr-3)} fill="#F4F2EC"/>
      <rect x="42" y="42" width="22" height="22" rx={Math.max(0,cr-3)} fill="#F4F2EC"/>
    </W>; } },

  { id: 31, name: "Halved Square", cat: "Negative",
    fn: (c, r) => <W>
      {S(4,4,34,c[0],r)} {S(42,4,34,c[1],r)}
      {S(4,42,34,c[2],r)}
      <path d="M42,76 L76,42 L76,76 Z" fill={c[3]}/>
      <path d="M42,42 L76,42 L42,76 Z" fill={c[0]}/>
    </W> },

  { id: 32, name: "Shadow Stack", cat: "Negative",
    fn: (c, r) => <W>
      {S(14,14,52,c[0]+"44",r)} {S(22,22,52,c[1]+"66",r)}
      {S(10,10,52,c[2],r)}
    </W> },

  // ── MODULAR MARKS ──────────────────────────────────────────────────────────
  { id: 33, name: "Tetromino L", cat: "Modular",
    fn: (c, r) => <W>
      {S(16,6,24,c[0],r,0)} {S(16,32,24,c[1],r,1)}
      {S(16,56,24,c[2],r,2)} {S(40,56,24,c[3],r,3)}
    </W> },

  { id: 34, name: "Interlocked", cat: "Modular",
    fn: (c, r) => <W>
      {S(4,4,34,c[0],r)} {S(4,42,34,c[1],r)}
      {S(42,22,34,c[2],r)} {S(42,46,20,c[3],r)}
    </W> },

  { id: 35, name: "Puzzle Fit", cat: "Modular",
    fn: (c) => <W>
      <path d="M4,4 H36 Q38,18 36,20 H4 Z" fill={c[0]}/>
      <path d="M44,4 H76 V36 Q62,38 60,36 V4 Z" fill={c[1]}/>
      <path d="M4,28 Q18,26 20,28 V76 H4 Z" fill={c[2]}/>
      <path d="M44,44 H76 V76 H44 Q42,62 44,60 Z" fill={c[3]}/>
    </W> },

  { id: 36, name: "Hex Cluster", cat: "Modular",
    fn: (c) => <W>
      <polygon points="40,4 54,12 54,28 40,36 26,28 26,12" fill={c[0]}/>
      <polygon points="56,32 70,40 70,56 56,64 42,56 42,40" fill={c[1]}/>
      <polygon points="24,32 38,40 38,56 24,64 10,56 10,40" fill={c[2]}/>
      <polygon points="40,58 54,66 54,76 40,80 26,76 26,66" fill={c[3]}/>
    </W> },

  { id: 37, name: "Segmented Ring", cat: "Modular",
    fn: (c) => <W>
      {[0,1,2,3].map(i => (
        <path key={i}
          d={`M40,40 L${40+36*Math.cos((i*90-80)*Math.PI/180)},${40+36*Math.sin((i*90-80)*Math.PI/180)}
              A36,36 0 0,1 ${40+36*Math.cos((i*90+80)*Math.PI/180)},${40+36*Math.sin((i*90+80)*Math.PI/180)} Z`}
          fill={c[i]}/>
      ))}
      {Ci(40,40,12,"white")}
    </W> },

  { id: 38, name: "Grid Pixel", cat: "Modular",
    fn: (c, r) => <W>
      {[0,1,2,3].map(row => [0,1,2,3].map(col => {
        const pattern = [[0,1,0,1],[1,0,1,0],[0,1,0,1],[1,0,1,0]];
        const idx = (row*4+col)%4;
        return S(4+col*19, 4+row*19, 16, c[idx], r, row*4+col);
      }))}
    </W> },

  // ── MOTION / DYNAMIC ───────────────────────────────────────────────────────
  { id: 39, name: "Spin Mark", cat: "Motion",
    fn: (c, r) => <W>
      <g transform="translate(40,40)">
        {[0,90,180,270].map((deg,i) => (
          <g key={i} transform={`rotate(${deg})`}>
            {S(-34,-34,28,c[i],r)}
          </g>
        ))}
        {Ci(0,0,10,"white")}
      </g>
    </W> },

  { id: 40, name: "Speed Lines", cat: "Motion",
    fn: (c, r) => <W>
      {S(36,22,30,c[0],r)}
      {Rc(4,24,26,6,c[1],3)} {Rc(4,36,18,6,c[2],3)} {Rc(4,48,22,6,c[3],3)}
    </W> },

  { id: 41, name: "Bounce Arc", cat: "Motion",
    fn: (c, r) => <W>
      {S(6,44,28,c[0],r)}
      <path d="M20,44 Q40,10 60,44" stroke={c[1]} strokeWidth="5" fill="none" strokeDasharray="4,3" strokeLinecap="round"/>
      {S(46,44,28,c[2],r)}
      <path d="M40,44 L40,10" stroke={c[3]} strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="3,3"/>
    </W> },

  { id: 42, name: "Expanding", cat: "Motion",
    fn: (c, r) => { const cr = Math.min(r, 8); return <W>
      {S(8,8,64,c[0],cr+4,0)} {S(18,18,44,c[1],cr+2,1)}
      {S(28,28,24,c[2],cr,2)} {S(34,34,12,c[3],Math.min(cr,4),3)}
    </W>; } },

  // ── BADGE MARKS ────────────────────────────────────────────────────────────
  { id: 43, name: "Circle Badge", cat: "Badge",
    fn: (c) => <W>
      {Ci(40,40,36,c[0])}
      <text x="40" y="48" fontFamily="Arial Black,sans-serif" fontSize="28"
        fontWeight="900" textAnchor="middle" fill="white">iS</text>
    </W> },

  { id: 44, name: "Rounded Badge", cat: "Badge",
    fn: (c, r) => <W>
      {Rc(4,16,72,48,c[0],Math.max(r,12))}
      <text x="40" y="48" fontFamily="Arial Black,sans-serif" fontSize="28"
        fontWeight="900" textAnchor="middle" fill="white">iS</text>
    </W> },

  { id: 45, name: "Shield", cat: "Badge",
    fn: (c) => <W>
      <path d="M40,4 L72,18 L72,52 Q72,68 40,76 Q8,68 8,52 L8,18 Z" fill={c[0]}/>
      <text x="40" y="50" fontFamily="Arial Black,sans-serif" fontSize="26"
        fontWeight="900" textAnchor="middle" fill="white">iS</text>
    </W> },

  { id: 46, name: "Stamp Badge", cat: "Badge",
    fn: (c) => <W>
      <circle cx="40" cy="40" r="34" fill="none" stroke={c[0]} strokeWidth="5" strokeDasharray="6,3"/>
      <circle cx="40" cy="40" r="26" fill={c[1]}/>
      <text x="40" y="47" fontFamily="Arial Black,sans-serif" fontSize="22"
        fontWeight="900" textAnchor="middle" fill="white">iS</text>
    </W> },

  // ── WORDMARK ONLY ──────────────────────────────────────────────────────────
  { id: 47, name: "All Caps Heavy", cat: "Wordmark",
    fn: (c) => <W>
      <text x="40" y="50" fontFamily="Arial Black,sans-serif" fontSize="26"
        fontWeight="900" textAnchor="middle" fill={c[0]} letterSpacing="-1">ISWAP</text>
    </W> },

  { id: 48, name: "Split Color Word", cat: "Wordmark",
    fn: (c) => <W>
      <text x="8" y="50" fontFamily="Arial Black,sans-serif" fontSize="26"
        fontWeight="900" fill={c[0]} letterSpacing="-1">i</text>
      <text x="22" y="50" fontFamily="Arial Black,sans-serif" fontSize="26"
        fontWeight="900" fill={c[1]} letterSpacing="-1">S</text>
      <text x="40" y="50" fontFamily="Arial Black,sans-serif" fontSize="26"
        fontWeight="900" fill={c[2]} letterSpacing="-1">w</text>
      <text x="57" y="50" fontFamily="Arial Black,sans-serif" fontSize="26"
        fontWeight="900" fill={c[3]} letterSpacing="-1">ap</text>
    </W> },

  // ── COMBINATION / FUSED ────────────────────────────────────────────────────
  { id: 49, name: "Square + Stem", cat: "Combination",
    fn: (c, r) => <W>
      {S(20,6,20,c[0],r)}
      {Rc(28,30,8,40,c[1],4)}
      {Rc(4,56,72,16,c[2],r)}
    </W> },

  { id: 50, name: "Monogram Block", cat: "Combination",
    fn: (c, r) => <W>
      {S(4,4,36,c[0],r)} {S(4,40,36,c[1],r)}
      {S(40,4,36,c[2],r)} {S(40,40,36,c[3],r)}
      <text x="40" y="48" fontFamily="Arial Black,sans-serif" fontSize="20"
        fontWeight="900" textAnchor="middle" fill="white" opacity="0.9">iS</text>
    </W> },
];

// ─── CUSTOM i COMPONENT ───────────────────────────────────────────────────────
function CustomI({ fs, dot, text, soft }: { fs: number; dot: string; text: string; soft: number }) {
  const stemW = Math.max(3, Math.round(fs * 0.056));
  const stemH = Math.round(fs * 0.54);
  const dotSz = Math.max(7, Math.round(fs * 0.13));
  const dotR  = Math.round((soft / 100) * dotSz * 0.55);
  const gap   = Math.round(fs * 0.045);
  const descent = Math.round(fs * 0.20);

  return (
    <span style={{
      display: "inline-flex", flexDirection: "column", alignItems: "center",
      height: dotSz + gap + stemH + descent,
      justifyContent: "flex-end",
      paddingBottom: descent,
      marginRight: Math.round(fs * 0.015),
      flexShrink: 0,
    }}>
      <span style={{ width: dotSz, height: dotSz, borderRadius: dotR, background: dot, display: "block", flexShrink: 0, marginBottom: gap }} />
      <span style={{ width: stemW, height: stemH, background: text, borderRadius: stemW / 2, display: "block", flexShrink: 0 }} />
    </span>
  );
}

// ─── LOGO LOCKUP (mark + wordmark) ───────────────────────────────────────────
function LogoLockup({
  colors, softness, squareSize = 56, gap = 6, wordSize = 56,
  textColor = "#0E0E10", bg = "transparent",
}: {
  colors: C4; softness: number; squareSize?: number; gap?: number;
  wordSize?: number; textColor?: string; bg?: string;
}) {
  const r = Math.round((softness / 100) * squareSize * 0.5);
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: squareSize * 0.18,
      background: bg, padding: squareSize * 0.3, borderRadius: 16,
    }}>
      {/* Mark */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap, flexShrink: 0 }}>
        {colors.map((c, i) => (
          <div key={i} style={{ width: squareSize, height: squareSize, borderRadius: r, background: c, transition: "all 0.25s" }} />
        ))}
      </div>
      {/* Wordmark */}
      <span style={{ display: "inline-flex", alignItems: "flex-end", lineHeight: 1 }}>
        <CustomI fs={wordSize} dot={colors[0]} text={textColor} soft={softness} />
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: wordSize, fontWeight: 800,
          color: textColor, lineHeight: 1, letterSpacing: "-2px",
        }}>Swap</span>
      </span>
    </div>
  );
}

// ─── MARK SVG STRING (transparent bg, square=220, gap=20 → 480×480 canvas) ───
function markSVGString(colors: C4, softness: number) {
  const sq = 220;
  const gap = 20;
  const pad = 10;
  const total = pad * 2 + sq * 2 + gap;
  const r = Math.round((softness / 100) * sq * 0.5);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${total}" height="${total}">
  <rect x="${pad}" y="${pad}" width="${sq}" height="${sq}" rx="${r}" fill="${colors[0]}"/>
  <rect x="${pad+sq+gap}" y="${pad}" width="${sq}" height="${sq}" rx="${r}" fill="${colors[1]}"/>
  <rect x="${pad}" y="${pad+sq+gap}" width="${sq}" height="${sq}" rx="${r}" fill="${colors[2]}"/>
  <rect x="${pad+sq+gap}" y="${pad+sq+gap}" width="${sq}" height="${sq}" rx="${r}" fill="${colors[3]}"/>
</svg>`;
}

// ─── EXPORT SVG (mark only, transparent) ─────────────────────────────────────
function exportMarkSVG(colors: C4, softness: number) {
  const svg = markSVGString(colors, softness);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "iswap-mark.svg"; a.click();
  URL.revokeObjectURL(url);
}

// ─── EXPORT PNG (mark only, transparent, 1024×1024) ──────────────────────────
function exportMarkPNG(colors: C4, softness: number) {
  const svgStr = markSVGString(colors, softness);
  const size = 1024;
  const img = new Image();
  const blob = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    URL.revokeObjectURL(url);
    canvas.toBlob(pngBlob => {
      if (!pngBlob) return;
      const pngUrl = URL.createObjectURL(pngBlob);
      const a = document.createElement("a");
      a.href = pngUrl; a.download = "iswap-mark.png"; a.click();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
  };
  img.src = url;
}

// ─── LEGACY full lockup SVG export ───────────────────────────────────────────
function exportSVG(colors: C4, softness: number) {
  const r = Math.round((softness / 100) * 60 * 0.5);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" width="360" height="120">
  <defs><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@800');</style></defs>
  <rect x="12" y="12" width="44" height="44" rx="${r}" fill="${colors[0]}"/>
  <rect x="60" y="12" width="44" height="44" rx="${r}" fill="${colors[1]}"/>
  <rect x="12" y="60" width="44" height="44" rx="${r}" fill="${colors[2]}"/>
  <rect x="60" y="60" width="44" height="44" rx="${r}" fill="${colors[3]}"/>
  <rect x="128" y="16" width="14" height="14" rx="4" fill="${colors[0]}"/>
  <rect x="132" y="36" width="6" height="64" rx="3" fill="#0E0E10"/>
  <text x="148" y="98" font-family="Inter,sans-serif" font-size="72" font-weight="800" letter-spacing="-3" fill="#0E0E10">Swap</text>
</svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "iswap-logo.svg"; a.click();
  URL.revokeObjectURL(url);
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ExplorePage() {
  const [colors, setColors]       = useState<C4>(P50[0].c);
  const [softness, setSoftness]   = useState(44);
  const [activePal, setActivePal] = useState(0);
  const [activeStyle, setActiveStyle] = useState<number | null>(null);
  const [modalStyle, setModalStyle]   = useState<number | null>(null);

  const radius = Math.round((softness / 100) * 10);

  const applyPalette = useCallback((idx: number) => {
    setColors(P50[idx].c);
    setActivePal(idx);
  }, []);

  const styleObj = modalStyle != null ? L50.find(s => s.id === modalStyle) : null;

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#F4F2EC", minHeight: "100vh" }}>

      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F4F2EC; }
        input[type=range] { -webkit-appearance:none; width:100%; height:4px; border-radius:2px; background:#D0CEC9; cursor:pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#fff; box-shadow:0 1px 4px rgba(0,0,0,.25); }
        .pal-card:hover { outline: 2.5px solid #555 !important; transform: scale(1.04); }
        .style-card:hover { outline: 2.5px solid #555 !important; transform: scale(1.03); cursor: pointer; }
        .style-card { transition: transform .15s; }
        .pal-card { transition: transform .15s; }
      `}</style>

      {/* ════════════════════════════════════════════════════
          STICKY PREVIEW
      ════════════════════════════════════════════════════ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 80,
        background: "#F4F2EC", borderBottom: "1px solid #0E0E1015",
        padding: "20px 48px", boxShadow: "0 2px 24px rgba(0,0,0,.07)",
      }}>
        {/* header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              iSwap · Logo Explorer · Baghdad, IQ
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <label style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>Softness</label>
            <input type="range" min={0} max={100} value={softness}
              onChange={e => setSoftness(Number(e.target.value))}
              style={{ width: 120 }} />
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#999", width: 28 }}>{softness}%</span>

            {/* export mark SVG */}
            <button
              onClick={() => exportMarkSVG(colors, softness)}
              style={{
                background: "#0E0E10", color: "#F4F2EC", border: "none",
                borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600,
                cursor: "pointer", letterSpacing: "0.02em",
              }}
            >↓ SVG</button>

            {/* export mark PNG 1024×1024 */}
            <button
              onClick={() => exportMarkPNG(colors, softness)}
              style={{
                background: colors[0], color: "#fff", border: "none",
                borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600,
                cursor: "pointer", letterSpacing: "0.02em",
              }}
            >↓ PNG 1024</button>
          </div>
        </div>

        {/* 3 background previews */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "On Paper", bg: "#F4F2EC", tc: "#0E0E10", border: "1px solid #0E0E1018" },
            { label: "On Ink",   bg: "#0E0E10", tc: "#F4F2EC", border: "none" },
            { label: "On Brand", bg: colors[2], tc: "#F4F2EC", border: "none" },
          ].map(({ label, bg, tc, border }) => (
            <div key={label} style={{ flex: 1, borderRadius: 14, background: bg, border, overflow: "hidden" }}>
              <div style={{ padding: "4px 10px", borderBottom: `1px solid ${tc}22` }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: tc + "66", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  {label}
                </span>
              </div>
              <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LogoLockup colors={colors} softness={softness} squareSize={40} gap={4} wordSize={40} textColor={tc} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          50 PALETTES
      ════════════════════════════════════════════════════ */}
      <section style={{ padding: "64px 48px 48px" }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0E0E10", letterSpacing: "-1px" }}>50 Colour Palettes</h2>
          <p style={{ fontSize: 15, color: "#888", marginTop: 4, fontWeight: 400 }}>
            Click any palette to apply it to the logo preview
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
          {P50.map((p, idx) => (
            <button
              key={p.id}
              className="pal-card"
              onClick={() => applyPalette(idx)}
              style={{
                background: "#fff", borderRadius: 14, padding: "14px 12px",
                border: "none", cursor: "pointer", textAlign: "left",
                outline: activePal === idx ? `2.5px solid #0E0E10` : "2px solid transparent",
                outlineOffset: 2,
              }}
            >
              {/* mini 2×2 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 10 }}>
                {p.c.map((c, i) => (
                  <div key={i} style={{ width: "100%", aspectRatio: "1", borderRadius: Math.round((softness/100)*20), background: c }} />
                ))}
              </div>
              {/* name */}
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 4, letterSpacing: "-0.2px" }}>{p.name}</div>
              {/* hex codes */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {p.c.map((c, i) => (
                  <span key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#999", background: "#F4F2EC", padding: "2px 4px", borderRadius: 3 }}>{c}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          EXPORT YOUR LOGO
      ════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 48px 64px" }}>
        <div style={{
          background: "#0E0E10", borderRadius: 24, padding: "40px 48px",
          display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap",
        }}>
          {/* live big mark preview */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: Math.round(softness * 0.06 + 8),
              background: "transparent",
            }}>
              {colors.map((c, i) => {
                const sq = 88;
                const r = Math.round((softness / 100) * sq * 0.5);
                return <div key={i} style={{ width: sq, height: sq, borderRadius: r, background: c, transition: "all 0.2s" }} />;
              })}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {colors.map((c, i) => (
                <div key={i} style={{ width: 18, height: 18, borderRadius: 4, background: c }} />
              ))}
            </div>
          </div>

          {/* info + controls */}
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              Export Logo Mark
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: "#F4F2EC", letterSpacing: "-0.5px", marginBottom: 4 }}>
              {P50[activePal].name}
            </h3>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {colors.map((c, i) => (
                <span key={i} style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#888", background: "#ffffff12", padding: "3px 7px", borderRadius: 4 }}>{c}</span>
              ))}
            </div>

            {/* softness control */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 13, color: "#888", fontWeight: 500, whiteSpace: "nowrap" }}>Border radius</span>
              <input type="range" min={0} max={100} value={softness}
                onChange={e => setSoftness(Number(e.target.value))}
                style={{ flex: 1 }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#F4F2EC", width: 30, textAlign: "right" }}>{softness}%</span>
            </div>

            {/* export buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => exportMarkSVG(colors, softness)}
                style={{
                  flex: 1, padding: "13px 0", border: "2px solid #ffffff30", background: "transparent",
                  color: "#F4F2EC", borderRadius: 10, fontSize: 14, fontWeight: 700,
                  cursor: "pointer", letterSpacing: "0.02em", transition: "background .15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#ffffff15")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                ↓ SVG · Transparent
              </button>
              <button
                onClick={() => exportMarkPNG(colors, softness)}
                style={{
                  flex: 1, padding: "13px 0", border: "none",
                  background: colors[0], color: "#fff",
                  borderRadius: 10, fontSize: 14, fontWeight: 700,
                  cursor: "pointer", letterSpacing: "0.02em",
                }}
              >
                ↓ PNG 1024×1024
              </button>
            </div>
            <p style={{ fontSize: 11, color: "#555", marginTop: 10, lineHeight: 1.5 }}>
              Both files have a <strong style={{ color: "#888" }}>transparent background</strong> — ready to drop into Instagram, Figma, Canva, or anywhere else.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          50 LOGO STYLES
      ════════════════════════════════════════════════════ */}
      <section style={{ padding: "48px 48px 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0E0E10", letterSpacing: "-1px" }}>50 Logo Styles</h2>
          <p style={{ fontSize: 15, color: "#888", marginTop: 4 }}>
            Click any mark to see a full preview with wordmark
          </p>
          {/* category legend */}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {["Geometric","Letterform","Abstract","Negative","Modular","Motion","Badge","Wordmark","Combination"].map(cat => (
              <span key={cat} style={{
                fontFamily: "'Space Mono',monospace", fontSize: 9,
                padding: "3px 8px", borderRadius: 20, background: "#0E0E1012",
                color: "#555", letterSpacing: "0.04em", textTransform: "uppercase",
              }}>{cat}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {L50.map(s => (
            <button
              key={s.id}
              className="style-card"
              onClick={() => setModalStyle(s.id)}
              style={{
                background: "#fff", borderRadius: 14, padding: 16, border: "none",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                outline: activeStyle === s.id ? "2.5px solid #0E0E10" : "2px solid transparent",
                outlineOffset: 2,
              }}
            >
              <div style={{ width: 80, height: 80 }}>
                {s.fn(colors, radius)}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#111", letterSpacing: "-0.2px" }}>{s.name}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, color: "#aaa", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.cat}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          STYLE MODAL
      ════════════════════════════════════════════════════ */}
      {modalStyle != null && styleObj && (
        <div
          onClick={() => setModalStyle(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#F4F2EC", borderRadius: 24, padding: 40,
              maxWidth: 720, width: "90%", boxShadow: "0 32px 80px rgba(0,0,0,.35)",
            }}
          >
            {/* modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                  Style {String(styleObj.id).padStart(2,"0")} · {styleObj.cat}
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0E0E10", letterSpacing: "-0.5px" }}>{styleObj.name}</h3>
              </div>
              <button onClick={() => setModalStyle(null)} style={{ background: "#0E0E1015", border: "none", borderRadius: 8, width: 36, height: 36, fontSize: 20, cursor: "pointer", color: "#555" }}>×</button>
            </div>

            {/* 3 background previews (larger) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Paper", bg: "#F4F2EC", tc: "#0E0E10", border: "1px solid #0E0E1018" },
                { label: "Ink",   bg: "#0E0E10", tc: "#F4F2EC", border: "none" },
                { label: "Brand", bg: colors[2], tc: "#F4F2EC", border: "none" },
              ].map(({ label, bg, tc, border }) => (
                <div key={label} style={{ borderRadius: 14, background: bg, border, overflow: "hidden" }}>
                  <div style={{ padding: "6px 12px", borderBottom: `1px solid ${tc}22` }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: tc + "66", letterSpacing: "0.07em", textTransform: "uppercase" }}>{label}</span>
                  </div>
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    {/* large mark */}
                    <div style={{ width: 120, height: 120 }}>
                      {styleObj.fn(colors, radius * 2)}
                    </div>
                    {/* wordmark */}
                    <span style={{ display: "inline-flex", alignItems: "flex-end", lineHeight: 1 }}>
                      <CustomI fs={32} dot={colors[0]} text={tc} soft={softness} />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 32, fontWeight: 800, color: tc, lineHeight: 1, letterSpacing: "-1.5px" }}>Swap</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* apply button */}
            <button
              onClick={() => { setActiveStyle(styleObj.id); setModalStyle(null); }}
              style={{
                width: "100%", padding: "14px", background: "#0E0E10", color: "#F4F2EC",
                border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
                cursor: "pointer", letterSpacing: "-0.2px",
              }}
            >Select This Style</button>
          </div>
        </div>
      )}
    </div>
  );
}
