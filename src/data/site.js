const img = (file) => `/images/${file}`

export const site = {
  name: 'Spandan Studios',
  tagline: 'Art that inspires. Spaces that transform.',
  address: [
    'Royal Platinum,',
    'Palanpur Canal Road,',
    'Opp Shri Pad Residency,',
    'Palanpur, Surat,',
    'Gujarat, India',
  ],
  phones: ['9769916925', '9769928742'],
  whatsapp: {
    display: '+91 97699 16925',
    href: 'https://wa.me/919769916925?text=' +
      encodeURIComponent('Hello Spandan Studios, I would like to discuss an art project.'),
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Royal Platinum, Palanpur Canal Road, Opp Shri Pad Residency, Palanpur, Surat, Gujarat'),
  mapsEmbed:
    'https://www.google.com/maps?output=embed&q=' +
    encodeURIComponent('Royal Platinum, Palanpur Canal Road, Palanpur, Surat, Gujarat'),
  // TODO: replace with the exact profile URLs from the original website.
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/spandanstudios/' },
    { label: 'Facebook', href: 'https://www.facebook.com/spandanstudios/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/spandan-studios/' },
  ],
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'works', label: 'Works' },
  { id: 'founders', label: 'Founders' },
  { id: 'contact', label: 'Contact' },
]

export const disciplines = [
  'Sculptures',
  'Murals',
  'Paintings',
  'Metal Art',
  'Fiber Art',
  'Wood Art',
  'Stone Art',
  'Mixed Media',
  'Set Designing',
  'Art Installation',
  'Interior & Exterior Art',
]

export const images = {
  hero: img('img10.webp'),
  about: img('img13.webp'),
  aboutDetail: img('shankk.png'),
  manish: img('uncle.webp'),
  swayam: img('swayam.webp'),
  contact: img('img18.webp'),
}

export { img }
