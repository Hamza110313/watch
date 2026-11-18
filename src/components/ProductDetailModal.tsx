import { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PhotoViewMode, WatchProduct, WatchVariant } from '../types/watch';
import { formatPKR } from '../utils/currency';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: WatchProduct | null;
  preferredPhotoMode: PhotoViewMode;
  onClose: () => void;
  onAddToCart: (product: WatchProduct, variant: WatchVariant) => void;
}

export function ProductDetailModal({
  product,
  preferredPhotoMode,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<WatchVariant | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] ?? null);
      const targetKind = preferredPhotoMode === PhotoViewMode.MODEL ? 'model' : 'studio';
      const matchIndex = product.gallery.findIndex((p) => p.kind === targetKind);
      setActivePhotoIndex(matchIndex >= 0 ? matchIndex : 0);
      setJustAdded(false);
    }
  }, [product, preferredPhotoMode]);

  useEffect(() => {
    if (!product) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const total = product.gallery.length || 1;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActivePhotoIndex((prev) => (prev + 1) % total);
      if (e.key === 'ArrowLeft') setActivePhotoIndex((prev) => (prev - 1 + total) % total);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product || !selectedVariant) return null;

  const photos =
    product.gallery.length > 0
      ? product.gallery
      : [{ url: product.image, caption: 'Studio Front', alt: product.imageAlt, kind: 'studio' as const }];
  const currentPhoto = photos[activePhotoIndex] ?? photos[0];
  const formattedPrice = formatPKR(product.price);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/55 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92dvh] overflow-y-auto bg-[#FAF8F5] border border-[#E5E1D8] rounded-t-2xl sm:rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky mobile header bar so Close stays accessible while scrolling */}
        <div className="md:hidden sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E5E1D8]">
          <span className="font-mono text-xs text-[#5C5952] truncate">
            Ref. {product.reference} · {product.name}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close timepiece details"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white border border-[#E5E1D8] text-[#141413] shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop floating close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close timepiece details"
          className="hidden md:inline-flex absolute top-4 right-4 z-10 items-center justify-center w-10 h-10 rounded-md bg-white/90 border border-[#E5E1D8] text-[#141413] hover:bg-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Contiguous Purchase Module: Multi-Photo & On-Model Gallery Left, Purchase Controls Right */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-6 bg-[#F1EFEA] flex flex-col justify-center p-4 sm:p-6 lg:p-8 border-b md:border-b-0 md:border-r border-[#E5E1D8]">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-white border border-[#E5E1D8] mb-3">
              <ResilientImage
                src={currentPhoto.url}
                alt={currentPhoto.alt}
                fallbackLabel={product.name}
                priority
                className={`w-full h-full object-cover ${
                  currentPhoto.kind === 'model' ? 'object-top' : 'object-center'
                }`}
              />

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)}
                    aria-label="Previous photo"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E5E1D8] text-[#141413] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhotoIndex((prev) => (prev + 1) % photos.length)}
                    aria-label="Next photo"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E5E1D8] text-[#141413] flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#5C5952] mb-2.5">
              <span className="font-medium text-[#141413]">{currentPhoto.caption}</span>
              <span className="font-mono tabular-nums">
                Photo {activePhotoIndex + 1} of {photos.length}
              </span>
            </div>

            {/* Clickable 4-Thumbnail Strip (Studio, On Model, Details) */}
            {photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {photos.map((photo, idx) => {
                  const isActive = idx === activePhotoIndex;
                  return (
                    <button
                      key={`${product.id}-modal-thumb-${idx}`}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      aria-label={`Select ${photo.caption}`}
                      aria-pressed={isActive}
                      className={`group text-left rounded-md overflow-hidden border bg-white transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B] ${
                        isActive
                          ? 'border-[#1B2421] ring-1 ring-[#1B2421]'
                          : 'border-[#E5E1D8] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <ResilientImage
                          src={photo.url}
                          alt={photo.alt}
                          className={`w-full h-full object-cover ${
                            photo.kind === 'model' ? 'object-top' : 'object-center'
                          }`}
                        />
                      </div>
                      <p className="px-1.5 py-1 text-[10px] font-medium text-[#141413] truncate bg-white">
                        {photo.caption}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="md:col-span-6 p-5 sm:p-6 lg:p-8 flex flex-col justify-between bg-white pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5C5952] uppercase tracking-[0.1em] mb-2">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.designStyle}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">Ref. {product.reference}</span>
              </div>

              <h2
                id="pdp-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#141413] leading-tight mb-2"
              >
                {product.name}
              </h2>

              <p className="font-mono text-xl font-medium text-[#141413] tabular-nums mb-4">
                {formattedPrice}
              </p>

              <p className="text-sm leading-relaxed text-[#5C5952] mb-6">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141413] mb-2.5">
                  Strap &amp; Finish: <span className="font-normal text-[#5C5952]">{selectedVariant.label}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const active = variant.id === selectedVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`inline-flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          active
                            ? 'border-[#1B2421] bg-[#FAF8F5] text-[#141413]'
                            : 'border-[#E5E1D8] bg-white text-[#5C5952] hover:border-[#B9B2A6] hover:text-[#141413]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: variant.swatchHex }}
                        />
                        <span>{variant.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="border-t border-[#E5E1D8] pt-4 mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141413] mb-3">
                  Technical Specifications
                </p>
                <dl className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                  <div>
                    <dt className="text-[#5C5952]">Movement</dt>
                    <dd className="font-medium text-[#141413] mt-0.5">{product.specs.caliber}</dd>
                  </div>
                  <div>
                    <dt className="text-[#5C5952]">Dimensions</dt>
                    <dd className="font-mono font-medium text-[#141413] tabular-nums mt-0.5">
                      {product.specs.caseSize}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#5C5952]">Water Resistance</dt>
                    <dd className="font-mono font-medium text-[#141413] tabular-nums mt-0.5">
                      {product.specs.waterResistance}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#5C5952]">Case Material</dt>
                    <dd className="font-medium text-[#141413] mt-0.5">{product.specs.material}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E1D8] flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag — {formattedPrice}</span>
                )}
              </button>
              <span className="text-xs text-[#5C5952] text-center sm:text-left">
                In Stock · 90-Day Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
