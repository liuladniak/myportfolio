// The case-study page looks its images up by name, so any of png, jpg, webp or avif works:
// save your file as src/assets/folio/<name>.<ext> and it replaces the placeholder.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/folio/*.{png,jpg,jpeg,webp,avif}', { eager: true });

export function folioImage(name: string): ImageMetadata {
  const hit = Object.entries(files).find(([path]) => new RegExp(`/${name}\\.(png|jpe?g|webp|avif)$`).test(path));
  if (!hit) throw new Error(`Missing image: src/assets/folio/${name}.png (or .jpg, .webp)`);
  return hit[1].default;
}
