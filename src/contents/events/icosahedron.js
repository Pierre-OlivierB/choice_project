// Geometry and rendering of the die: a real twenty-sided solid, projected and
// lit on a 2D canvas. No library, so nothing heavy for a single object.

const PHI = (1 + Math.sqrt(5)) / 2;

const RAW_VERTICES = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];

const FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

const LIGHT = normalize([-0.22, 0.3, 0.93]);
const FRONT_FACE_INDEX = 0;

function normalize([x, y, z]) {
  const length = Math.hypot(x, y, z);

  return [x / length, y / length, z / length];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function multiply(a, b) {
  return a.map((row) =>
    [0, 1, 2].map((col) => dot(row, [b[0][col], b[1][col], b[2][col]]))
  );
}

function transform(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function rotationX(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return [[1, 0, 0], [0, c, -s], [0, s, c]];
}

function rotationY(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return [[c, 0, s], [0, 1, 0], [-s, 0, c]];
}

function rotationZ(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  return [[c, -s, 0], [s, c, 0], [0, 0, 1]];
}

function faceNormal(vertices, face) {
  const [a, b, c] = face.map((index) => vertices[index]);

  return normalize(cross(subtract(b, a), subtract(c, a)));
}

// Rest pose: one face looks straight at the player, with its tip upward, so the
// result can be read on it once the die stops.
function createRestPose() {
  const vertices = RAW_VERTICES.map(normalize);
  const [nx, ny, nz] = faceNormal(vertices, FACES[FRONT_FACE_INDEX]);
  const aroundY = rotationY(-Math.atan2(nx, nz));
  const aroundX = rotationX(Math.atan2(ny, Math.hypot(nx, nz)));
  const facing = multiply(aroundX, aroundY);
  const tip = transform(facing, vertices[FACES[FRONT_FACE_INDEX][0]]);

  return multiply(rotationZ(Math.atan2(tip[0], tip[1])), facing);
}

const REST_POSE = createRestPose();

function shade(palette, light) {
  const [r, g, b] = palette.base.map(
    (value, channel) =>
      value + (palette.lit[channel] - value) * Math.max(0, light) ** 1.6
  );

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export const DIE_PALETTES = {
  idle: { base: [17, 16, 19], lit: [122, 98, 56], edge: "rgba(232, 200, 130, 0.78)" },
  success: { base: [24, 20, 12], lit: [226, 183, 96], edge: "rgba(255, 230, 170, 0.95)" },
  failure: { base: [24, 10, 13], lit: [150, 38, 48], edge: "rgba(240, 130, 130, 0.85)" },
};

// spin is [x, y, z] in radians: [0, 0, 0] is the rest pose.
export function drawDie(context, size, spin, palette) {
  const center = size / 2;
  const radius = size * 0.45;
  const matrix = multiply(
    multiply(multiply(rotationX(spin[0]), rotationY(spin[1])), rotationZ(spin[2])),
    REST_POSE
  );
  const vertices = RAW_VERTICES.map((vertex) =>
    transform(matrix, normalize(vertex))
  );

  context.clearRect(0, 0, size, size);
  context.lineJoin = "round";
  context.lineWidth = Math.max(1, size / 170);

  FACES.forEach((face) => {
    const normal = faceNormal(vertices, face);

    // Only faces turned toward the player are visible on a convex solid.
    if (normal[2] <= 0) {
      return;
    }

    const light = dot(normal, LIGHT);

    context.beginPath();
    face.forEach((index, position) => {
      const x = center + vertices[index][0] * radius;
      const y = center - vertices[index][1] * radius;

      if (position === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.closePath();
    context.fillStyle = shade(palette, light);
    context.strokeStyle = palette.edge;
    context.fill();
    context.stroke();
  });
}
