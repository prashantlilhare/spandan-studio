import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks } from '../data/site'
import { EASE, scrollToId } from '../lib/motion'
import MobileMenu from './MobileMenu'

export function Wordmark({ className = '' }) {
  return (
    <span className={`flex items-baseline gap-2 leading-none ${className}`}>
      <span className="font-display text-xl tracking-[0.2em] md:text-[1.35rem]">SPANDAN</span>
      <span className="text-[0.6rem] tracking-[0.42em] text-stone">STUDIOS</span>
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  // Solid background after leaving the top; tuck away while scrolling down.
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > window.innerHeight * 0.7)
        lastY = y
      }
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = navLinks.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    scrollToId(id)
  }

  const navigateFromMenu = (id) => {
    setOpen(false)
    // Wait for the scroll lock to lift before scrolling.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)))
  }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? 'border-b border-bone/[0.08] bg-ink' : 'border-b border-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !open ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: scrolled ? 0 : 0.6 }}
      >
        <nav className="container-x flex h-[4.5rem] items-center justify-between md:h-20" aria-label="Primary">
          <a href="#home" onClick={(e) => go(e, 'home')} aria-label="Spandan Studios — home" className="relative z-10">
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  aria-current={active === id ? 'true' : undefined}
                  className={`eyebrow group relative flex items-start gap-1.5 py-2 transition-colors duration-300 ${
                    active === id ? 'text-bone' : 'text-stone hover:text-bone'
                  }`}
                >
                  <span className="text-[0.55rem] tracking-normal text-bronze/80">0{i + 1}</span>
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-[0.28em] h-px bg-bronze"
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="eyebrow relative z-10 flex items-center gap-3 py-2 lg:hidden"
          >
            <span className="w-11 text-right">{open ? 'Close' : 'Menu'}</span>
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-expo ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-px bg-current transition-all duration-500 ease-expo ${
                  open ? 'top-1.5 w-full -rotate-45' : 'top-3 w-2/3'
                }`}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} onNavigate={navigateFromMenu} active={active} />
    </>
  )
}
