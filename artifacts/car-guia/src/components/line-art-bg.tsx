export function LineArtBg() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        color: "hsl(142 38% 28%)",
      }}
    >
      {/* ── DISTANT BACKGROUND HILLS ── */}
      <g opacity="0.06" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M -20 430 Q 200 345 400 388 Q 600 430 780 355 Q 960 280 1140 358 Q 1310 436 1460 390" strokeWidth="1.2"/>
        <path d="M -20 488 Q 160 448 340 465 Q 520 482 700 448 Q 880 414 1060 455 Q 1240 496 1460 465" strokeWidth="1.0"/>
      </g>

      {/* ── SUN ── */}
      <g transform="translate(1352, 84)" opacity="0.12" fill="none" stroke="currentColor">
        <circle cx="0" cy="0" r="46" strokeWidth="1.5"/>
        <circle cx="0" cy="0" r="32" strokeWidth="0.9"/>
        <circle cx="0" cy="0" r="17" strokeWidth="0.7"/>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return <line key={i} x1={Math.cos(a)*51} y1={Math.sin(a)*51} x2={Math.cos(a)*68} y2={Math.sin(a)*68} strokeWidth="1.3" strokeLinecap="round"/>;
        })}
      </g>

      {/* ── BIRDS ── */}
      <g opacity="0.11" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M 588 66 Q 601 54 614 66" strokeWidth="1.7"/>
        <path d="M 622 50 Q 636 36 650 50" strokeWidth="1.7"/>
        <path d="M 658 70 Q 667 61 676 70" strokeWidth="1.4"/>
      </g>

      {/* ── FLOATING LEAVES ── */}
      <g opacity="0.11" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M 192 155 Q 210 125 246 142 Q 222 176 192 155 Z" strokeWidth="1.4"/>
        <path d="M 192 155 Q 219 147 246 142" strokeWidth="0.8"/>
        <path d="M 208 150 Q 213 163 218 171" strokeWidth="0.6"/>
        <path d="M 848 90 Q 869 60 906 77 Q 880 113 848 90 Z" strokeWidth="1.4"/>
        <path d="M 848 90 Q 877 82 906 77" strokeWidth="0.8"/>
        <path d="M 867 84 Q 871 98 875 106" strokeWidth="0.6"/>
        <path d="M 1172 178 Q 1193 149 1224 165 Q 1200 198 1172 178 Z" strokeWidth="1.3"/>
        <path d="M 1172 178 Q 1198 170 1224 165" strokeWidth="0.7"/>
        <path d="M 374 265 Q 389 244 410 257 Q 393 281 374 265 Z" strokeWidth="1.1"/>
        <path d="M 374 265 Q 392 259 410 257" strokeWidth="0.6"/>
        <path d="M 1046 245 Q 1064 219 1089 232 Q 1070 260 1046 245 Z" strokeWidth="1.2"/>
        <path d="M 1046 245 Q 1067 237 1089 232" strokeWidth="0.7"/>
        <path d="M 558 305 Q 570 290 585 298 Q 573 316 558 305 Z" strokeWidth="1.0"/>
      </g>

      {/* ── RIVER ── */}
      <g opacity="0.14" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M -20 496 Q 100 470 222 500 Q 358 534 494 502 Q 630 470 768 506 Q 906 542 1032 510 Q 1160 478 1288 514 Q 1380 540 1460 522" strokeWidth="2.5"/>
        <path d="M -20 513 Q 100 488 222 517 Q 358 550 494 518 Q 630 486 768 521 Q 906 556 1032 524 Q 1160 492 1288 529 Q 1380 553 1460 537" strokeWidth="1.3"/>
      </g>

      {/* ── DECIDUOUS TREE — center ── */}
      <g transform="translate(462, 670)" opacity="0.14" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M 0,0 L 0,-82 Q -12,-110 -24,-136 M 0,-82 Q 10,-106 20,-130 M 0,-96 Q -6,-108 -11,-119 M 0,-96 Q 7,-106 13,-115" strokeWidth="2.4"/>
        <circle cx="0"   cy="-170" r="63"  strokeWidth="1.8"/>
        <circle cx="-40" cy="-146" r="44"  strokeWidth="1.5"/>
        <circle cx="43"  cy="-151" r="50"  strokeWidth="1.5"/>
        <circle cx="-16" cy="-208" r="32"  strokeWidth="1.3"/>
        <circle cx="22"  cy="-203" r="28"  strokeWidth="1.3"/>
        <circle cx="-56" cy="-163" r="18"  strokeWidth="1.0"/>
        <circle cx="63"  cy="-168" r="16"  strokeWidth="1.0"/>
        <circle cx="-8"  cy="-230" r="14"  strokeWidth="0.9"/>
      </g>

      {/* ── DECIDUOUS TREE — right ── */}
      <g transform="translate(948, 645)" opacity="0.13" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M 0,0 L 0,-74 Q -10,-96 -20,-118 M 0,-74 Q 9,-96 18,-114 M 0,-88 Q -5,-100 -9,-110" strokeWidth="2.1"/>
        <circle cx="0"   cy="-152" r="56"  strokeWidth="1.7"/>
        <circle cx="-33" cy="-130" r="40"  strokeWidth="1.4"/>
        <circle cx="37"  cy="-135" r="44"  strokeWidth="1.4"/>
        <circle cx="-13" cy="-188" r="30"  strokeWidth="1.2"/>
        <circle cx="18"  cy="-184" r="26"  strokeWidth="1.2"/>
        <circle cx="-47" cy="-150" r="16"  strokeWidth="0.9"/>
        <circle cx="54"  cy="-154" r="14"  strokeWidth="0.9"/>
      </g>

      {/* ── PINE CLUSTER — LEFT ──
           Each pine is drawn as a single closed silhouette (no trunk visible through canopy)
           with subtle inner "layer" arcs for texture. Short trunk stub below.
      ── */}

      {/* Pine A tall: base at (74, 720), height ~145 */}
      <g transform="translate(74, 720)" opacity="0.17" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="0" y1="2" x2="0" y2="-14" strokeWidth="3" strokeLinejoin="round"/>
        {/* Silhouette: tip → right edge → base-right → base-left → left edge → tip */}
        <path d="M 0,-145  Q 14,-108 32,-78  Q 46,-52 58,-26  Q 64,-10 66,0  L -66,0  Q -64,-10 -58,-26  Q -46,-52 -32,-78  Q -14,-108 0,-145 Z" strokeWidth="1.7"/>
        {/* Inner texture arcs */}
        <path d="M -55,-28 Q 0,-38 55,-28" strokeWidth="0.9" opacity="0.7"/>
        <path d="M -40,-55 Q 0,-63 40,-55" strokeWidth="0.8" opacity="0.6"/>
        <path d="M -24,-80 Q 0,-87 24,-80" strokeWidth="0.7" opacity="0.55"/>
        <path d="M -11,-105 Q 0,-110 11,-105" strokeWidth="0.6" opacity="0.5"/>
      </g>

      {/* Pine B medium: base at (132, 724) */}
      <g transform="translate(132, 724)" opacity="0.16" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="0" y1="2" x2="0" y2="-12" strokeWidth="2.6" strokeLinejoin="round"/>
        <path d="M 0,-115  Q 11,-85 25,-60  Q 37,-38 47,-18  Q 52,-6 54,0  L -54,0  Q -52,-6 -47,-18  Q -37,-38 -25,-60  Q -11,-85 0,-115 Z" strokeWidth="1.5"/>
        <path d="M -44,-20 Q 0,-29 44,-20" strokeWidth="0.85" opacity="0.7"/>
        <path d="M -30,-46 Q 0,-53 30,-46" strokeWidth="0.75" opacity="0.6"/>
        <path d="M -15,-70 Q 0,-77 15,-70" strokeWidth="0.65" opacity="0.55"/>
      </g>

      {/* Pine C short: base at (22, 728) */}
      <g transform="translate(22, 728)" opacity="0.15" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="0" y1="2" x2="0" y2="-10" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M 0,-90  Q 9,-66 20,-46  Q 30,-28 38,-12  Q 41,-4 42,0  L -42,0  Q -41,-4 -38,-12  Q -30,-28 -20,-46  Q -9,-66 0,-90 Z" strokeWidth="1.4"/>
        <path d="M -34,-14 Q 0,-22 34,-14" strokeWidth="0.8" opacity="0.65"/>
        <path d="M -22,-38 Q 0,-44 22,-38" strokeWidth="0.7" opacity="0.6"/>
      </g>

      {/* ── PINE CLUSTER — RIGHT ── */}

      {/* Pine D tall: base at (1300, 714) */}
      <g transform="translate(1300, 714)" opacity="0.17" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="0" y1="2" x2="0" y2="-14" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M 0,-140  Q 13,-104 30,-75  Q 44,-50 56,-24  Q 62,-8 63,0  L -63,0  Q -62,-8 -56,-24  Q -44,-50 -30,-75  Q -13,-104 0,-140 Z" strokeWidth="1.7"/>
        <path d="M -52,-26 Q 0,-36 52,-26" strokeWidth="0.9" opacity="0.7"/>
        <path d="M -38,-52 Q 0,-60 38,-52" strokeWidth="0.8" opacity="0.6"/>
        <path d="M -22,-76 Q 0,-83 22,-76" strokeWidth="0.7" opacity="0.55"/>
        <path d="M -10,-100 Q 0,-106 10,-100" strokeWidth="0.6" opacity="0.5"/>
      </g>

      {/* Pine E medium: base at (1360, 727) */}
      <g transform="translate(1360, 727)" opacity="0.16" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="0" y1="2" x2="0" y2="-11" strokeWidth="2.6" strokeLinejoin="round"/>
        <path d="M 0,-112  Q 10,-82 24,-58  Q 36,-37 46,-17  Q 51,-5 52,0  L -52,0  Q -51,-5 -46,-17  Q -36,-37 -24,-58  Q -10,-82 0,-112 Z" strokeWidth="1.5"/>
        <path d="M -42,-19 Q 0,-28 42,-19" strokeWidth="0.85" opacity="0.7"/>
        <path d="M -28,-44 Q 0,-51 28,-44" strokeWidth="0.75" opacity="0.6"/>
        <path d="M -14,-68 Q 0,-74 14,-68" strokeWidth="0.65" opacity="0.55"/>
      </g>

      {/* Pine F tall-ish: base at (1416, 720) */}
      <g transform="translate(1416, 720)" opacity="0.17" fill="none" stroke="currentColor" strokeLinecap="round">
        <line x1="0" y1="2" x2="0" y2="-14" strokeWidth="2.8" strokeLinejoin="round"/>
        <path d="M 0,-130  Q 12,-96 28,-68  Q 42,-44 52,-20  Q 58,-6 59,0  L -59,0  Q -58,-6 -52,-20  Q -42,-44 -28,-68  Q -12,-96 0,-130 Z" strokeWidth="1.6"/>
        <path d="M -48,-22 Q 0,-32 48,-22" strokeWidth="0.88" opacity="0.7"/>
        <path d="M -34,-47 Q 0,-55 34,-47" strokeWidth="0.78" opacity="0.6"/>
        <path d="M -19,-71 Q 0,-78 19,-71" strokeWidth="0.68" opacity="0.55"/>
        <path d="M -8,-95 Q 0,-101 8,-95" strokeWidth="0.58" opacity="0.5"/>
      </g>

      {/* ── ROLLING HILLS with subtle fills ── */}
      <path
        d="M -20 705 Q 215 638 418 668 Q 620 698 818 648 Q 1015 598 1215 644 Q 1350 672 1460 650 L 1460 900 L -20 900 Z"
        fill="currentColor" fillOpacity="0.032"
        stroke="currentColor" strokeOpacity="0.11" strokeWidth="1.7" strokeLinecap="round"
      />
      <path
        d="M -20 770 Q 188 726 390 750 Q 592 774 795 740 Q 998 706 1198 743 Q 1335 764 1460 745 L 1460 900 L -20 900 Z"
        fill="currentColor" fillOpacity="0.042"
        stroke="currentColor" strokeOpacity="0.11" strokeWidth="1.4" strokeLinecap="round"
      />
      <path
        d="M -20 840 Q 108 820 228 832 Q 368 845 528 826 Q 688 807 848 826 Q 1008 845 1168 828 Q 1308 812 1460 829 L 1460 900 L -20 900 Z"
        fill="currentColor" fillOpacity="0.028"
        stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.1" strokeLinecap="round"
      />

      {/* ── SHRUBS ── */}
      <g opacity="0.12" fill="none" stroke="currentColor" strokeLinecap="round">
        <g transform="translate(700, 682)">
          <path d="M 0,26 Q -9,9 0,0 Q 9,9 0,26 Z" strokeWidth="1.4"/>
          <path d="M -14,27 Q -23,8 -14,-5 Q -6,8 -14,27 Z" strokeWidth="1.2"/>
          <path d="M 14,27 Q 23,8 14,-5 Q 6,8 14,27 Z" strokeWidth="1.2"/>
          <line x1="-22" y1="27" x2="22" y2="27" strokeWidth="1.3"/>
        </g>
        <g transform="translate(274, 703)">
          <path d="M 0,22 Q -7,7 0,0 Q 7,7 0,22 Z" strokeWidth="1.3"/>
          <path d="M -11,22 Q -18,6 -11,-4 Q -5,7 -11,22 Z" strokeWidth="1.1"/>
          <path d="M 11,22 Q 18,6 11,-4 Q 5,7 11,22 Z" strokeWidth="1.1"/>
          <line x1="-18" y1="22" x2="18" y2="22" strokeWidth="1.2"/>
        </g>
        <g transform="translate(1145, 720)">
          <path d="M 0,22 Q -7,7 0,0 Q 7,7 0,22 Z" strokeWidth="1.3"/>
          <path d="M -11,22 Q -18,6 -11,-4 Q -5,7 -11,22 Z" strokeWidth="1.1"/>
          <path d="M 11,22 Q 18,6 11,-4 Q 5,7 11,22 Z" strokeWidth="1.1"/>
          <line x1="-18" y1="22" x2="18" y2="22" strokeWidth="1.2"/>
        </g>
      </g>

      {/* ── FIELD ROWS ── */}
      <g opacity="0.09" fill="none" stroke="currentColor" strokeLinecap="round">
        {[0, 13, 26, 38, 50].map((offset, i) => (
          <path key={`fl${i}`}
            d={`M ${144 + offset * 0.2} ${762 + offset} Q ${196 + offset * 0.2} ${757 + offset} ${248 + offset * 0.2} ${762 + offset}`}
            strokeWidth={1.1 - i * 0.07}
          />
        ))}
        {[0, 13, 26, 38, 50].map((offset, i) => (
          <path key={`fr${i}`}
            d={`M ${1180 + offset * 0.2} ${768 + offset} Q ${1230 + offset * 0.2} ${763 + offset} ${1280 + offset * 0.2} ${768 + offset}`}
            strokeWidth={1.1 - i * 0.07}
          />
        ))}
      </g>
    </svg>
  );
}
