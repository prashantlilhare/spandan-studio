import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/motion'

const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' }

/** Masked line reveal: the line slides up from behind its own baseline. */
// The wrapper is the observed element: the line itself starts fully clipped,
// so an observer on it would never report it as visible.
const maskVariants = { hidden: { y: '110%' }, shown: { y: '0%' } }

export function MaskLine({ children, delay = 0, className = '', inView = false, duration = 1.1 }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className="block overflow-y-clip pb-[0.04em]"
      initial={reduce ? false : 'hidden'}
      {...(inView ? { whileInView: 'shown', viewport: VIEWPORT } : { animate: 'shown' })}
    >
      <motion.span
        className={`block ${className}`}
        variants={maskVariants}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/** Soft fade-and-rise for paragraphs and small blocks. */
export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

/** Wipes an image block into view from the bottom edge. */
// Same idea as MaskLine: observe the unclipped outer box, animate the clipped inner one.
export function ImageReveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={VIEWPORT}
    >
      <motion.div
        className="h-full w-full overflow-hidden"
        variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, shown: { clipPath: 'inset(0% 0% 0% 0%)' } }}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        <motion.div
          className="h-full w-full"
          variants={{ hidden: { scale: 1.2 }, shown: { scale: 1 } }}
          transition={{ duration: 1.6, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
