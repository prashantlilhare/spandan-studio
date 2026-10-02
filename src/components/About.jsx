import { images } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import ParallaxImage from './ui/ParallaxImage'
import PulseLine from './ui/PulseLine'
import ArtImage from './ui/ArtImage'
import { ImageReveal, MaskLine, Reveal } from './ui/Reveal'

const facts = [
  { term: 'Disciplines', detail: 'Sculpture, murals, paintings, installation' },
  { term: 'Mediums', detail: 'Metal, fiber, wood, stone & mixed media' },
  { term: 'Signature', detail: 'Detailing & intricacy' },
  { term: 'Studio', detail: 'Surat, Gujarat — India' },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-ink py-20 md:py-28">
      <div className="container-x">
        <Eyebrow index="01">Explore our vision</Eyebrow>

        <h2
          id="about-title"
          className="mt-8 font-display text-[clamp(4.5rem,17vw,16rem)] font-normal uppercase leading-[0.8] tracking-[-0.035em]"
        >
          <MaskLine inView>About</MaskLine>
          <MaskLine inView delay={0.1} className="pl-[24vw] font-light italic text-bronze md:pl-[34vw]">
            Us
          </MaskLine>
        </h2>

        <div className="mt-12 grid grid-cols-12 gap-x-5 gap-y-12 md:mt-16">
          <figure className="col-span-11 md:col-span-6 lg:col-span-5">
            <ParallaxImage
              src={images.about}
              alt="Detailed handcrafted artwork from the Spandan Studios workshop"
              className="aspect-[4/5] w-full"
            />
            <figcaption className="eyebrow mt-4 flex justify-between text-[0.6rem] text-stone">
              <span>Studio work</span>
              <span>Detail &amp; intricacy</span>
            </figcaption>
          </figure>

          <div className="col-span-12 md:col-span-6 md:pt-12 lg:col-span-5 lg:col-start-7 lg:pt-24">
            <Reveal>
              <p className="font-display text-[1.9rem] leading-[1.12] md:text-[2.5rem]">
                At Spandan Studios, we believe that art is a form of expression that{' '}
                <em className="text-bronze">transcends all boundaries.</em>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md leading-relaxed text-stone">
                We create beautiful and intricate works of art, ranging from sculptures and murals to paintings and
                metal art. We specialize in metal, fiber, wood, stone and mix medium art.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-md leading-relaxed text-stone">
                Our USP lies in the detailing and intricacies of our work. We believe in telling unique stories
                through our creations, bringing to life the vision of our clients.
              </p>
            </Reveal>

            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-bone/15 pt-8">
              {facts.map(({ term, detail }, i) => (
                <Reveal key={term} delay={0.05 * i}>
                  <dt className="eyebrow text-[0.6rem] text-bronze">{term}</dt>
                  <dd className="mt-2 text-sm leading-snug text-bone/85">{detail}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {/* Signature line */}
        <div className="mt-20 grid grid-cols-12 items-end gap-x-5 gap-y-8 md:mt-24">
          <ImageReveal className="col-span-5 col-start-8 aspect-square md:order-none md:col-span-3 md:col-start-2">
            <ArtImage src={images.aboutDetail} alt="Artwork detail by Spandan Studios" className="h-full w-full" />
          </ImageReveal>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <PulseLine className="mb-8 h-8 w-full text-bronze md:h-10" />
            <blockquote className="font-display text-[clamp(2rem,4.6vw,4.4rem)] uppercase leading-[0.98] tracking-[-0.01em]">
              <MaskLine inView>Feel your heart beats</MaskLine>
              <MaskLine inView delay={0.08} className="italic text-bone/80">
                in our artwork,
              </MaskLine>
              <MaskLine inView delay={0.16}>we make for you</MaskLine>
            </blockquote>
            <Reveal delay={0.3}>
              <p className="mt-8 text-sm text-stone">
                <span className="font-display text-base italic text-bone">Spandan</span> (स्पंदन) — the pulse; the
                beat of a heart.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
