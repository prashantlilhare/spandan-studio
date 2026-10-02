import { img } from './site'

// Titles/mediums are editable labels — update them to match each artwork.
// `shape` controls the exhibition rhythm (aspect + vertical placement on desktop).
export const gallery = [
  { src: img('img12.webp'), title: 'Gayatri Mantra Lantern', medium: 'Metal relief', shape: 'portrait-tall' },
  { src: img('img10.webp'), title: 'Shri Yantra', medium: 'MDF relief', shape: 'landscape-low' },
  { src: img('img15.webp'), title: 'Lotus Bud', medium: 'Sculpture', shape: 'portrait' },
  { src: img('img14.webp'), title: 'Wire Bloom', medium: 'Metal installation', shape: 'square-high' },
  { src: img('img13.webp'), title: 'Charkha', medium: 'Large-scale installation', shape: 'landscape' },
  { src: img('img17.webp'), title: 'Interlace', medium: 'Metal sculpture', shape: 'portrait-tall' },
  { src: img('img16.webp'), title: 'Wings', medium: 'Sculpture', shape: 'square-low' },
  { src: img('img18.webp'), title: 'Reaching Out', medium: 'Wire mesh sculpture', shape: 'landscape-low' },
].map((item, i) => ({
  ...item,
  id: `work-${i + 1}`,
  number: String(i + 1).padStart(2, '0'),
  alt: `${item.title} — ${item.medium}, artwork by Spandan Studios`,
}))
