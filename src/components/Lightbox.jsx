import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { EASE } from '../lib/motion'
import ArtImage from './ui/ArtImage'

const SWIPE_DISTANCE = 70

export default function Lightbox({ items, index, onClose, onChange }) {
  const open = index !== null
  const closeBtn = useRef(null)
  const lastFocus = useRef(null)
  const dir = useRef(1)

  const step = (delta) => {
    dir.current = delta
    onChange((index + delta + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement
    document.documentElement.style.overflow = 'hidden'
    closeBtn.current?.focus({ preventScroll: true })
    return () => {
      document.documentElement.style.overflow = ''
      lastFocus.current?.focus?.({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const focusables = [...document.querySelectorAll('#lightbox button')].filter((b) => b.offsetParent)
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const item = open ? items[index] : null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}, artwork ${index + 1} of ${items.length}`}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/[0.97] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="container-x flex h-20 shrink-0 items-center justify-between">
            <p className="eyebrow tabular-nums text-stone">
              <span className="text-bone">{item.number}</span> / {String(items.length).padStart(2, '0')}
            </p>
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              className="eyebrow group flex items-center gap-3 py-2 text-bone/80 hover:text-bone"
            >
              Close
              <X className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-5 md:px-24">
            <AnimatePresence initial={false} mode="popLayout" custom={dir.current}>
              <motion.div
                key={item.id}
                custom={dir.current}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 80 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -80 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_DISTANCE) step(1)
                  else if (info.offset.x > SWIPE_DISTANCE) step(-1)
                }}
                className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
              >
                <ArtImage src={item.src} alt={item.alt} fit="contain" draggable={false} className="h-full w-full bg-transparent" />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous artwork"
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 p-3 text-bone/60 transition-colors hover:text-bronze md:left-8 md:block"
            >
              <ArrowLeft className="h-6 w-6" strokeWidth={1} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next artwork"
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 p-3 text-bone/60 transition-colors hover:text-bronze md:right-8 md:block"
            >
              <ArrowRight className="h-6 w-6" strokeWidth={1} />
            </button>
          </div>

          <div className="container-x flex shrink-0 items-end justify-between gap-6 py-6 md:py-8">
            <div>
              <p className="font-display text-3xl italic md:text-4xl">{item.title}</p>
              <p className="eyebrow mt-2 text-[0.6rem] text-stone">{item.medium}</p>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <button type="button" onClick={() => step(-1)} aria-label="Previous artwork" className="p-3 text-bone/70">
                <ArrowLeft className="h-5 w-5" strokeWidth={1.25} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next artwork" className="p-3 text-bone/70">
                <ArrowRight className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>
            <p className="eyebrow hidden text-[0.6rem] text-stone md:block">← → to browse · Esc to close</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
