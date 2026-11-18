import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RegisterSection } from './components/RegisterSection';
import { ReturnsSection } from './components/ReturnsSection';
import { SECTION_DESCRIPTIONS, WATCH_CATALOG } from './data/watches';
import {
  CartItem,
  MovementFilter,
  OrderConfirmation,
  PhotoViewMode,
  RegisteredMember,
  ReturnRequest,
  SortOption,
  WatchCategory,
  WatchProduct,
  WatchSectionCategory,
  WatchVariant,
} from './types/watch';

const ACCOUNTS_STORAGE_KEY = 'vespera_accounts';
const ACTIVE_MEMBER_STORAGE_KEY = 'vespera_active_member_id';
const ORDERS_STORAGE_KEY = 'vespera_orders';
const RETURNS_STORAGE_KEY = 'vespera_returns';

const CATEGORY_TABS: { label: string; value: WatchCategory }[] = [
  { label: 'All Collections', value: WatchCategory.ALL },
  { label: 'Male', value: WatchCategory.MALE },
  { label: 'Female', value: WatchCategory.FEMALE },
  { label: 'Kids', value: WatchCategory.KIDS },
  { label: 'Wall Clocks', value: WatchCategory.WALL_CLOCKS },
  { label: 'Other', value: WatchCategory.OTHER },
];

const MOVEMENT_TABS: MovementFilter[] = [
  MovementFilter.ALL,
  MovementFilter.AUTOMATIC,
  MovementFilter.HAND_WOUND,
  MovementFilter.QUARTZ_SOLAR,
  MovementFilter.WALL_CLOCKS,
  MovementFilter.ACCESSORIES,
];

const ORDERED_SECTIONS: WatchSectionCategory[] = [
  WatchCategory.MALE,
  WatchCategory.FEMALE,
  WatchCategory.KIDS,
  WatchCategory.WALL_CLOCKS,
  WatchCategory.OTHER,
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<WatchCategory>(WatchCategory.ALL);
  const [movementFilter, setMovementFilter] = useState<MovementFilter>(MovementFilter.ALL);
  const [photoViewMode, setPhotoViewMode] = useState<PhotoViewMode>(PhotoViewMode.STUDIO);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.FEATURED);
  const [inspectedProduct, setInspectedProduct] = useState<WatchProduct | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [accounts, setAccounts] = useState<RegisteredMember[]>(() => {
    try {
      const saved = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item): item is RegisteredMember =>
          Boolean(item) &&
          typeof item.memberId === 'string' &&
          typeof item.email === 'string' &&
          typeof item.password === 'string' &&
          Array.isArray(item.registeredWatches)
      );
    } catch {
      return [];
    }
  });

  const [activeMemberId, setActiveMemberId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(ACTIVE_MEMBER_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [recentOrders, setRecentOrders] = useState<OrderConfirmation[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as OrderConfirmation[]) : [];
    } catch {
      return [];
    }
  });

  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>(() => {
    try {
      const saved = localStorage.getItem(RETURNS_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as ReturnRequest[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [accounts]);

  useEffect(() => {
    try {
      if (activeMemberId) {
        localStorage.setItem(ACTIVE_MEMBER_STORAGE_KEY, activeMemberId);
      } else {
        localStorage.removeItem(ACTIVE_MEMBER_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [activeMemberId]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(recentOrders));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [recentOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(RETURNS_STORAGE_KEY, JSON.stringify(returnRequests));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [returnRequests]);

  const currentMember = useMemo(
    () => accounts.find((acc) => acc.memberId === activeMemberId) ?? null,
    [accounts, activeMemberId]
  );

  const handleRegisterAccount = (member: RegisteredMember) => {
    setAccounts((prev) => [...prev, member]);
    setActiveMemberId(member.memberId);
  };

  const handleSignIn = (member: RegisteredMember) => {
    setActiveMemberId(member.memberId);
  };

  const handleUpdateMember = (updated: RegisteredMember) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.memberId === updated.memberId ? updated : acc))
    );
  };

  const handleSignOut = () => {
    setActiveMemberId(null);
  };

  const handleRedeemWelcomeCredit = () => {
    if (!currentMember) return;
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.memberId === currentMember.memberId
          ? { ...acc, welcomeCreditAvailable: false }
          : acc
      )
    );
  };

  const handleOrderPlaced = (order: OrderConfirmation) => {
    setRecentOrders((prev) => [order, ...prev]);
  };

  const handleSubmitReturn = (request: ReturnRequest) => {
    setReturnRequests((prev) => [request, ...prev]);
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = WATCH_CATALOG.filter((item) => {
      const matchesCategory =
        activeCategory === WatchCategory.ALL || item.category === activeCategory;
      const matchesMovement =
        movementFilter === MovementFilter.ALL || item.movementGroup === movementFilter;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.designStyle.toLowerCase().includes(query) ||
        item.movementType.toLowerCase().includes(query) ||
        item.reference.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query);

      return matchesCategory && matchesMovement && matchesQuery;
    });

    if (sortOption === SortOption.PRICE_ASC) {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortOption === SortOption.PRICE_DESC) {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [activeCategory, movementFilter, searchQuery, sortOption]);

  const handleAddToCart = (product: WatchProduct, variant?: WatchVariant) => {
    const chosenVariant = variant ?? product.variants[0];
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (entry) => entry.product.id === product.id && entry.variant.id === chosenVariant.id
      );
      if (existingIndex > -1) {
        return prev.map((entry, idx) =>
          idx === existingIndex ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { product, variant: chosenVariant, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variant.id === variantId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variant.id === variantId)
      )
    );
  };

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showGroupedSections =
    activeCategory === WatchCategory.ALL &&
    movementFilter === MovementFilter.ALL &&
    searchQuery.trim() === '' &&
    sortOption === SortOption.FEATURED;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141413]">
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={totalBagCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <Hero onSelectCategory={setActiveCategory} />

        {/* Catalog Section covering Male, Female, Kids, Wall Clocks, and Other */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16 scroll-mt-16 sm:scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-[#E5E1D8]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8C6A3B] mb-2">
                Curated Catalog · PKR
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#141413]">
                {activeCategory === WatchCategory.ALL
                  ? 'All Horological Sections'
                  : SECTION_DESCRIPTIONS[activeCategory].title}
              </h2>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#5C5952] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="Search watches and accessories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search model, design, or ref..."
                  className="w-full sm:w-64 pl-9 pr-10 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] placeholder:text-[#8A857C] focus:outline-none focus:border-[#8C6A3B]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 inline-flex items-center justify-center text-[#5C5952] hover:text-[#141413] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <label className="sr-only" htmlFor="sort-select">
                Sort timepieces
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B] cursor-pointer"
              >
                <option value={SortOption.FEATURED}>Sort: Curated Order</option>
                <option value={SortOption.PRICE_ASC}>Price: Low to High (PKR)</option>
                <option value={SortOption.PRICE_DESC}>Price: High to Low (PKR)</option>
              </select>
            </div>
          </div>

          {/* Interactive Section, View Mode (Studio | On Model), and Movement Filters */}
          <div className="py-5 sm:py-6 space-y-3.5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4">
              <div
                role="tablist"
                aria-label="Filter by watch section"
                className="grid grid-cols-2 sm:inline-flex sm:flex-wrap w-full sm:w-auto items-center gap-1 p-1 bg-[#EFECE6] rounded-lg"
              >
                {CATEGORY_TABS.map((tab) => {
                  const isSelected = activeCategory === tab.value;
                  return (
                    <button
                      key={tab.value}
                      role="tab"
                      type="button"
                      aria-selected={isSelected}
                      onClick={() => setActiveCategory(tab.value)}
                      className={`px-3.5 py-2 min-h-[44px] sm:min-h-[40px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B] ${
                        isSelected
                          ? 'bg-white text-[#141413] shadow-xs'
                          : 'text-[#5C5952] hover:text-[#141413]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Photo View Mode Switcher: Studio vs On Model */}
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3">
                <div
                  role="group"
                  aria-label="Toggle product photography mode"
                  className="grid grid-cols-2 flex-1 sm:flex-none sm:inline-flex items-center gap-1 p-1 bg-[#EFECE6] rounded-lg"
                >
                  <button
                    type="button"
                    onClick={() => setPhotoViewMode(PhotoViewMode.STUDIO)}
                    aria-pressed={photoViewMode === PhotoViewMode.STUDIO}
                    className={`px-3 py-2 min-h-[40px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      photoViewMode === PhotoViewMode.STUDIO
                        ? 'bg-white text-[#141413] shadow-xs'
                        : 'text-[#5C5952] hover:text-[#141413]'
                    }`}
                  >
                    Studio Shots
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoViewMode(PhotoViewMode.MODEL)}
                    aria-pressed={photoViewMode === PhotoViewMode.MODEL}
                    className={`px-3 py-2 min-h-[40px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      photoViewMode === PhotoViewMode.MODEL
                        ? 'bg-white text-[#141413] shadow-xs'
                        : 'text-[#5C5952] hover:text-[#141413]'
                    }`}
                  >
                    On Model
                  </button>
                </div>

                <p className="text-xs text-[#5C5952] font-mono tabular-nums shrink-0">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'good' : 'goods'}
                </p>
              </div>
            </div>

            {/* Design & Movement Type Filter Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="w-full sm:w-auto text-xs uppercase tracking-[0.1em] text-[#5C5952] mr-1">
                Style &amp; Movement:
              </span>
              {MOVEMENT_TABS.map((mv) => {
                const active = movementFilter === mv;
                return (
                  <button
                    key={mv}
                    type="button"
                    onClick={() => setMovementFilter(mv)}
                    className={`px-3 py-2 min-h-[40px] text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'border-[#1B2421] bg-[#1B2421] text-[#FAF8F5]'
                        : 'border-[#E5E1D8] bg-white text-[#5C5952] hover:text-[#141413] hover:border-[#C9C2B6]'
                    }`}
                  >
                    {mv}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid: Symmetrical 4-column rows across Male, Female, Kids, Wall Clocks, Other */}
          {filteredProducts.length === 0 ? (
            <div className="py-14 sm:py-16 px-4 text-center bg-white border border-[#E5E1D8] rounded-lg">
              <p className="font-display text-2xl font-semibold text-[#141413] mb-2">
                No matching designs found
              </p>
              <p className="text-sm text-[#5C5952] mb-6">
                Adjust your search phrase or reset your section and movement filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(WatchCategory.ALL);
                  setMovementFilter(MovementFilter.ALL);
                  setSortOption(SortOption.FEATURED);
                }}
                className="px-5 py-2.5 min-h-[44px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : showGroupedSections ? (
            <div className="space-y-12 sm:space-y-14 pt-2">
              {ORDERED_SECTIONS.map((section) => {
                const sectionItems = filteredProducts.filter((item) => item.category === section);
                const meta = SECTION_DESCRIPTIONS[section];

                return (
                  <div
                    key={section}
                    id={`section-${section.toLowerCase().replace(/\s+/g, '-')}`}
                    className="scroll-mt-20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-5 sm:mb-6 pb-3 border-b border-[#EFECE6]">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-[#141413]">
                          {meta.title}
                        </h3>
                        <p className="text-sm text-[#5C5952] mt-0.5">{meta.subtitle}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(section)}
                        className="py-1.5 min-h-[36px] self-start sm:self-auto text-xs font-medium text-[#8C6A3B] hover:text-[#141413] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Focus {section} ({sectionItems.length})
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                      {sectionItems.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          photoViewMode={photoViewMode}
                          onInspect={setInspectedProduct}
                          onQuickAdd={handleAddToCart}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`grid gap-5 sm:gap-6 pt-2 ${
                filteredProducts.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : filteredProducts.length === 3
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  photoViewMode={photoViewMode}
                  onInspect={setInspectedProduct}
                  onQuickAdd={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>

        <CraftsmanshipSection />

        <RegisterSection
          currentMember={currentMember}
          accounts={accounts}
          onRegisterAccount={handleRegisterAccount}
          onSignIn={handleSignIn}
          onUpdateMember={handleUpdateMember}
          onSignOut={handleSignOut}
        />

        <ReturnsSection
          currentMember={currentMember}
          recentOrders={recentOrders}
          returnRequests={returnRequests}
          onSubmitReturn={handleSubmitReturn}
        />
      </main>

      <Footer onSelectCategory={setActiveCategory} />

      <ProductDetailModal
        product={inspectedProduct}
        preferredPhotoMode={photoViewMode}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        registeredMember={currentMember}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onRedeemWelcomeCredit={handleRedeemWelcomeCredit}
        onOrderPlaced={handleOrderPlaced}
      />
    </div>
  );
}
