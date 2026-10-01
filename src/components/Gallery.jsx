import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
import { gallery } from '../data/gallery'
import { gsap } from '../lib/gsap'
import { scrollToId } from '../lib/motion'
import ArtImage from './ui/ArtImage'
import Eyebrow from './ui/Eyebrow'
import { ImageReveal, MaskLine, Reveal } from './ui/Reveal'
import Lightbox from './Lightbox'

// Exhibition rhythm: mobile width, desktop width (in vh so height = width / aspect) and vertical placement.
const shapes = {
  'portrait-tall': { fig: 'w-[74vw] sm:w-[46vw] lg:w-[52.8vh] lg:self-start', frame: 'aspect-[4/5]' },
  portrait: { fig: 'w-[66vw] sm:w-[40vw] lg:w-[43.5vh] lg:self-center', frame: 'aspect-[3/4]' },
  landscape: { fig: 'w-[84vw] sm:w-[60vw] lg:w-[75vh] lg:self-end', frame: 'aspect-[3/2]' },
  'landscape-low': { fig: 'w-[84vw] sm:w-[58vw] lg:w-[67vh] lg:self-end', frame: 'aspect-[16/11]' },
  'square-high': { fig: 'w-[70vw] sm:w-[42vw] lg:w-[48vh] lg:self-start', frame: 'aspect-square' },
  'square-low': { fig: 'w-[70vw] sm:w-[42vw] lg:w-[44vh] lg:self-end', frame: 'aspect-square' },
}

function Title({ className = '' }) {
  return (
    <h2
      id="works-title"
      className={`font-display text-[clamp(3.4rem,13vw,6.6rem)] lg:text-[clamp(4rem,6vw,7rem)] font-normal uppercase leading-[0.84] tracking-[-0.03em] ${className}`}
    >
      <MaskLine inView>Master</MaskLine>
      <MaskLine inView delay={0.06} className="pl-[0.8em]">
        piece
      </MaskLine>
      <MaskLine inView delay={0.12} className="font-light italic text-bronze">
        in motion
      </MaskLine>
    </h2>
  )
}

export default function Gallery() {
  const section = useRef(null)
  const track = useRef(null)
  const progress = useRef(null)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop: pin the section and walk the exhibition horizontally with vertical scroll.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      section.current.classList.add('is-pinned')
      const distance = () => track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
        },
      })
      return () => section.current?.classList.remove('is-pinned')
    })

    return () => mm.revert()
  }, [])

  // Native scroll (mobile, tablet, reduced motion) drives the same progress bar.
  const onTrackScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollWidth - el.clientWidth
    if (max > 0) progress.current.style.transform = `scaleX(${el.scrollLeft / max})`
  }

  return (
    <section
      id="works"
      ref={section}
      aria-labelledby="works-title"
      className="relative overflow-hidden bg-ink py-28 md:py-36 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0"
    >
      {/* Heading for small screens sits above the track */}
      <div className="container-x mb-12 lg:hidden">
        <Eyebrow index="04">Works</Eyebrow>
        <Title className="mt-8" />
        <Reveal>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">
            A walk through sculptures, murals and installations. Swipe to explore, tap to view.
          </p>
        </Reveal>
      </div>

      <div
        ref={track}
        onScroll={onTrackScroll}
        className="gallery-track flex scroll-px-5 items-start gap-5 px-5 md:scroll-px-10 md:gap-8 md:px-10 lg:scroll-px-16 lg:h-[78vh] lg:items-stretch lg:gap-[4vw] lg:px-16"
      >
        <div className="hidden w-[36vw] shrink-0 flex-col justify-between lg:flex">
          <Eyebrow index="04">Works</Eyebrow>
          <div>
            <Title />
            <p className="mt-8 max-w-sm leading-relaxed text-stone">
              A walk through sculptures, murals and installations. Keep scrolling to move through the exhibition.
            </p>
          </div>
          <p className="eyebrow text-stone">{String(gallery.length).padStart(2, '0')} works on view</p>
        </div>

        {gallery.map((item, i) => (
          <figure key={item.id} className={`group shrink-0 ${shapes[item.shape].fig}`}>
            <button
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View ${item.title} full screen`}
              className={`relative block w-full overflow-hidden ${shapes[item.shape].frame}`}
            >
              <ImageReveal className="h-full w-full" delay={0.04 * (i % 3)}>
                <ArtImage
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]"
                />
              </ImageReveal>
              <span className="eyebrow pointer-events-none absolute right-4 top-4 flex items-center gap-2 bg-ink/70 px-3 py-2 text-[0.6rem] opacity-0 backdrop-blur-sm transition-all duration-500 ease-expo group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                View
              </span>
            </button>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="flex items-baseline gap-3">
                <span className="eyebrow text-[0.6rem] tabular-nums text-bronze">No. {item.number}</span>
                <span className="font-display text-xl italic">{item.title}</span>
              </span>
              <span className="eyebrow text-[0.55rem] text-stone">{item.medium}</span>
            </figcaption>
          </figure>
        ))}

        <div className="flex w-[70vw] shrink-0 flex-col justify-center sm:w-[44vw] lg:w-[30vw] lg:pr-[6vw]">
          <p className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.01em]">
            Have a space <em className="text-bronze">waiting</em> for a story?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('contact')
            }}
            className="eyebrow group mt-8 inline-flex items-center gap-3 self-start border-b border-bone pb-2"
          >
            Commission a piece
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:rotate-45"
              strokeWidth={1.25}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div className="container-x mt-10 lg:absolute lg:inset-x-0 lg:bottom-8 lg:mt-0">
        <div className="h-px w-full bg-bone/10">
          <div ref={progress} className="h-px w-full origin-left scale-x-0 bg-bronze" />
        </div>
      </div>

      {createPortal(
        <Lightbox items={gallery} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />,
        document.body,
      )}
    </section>
  )
}
