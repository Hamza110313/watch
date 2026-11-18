import { useState } from 'react';
import { ATELIER_IMAGE } from '../data/watches';
import { ResilientImage } from './ResilientImage';

interface CraftPillar {
  index: string;
  tabLabel: string;
  title: string;
  detail: string;
  toleranceLabel: string;
  toleranceValue: string;
  materialLabel: string;
  materialValue: string;
}

const ATELIER_PILLARS: CraftPillar[] = [
  {
    index: '01.',
    tabLabel: 'Dial & Hands',
    title: 'Multi-Layer Dials & Faceted Hands',
    detail:
      'Sunburst metallic plating, natural mother-of-pearl, and thermally blued steel hands are balanced under box-domed anti-reflective sapphire for crisp legibility at any angle.',
    toleranceLabel: 'Index Alignment',
    toleranceValue: '±0.02 mm radial tolerance',
    materialLabel: 'Lume Grade',
    materialValue: 'Swiss BGW9 Super-LumiNova',
  },
  {
    index: '02.',
    tabLabel: 'Case Architecture',
    title: 'Multi-Generation Ergonomic Proportions',
    detail:
      'From 41mm grade-5 titanium dive cases and 32mm ultra-slim dress silhouettes to 30mm shock-mounted kids field cases, every lug curves downward for balanced wrist geometry.',
    toleranceLabel: 'Pressure Testing',
    toleranceValue: 'Up to 300 m / 30 ATM wet-tested',
    materialLabel: 'Surface Finishing',
    materialValue: 'Vertical satin & diamond bevels',
  },
  {
    index: '03.',
    tabLabel: 'Caliber & Straps',
    title: 'Five-Position Regulation & Quick-Release',
    detail:
      'Every mechanical movement is timed across five thermal positions before casing, paired with tool-free quick-release straps in calfskin, Milanese mesh, and woven nylon.',
    toleranceLabel: 'Daily Timing',
    toleranceValue: '-2 / +4 seconds per day',
    materialLabel: 'Power Reserve',
    materialValue: 'Up to 8 days (Desk) · 62h (Auto)',
  },
];

export function CraftsmanshipSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = ATELIER_PILLARS[activeIndex];

  return (
    <section id="atelier" className="border-t border-[#E5E1D8] bg-[#F4F1EB] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px] rounded-lg overflow-hidden border border-[#E5E1D8] bg-[#E9E4DB]">
              <ResilientImage
                src={ATELIER_IMAGE}
                alt="Master watchmaker inspecting a mechanical watch caliber on a leather bench mat"
                fallbackLabel="Vespera Watchmaking Atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between py-1 lg:py-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8C6A3B] mb-3">
                Design &amp; Engineering
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-[#141413] leading-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Engineered to outlast trends and pass down.
              </h2>
              <p className="text-sm sm:text-base text-[#5C5952] leading-relaxed mb-7 max-w-[52ch]">
                Each Vespera reference undergoes individual pressure certification, anti-reflective sapphire treatment, and a 72-hour reserve audit in our atelier.
              </p>
            </div>

            {/* Interactive Design Anatomy Selector */}
            <div className="border-t border-[#DFD9CE] pt-6">
              <div
                role="tablist"
                aria-label="Watch design pillars"
                className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 bg-[#E8E2D7] rounded-lg mb-6"
              >
                {ATELIER_PILLARS.map((pillar, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={pillar.index}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => setActiveIndex(idx)}
                      className={`px-3 py-2.5 min-h-[44px] text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B] ${
                        isActive
                          ? 'bg-white text-[#141413] shadow-xs'
                          : 'text-[#5C5952] hover:text-[#141413]'
                      }`}
                    >
                      {pillar.index} {pillar.tabLabel}
                    </button>
                  );
                })}
              </div>

              <div className="bg-white border border-[#E5E1D8] rounded-lg p-5">
                <h3 className="text-base font-semibold text-[#141413] mb-2">
                  {current.title}
                </h3>
                <p className="text-sm text-[#5C5952] leading-relaxed mb-5">
                  {current.detail}
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EFECE6] text-xs">
                  <div>
                    <dt className="text-[#5C5952]">{current.toleranceLabel}</dt>
                    <dd className="font-mono font-medium text-[#141413] tabular-nums mt-0.5">
                      {current.toleranceValue}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#5C5952]">{current.materialLabel}</dt>
                    <dd className="font-medium text-[#141413] mt-0.5">
                      {current.materialValue}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
