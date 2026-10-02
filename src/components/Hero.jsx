import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { EASE, scrollToId } from '../lib/motion'
import { images } from '../data/site'
import ArtImage from './ui/ArtImage'
import { MaskLine } from './ui/Reveal'

function HeroLink({ href, children, icon: Icon, primary = false }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(href.slice(1))
      }}
      className={`eyebrow group flex items-center justify-between gap-6 border-b py-3.5 transition-colors duration-500 ${
        primary ? 'border-bone text-bone' : 'border-bone/25 text-bone/70 hover:text-bone'
      }`}
    >
      {children}
      <Icon
        className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-rotate-45"
        strokeWidth={1.25}
        aria-hidden="true"
      />
    </a>
  )
}

export default function Hero() {
  const root = useRef(null)
  const media = useRef(null)
  const content = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const scrollTrigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(media.current, { yPercent: 20, ease: 'none', scrollTrigger })
      gsap.to(content.current, { yPercent: -10, opacity: 0.15, ease: 'none', scrollTrigger })
    })
    return () => mm.revert()
  }, [])

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay },
  })

  return (
    <section
      id="home"
      ref={root}
      aria-label="Spandan Studios"
      className="relative isolate flex min-h-[max(100svh,640px)] flex-col overflow-hidden bg-ink pt-24 md:pt-[6.5rem]"
    >
      <div ref={media} className="absolute inset-0 -z-10">
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <ArtImage
            src={images.hero}
            alt="Large-scale art installation by Spandan Studios"
            priority
            className="h-full w-full"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      </div>

      {/* Scroll cue */}
      <motion.div
        {...fade(1.6)}
        className="absolute right-5 top-[30%] flex flex-col items-center gap-4 md:right-10 md:top-1/3"
        aria-hidden="true"
      >
        <span className="eyebrow text-[0.6rem] text-bone/60 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-bone/15">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-bronze" />
        </span>
      </motion.div>

      <div ref={content} className="container-x flex flex-1 flex-col justify-between gap-8 pb-8 md:pb-12">
        <motion.div {...fade(0.2)} className="eyebrow flex justify-between text-bone/70">
          <span>
            Art <span className="text-bronze">•</span> Design <span className="text-bronze">•</span> Installation
          </span>
          <span className="hidden sm:block">Surat — India</span>
        </motion.div>

        <div>
          <h1 className="font-display text-[clamp(3.6rem,min(17.5vw,27svh),17.5rem)] font-normal uppercase leading-[0.8] tracking-[-0.035em]">
            <MaskLine delay={0.35} duration={1.3}>
              Spandan
            </MaskLine>
            <MaskLine delay={0.5} duration={1.3} className="pl-[11vw] font-light italic md:pl-[19vw]">
              Studios
            </MaskLine>
          </h1>

          <div className="mt-8 grid items-end gap-x-5 gap-y-7 border-t border-bone/15 pt-6 md:mt-10 md:grid-cols-12">
            <motion.p
              {...fade(0.9)}
              className="font-display text-[1.75rem] italic leading-[1.1] md:col-span-5 md:text-[2.4rem]"
            >
              Feel your heartbeat
              <br />
              in our artwork.
            </motion.p>
            <motion.p {...fade(1)} className="max-w-xs text-sm leading-relaxed text-stone md:col-span-3 md:col-start-7">
              Art installations, sculptures and spaces crafted with detail, imagination and purpose.
            </motion.p>
            <motion.div {...fade(1.1)} className="flex flex-col md:col-span-3 md:col-start-10">
              <HeroLink href="#works" icon={ArrowDownRight} primary>
                Explore our work
              </HeroLink>
              <HeroLink href="#contact" icon={ArrowUpRight}>
                Contact studio
              </HeroLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
