import { WatchCategory } from '../types/watch';

interface FooterProps {
  onSelectCategory: (category: WatchCategory) => void;
}

const FOOTER_SECTIONS: { label: string; category: WatchCategory }[] = [
  { label: 'All Timepieces', category: WatchCategory.ALL },
  { label: 'Male Watches', category: WatchCategory.MALE },
  { label: 'Female Watches', category: WatchCategory.FEMALE },
  { label: 'Kids Watches', category: WatchCategory.KIDS },
  { label: 'Wall Clocks', category: WatchCategory.WALL_CLOCKS },
  { label: 'Other Horology & Objects', category: WatchCategory.OTHER },
];

export function Footer({ onSelectCategory }: FooterProps) {
  const handleJump = (category: WatchCategory) => {
    onSelectCategory(category);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-[#E5E1D8] bg-[#FAF8F5] text-[#5C5952]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E5E1D8]">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold text-[#141413] mb-2">
              Vespera
            </p>
            <p className="text-sm leading-relaxed max-w-[38ch]">
              Independent horology house crafting mechanical, quartz, and solar watches across Male, Female, Kids, and collector desk editions.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#141413] mb-3">
              Collections
            </p>
            <ul className="space-y-1 text-sm">
              {FOOTER_SECTIONS.map((item) => (
                <li key={item.category}>
                  <button
                    type="button"
                    onClick={() => handleJump(item.category)}
                    className="py-1.5 min-h-[36px] inline-flex items-center hover:text-[#141413] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#141413] mb-3">
              Atelier &amp; Care
            </p>
            <p className="text-sm leading-relaxed mb-2">
              Bahnhofstrasse 42, 8001 Zurich
            </p>
            <p className="text-sm leading-relaxed mb-3">
              90-day unworn returns · Complimentary insured courier over PKR 25,000 · 5-year movement warranty.
            </p>
            <div className="flex flex-col items-start gap-1">
              <a
                href="#register"
                className="py-1.5 min-h-[36px] inline-flex items-center text-sm font-medium text-[#141413] underline decoration-[#D3CBBF] underline-offset-4 hover:decoration-[#8C6A3B] hover:text-[#8C6A3B] transition-colors"
              >
                Register &amp; Sign-Up Program
              </a>
              <a
                href="#returns"
                className="py-1.5 min-h-[36px] inline-flex items-center text-sm font-medium text-[#141413] underline decoration-[#D3CBBF] underline-offset-4 hover:decoration-[#8C6A3B] hover:text-[#8C6A3B] transition-colors"
              >
                90-Day Return Portal
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Vespera Horology. All rights reserved.</p>
          <p>Insured Global Dispatch · Card &amp; Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
}
