import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { disciplines } from '../data/site'
import Eyebrow from './ui/Eyebrow'

const phrases = [
  { text: 'Transforming spaces into' },
  { text: 'immersive art experiences,', em: true },
  { text: 'where creativity meets innovation and every art installation tells a' },
  { text: 'unique story.', em: true },
]

function Marquee() {
  const row = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {disciplines.map((d) => (
        <span key={d} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-display text-4xl italic text-bone/80 md:px-12 md:text-6xl">
            {d}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-bronze" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative overflow-hidden border-y border-bone/10 py-7 md:py-9">
      <ul className="sr-only">
        {disciplines.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <div className="animate-marquee flex w-max">
        {row(true)}
        {row(true)}
      </div>
    </div>
  )
}

export default function Statement() {
  const text = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const words = text.current.querySelectorAll('[data-word]')
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: text.current, start: 'top 80%', end: 'bottom 50%', scrub: true },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section aria-label="Studio statement" className="relative overflow-hidden bg-ink">
      <div className="container-x pb-16 pt-4 md:pb-24 md:pt-8">
        <Eyebrow index="02">Statement</Eyebrow>
        <p
          ref={text}
          className="mt-12 max-w-[22ch] font-display text-[clamp(2.3rem,6.6vw,7rem)] leading-[1.02] tracking-[-0.02em] indent-[10vw] md:mt-16"
        >
          {phrases.map(({ text: phrase, em }) =>
            phrase.split(' ').map((word, i) => (
              <span
                key={`${phrase}-${i}`}
                data-word
                className={em ? 'italic text-bronze' : undefined}
              >
                {word}{' '}
              </span>
            )),
          )}
        </p>
        <div className="mt-10 flex justify-end md:mt-12">
          <p className="eyebrow max-w-[16rem] text-right text-stone">
            Every installation begins with a story — and ends in a space that feels alive.
          </p>
        </div>
      </div>
      <Marquee />
    </section>
  )
}
