// Generates stand-in screenshots. Replace src/assets/screens/*.png with real captures (same names).
import { existsSync } from 'node:fs';
import sharp from 'sharp';

const screens = [
  ['browse', 1600, 1000, 'Tour browsing and search'],
  ['detail', 1600, 1000, 'Tour detail and availability'],
  ['checkout', 1600, 1000, 'Three-step checkout'],
  ['milo', 600, 1300, 'Milo AI assistant'],
  ['admin-overview', 1600, 1000, 'Overview: stats, activity, tasks'],
  ['admin-bookings', 1600, 1000, 'Bookings and booking detail'],
  ['admin-availability', 1600, 1000, 'Availability and schedule'],
  ['admin-analytics', 1600, 1000, 'Analytics'],
  ['api-schema', 1600, 1000, 'Database schema'],
  ['api-payment', 1600, 1000, 'Payment sequence'],
  ['delivery-pipeline', 1600, 1000, 'A deploy run'],
  ['delivery-grafana', 1600, 1000, 'Monitoring in Grafana'],
];

for (const [name, w, h, label] of screens) {
  if (existsSync(`src/assets/screens/${name}.png`)) continue; // keep real screenshots
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="#f8f6ee"/>
    <rect x="${w * 0.06}" y="${h * 0.08}" width="${w * 0.88}" height="${h * 0.05}" rx="12" fill="#e6dcc0"/>
    <rect x="${w * 0.06}" y="${h * 0.2}" width="${w * 0.56}" height="${h * 0.6}" rx="16" fill="#e7e3d6"/>
    <rect x="${w * 0.66}" y="${h * 0.2}" width="${w * 0.28}" height="${h * 0.3}" rx="16" fill="#fff" stroke="#d0cab6" stroke-width="3"/>
    <text x="${w / 2}" y="${h * 0.93}" font-family="sans-serif" font-size="${Math.round(w * 0.026)}" text-anchor="middle" fill="#6e6350">Screenshot placeholder · ${label}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`src/assets/screens/${name}.png`);
}

// Portrait stand-in for the About page. Replace src/assets/about-portrait.png with a real photo (4:5, same name).
if (!existsSync('src/assets/about-portrait.png')) {
  const w = 704, h = 880;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="#e7e3d6"/>
    <circle cx="${w / 2}" cy="${h * 0.38}" r="${w * 0.17}" fill="#fff" stroke="#d0cab6" stroke-width="3"/>
    <path d="M${w * 0.16} ${h} C${w * 0.16} ${h * 0.68} ${w * 0.84} ${h * 0.68} ${w * 0.84} ${h} Z" fill="#fff" stroke="#d0cab6" stroke-width="3"/>
    <text x="${w / 2}" y="${h * 0.95}" font-family="sans-serif" font-size="28" text-anchor="middle" fill="#6e6350">Portrait placeholder</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile('src/assets/about-portrait.png');
}


// Contact-section image stand-in. Replace src/assets/contact-image.png (4:5, same name).
if (!existsSync('src/assets/contact-image.png')) {
  const w = 800, h = 1000;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="#e7e3d6"/>
    <rect x="40" y="40" width="${w - 80}" height="${h - 80}" fill="none" stroke="#2b5b58" stroke-opacity="0.35" stroke-width="3" stroke-dasharray="14 10"/>
    <text x="${w / 2}" y="${h / 2}" font-family="sans-serif" font-size="38" text-anchor="middle" fill="#2b5b58">Image placeholder</text>
    <text x="${w / 2}" y="${h / 2 + 50}" font-family="sans-serif" font-size="26" text-anchor="middle" fill="#6e6350">4:5 · replace src/assets/contact-image.png</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile('src/assets/contact-image.png');
}

// Plates for the /citygo case-study page: simple line drawings in the page's palette.
// Replace any of them with your own image: save it as src/assets/folio/<name>.png|jpg|webp.
{
  const { mkdirSync } = await import('node:fs');
  mkdirSync('src/assets/folio', { recursive: true });
  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const INK = '#2f3d34', MOSS = '#2d5a3f', PAPER = '#e6dcc9';
  const frame = (w, h, body, name) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="${PAPER}"/>${body}<text x="${w / 2}" y="${h - 26}" font-family="monospace" font-size="${Math.round(w / 52)}" letter-spacing="3" text-anchor="middle" fill="${INK}" fill-opacity=".55">PLATE PLACEHOLDER · ${name.toUpperCase()}</text></svg>`;
  const plates = {
    rings: [800, 1000, () => {
      const r = rng(7); let s = '';
      for (let rad = 18; rad < 430; rad += 13 + r() * 5) {
        const pts = Array.from({ length: 140 }, (_, i) => { const a = (i / 140) * Math.PI * 2; const k = 1 + 0.035 * Math.sin(a * 3 + rad * 0.04) + 0.012 * Math.sin(a * 9 + rad * 0.2); return `${(400 + Math.cos(a) * rad * k).toFixed(1)},${(500 + Math.sin(a) * rad * 0.94 * k).toFixed(1)}`; });
        s += `<polygon points="${pts.join(' ')}" fill="none" stroke="${INK}" stroke-opacity="${0.35 + r() * 0.35}" stroke-width="${1 + r()}"/>`;
      }
      return s + `<line x1="400" y1="500" x2="760" y2="440" stroke="${INK}" stroke-opacity=".5"/>`;
    }],
    pressed: [800, 1000, () => {
      let s = `<path d="M400 140 C620 300 640 620 400 860 C160 620 180 300 400 140 Z" fill="${MOSS}" fill-opacity=".14" stroke="${INK}" stroke-width="2"/><line x1="400" y1="140" x2="400" y2="900" stroke="${INK}" stroke-width="2"/>`;
      for (let y = 240; y < 820; y += 56) s += `<path d="M400 ${y} Q ${470} ${y - 30} ${560 - (y - 240) * 0.06} ${y - 70}M400 ${y} Q ${330} ${y - 30} ${240 + (y - 240) * 0.06} ${y - 70}" fill="none" stroke="${INK}" stroke-opacity=".6"/>`;
      return s + `<rect x="60" y="60" width="90" height="26" fill="#d9c9a4" fill-opacity=".8" transform="rotate(-30 60 60)"/><rect x="650" y="900" width="90" height="26" fill="#d9c9a4" fill-opacity=".8" transform="rotate(-30 650 900)"/>`;
    }],
    branches: [1200, 900, () => {
      const r = rng(3); let s = '';
      const grow = (x, y, a, len, d) => { if (d > 7 || len < 8) return; const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; s += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${INK}" stroke-opacity=".7" stroke-width="${Math.max(1, 6 - d)}"/>`; grow(x2, y2, a - 0.3 - r() * 0.3, len * 0.74, d + 1); grow(x2, y2, a + 0.3 + r() * 0.3, len * 0.74, d + 1); };
      grow(600, 860, -Math.PI / 2, 190, 0); return s;
    }],
    moss: [1200, 900, () => {
      const r = rng(11); let s = '';
      for (let i = 0; i < 900; i++) { const x = r() * 1200, y = r() * 840, rad = 4 + r() * 14; s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="${MOSS}" fill-opacity="${0.05 + r() * 0.16}" stroke="${INK}" stroke-opacity=".25"/>`; }
      return s;
    }],
    leaf: [1200, 900, () => {
      let s = '';
      [[350, 450, -0.5], [700, 430, 0.15], [950, 470, 0.7]].forEach(([x, y, rot]) => { s += `<g transform="translate(${x} ${y}) rotate(${(rot * 180) / Math.PI})"><path d="M0 -200 C150 -80 150 120 0 220 C-150 120 -150 -80 0 -200 Z" fill="${MOSS}" fill-opacity=".13" stroke="${INK}" stroke-width="2"/><line x1="0" y1="-200" x2="0" y2="250" stroke="${INK}"/>${[-120, -60, 0, 60, 120].map((v) => `<path d="M0 ${v} L 85 ${v - 50}M0 ${v} L -85 ${v - 50}" stroke="${INK}" stroke-opacity=".55" fill="none"/>`).join('')}</g>`; });
      return s;
    }],
    tree: [900, 1200, () => {
      const r = rng(5); let s = `<path d="M430 1010 C440 860 420 760 430 640 L470 640 C480 760 460 860 470 1010 Z" fill="${INK}" fill-opacity=".25" stroke="${INK}" stroke-width="2"/>`;
      for (let i = 0; i < 260; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 300; const x = 450 + Math.cos(a) * d * 1.15, y = 430 + Math.sin(a) * d * 0.8, rad = 12 + r() * 24; s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="${MOSS}" fill-opacity="${0.04 + r() * 0.12}" stroke="${INK}" stroke-opacity=".28"/>`; }
      return s;
    }],
  };
  for (const [name, [w, h, draw]] of Object.entries(plates)) {
    const exists = ['png', 'jpg', 'jpeg', 'webp', 'avif'].some((ext) => existsSync(`src/assets/folio/${name}.${ext}`));
    if (exists) continue;
    await sharp(Buffer.from(frame(w, h, draw(), name))).png().toFile(`src/assets/folio/${name}.png`);
  }
}

// Images for the /case-study page. Replace src/assets/case/hero.png (4:5) with your own.
for (const name of ['hero']) {
  const file = `src/assets/case/${name}.png`;
  if (existsSync(file)) continue;
  const w = 800, h = 1000;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ecd6a8"/><stop offset="1" stop-color="#e9cbb6"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect x="60" y="60" width="${w - 120}" height="${h - 120}" rx="18" fill="#fff" fill-opacity="0.7" stroke="#2b5b58" stroke-opacity="0.3" stroke-width="3" stroke-dasharray="14 10"/>
    <text x="${w / 2}" y="${h / 2}" font-family="sans-serif" font-size="38" text-anchor="middle" fill="#2b5b58">Image placeholder</text>
    <text x="${w / 2}" y="${h / 2 + 50}" font-family="sans-serif" font-size="26" text-anchor="middle" fill="#6e6350">4:5 · replace ${file}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(file);
}
