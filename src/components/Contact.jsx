import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import SocialLinks from './ui/SocialLinks'
import { MaskLine, Reveal } from './ui/Reveal'

function ActionRow({ href, label, detail }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between gap-6 overflow-hidden border-t border-bone/15 py-7 md:py-9"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-bronze transition-transform duration-700 ease-expo group-hover:scale-y-100"
      />
      <span className="relative flex flex-col gap-2 transition-[padding,color] duration-700 ease-expo group-hover:pl-4 group-hover:text-ink md:pl-0">
        <span className="font-display text-[clamp(1.7rem,3.4vw,3rem)] uppercase leading-none tracking-[-0.01em]">
          {label}
        </span>
        <span className="eyebrow text-[0.6rem] text-stone transition-colors duration-700 group-hover:text-ink/70">
          {detail}
        </span>
      </span>
      <ArrowUpRight
        className="relative h-7 w-7 shrink-0 transition-all duration-700 ease-expo group-hover:mr-4 group-hover:rotate-45 group-hover:text-ink md:h-9 md:w-9"
        strokeWidth={1}
        aria-hidden="true"
      />
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-ink pt-28 md:pt-40">
      <div className="container-x">
        <Eyebrow index="06">Contact</Eyebrow>
        <h2
          id="contact-title"
          className="mt-8 font-display text-[clamp(3rem,9.6vw,10rem)] font-normal uppercase leading-[0.84] tracking-[-0.03em]"
        >
          <MaskLine inView>Let&rsquo;s create</MaskLine>
          <MaskLine inView delay={0.08} className="pl-[10vw]">
            something
          </MaskLine>
          <MaskLine inView delay={0.16} className="font-light italic text-bronze">
            extraordinary
          </MaskLine>
        </h2>

        <div className="mt-20 grid grid-cols-12 gap-x-5 gap-y-16 md:mt-28">
          <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 self-start md:col-span-5 lg:col-span-4">
            <Reveal className="col-span-2 sm:col-span-1 md:col-span-2">
              <p className="eyebrow text-[0.6rem] text-bronze">Studio</p>
              <address className="mt-3 not-italic leading-relaxed text-bone/85">
                <span className="mb-1 block font-display text-xl tracking-[0.12em] text-bone">SPANDAN STUDIOS</span>
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="eyebrow text-[0.6rem] text-bronze">Phone</p>
              <ul className="mt-3 space-y-1">
                {site.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:+91${p}`} className="tabular-nums text-bone/85 transition-colors hover:text-bronze">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow text-[0.6rem] text-bronze">WhatsApp</p>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block tabular-nums text-bone/85 transition-colors hover:text-bronze"
              >
                {site.whatsapp.display}
              </a>
            </Reveal>
            <Reveal delay={0.15} className="col-span-2">
              <p className="eyebrow mb-4 text-[0.6rem] text-bronze">Follow</p>
              <SocialLinks className="text-bone/85" />
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <div className="border-b border-bone/15">
              <ActionRow href={site.whatsapp.href} label="Message us on WhatsApp" detail={site.whatsapp.display} />
              <ActionRow href={site.mapsUrl} label="Get directions" detail="Palanpur Canal Road, Surat" />
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-24 md:mt-32">
        <div className="container-x flex flex-wrap items-end justify-between gap-4 pb-6">
          <p className="eyebrow text-stone">Find the studio</p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow flex items-center gap-2 text-bone/80 hover:text-bronze"
          >
            Open in Google Maps
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
        <div className="relative h-[52vh] min-h-[320px] w-full overflow-hidden border-y border-bone/10 bg-ink-3">
          <iframe
            title="Map showing Spandan Studios, Palanpur Canal Road, Surat"
            src={site.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)_sepia(0.15)]"
          />
        </div>
      </div>
    </section>
  )
}
