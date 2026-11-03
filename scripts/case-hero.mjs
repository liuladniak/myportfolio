// Builds src/assets/case/hero.png (transparent PNG, no backdrop): the dashboard on a laptop and the client app on a phone, with a transparent background, so it sits straight on the page.
// Run `node scripts/case-hero.mjs` after replacing the screenshots in src/assets/screens/ (admin-overview.png, browse-mobile.png).
import sharp from 'sharp';

const W = 1200, H = 1120;
const rounded = (w, h, r) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`);
const screen = async (file, w, h, r, fit = 'cover', pos = 'top') =>
  sharp(file).resize(w, h, { fit, position: pos }).composite([{ input: rounded(w, h, r), blend: 'dest-in' }]).png().toBuffer();

// Laptop (dashboard)
const lx = 50, ly = 110, lw = 1000, lh = 608, bez = 18;
const lapScreen = await screen('src/assets/screens/admin-overview.png', lw - bez * 2, lh - bez * 2 - 8, 10, 'cover', 'left top');
const laptop = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#1c2f78" flood-opacity=".25"/></filter></defs>
  <g filter="url(#sh)">
    <rect x="${lx}" y="${ly}" width="${lw}" height="${lh}" rx="28" fill="#1b1f2e"/>
    <path d="M${lx - 40} ${ly + lh} H${lx + lw + 40} L${lx + lw + 22} ${ly + lh + 30} H${lx - 22} Z" fill="#c9cfe8"/>
    <rect x="${lx + lw / 2 - 90}" y="${ly + lh}" width="180" height="10" rx="5" fill="#9aa6d4"/>
  </g></svg>`);

// Phone (client app), overlapping the laptop's lower right
const px = 880, py = 330, pw = 290, ph = 630, pb = 12;
const phScreen = await screen('src/assets/screens/browse-mobile.png', pw - pb * 2, ph - pb * 2, 38);
const phone = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><filter id="sh2" x="-30%" y="-20%" width="160%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#1c2f78" flood-opacity=".32"/></filter></defs>
  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="50" fill="#1b1f2e" filter="url(#sh2)"/>
  <rect x="${px + pw / 2 - 48}" y="${py + 20}" width="96" height="22" rx="11" fill="#1b1f2e"/>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: laptop, left: 0, top: 0 },
    { input: lapScreen, left: lx + bez, top: ly + bez },
    { input: phone, left: 0, top: 0 },
    { input: phScreen, left: px + pb, top: py + pb },
  ])
  .png()
  .toBuffer()
  .then((buf) => sharp(buf).extract({ left: 8, top: 76, width: 1184, height: 900 }).png({ compressionLevel: 9 }).toFile('src/assets/case/hero.png'));
console.log('wrote src/assets/case/hero.png');
