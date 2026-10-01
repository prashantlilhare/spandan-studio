import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { ScrollTrigger } from './lib/gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Statement from './components/Statement'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Founders from './components/Founders'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Fonts and late images can shift layout; re-measure scroll-driven animations once they settle.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    // Honour a hash in the URL once the pinned sections have been measured.
    const id = window.location.hash.slice(1)
    const t = id && setTimeout(() => document.getElementById(id)?.scrollIntoView(), 300)

    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="eyebrow fixed left-4 top-4 z-[80] -translate-y-24 bg-bone px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Statement />
        <Services />
        <Gallery />
        <Founders />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
