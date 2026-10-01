import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import ArtImage from './ArtImage'
import { ImageReveal } from './Reveal'

/** Image that reveals on entry and drifts slightly inside its frame while scrolling. */
export default function ParallaxImage({ src, alt, className = '', amount = 8, imgClassName = '' }) {
  const frame = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        inner.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
    return () => mm.revert()
  }, [amount])

  return (
    <div ref={frame} className={className}>
      <ImageReveal className="h-full w-full">
        <div className="relative h-full w-full overflow-hidden">
          <div ref={inner} className="absolute inset-x-0 -top-[12%] h-[124%]">
            <ArtImage src={src} alt={alt} className="h-full w-full" imgClassName={imgClassName} />
          </div>
        </div>
      </ImageReveal>
    </div>
  )
}
