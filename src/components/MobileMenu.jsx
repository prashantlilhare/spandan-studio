import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, site } from '../data/site'
import { EASE } from '../lib/motion'
import SocialLinks from './ui/SocialLinks'

export default function MobileMenu({ open, onClose, onNavigate, active }) {
  const firstLink = useRef(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 350)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-ink-2 lg:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.6, ease: EASE, delay: 0.1 } }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <nav className="container-x flex flex-1 flex-col justify-center pt-20" aria-label="Mobile">
            <ul className="space-y-1">
              {navLinks.map(({ id, label }, i) => (
                <li key={id} className="overflow-hidden border-b border-bone/[0.08]">
                  <motion.a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(id)
                    }}
                    className="flex items-baseline justify-between py-2.5"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%', transition: { duration: 0.35, ease: EASE } }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    <span
                      className={`font-display text-[clamp(2.6rem,12vw,4.5rem)] uppercase leading-none tracking-[-0.01em] ${
                        active === id ? 'italic text-bronze' : ''
                      }`}
                    >
                      {label}
                    </span>
                    <span className="eyebrow text-stone">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-x grid grid-cols-2 gap-6 pb-8 pt-6 text-sm text-stone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div>
              <p className="eyebrow mb-2 text-bone/60">Call</p>
              {site.phones.map((p) => (
                <a key={p} href={`tel:+91${p}`} className="block hover:text-bone">
                  +91 {p}
                </a>
              ))}
            </div>
            <div>
              <p className="eyebrow mb-2 text-bone/60">Studio</p>
              <p>Palanpur, Surat</p>
              <p>Gujarat, India</p>
            </div>
            <SocialLinks variant="icon" className="col-span-2 text-bone/80" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
