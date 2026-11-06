// Engraved illustrations of the cards, drawn on a 100 x 100 grid.
// lines are the main strokes, fine the thin details, dots the small solid points.
// Plain paths let every stroke be redrawn with the same pathLength animation.

function circle(x, y, r) {
  return `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
}

function rect(x, y, width, height) {
  return `M${x} ${y}h${width}v${height}h${-width}Z`;
}

const DOOR_FRAME = "M28 90V12H72V90";
const FLOOR = "M12 90H88";
const DOOR_PANELS = `${rect(37, 21, 26, 24)}${rect(37, 55, 26, 25)}`;

const HAND = "M34 90C31 77 24 66 15 56C11 50 19 44 25 50L36 60L34 27C34 20 44 20 44 27L46 49L48 19C48 12 58 12 58 19L58 49L64 24C65 17 75 19 74 26L68 53L78 37C82 31 90 36 87 43L72 73C69 81 68 85 68 90";
const POCKET = "M18 36H82V62Q82 82 50 92Q18 82 18 62Z";
const POCKET_SEAM = "M25 43H75V61Q75 76 50 84Q25 76 25 61Z";

// Careful and quick versions of the same gesture follow one visual code:
// careful is still, with fine lines and dotted paths; quick has speed lines and
// objects in motion.
export const SKETCHES = {
  observe: {
    lines: ["M8 52Q50 14 92 52Q50 90 8 52Z", circle(50, 52, 15)],
    fine: ["M50 8V18", "M24 14L30 24", "M76 14L70 24", circle(50, 52, 7)],
    dots: [[54, 48, 2]],
  },
  hand: {
    lines: [HAND],
    fine: ["M10 34Q5 24 12 15", "M20 30Q17 24 21 19", "M92 24Q97 16 91 8"],
  },
  pocket: {
    lines: [POCKET, "M37 36V12H63V36"],
    fine: [POCKET_SEAM, "M41 17H59V30H41Z"],
    dots: [[50, 33, 1.4]],
  },
  rise: {
    lines: [
      "M8 84V58Q8 50 15 50Q22 50 22 58V66H52",
      "M8 84H58V66",
      circle(70, 18, 8),
      "M68 27L60 50L70 66L66 90",
      "M60 50L48 62",
      "M66 33L50 44",
      "M66 33L82 42",
    ],
    fine: ["M88 28V10", "M83 16L88 10L93 16", "M26 72H48"],
  },
  desk: {
    lines: ["M8 42H92", "M16 42V88", "M84 42V88", "M52 42V68H84", "M52 55H84"],
    fine: ["M60 48.5H76", "M60 61.5H76", "M24 42V34H38L44 24", circle(46, 21, 3)],
    dots: [[68, 48.5, 1.6], [68, 61.5, 1.6]],
  },
  drawer: {
    lines: ["M16 16H84V44H16Z", "M16 44L6 70H94L84 44", "M6 70V90H94V70"],
    fine: ["M40 80H60", "M28 30H72", "M24 62H76", "M30 54H70"],
    dots: [[50, 57, 2.4]],
  },
  shutter: {
    lines: [rect(18, 10, 64, 80), "M18 66H82"],
    fine: [
      "M18 21H82", "M18 32H82", "M18 43H82", "M18 54H82",
      "M32 70L28 86", "M50 70V86", "M68 70L72 86",
    ],
    dots: [[24, 16, 1.4], [76, 16, 1.4]],
  },
  crank: {
    lines: [circle(42, 58, 26), circle(42, 58, 8), "M42 58L80 24", circle(84, 20, 6)],
    fine: ["M42 22V16", "M42 94V100", "M6 58H12", "M72 58H78", "M16 22Q26 10 44 8", "M38 4L44 8L38 13"],
  },
  tv: {
    lines: ["M12 28H88V80H12Z", "M20 36H68V72H20Z", "M40 28L30 8", "M60 28L70 8", "M24 80L20 92", "M76 80L80 92"],
    fine: ["M26 44H38", "M44 44H62", "M26 54H32", "M38 54H60", "M26 64H44", "M50 64H62"],
    dots: [[78, 44, 3], [78, 58, 3]],
  },
  cabinet: {
    lines: ["M10 44H90V84H10Z", "M50 44V84", "M18 84V92", "M82 84V92", "M32 44V16H68V44"],
    fine: ["M38 22H62V38H38Z", "M18 52H42V76H18Z", "M58 52H82V76H58Z"],
    dots: [[45, 64, 1.8], [55, 64, 1.8]],
  },
  door: {
    lines: [DOOR_FRAME, FLOOR],
    fine: [DOOR_PANELS],
    dots: [[66, 50, 2.6]],
  },
  "door-open": {
    lines: [DOOR_FRAME, "M28 12L50 22V82L28 90", FLOOR],
    fine: ["M58 34L90 22", "M58 50H94", "M58 66L90 78"],
    dots: [[45, 52, 2.2]],
  },
  "door-break": {
    lines: [DOOR_FRAME, FLOOR, "M50 12L42 30L56 42L44 56L58 70L50 90"],
    fine: ["M6 34L20 40", "M4 52H20", "M6 70L20 64", "M80 34L94 40", "M80 52H96", "M80 70L94 64"],
  },
  "door-return": {
    lines: ["M60 90V14H90V90", "M50 90H98", "M6 52H44", "M33 41L44 52L33 63"],
    fine: ["M67 23H83V46H67Z", "M67 58H83V80H67Z"],
    dots: [[83, 52, 2], [12, 72, 1.6], [24, 72, 1.6], [36, 72, 1.6]],
  },
  inspect: {
    lines: [circle(44, 42, 26), "M63 61L88 88"],
    fine: [DOOR_FRAME.replace("V12", "V6").replace("V90", "V96"), circle(44, 37, 4.5), "M44 42V54"],
  },
  key: {
    lines: [circle(26, 50, 16), "M42 50H92", "M78 50V66", "M90 50V62"],
    fine: [circle(26, 50, 7), "M66 50V58", "M50 44H74"],
  },
  footprints: {
    lines: [
      "M27 72C21 58 24 48 32 48C40 48 43 58 38 72Z",
      "M61 44C55 30 58 20 66 20C74 20 77 30 72 44Z",
      circle(32, 83, 6),
      circle(66, 55, 6),
    ],
    fine: ["M60 92H82", "M68 78H88", "M8 30H30", "M14 16H36"],
  },
  run: {
    lines: [
      circle(62, 16, 8),
      "M58 26L46 54",
      "M56 32L72 42L84 34",
      "M56 32L38 36L28 50",
      "M46 54L64 62L60 88",
      "M46 54L36 72L14 74",
    ],
    fine: ["M6 26H26", "M2 42H20", "M6 58H22"],
  },
  dodge: {
    lines: [
      circle(40, 24, 8),
      "M40 33V62",
      "M40 62L30 88",
      "M40 62L50 88",
      "M40 40L26 54",
      "M40 40L54 54",
    ],
    fine: ["M16 96Q88 100 88 52Q88 18 60 8", "M71 4L60 8L66 18"],
  },
  shove: {
    lines: [
      "M86 8V92",
      circle(60, 24, 8),
      "M54 32L36 56",
      "M52 36L76 40L84 38",
      "M52 36L72 54L84 52",
      "M36 56L48 74L44 92",
      "M36 56L20 72L12 90",
    ],
    fine: ["M92 28L98 22", "M92 50H100", "M92 72L98 78", "M8 40H22", "M4 54H16"],
  },
  talk: {
    lines: ["M10 22Q10 10 22 10H62Q74 10 74 22V46Q74 58 62 58H34L18 74V58Q10 56 10 46Z"],
    fine: [
      "M22 26H62", "M22 38H52",
      "M82 34Q92 36 92 46V62Q92 72 82 74V86L68 74H48Q42 74 40 68",
    ],
  },
  threat: {
    lines: ["M50 6L58 24L76 12L72 34L94 36L76 50L92 66L70 66L72 88L56 74L46 94L40 72L18 82L28 62L6 56L26 46L12 28L34 32L34 12L46 24Z"],
    fine: ["M50 34V54"],
    dots: [[50, 62, 2.4]],
  },
  calm: {
    lines: ["M30 62V38C30 32 38 32 38 38V26C38 20 46 20 46 26V21C46 15 54 15 54 21V28C54 22 62 22 62 28V50L69 42C73 37 81 42 77 48L62 72Q56 80 46 80Q30 80 30 62Z"],
    fine: ["M12 92Q24 84 36 92Q48 100 60 92Q72 84 88 92", "M38 38V52", "M46 26V52", "M54 28V52"],
  },
  stealth: {
    lines: ["M8 52Q50 16 92 52", "M8 52Q50 86 92 52", "M18 88L82 14"],
    fine: [circle(50, 52, 12), "M24 72L16 82", "M76 72L84 82", "M50 84V96"],
  },
  fist: {
    lines: [
      "M22 46Q22 34 34 34Q38 24 48 28Q54 22 62 28Q72 26 74 36Q86 38 82 52L78 70Q74 86 54 86H44Q26 86 24 68Z",
      "M24 54Q42 46 58 58",
    ],
    fine: ["M38 34V46", "M52 28V48", "M66 32V50", "M6 18L16 26", "M94 16L84 26", "M2 44H12"],
  },
  car: {
    lines: [
      "M15 70H6V56Q6 50 14 48L30 44L44 26H68L84 46Q94 48 94 56V70H81",
      "M33 70H63",
      circle(24, 70, 9),
      circle(72, 70, 9),
    ],
    fine: ["M36 44L46 32H54V44Z", "M60 32H66L76 44H60Z", "M6 84H94"],
    dots: [[90, 54, 1.8]],
  },
  horn: {
    lines: [circle(40, 54, 28), circle(40, 54, 8), "M12 54H32", "M48 54H68", "M40 62V82"],
    fine: ["M76 32Q86 54 76 76", "M84 24Q98 54 84 84", "M92 16Q110 54 92 92"],
  },
  mind: {
    lines: ["M30 92V74Q14 62 16 42Q20 12 50 10Q80 10 84 42L92 58H82V70Q82 80 72 80H58V92"],
    fine: [
      "M50 42A4 4 0 1 1 55 47A10 10 0 1 1 40 34A16 16 0 1 1 34 58",
    ],
  },
  route: {
    lines: ["M74 8L88 22", "M88 8L74 22", circle(18, 84, 6)],
    fine: ["M24 80C50 72 22 50 50 46C78 42 56 24 78 20"],
    dots: [[66, 72, 2.4], [32, 28, 2.4], [80, 60, 2.4]],
  },
  "hand-careful": {
    lines: [
      "M96 42L64 38C54 37 46 40 38 46L16 68C12 73 18 78 23 74L42 58",
      "M42 66L31 77C27 81 33 86 37 82L54 67",
      "M96 66L72 66C66 66 60 64 54 67",
      "M60 38L74 28",
    ],
    fine: ["M4 88H96", "M6 70Q2 80 9 86", "M14 92Q24 98 34 92"],
    dots: [[19, 80, 1.6], [34, 88, 1.6]],
  },
  "hand-quick": {
    lines: [HAND],
    transform: "rotate(20 50 60) translate(16 8) scale(0.76)",
    fine: ["M18 12Q2 46 12 80", "M28 8Q14 44 24 90", "M6 22Q-4 46 4 68"],
  },
  "pocket-careful": {
    lines: [POCKET, "M36 6V30Q36 38 43 38Q50 38 50 30V6", "M50 30Q50 38 57 38Q64 38 64 30V6"],
    fine: [POCKET_SEAM],
    dots: [[50, 48, 1.4], [50, 56, 1.4], [50, 64, 1.4]],
  },
  "pocket-quick": {
    lines: ["M18 52H72V70Q72 86 45 94Q18 86 18 70Z", "M44 8L68 14L60 46L36 40Z"],
    fine: [
      "M25 58H65V69Q65 80 45 87Q25 80 25 69Z",
      "M46 15L62 19L57 39L41 35Z",
      "M22 46L29 22",
      "M10 44L18 16",
      "M31 48L34 38",
      "M72 34L80 28",
      "M70 46L82 44",
    ],
    dots: [[46, 43, 1.4]],
  },
  "rise-slow": {
    lines: [
      "M8 86V60Q8 52 15 52Q22 52 22 60V68H54",
      "M8 86H62V68",
      circle(54, 22, 8),
      "M52 31Q44 44 46 58L64 66L62 90",
      "M50 38L24 50",
    ],
    fine: ["M26 72H50"],
    dots: [[68, 26, 1.6], [76, 20, 1.6], [84, 16, 1.6], [92, 14, 1.6]],
  },
  "rise-fast": {
    lines: [
      circle(62, 14, 7),
      "M62 22V52",
      "M62 28L48 14",
      "M62 28L76 14",
      "M62 52L54 74",
      "M62 52L70 74",
      "M8 92V76Q8 68 15 68Q22 68 22 76V84H50",
      "M8 92H56V84",
    ],
    fine: ["M80 40V60", "M88 30V62", "M95 44V72", "M30 66Q37 60 44 66", "M60 88V80", "M70 88V80"],
  },
  "drawer-careful": {
    lines: [rect(12, 14, 76, 30), "M12 44L8 58H92L88 44", "M8 58V72H92V58", circle(66, 34, 15), "M77 45L92 62"],
    fine: ["M42 65H58", "M24 28H44"],
    dots: [[66, 34, 2.2]],
  },
  "drawer-quick": {
    lines: [rect(16, 10, 68, 26), "M16 36L4 68H96L84 36", "M4 68V90H96V68"],
    fine: ["M40 79H60", "M30 60Q24 50 32 42", "M52 58V44", "M72 60Q78 50 70 42", "M0 52L8 44", "M100 52L92 44"],
    dots: [[32, 40, 2.4], [52, 41, 2.4], [70, 40, 2.4]],
  },
  "cabinet-careful": {
    lines: ["M10 42H90V84H10Z", "M50 42V84", "M18 84V92", "M82 84V92", "M90 42L98 38V88L90 84", "M56 30H84V42H56Z"],
    fine: ["M18 50H42V76H18Z", "M58 34H82", "M58 38H82", "M56 58H84", "M56 72H84"],
    dots: [[45, 63, 1.8]],
  },
  "cabinet-quick": {
    lines: ["M24 44H76V84H24Z", "M24 44L8 38V92L24 84", "M76 44L92 38V92L76 84", "M32 84V92", "M68 84V92"],
    fine: ["M24 12L38 8L42 22L28 26Z", "M56 20L70 24L66 36L52 32Z", "M78 6L90 12L84 24L72 18Z", "M50 44V84", "M46 8V14", "M14 24L20 28"],
  },
  "door-ajar": {
    lines: [DOOR_FRAME, FLOOR, "M28 12L62 18V84L28 90"],
    fine: ["M68 24V80", "M76 40L90 34", "M76 54H92", "M76 68L90 74"],
    dots: [[56, 52, 2.2]],
  },
  "door-flung": {
    lines: [DOOR_FRAME, FLOOR, "M28 12L8 4V96L28 90"],
    fine: ["M34 26L96 8", "M34 40L100 30", "M34 54L100 54", "M34 68L100 78", "M34 82L96 96", "M2 30Q-4 50 2 70"],
    dots: [[14, 52, 2.2]],
  },
  book: {
    lines: ["M50 28Q34 16 10 20V78Q34 74 50 88Q66 74 90 78V20Q66 16 50 28Z", "M50 28V88"],
    fine: ["M20 34Q32 32 42 38", "M20 46Q32 44 42 50", "M20 58Q32 56 42 62", "M58 38Q68 32 80 34", "M58 50Q68 44 80 46", "M58 62Q68 56 80 58"],
  },
};
