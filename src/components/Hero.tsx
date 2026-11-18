import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/watches';
import { WatchCategory } from '../types/watch';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onSelectCategory: (category: WatchCategory) => void;
}

const QUICK_SECTIONS: { label: string; category: WatchCategory }[] = [
  { label: 'Male', category: WatchCategory.MALE },
  { label: 'Female', category: WatchCategory.FEMALE },
  { label: 'Kids', category: WatchCategory.KIDS },
  { label: 'Wall Clocks', category: WatchCategory.WALL_CLOCKS },
  { label: 'Other', category: WatchCategory.OTHER },
];

const HERO_STANDARDS = [
  { label: 'Caliber Regulation', value: '-2 / +4 sec per day' },
  { label: 'Case Metallurgy', value: '316L Steel & Gr. 5 Titanium' },
  { label: 'Return Privilege', value: '90-Day Unworn Returns' },
  { label: 'Atelier Warranty', value: '5-Year Coverage' },
];

export function Hero({ onSelectCategory }: HeroProps) {
  const scrollToCatalog = (category: WatchCategory) => {
    onSelectCategory(category);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="top" className="border-b border-[#E5E1D8] bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-10 sm:pt-10 sm:pb-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left column: Editorial statement and single dominant CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between py-1 lg:py-2">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#8C6A3B] mb-3 sm:mb-4">
                Geneva &amp; Zurich Horology
              </p>

              <h1
                className="font-display text-[clamp(2.15rem,7vw,3.65rem)] leading-[1.06] font-semibold tracking-tight text-[#141413] mb-4 sm:mb-5"
                style={{ textWrap: 'balance' }}
              >
                Timepieces crafted for every generation.
              </h1>

              <p className="text-sm sm:text-base leading-relaxed text-[#5C5952] max-w-[44ch] mb-6 sm:mb-8">
                Balanced proportions and honest mechanical engineering across dedicated Male, Female, Kids, Wall Clocks, and horological object collections.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-7 sm:mb-10">
                <button
                  type="button"
                  onClick={() => scrollToCatalog(WatchCategory.ALL)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[44px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
                >
                  <span>Explore Timepieces</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
                </button>
                <a
                  href="#register"
                  className="inline-flex items-center justify-center sm:justify-start px-4 py-3 min-h-[44px] text-sm font-medium text-[#141413] underline decoration-[#D3CBBF] underline-offset-4 hover:decoration-[#8C6A3B] hover:text-[#8C6A3B] transition-colors whitespace-nowrap shrink-0"
                >
                  Join Sign-Up Program
                </a>
              </div>
            </div>

            {/* Quiet inline section shortcuts */}
            <div className="pt-5 sm:pt-6 border-t border-[#E5E1D8]">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#5C5952] mb-2.5 sm:mb-3">
                Browse by Section
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                {QUICK_SECTIONS.map((sec) => (
                  <button
                    key={sec.category}
                    type="button"
                    onClick={() => scrollToCatalog(sec.category)}
                    className="text-sm font-medium text-[#141413] underline decoration-[#D3CBBF] underline-offset-4 hover:decoration-[#8C6A3B] hover:text-[#8C6A3B] transition-colors py-1.5 min-h-[36px] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Full-height focal 16:9 horology photography */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[460px] rounded-lg overflow-hidden border border-[#E5E1D8] bg-[#F1EFEA]">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Vespera Atelier Heritage brushed steel and bronze mechanical chronograph watch on dark travertine stone"
                fallbackLabel="Atelier Heritage Two-Tone Chronograph"
                priority
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
              />
              <div className="absolute bottom-3.5 sm:bottom-4 left-4 sm:left-5 right-4 sm:right-5 flex flex-wrap items-baseline justify-between gap-2 text-[#FAF8F5]">
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  Atelier Heritage Two-Tone
                </span>
                <span className="font-mono text-[11px] sm:text-xs tabular-nums text-[#E5DFD5]">
                  Ref. VH-408 · PKR 215,000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column horology specification strip below split */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#E5E1D8] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HERO_STANDARDS.map((item) => (
            <div key={item.label}>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.1em] text-[#5C5952] mb-1">
                {item.label}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#141413] tabular-nums">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
