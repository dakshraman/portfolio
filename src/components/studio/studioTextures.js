import * as THREE from 'three';

/**
 * Procedural canvas textures for the 3D studio.
 * Everything is generated at runtime so the experience ships without
 * external images, fonts, models, or HDR maps.
 */

const HEAD_FONT = '"Archivo", "Arial Black", "Helvetica Neue", sans-serif';
const BODY_FONT = '"Space Grotesk", "Helvetica Neue", Arial, sans-serif';
const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

function makeCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  return { canvas, ctx };
}

/* ------------------------------------------------------------------ */
/* Pixel type + nameplate helpers                                      */
/* ------------------------------------------------------------------ */

const GLYPH_WIDTH = 5;
const GLYPH_HEIGHT = 7;
const GLYPH_ADVANCE = 6;

/**
 * Compact 5x7 pixel font. Each glyph is seven comma-separated rows of five
 * bits so labels never depend on webfont timing. Lowercase input is
 * uppercased before rendering; unknown characters fall back to "?".
 */
const GLYPH_SOURCE = {
  A: '01110,10001,10001,11111,10001,10001,10001',
  B: '11110,10001,10001,11110,10001,10001,11110',
  C: '01110,10001,10000,10000,10000,10001,01110',
  D: '11100,10010,10001,10001,10001,10010,11100',
  E: '11111,10000,10000,11110,10000,10000,11111',
  F: '11111,10000,10000,11110,10000,10000,10000',
  G: '01110,10001,10000,10111,10001,10001,01111',
  H: '10001,10001,10001,11111,10001,10001,10001',
  I: '11111,00100,00100,00100,00100,00100,11111',
  J: '00111,00010,00010,00010,10010,10010,01100',
  K: '10001,10010,10100,11000,10100,10010,10001',
  L: '10000,10000,10000,10000,10000,10000,11111',
  M: '10001,11011,10101,10101,10001,10001,10001',
  N: '10001,11001,10101,10011,10001,10001,10001',
  O: '01110,10001,10001,10001,10001,10001,01110',
  P: '11110,10001,10001,11110,10000,10000,10000',
  Q: '01110,10001,10001,10001,10101,10010,01101',
  R: '11110,10001,10001,11110,10100,10010,10001',
  S: '01111,10000,10000,01110,00001,00001,11110',
  T: '11111,00100,00100,00100,00100,00100,00100',
  U: '10001,10001,10001,10001,10001,10001,01110',
  V: '10001,10001,10001,10001,10001,01010,00100',
  W: '10001,10001,10001,10101,10101,11011,10001',
  X: '10001,10001,01010,00100,01010,10001,10001',
  Y: '10001,10001,01010,00100,00100,00100,00100',
  Z: '11111,00001,00010,00100,01000,10000,11111',
  0: '01110,10001,10011,10101,11001,10001,01110',
  1: '00100,01100,00100,00100,00100,00100,01110',
  2: '01110,10001,00001,00010,00100,01000,11111',
  3: '11111,00010,00100,00010,00001,10001,01110',
  4: '00010,00110,01010,10010,11111,00010,00010',
  5: '11111,10000,11110,00001,00001,10001,01110',
  6: '00110,01000,10000,11110,10001,10001,01110',
  7: '11111,00001,00010,00100,01000,01000,01000',
  8: '01110,10001,10001,01110,10001,10001,01110',
  9: '01110,10001,10001,01111,00001,00010,01100',
  ' ': '00000,00000,00000,00000,00000,00000,00000',
  '·': '00000,00000,00000,00110,00110,00000,00000',
  '/': '00001,00010,00010,00100,01000,01000,10000',
  '-': '00000,00000,00000,11111,00000,00000,00000',
  '.': '00000,00000,00000,00000,00000,01100,01100',
  '&': '01100,10010,10100,01000,10101,10010,01101',
  ':': '00000,00110,00110,00000,00110,00110,00000',
  "'": '00100,00100,00000,00000,00000,00000,00000',
  '?': '01110,10001,00001,00010,00100,00000,00100',
};

const GLYPHS = Object.fromEntries(
  Object.entries(GLYPH_SOURCE).map(([character, rows]) => [character, rows.split(',')])
);

function bitmapTextWidth(text, scale) {
  const value = String(text ?? '').toUpperCase();
  return value.length ? (value.length * GLYPH_ADVANCE - 1) * scale : 0;
}

function fitBitmapScale(text, maxWidth, preferredScale) {
  const columns = Math.max(
    1,
    String(text ?? '').toUpperCase().length * GLYPH_ADVANCE - 1
  );
  return Math.max(1, Math.min(preferredScale, Math.floor(maxWidth / columns)));
}

function drawBitmapText(ctx, text, x, y, scale, color) {
  const value = String(text ?? '').toUpperCase();
  const top = Math.round(y);
  let cursor = Math.round(x);

  ctx.fillStyle = color;

  for (const character of value) {
    const glyph = GLYPHS[character] || GLYPHS['?'];

    glyph.forEach((row, rowIndex) => {
      for (let column = 0; column < GLYPH_WIDTH; column += 1) {
        if (row[column] === '1') {
          ctx.fillRect(
            cursor + column * scale,
            top + rowIndex * scale,
            scale,
            scale
          );
        }
      }
    });

    cursor += GLYPH_ADVANCE * scale;
  }
}

function shadeAccent(color, amount) {
  const hex = typeof color === 'string' ? color.replace('#', '') : '';

  if (!/^[0-9a-f]{6}$/i.test(hex)) return color;

  const value = Number.parseInt(hex, 16);
  const target = amount < 0 ? 0 : 255;
  const mix = Math.min(1, Math.abs(amount));
  const channel = (shift) => {
    const source = (value >> shift) & 0xff;
    return Math.round(source + (target - source) * mix);
  };

  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

function steppedRectPath(ctx, x, y, width, height, step) {
  const cut = Math.max(2, Math.min(step, Math.floor(Math.min(width, height) / 4)));
  const half = Math.floor(cut / 2);

  ctx.beginPath();
  ctx.moveTo(x + cut, y);
  ctx.lineTo(x + width - cut, y);
  ctx.lineTo(x + width - cut, y + half);
  ctx.lineTo(x + width - half, y + half);
  ctx.lineTo(x + width - half, y + cut);
  ctx.lineTo(x + width, y + cut);
  ctx.lineTo(x + width, y + height - cut);
  ctx.lineTo(x + width - half, y + height - cut);
  ctx.lineTo(x + width - half, y + height - half);
  ctx.lineTo(x + width - cut, y + height - half);
  ctx.lineTo(x + width - cut, y + height);
  ctx.lineTo(x + cut, y + height);
  ctx.lineTo(x + cut, y + height - half);
  ctx.lineTo(x + half, y + height - half);
  ctx.lineTo(x + half, y + height - cut);
  ctx.lineTo(x, y + height - cut);
  ctx.lineTo(x, y + cut);
  ctx.lineTo(x + half, y + cut);
  ctx.lineTo(x + half, y + half);
  ctx.lineTo(x + cut, y + half);
  ctx.closePath();
}

function gemPath(ctx, x, y, size, inset) {
  const inner = size - inset * 2;
  const chamfer = Math.max(2, Math.round(inner * 0.28));
  const left = x + inset;
  const top = y + inset;
  const right = left + inner;
  const bottom = top + inner;

  ctx.beginPath();
  ctx.moveTo(left + chamfer, top);
  ctx.lineTo(right - chamfer, top);
  ctx.lineTo(right, top + chamfer);
  ctx.lineTo(right, bottom - chamfer);
  ctx.lineTo(right - chamfer, bottom);
  ctx.lineTo(left + chamfer, bottom);
  ctx.lineTo(left, bottom - chamfer);
  ctx.lineTo(left, top + chamfer);
  ctx.closePath();
}

function drawAccentGem(ctx, x, y, size, accent) {
  ctx.fillStyle = '#05060a';
  gemPath(ctx, x, y, size, 0);
  ctx.fill();

  ctx.fillStyle = accent;
  gemPath(ctx, x, y, size, 3);
  ctx.fill();

  ctx.fillStyle = shadeAccent(accent, 0.45);
  ctx.fillRect(x + 12, y + 10, 8, 8);

  ctx.fillStyle = '#f8f3e7';
  ctx.fillRect(x + 14, y + 12, 4, 4);

  ctx.fillStyle = shadeAccent(accent, -0.35);
  ctx.fillRect(x + 22, y + 24, 8, 8);
}

function drawNumberChip(ctx, x, y, width, height, number, accent) {
  ctx.fillStyle = '#05060a';
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = accent;
  ctx.fillRect(x + 2, y + 2, width - 4, height - 4);

  ctx.fillStyle = '#10121a';
  ctx.fillRect(x + 4, y + 4, width - 8, height - 8);

  if (number) {
    const scale = 4;
    const textWidth = bitmapTextWidth(number, scale);
    const textHeight = GLYPH_HEIGHT * scale;

    drawBitmapText(
      ctx,
      number,
      x + Math.round((width - textWidth) / 2),
      y + Math.round((height - textHeight) / 2),
      scale,
      '#f4f1e8'
    );
    return;
  }

  const markerSize = 12;
  ctx.fillStyle = accent;
  ctx.fillRect(
    x + Math.round((width - markerSize) / 2),
    y + Math.round((height - markerSize) / 2),
    markerSize,
    markerSize
  );
}

function getStationNumber(subtitle) {
  const match = String(subtitle ?? '').match(/\d{1,2}/);
  return match ? match[0].padStart(2, '0') : '';
}

function wrapLines(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });

  if (line) lines.push(line);
  return lines;
}

function makeTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Floating station nameplate used above each interactive object. */
export function makeLabelSprite(title, subtitle, accent) {
  const { canvas, ctx } = makeCanvas(640, 180);
  const stationAccent = accent || '#FE7F2D';
  const titleText = String(title ?? '').toUpperCase();
  const subtitleText = String(subtitle ?? '').toUpperCase();
  const stationNumber = getStationNumber(subtitle);

  ctx.clearRect(0, 0, 640, 180);

  const panelX = 16;
  const panelY = 12;
  const panelWidth = 608;
  const panelHeight = 152;
  const cornerStep = 12;
  const inset = 8;

  // Hard offset shadow: one flat fill, no blur or glow.
  steppedRectPath(ctx, panelX + 8, panelY + 8, panelWidth, panelHeight, cornerStep);
  ctx.fillStyle = 'rgba(3, 4, 7, 0.6)';
  ctx.fill();

  // 6px accent border.
  steppedRectPath(ctx, panelX, panelY, panelWidth, panelHeight, cornerStep);
  ctx.fillStyle = stationAccent;
  ctx.fill();

  // 2px near-black keyline between border and body.
  steppedRectPath(
    ctx,
    panelX + 6,
    panelY + 6,
    panelWidth - 12,
    panelHeight - 12,
    cornerStep
  );
  ctx.fillStyle = '#05060a';
  ctx.fill();

  // Flat dark panel body.
  steppedRectPath(
    ctx,
    panelX + inset,
    panelY + inset,
    panelWidth - inset * 2,
    panelHeight - inset * 2,
    cornerStep
  );
  ctx.fillStyle = '#11131a';
  ctx.fill();

  // 2px hard bevel strips, top-left light / bottom-right dark.
  ctx.fillStyle = '#1b1e27';
  ctx.fillRect(panelX + 20, panelY + inset, panelWidth - 40, 2);
  ctx.fillRect(panelX + inset, panelY + 20, 2, panelHeight - 40);

  ctx.fillStyle = '#0a0c11';
  ctx.fillRect(panelX + 20, panelY + panelHeight - 10, panelWidth - 40, 2);
  ctx.fillRect(panelX + panelWidth - 10, panelY + 20, 2, panelHeight - 40);

  // Left rail: accent gem, station-number chip, pixel divider.
  drawAccentGem(ctx, 52, 38, 40, stationAccent);
  drawNumberChip(ctx, 44, 94, 56, 44, stationNumber, stationAccent);

  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = stationAccent;
  ctx.fillRect(114, 38, 2, 100);
  ctx.restore();

  // Bitmap-set text, centered in the remaining body height.
  const textX = panelX + 116;
  const textRight = panelX + panelWidth - 20;
  const maxTextWidth = textRight - textX;
  const titleScale = fitBitmapScale(titleText, maxTextWidth, 8);
  const subtitleScale = fitBitmapScale(subtitleText, maxTextWidth, 3);
  const titleHeight = GLYPH_HEIGHT * titleScale;
  const subtitleHeight = GLYPH_HEIGHT * subtitleScale;
  const textGap = 12;
  const bodyTop = panelY + inset;
  const bodyHeight = panelHeight - inset * 2;
  const titleY =
    bodyTop +
    Math.round((bodyHeight - titleHeight - subtitleHeight - textGap) / 2);
  const subtitleY = titleY + titleHeight + textGap;

  drawBitmapText(ctx, titleText, textX, titleY, titleScale, '#f5f1e6');
  drawBitmapText(ctx, subtitleText, textX, subtitleY, subtitleScale, '#c9c3b5');

  return makeTexture(canvas);
}

/** Monitor screen with a tiny in-world code editor / identity card. */
export function makeScreenTexture() {
  const { canvas, ctx } = makeCanvas(640, 400);

  ctx.fillStyle = '#07080d';
  ctx.fillRect(0, 0, 640, 400);

  // Window chrome
  ctx.fillStyle = '#11131b';
  ctx.fillRect(0, 0, 640, 42);
  ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(22 + index * 18, 21, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.font = `500 15px ${MONO_FONT}`;
  ctx.fillText('raman-daksh / virtual-studio.tsx', 96, 26);

  const lines = [
    ['const', ' studio', ' = ', 'new', ' Studio();'],
    ['studio', '.build({'],
    ['  role', ": 'Freelance Software Engineer',"],
    ['  base', ": 'Dehradun, India',"],
    ['  stack', ": ['Laravel', 'Flutter', 'Three.js'],"],
    ['  status', ": 'available for work',"],
    ['});'],
  ];

  let y = 84;
  lines.forEach((parts, index) => {
    let x = 34;
    parts.forEach((part) => {
      if (!part) return;
      const isKeyword = ['const', 'new'].includes(part.trim());
      const isString = part.includes("'");
      const isProperty = part.trim().startsWith('role') || part.trim().startsWith('base') || part.trim().startsWith('stack') || part.trim().startsWith('status');

      ctx.fillStyle = isKeyword
        ? '#FE7F2D'
        : isString
          ? '#7dd3fc'
          : isProperty
            ? '#c4b5fd'
            : 'rgba(245,245,247,0.78)';
      ctx.font = `${isKeyword ? 600 : 400} 18px ${MONO_FONT}`;
      ctx.fillText(part, x, y);
      x += ctx.measureText(part).width;
    });

    // Tiny line numbers for the editor feel
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.font = `400 13px ${MONO_FONT}`;
    ctx.fillText(String(index + 1).padStart(2, '0'), 10, y);

    y += 38;
  });

  // Cursor
  ctx.fillStyle = '#FE7F2D';
  ctx.globalAlpha = 0.7;
  ctx.fillRect(34, y - 24, 8, 20);
  ctx.globalAlpha = 1;

  return makeTexture(canvas);
}

/** Abstract, project-specific gallery poster. */
export function makePosterTexture({ title, category, accent, index = 0 }) {
  const { canvas, ctx } = makeCanvas(512, 640);

  const bg = ctx.createLinearGradient(0, 0, 512, 640);
  bg.addColorStop(0, '#080910');
  bg.addColorStop(1, '#16121e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 640);

  // Soft accent bloom
  const bloom = ctx.createRadialGradient(390, 120, 0, 390, 120, 300);
  bloom.addColorStop(0, `${accent}75`);
  bloom.addColorStop(1, `${accent}00`);
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, 512, 640);

  // Geometric art
  ctx.save();
  ctx.translate(256, 290);
  ctx.strokeStyle = `${accent}aa`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i += 1) {
    ctx.beginPath();
    ctx.arc(0, 0, 56 + i * 32 + index * 5, Math.PI * (0.1 + index * 0.04), Math.PI * (1.15 + index * 0.06));
    ctx.stroke();
  }
  ctx.rotate((index * Math.PI) / 8);
  ctx.fillStyle = `${accent}22`;
  ctx.fillRect(-120, -120, 240, 240);
  ctx.strokeStyle = `${accent}cc`;
  ctx.strokeRect(-120, -120, 240, 240);
  ctx.rotate(-(index * Math.PI) / 8);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.arc(0, 0, 14 + (index % 3) * 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // Index / eyebrow
  ctx.fillStyle = accent;
  ctx.font = `700 22px ${HEAD_FONT}`;
  ctx.fillText(`CASE ${String(index + 1).padStart(2, '0')}`, 40, 58);

  ctx.fillStyle = 'rgba(245,245,247,0.44)';
  ctx.font = `600 16px ${BODY_FONT}`;
  ctx.fillText(String(category || 'SELECTED WORK').toUpperCase(), 40, 88);

  // Title
  ctx.fillStyle = '#f5f5f7';
  ctx.font = `700 42px ${HEAD_FONT}`;
  const lines = wrapLines(ctx, title, 420).slice(0, 3);
  let y = 478;
  lines.forEach((line) => {
    ctx.fillText(line, 40, y);
    y += 50;
  });

  // Footer rule
  ctx.fillStyle = `${accent}88`;
  ctx.fillRect(40, 604, 432, 2);
  ctx.fillStyle = 'rgba(245,245,247,0.4)';
  ctx.font = `500 15px ${BODY_FONT}`;
  ctx.fillText('DAKSH RAMAN  /  SELECTED WORK', 40, 628);

  return makeTexture(canvas);
}

/** Night-city view for the north wall window. */
export function makeWindowTexture() {
  const { canvas, ctx } = makeCanvas(768, 384);

  const sky = ctx.createLinearGradient(0, 0, 0, 384);
  sky.addColorStop(0, '#050816');
  sky.addColorStop(0.55, '#12133a');
  sky.addColorStop(1, '#3b1a36');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 768, 384);

  // Deterministic stars
  let seed = 42;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 0; i < 90; i += 1) {
    const x = random() * 768;
    const y = random() * 250;
    const radius = random() * 1.6 + 0.4;
    ctx.globalAlpha = 0.25 + random() * 0.7;
    ctx.fillStyle = random() > 0.85 ? '#FE7F2D' : '#dbeafe';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Moon
  const moon = ctx.createRadialGradient(620, 84, 2, 620, 84, 54);
  moon.addColorStop(0, 'rgba(255,255,255,0.95)');
  moon.addColorStop(0.45, 'rgba(196,181,253,0.45)');
  moon.addColorStop(1, 'rgba(196,181,253,0)');
  ctx.fillStyle = moon;
  ctx.fillRect(540, 4, 160, 160);
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(620, 84, 28, 0, Math.PI * 2);
  ctx.fill();

  // Skyline silhouette
  const buildings = [
    [0, 250, 84, 134], [82, 212, 58, 172], [142, 286, 92, 98],
    [236, 198, 72, 186], [310, 260, 56, 124], [368, 236, 82, 148],
    [452, 292, 66, 92], [520, 214, 58, 170], [580, 276, 92, 108],
    [674, 244, 94, 140],
  ];

  buildings.forEach(([x, y, width, height], index) => {
    ctx.fillStyle = index % 2 === 0 ? '#080a12' : '#0b0d18';
    ctx.fillRect(x, y, width, height);

    // Lit windows
    for (let wx = x + 10; wx < x + width - 8; wx += 14) {
      for (let wy = y + 12; wy < 374; wy += 20) {
        if (random() > 0.62) {
          ctx.fillStyle = random() > 0.82 ? 'rgba(254,127,45,0.7)' : 'rgba(125,211,252,0.42)';
          ctx.fillRect(wx, wy, 5, 6);
        }
      }
    }
  });

  // Subtle glass reflection
  const shimmer = ctx.createLinearGradient(0, 0, 768, 384);
  shimmer.addColorStop(0, 'rgba(255,255,255,0.06)');
  shimmer.addColorStop(0.48, 'rgba(255,255,255,0)');
  shimmer.addColorStop(0.52, 'rgba(255,255,255,0.05)');
  shimmer.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, 768, 384);

  return makeTexture(canvas);
}

/** Floor rug with a subtle studio monogram. */
export function makeRugTexture() {
  const { canvas, ctx } = makeCanvas(512, 512);

  ctx.fillStyle = '#151016';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(254,127,45,0.5)';
  ctx.lineWidth = 5;
  ctx.strokeRect(20, 20, 472, 472);

  ctx.strokeStyle = 'rgba(255,255,255,0.045)';
  ctx.lineWidth = 1;
  for (let i = 36; i < 512; i += 28) {
    ctx.beginPath();
    ctx.moveTo(i, 36);
    ctx.lineTo(i, 476);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(36, i);
    ctx.lineTo(476, i);
    ctx.stroke();
  }

  ctx.save();
  ctx.translate(256, 256);
  ctx.strokeStyle = 'rgba(254,127,45,0.75)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 112, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(254,127,45,0.12)';
  ctx.beginPath();
  ctx.arc(0, 0, 108, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(245,245,247,0.85)';
  ctx.font = `700 86px ${HEAD_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RD', 0, 6);
  ctx.restore();

  return makeTexture(canvas);
}

/** Soft radial texture reused by the station glow and ambient motes. */
export function makeGlowTexture() {
  const { canvas, ctx } = makeCanvas(128, 128);

  const glow = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.2, 'rgba(254,127,45,0.9)');
  glow.addColorStop(0.55, 'rgba(254,127,45,0.24)');
  glow.addColorStop(1, 'rgba(254,127,45,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 128, 128);

  return makeTexture(canvas);
}
