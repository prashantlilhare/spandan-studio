import { img } from './site'

// Titles/mediums are editable labels — update them to match each artwork.
// `shape` controls the exhibition rhythm (aspect + vertical placement on desktop).
export const gallery = [
  { src: img('img10.webp'), title: 'Installation', medium: 'Mixed media', shape: 'portrait-tall' },
  { src: img('img12.webp'), title: 'Set Design', medium: 'Concept & set', shape: 'landscape-low' },
  { src: img('img13.webp'), title: 'Sculpture', medium: 'Stone & metal', shape: 'portrait' },
  { src: img('img14.webp'), title: 'Relief Work', medium: 'Fiber', shape: 'square-high' },
  { src: img('img15.webp'), title: 'Mural', medium: 'Paint on wall', shape: 'landscape' },
  { src: img('img16.webp'), title: 'Art Space', medium: 'Interior art', shape: 'portrait-tall' },
  { src: img('img17.webp'), title: 'Metal Art', medium: 'Metal', shape: 'square-low' },
  { src: img('img18.webp'), title: 'Wood Art', medium: 'Wood', shape: 'portrait' },
].map((item, i) => ({
  ...item,
  id: `work-${i + 1}`,
  number: String(i + 1).padStart(2, '0'),
  alt: `${item.title} — ${item.medium}, artwork by Spandan Studios`,
}))
