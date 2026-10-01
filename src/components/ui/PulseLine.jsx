import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/motion'

/** "Spandan" means pulse: a single heartbeat line used as the studio's quiet signature. */
export default function PulseLine({ className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 240 40" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <motion.path
        d="M0 22 H92 L100 22 L106 8 L114 36 L122 2 L130 30 L136 22 H240"
        stroke="currentColor"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      />
    </svg>
  )
}
