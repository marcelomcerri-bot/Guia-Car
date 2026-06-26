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
        opacity: 0.13,
        color: "hsl(140 35% 35%)",
      }}
    >
      {/* ── River ── */}
      <path
        d="M-20 540 Q120 510 220 540 Q340 575 460 545 Q580 515 700 548 Q820 580 950 550 Q1080 520 1200 552 Q1320 582 1460 555"
        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      />
      <path
        d="M-20 555 Q120 528 220 556 Q340 590 460 560 Q580 530 700 562 Q820 594 950 562 Q1080 532 1200 566 Q1320 596 1460 570"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Rolling hills ── */}
      <path
        d="M-20 720 Q180 650 360 700 Q540 750 720 680 Q900 610 1080 670 Q1260 730 1460 680 L1460 900 L-20 900 Z"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      />
      <path
        d="M-20 780 Q200 730 400 760 Q600 790 800 740 Q1000 690 1200 740 Q1340 770 1460 745 L1460 900 L-20 900 Z"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* ── Pine trees left cluster ── */}
      <g transform="translate(60, 580)">
        <line x1="0" y1="130" x2="0" y2="0" stroke="currentColor" strokeWidth="2"/>
        <polygon points="0,-10 -28,40 28,40" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <polygon points="0,-50 -22,10 22,10" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <polygon points="0,-85 -16,-20 16,-20" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      </g>
      <g transform="translate(110, 600)">
        <line x1="0" y1="100" x2="0" y2="0" stroke="currentColor" strokeWidth="1.8"/>
        <polygon points="0,-8 -22,32 22,32" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        <polygon points="0,-40 -17,8 17,8" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        <polygon points="0,-68 -13,-16 13,-16" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      </g>
      <g transform="translate(22, 610)">
        <line x1="0" y1="90" x2="0" y2="0" stroke="currentColor" strokeWidth="1.5"/>
        <polygon points="0,-6 -18,28 18,28" fill="none" stroke="currentColor" strokeWidth="1.4"/>
        <polygon points="0,-34 -14,6 14,6" fill="none" stroke="currentColor" strokeWidth="1.4"/>
        <polygon points="0,-58 -10,-14 10,-14" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      </g>

      {/* ── Leafy tree center ── */}
      <g transform="translate(480, 500)">
        <line x1="0" y1="160" x2="0" y2="60" stroke="currentColor" strokeWidth="3"/>
        <circle cx="0" cy="0" r="65" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="-35" cy="20" r="42" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="38" cy="15" r="48" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <line x1="0" y1="60" x2="-30" y2="30" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="0" y1="80" x2="30" y2="50" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="0" y1="100" x2="-20" y2="75" stroke="currentColor" strokeWidth="1.2"/>
      </g>

      {/* ── Pine trees right cluster ── */}
      <g transform="translate(1260, 570)">
        <line x1="0" y1="140" x2="0" y2="0" stroke="currentColor" strokeWidth="2.2"/>
        <polygon points="0,-10 -32,44 32,44" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <polygon points="0,-55 -25,12 25,12" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <polygon points="0,-92 -18,-18 18,-18" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      </g>
      <g transform="translate(1320, 595)">
        <line x1="0" y1="105" x2="0" y2="0" stroke="currentColor" strokeWidth="1.8"/>
        <polygon points="0,-8 -24,34 24,34" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        <polygon points="0,-42 -18,9 18,9" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        <polygon points="0,-70 -13,-16 13,-16" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      </g>
      <g transform="translate(1380, 585)">
        <line x1="0" y1="120" x2="0" y2="0" stroke="currentColor" strokeWidth="2"/>
        <polygon points="0,-10 -28,40 28,40" fill="none" stroke="currentColor" strokeWidth="1.7"/>
        <polygon points="0,-48 -22,10 22,10" fill="none" stroke="currentColor" strokeWidth="1.7"/>
        <polygon points="0,-80 -16,-18 16,-18" fill="none" stroke="currentColor" strokeWidth="1.7"/>
      </g>

      {/* ── Second leafy tree right ── */}
      <g transform="translate(950, 480)">
        <line x1="0" y1="140" x2="0" y2="55" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="0" cy="-5" r="55" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="-28" cy="18" r="36" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="30" cy="12" r="40" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="0" y1="55" x2="-25" y2="28" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="0" y1="72" x2="22" y2="45" stroke="currentColor" strokeWidth="1.2"/>
      </g>

      {/* ── Small shrubs / ground plants ── */}
      <g transform="translate(700, 680)">
        <path d="M0,30 Q-10,10 0,0 Q10,10 0,30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M-12,30 Q-22,8 -14,-4 Q-6,8 -12,30" fill="none" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M12,30 Q22,8 14,-4 Q6,8 12,30" fill="none" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="-20" y1="30" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5"/>
      </g>
      <g transform="translate(280, 700)">
        <path d="M0,28 Q-9,9 0,0 Q9,9 0,28" fill="none" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M-10,28 Q-19,7 -12,-3 Q-5,7 -10,28" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10,28 Q19,7 12,-3 Q5,7 10,28" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="-18" y1="28" x2="18" y2="28" stroke="currentColor" strokeWidth="1.4"/>
      </g>
      <g transform="translate(1100, 720)">
        <path d="M0,28 Q-9,9 0,0 Q9,9 0,28" fill="none" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M-10,28 Q-19,7 -12,-3 Q-5,7 -10,28" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10,28 Q19,7 12,-3 Q5,7 10,28" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="-18" y1="28" x2="18" y2="28" stroke="currentColor" strokeWidth="1.4"/>
      </g>

      {/* ── Floating leaves ── */}
      {/* Leaf 1 */}
      <path d="M200 180 Q220 150 250 165 Q230 195 200 180 Z" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="200" y1="180" x2="250" y2="165" stroke="currentColor" strokeWidth="0.8"/>
      {/* Leaf 2 */}
      <path d="M850 120 Q875 90 905 108 Q882 140 850 120 Z" fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="850" y1="120" x2="905" y2="108" stroke="currentColor" strokeWidth="0.8"/>
      {/* Leaf 3 */}
      <path d="M1180 200 Q1200 172 1228 186 Q1208 218 1180 200 Z" fill="none" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="1180" y1="200" x2="1228" y2="186" stroke="currentColor" strokeWidth="0.8"/>
      {/* Leaf 4 - small */}
      <path d="M380 300 Q396 278 416 290 Q400 316 380 300 Z" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="380" y1="300" x2="416" y2="290" stroke="currentColor" strokeWidth="0.7"/>
      {/* Leaf 5 */}
      <path d="M1050 280 Q1068 256 1090 270 Q1072 298 1050 280 Z" fill="none" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="1050" y1="280" x2="1090" y2="270" stroke="currentColor" strokeWidth="0.7"/>

      {/* ── Sun / circular detail top right ── */}
      <circle cx="1360" cy="90" r="38" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="1360" cy="90" r="30" fill="none" stroke="currentColor" strokeWidth="0.8"/>
      {[0,40,80,120,160,200,240,280,320].map((angle) => (
        <line
          key={angle}
          x1={1360 + 42 * Math.cos(angle * Math.PI / 180)}
          y1={90 + 42 * Math.sin(angle * Math.PI / 180)}
          x2={1360 + 56 * Math.cos(angle * Math.PI / 180)}
          y2={90 + 56 * Math.sin(angle * Math.PI / 180)}
          stroke="currentColor" strokeWidth="1.2"
        />
      ))}

      {/* ── Birds (simple V shapes) ── */}
      <path d="M600 80 Q608 72 616 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M625 70 Q635 60 645 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M650 88 Q658 80 666 88" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>

      {/* ── Root system bottom ── */}
      <path d="M720 900 Q720 860 700 840 Q680 820 660 800" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M720 900 Q720 855 740 838 Q760 818 780 795" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M720 900 Q718 870 690 855 Q668 842 640 850" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M720 900 Q722 868 750 855 Q772 844 800 848" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M720 900 Q720 878 706 868 Q692 860 675 865" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M720 900 Q720 877 735 867 Q748 859 765 864" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>

      {/* ── Field rows (crop lines) ── */}
      <path d="M150 760 Q200 755 250 760" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M155 772 Q205 767 255 772" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M160 784 Q210 779 260 784" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M165 796 Q215 791 265 796" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>

      <path d="M1150 780 Q1200 775 1250 780" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M1155 792 Q1205 787 1255 792" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      <path d="M1160 804 Q1210 799 1260 804" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  );
}
