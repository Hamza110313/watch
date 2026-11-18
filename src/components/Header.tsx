import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { WatchCategory } from '../types/watch';

interface HeaderProps {
  activeCategory: WatchCategory;
  onSelectCategory: (category: WatchCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS: { label: string; category: WatchCategory }[] = [
  { label: 'Male', category: WatchCategory.MALE },
  { label: 'Female', category: WatchCategory.FEMALE },
  { label: 'Kids', category: WatchCategory.KIDS },
  { label: 'Wall Clocks', category: WatchCategory.WALL_CLOCKS },
  { label: 'Other', category: WatchCategory.OTHER },
];

const MOBILE_UTILITY_LINKS = [
  { label: 'Atelier', href: '#atelier' },
  { label: 'Sign-Up Program', href: '#register' },
  { label: '90-Day Returns', href: '#returns' },
];

export function Header({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (category: WatchCategory) => {
    onSelectCategory(category);
    setMobileMenuOpen(false);
    const targetId =
      category === WatchCategory.ALL
        ? 'catalog'
        : `section-${category.toLowerCase().replace(/\s+/g, '-')}`;
    setTimeout(() => {
      const el = document.getElementById(targetId) || document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 30);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E5E1D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            onSelectCategory(WatchCategory.ALL);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[#141413] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6A3B]"
        >
          Vespera
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Watch collections"
          className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[#5C5952]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.category;
            return (
              <button
                key={item.category}
                type="button"
                onClick={() => handleNavClick(item.category)}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6A3B] ${
                  isActive
                    ? 'text-[#141413] font-semibold'
                    : 'text-[#5C5952] hover:text-[#141413]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#8C6A3B] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (Bag button) + compact mobile menu trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCart();
            }}
            aria-label={`Open shopping bag, ${cartCount} items`}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 min-h-[42px] text-sm font-medium bg-[#1B2421] text-[#FAF8F5] rounded-md hover:bg-[#2A3732] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
            <span className="tabular-nums">Bag ({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#141413] rounded-md border border-[#E5E1D8] bg-white hover:bg-[#EFECE6] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile collapsible section links */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile watch collections"
          className="md:hidden border-t border-[#E5E1D8] bg-[#FAF8F5] px-4 py-4 space-y-3 shadow-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleNavClick(WatchCategory.ALL)}
              className={`px-3.5 py-2.5 min-h-[44px] text-sm font-medium rounded-md text-left transition-colors cursor-pointer ${
                activeCategory === WatchCategory.ALL
                  ? 'bg-[#1B2421] text-[#FAF8F5]'
                  : 'bg-[#F1EFEA] text-[#141413] hover:bg-[#E5E1D8]'
              }`}
            >
              All Collections
            </button>
            {NAV_ITEMS.map((item) => {
              const isActive = activeCategory === item.category;
              return (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => handleNavClick(item.category)}
                  className={`px-3.5 py-2.5 min-h-[44px] text-sm font-medium rounded-md text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#1B2421] text-[#FAF8F5]'
                      : 'bg-[#F1EFEA] text-[#141413] hover:bg-[#E5E1D8]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5E1D8] flex flex-wrap items-center justify-between gap-2">
            {MOBILE_UTILITY_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2.5 py-2 min-h-[40px] inline-flex items-center text-xs font-medium text-[#5C5952] hover:text-[#141413] underline decoration-[#D3CBBF] underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
