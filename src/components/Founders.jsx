import { images } from '../data/site'
import Eyebrow from './ui/Eyebrow'
import ParallaxImage from './ui/ParallaxImage'
import { MaskLine, Reveal } from './ui/Reveal'

const founders = [
  {
    numeral: 'I.',
    first: 'Manish R.',
    last: 'Dholakia',
    role: 'Founder & Creative Director',
    image: images.manish,
    description:
      'We specialize in creating art installations that redefine spaces. Our designs blend creativity and purpose, delivering unique solutions for homes, offices, and public areas. At Spandan Studios, we bring visions to life through art that inspires and transforms.',
  },
  {
    numeral: 'II.',
    first: 'Swayam M.',
    last: 'Dholakia',
    role: 'Co-Founder & Creative Director',
    image: images.swayam,
    description:
      'We blend creativity with functionality, designing unique pieces that reflect our clients vision and elevate environments, from homes to businesses. At Spandan Studios, we craft spaces that inspire and leave lasting impressions.',
  },
]

function Founder({ founder, flip }) {
  const { numeral, first, last, role, image, description } = founder
  return (
    <article className="grid grid-cols-12 items-end gap-x-5 gap-y-10">
      <div
        className={`group col-span-10 sm:col-span-7 md:col-span-5 ${
          flip ? 'col-start-3 sm:col-start-6 md:order-2 md:col-start-8' : ''
        }`}
      >
        <ParallaxImage
          src={image}
          alt={`Portrait of ${first} ${last}, ${role} at Spandan Studios`}
          amount={6}
          className="aspect-[3/4] w-full"
          imgClassName="grayscale-[0.85] transition-[filter] duration-1000 ease-expo group-hover:grayscale-0"
        />
      </div>

      <div
        className={`col-span-12 md:col-span-6 ${flip ? 'md:order-1 md:col-start-1 md:pb-16 lg:col-start-2' : 'md:col-start-7 md:pb-16'}`}
      >
        <Reveal>
          <p className="eyebrow flex items-center gap-4 text-umber">
            <span className="font-display text-2xl normal-case italic tracking-normal text-bronze">{numeral}</span>
            {role}
          </p>
        </Reveal>
        <h3 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] font-normal uppercase leading-[0.86] tracking-[-0.03em]">
          <MaskLine inView>{first}</MaskLine>
          <MaskLine inView delay={0.08} className="font-light italic">
            {last}
          </MaskLine>
        </h3>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-md border-l border-ink/20 pl-6 font-display text-xl leading-snug text-ink/80 md:text-[1.4rem]">
            {description}
          </p>
        </Reveal>
      </div>
    </article>
  )
}

export default function Founders() {
  return (
    <section id="founders" aria-labelledby="founders-title" className="bg-paper py-28 text-ink md:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 items-end gap-x-5 gap-y-8">
          <div className="col-span-12 lg:col-span-9">
            <Eyebrow index="05" tone="text-umber">
              The people behind the studio
            </Eyebrow>
            <h2
              id="founders-title"
              className="mt-8 font-display text-[clamp(3rem,9vw,9rem)] font-normal uppercase leading-[0.86] tracking-[-0.03em]"
            >
              <MaskLine inView>Founders &amp;</MaskLine>
              <MaskLine inView delay={0.1} className="pl-[8vw] font-light italic">
                Creative Directors
              </MaskLine>
            </h2>
          </div>
          <Reveal className="col-span-12 lg:col-span-3">
            <p className="max-w-xs leading-relaxed text-umber">
              Two creative directors, one shared pulse — guiding every project from first idea to final
              installation.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-24 md:mt-32 md:space-y-10">
          {founders.map((f, i) => (
            <div key={f.last + i} className={i === 1 ? 'md:-mt-4 lg:-mt-16' : ''}>
              <Founder founder={f} flip={i === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
