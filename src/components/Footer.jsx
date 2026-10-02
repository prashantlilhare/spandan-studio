import { ArrowUp } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { scrollToId } from '../lib/motion'
import PulseLine from './ui/PulseLine'
import SocialLinks from './ui/SocialLinks'

export default function Footer() {
  const go = (e, id) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <footer className="relative overflow-hidden bg-ink pb-8 pt-16 md:pt-20">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-5 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <p className="font-display text-3xl italic leading-tight md:text-4xl">
              Art that inspires.
              <br />
              <span className="text-bronze">Spaces that transform.</span>
            </p>
            <PulseLine className="mt-8 h-6 w-48 text-bone/30" />
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-5 text-[0.6rem] text-bronze">Index</p>
            <ul className="space-y-2">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => go(e, id)} className="text-bone/70 transition-colors hover:text-bone">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow mb-5 text-[0.6rem] text-bronze">Studio</p>
            <p className="text-bone/70">Palanpur, Surat</p>
            <p className="text-bone/70">Gujarat, India</p>
            {site.phones.map((p) => (
              <a key={p} href={`tel:+91${p}`} className="mt-2 block tabular-nums text-bone/70 hover:text-bone">
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-14 select-none whitespace-nowrap text-center font-display text-[10.4vw] font-light uppercase leading-[0.8] tracking-[-0.04em] text-bone/[0.92] md:mt-16"
      >
        Spandan <span className="italic text-bronze">Studios</span>
      </p>

      <div className="container-x mt-10 flex flex-col gap-6 border-t border-bone/10 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="eyebrow text-[0.6rem] text-stone">© {new Date().getFullYear()} Spandan Studios — All Rights Reserved.</p>
        <SocialLinks variant="icon" className="text-bone/70" />
        <a
          href="#home"
          onClick={(e) => go(e, 'home')}
          className="eyebrow group flex items-center gap-2 text-[0.6rem] text-stone hover:text-bone"
        >
          Back to top
          <ArrowUp
            className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </a>
      </div>
    </footer>
  )
}
