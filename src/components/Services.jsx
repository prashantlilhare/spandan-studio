import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { EASE } from '../lib/motion'
import ArtImage from './ui/ArtImage'
import Eyebrow from './ui/Eyebrow'
import { ImageReveal, MaskLine, Reveal } from './ui/Reveal'

function Tags({ tags }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
      {tags.map((t) => (
        <li key={t} className="eyebrow text-[0.6rem] text-stone">
          <span className="mr-2 text-bronze">/</span>
          {t}
        </li>
      ))}
    </ul>
  )
}

/** Desktop: sticky image frame that wipes between services, driven by the list on the right. */
function ServicesInteractive() {
  const [{ active, prev }, setState] = useState({ active: 0, prev: null })
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })
  const y = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })

  const select = (i) => setState((s) => (s.active === i ? s : { active: i, prev: s.active }))

  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * -24)
    y.set(((e.clientY - r.top) / r.height - 0.5) * -24)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="mt-24 hidden grid-cols-12 gap-x-5 lg:grid">
      <div className="sticky top-28 col-span-5 self-start">
        <ImageReveal>
          <div className="relative aspect-[4/5] overflow-hidden" onMouseMove={onMove} onMouseLeave={onLeave}>
            <motion.div className="absolute -inset-6" style={{ x, y }}>
              {services.map((s, i) => {
                const isActive = i === active
                const isPrev = i === prev
                return (
                  <motion.div
                    key={s.id}
                    className="absolute inset-0"
                    style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
                    initial={false}
                    animate={{
                      clipPath: isActive || isPrev ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                      scale: isActive ? 1 : 1.12,
                    }}
                    transition={isActive ? { duration: 1, ease: EASE } : { duration: 0 }}
                  >
                    <ArtImage src={s.image} alt={s.imageAlt} className="h-full w-full" />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </ImageReveal>
        <div className="eyebrow mt-5 flex justify-between text-stone" aria-live="polite">
          <span className="tabular-nums">
            <span className="text-bone">{services[active].number}</span> / 0{services.length}
          </span>
          <span>{services[active].title}</span>
        </div>
      </div>

      <ul className="col-span-6 col-start-7 border-b border-bone/10">
        {services.map((s, i) => {
          const isActive = i === active
          return (
            <li key={s.id} className="border-t border-bone/10">
              <button
                type="button"
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                onClick={() => select(i)}
                aria-expanded={isActive}
                aria-controls={`service-${s.id}`}
                className="group grid w-full grid-cols-[4rem_1fr_auto] items-start gap-4 py-9 text-left"
              >
                <span className={`eyebrow pt-3 tabular-nums ${isActive ? 'text-bronze' : 'text-stone'}`}>
                  {s.number}
                </span>
                <span
                  className={`font-display text-[clamp(2.2rem,3.6vw,3.9rem)] uppercase leading-[0.95] tracking-[-0.015em] transition-colors duration-500 ${
                    isActive ? 'text-bone' : 'text-bone/30 group-hover:text-bone/70'
                  }`}
                >
                  {s.title}
                </span>
                <ArrowUpRight
                  className={`mt-3 h-6 w-6 transition-all duration-700 ease-expo ${
                    isActive ? 'rotate-45 text-bronze' : 'text-bone/30'
                  }`}
                  strokeWidth={1}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    id={`service-${s.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pl-[5rem] pr-10">
                      <p className="max-w-lg leading-relaxed text-stone">{s.description}</p>
                      <Tags tags={s.tags} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Mobile & tablet: each service is its own small editorial spread, alternating sides. */
function ServicesStacked() {
  return (
    <div className="mt-16 space-y-24 md:mt-20 lg:hidden">
      {services.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <article key={s.id} className="grid grid-cols-12 gap-x-5">
            <div className={`relative col-span-10 md:col-span-7 ${flip ? 'col-start-3 md:col-start-6' : ''}`}>
              <ImageReveal className={flip ? 'aspect-[4/5]' : 'aspect-[5/4]'}>
                <ArtImage src={s.image} alt={s.imageAlt} className="h-full w-full" />
              </ImageReveal>
              <span
                className={`absolute -bottom-7 font-display text-7xl italic leading-none text-bronze md:text-8xl ${
                  flip ? '-left-3' : '-right-3'
                }`}
                aria-hidden="true"
              >
                {s.number}
              </span>
            </div>
            <div className={`col-span-12 mt-12 md:col-span-8 ${flip ? '' : 'md:col-start-4'}`}>
              <Reveal>
                <h3 className="font-display text-[clamp(2.1rem,8vw,3.5rem)] uppercase leading-[0.95] tracking-[-0.015em]">
                  {s.title}
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 leading-relaxed text-stone">{s.description}</p>
                <Tags tags={s.tags} />
              </Reveal>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-ink-2 py-28 md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 items-end gap-x-5 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow index="03">Services</Eyebrow>
            <h2
              id="services-title"
              className="mt-8 font-display text-[clamp(5rem,18vw,15rem)] font-light italic leading-[0.8] tracking-[-0.04em]"
            >
              <MaskLine inView>
                We<span className="text-bronze">...</span>
              </MaskLine>
            </h2>
          </div>
          <Reveal className="col-span-11 md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-stone">
              From the first concept sketch to the final installation — three ways we bring art into the spaces
              people live, work and gather in.
            </p>
          </Reveal>
        </div>

        <ServicesInteractive />
        <ServicesStacked />
      </div>
    </section>
  )
}
