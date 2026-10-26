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

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
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

/** Floating neon station label used above each interactive object. */
export function makeLabelSprite(title, subtitle, accent) {
  const { canvas, ctx } = makeCanvas(640, 180);

  ctx.clearRect(0, 0, 640, 180);

  const gradient = ctx.createLinearGradient(0, 0, 640, 0);
  gradient.addColorStop(0, 'rgba(8, 10, 16, 0.94)');
  gradient.addColorStop(1, 'rgba(8, 10, 16, 0.72)');

  ctx.save();
  ctx.shadowColor = accent;
  ctx.shadowBlur = 24;
  roundedRect(ctx, 8, 8, 624, 164, 26);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = accent;
  ctx.stroke();
  ctx.restore();

  // Accent beacon
  ctx.save();
  ctx.shadowColor = accent;
  ctx.shadowBlur = 20;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(49, 62, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#f5f5f7';
  ctx.font = `700 44px ${HEAD_FONT}`;
  ctx.textBaseline = 'middle';
  ctx.fillText(title.toUpperCase(), 76, 63);

  ctx.fillStyle = 'rgba(245, 245, 247, 0.7)';
  ctx.font = `500 24px ${BODY_FONT}`;
  ctx.fillText(subtitle.toUpperCase(), 78, 113);

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
