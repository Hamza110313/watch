import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { PhotoViewMode, WatchProduct, WatchVariant } from '../types/watch';
import { formatPKR } from '../utils/currency';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: WatchProduct;
  photoViewMode: PhotoViewMode;
  onInspect: (product: WatchProduct) => void;
  onQuickAdd: (product: WatchProduct, variant: WatchVariant) => void;
}

export function ProductCard({
  product,
  photoViewMode,
  onInspect,
  onQuickAdd,
}: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<WatchVariant>(product.variants[0]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const formattedPrice = formatPKR(product.price);

  const photos =
    product.gallery.length > 0
      ? product.gallery
      : [{ url: product.image, caption: 'Studio Front', alt: product.imageAlt, kind: 'studio' as const }];

  useEffect(() => {
    setSelectedVariant(product.variants[0]);
  }, [product.id, product.variants]);

  useEffect(() => {
    const targetKind = photoViewMode === PhotoViewMode.MODEL ? 'model' : 'studio';
    const matchIndex = photos.findIndex((p) => p.kind === targetKind);
    setActivePhotoIndex(matchIndex >= 0 ? matchIndex : 0);
  }, [photoViewMode, product.id, photos]);

  const currentPhoto = photos[activePhotoIndex] ?? photos[0];

  const handleStepPhoto = (delta: number) => {
    setActivePhotoIndex((prev) => (prev + delta + photos.length) % photos.length);
  };

  return (
    <article className="group flex flex-col bg-white border border-[#E5E1D8] rounded-lg overflow-hidden transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:-translate-y-0.5 md:hover:shadow-md">
      {/* Main 4:3 Photo Frame with mobile-accessible & desktop hover angle navigation */}
      <div className="relative aspect-[4/3] w-full bg-[#F1EFEA] overflow-hidden">
        <button
          type="button"
          onClick={() => onInspect(product)}
          aria-label={`Inspect ${product.name} (${currentPhoto.caption})`}
          className="w-full h-full block text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#8C6A3B]"
        >
          <ResilientImage
            src={currentPhoto.url}
            alt={currentPhoto.alt}
            fallbackLabel={product.name}
            className={`w-full h-full object-cover ${
              currentPhoto.kind === 'model' ? 'object-top' : 'object-center'
            } transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-[1.02]`}
          />
        </button>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleStepPhoto(-1);
              }}
              aria-label={`Previous photo of ${product.name}`}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-[#E5E1D8] text-[#141413] flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleStepPhoto(1);
              }}
              aria-label={`Next photo of ${product.name}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-[#E5E1D8] text-[#141413] flex items-center justify-center opacity-90 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="pointer-events-none absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] sm:text-[11px] font-mono text-[#FAF8F5] tabular-nums max-w-[calc(100%-1rem)] truncate">
              {activePhotoIndex + 1}/{photos.length} · {currentPhoto.caption}
            </div>
          </>
        )}
      </div>

      {/* Multi-photo thumbnail strip including Studio, On Model, and Macro details */}
      {photos.length > 1 && (
        <div
          className="grid grid-cols-4 gap-1.5 p-2 bg-[#FAF8F5] border-b border-[#EFECE6]"
          role="group"
          aria-label={`Gallery views for ${product.name}`}
        >
          {photos.map((photo, idx) => {
            const isActive = idx === activePhotoIndex;
            return (
              <button
                key={`${product.id}-thumb-${idx}`}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                title={photo.caption}
                aria-label={`View ${photo.caption} of ${product.name}`}
                aria-pressed={isActive}
                className={`relative aspect-[4/3] min-h-[36px] rounded overflow-hidden border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#8C6A3B] ${
                  isActive
                    ? 'border-[#1B2421] ring-1 ring-[#1B2421]'
                    : 'border-[#E5E1D8] opacity-75 hover:opacity-100'
                }`}
              >
                <ResilientImage
                  src={photo.url}
                  alt={photo.alt}
                  className={`w-full h-full object-cover ${
                    photo.kind === 'model' ? 'object-top' : 'object-center'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Identical field order across every card */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-[#5C5952] mb-1.5">
          <span className="uppercase tracking-[0.07em] truncate">
            {product.category} · {product.designStyle}
          </span>
          {product.availabilityNote && (
            <span className="font-medium text-[#8C6A3B] whitespace-nowrap shrink-0">
              {product.availabilityNote}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-[#141413] leading-snug mb-1">
          <button
            type="button"
            onClick={() => onInspect(product)}
            className="text-left hover:text-[#8C6A3B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
          >
            {product.name}
          </button>
        </h3>

        <p className="text-sm text-[#5C5952] leading-relaxed mb-3.5 line-clamp-2">
          {product.tagline}
        </p>

        {/* Interactive finish / strap design selector with generous mobile touch targets */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-0.5 -ml-1.5" role="group" aria-label={`Strap finishes for ${product.name}`}>
            {product.variants.map((variant) => {
              const isSelected = variant.id === selectedVariant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  title={variant.label}
                  aria-label={`Select ${variant.label}`}
                  aria-pressed={isSelected}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
                >
                  <span
                    className={`w-4 h-4 rounded-full border border-black/15 transition-all ${
                      isSelected
                        ? 'ring-1 ring-[#141413] ring-offset-2 ring-offset-white'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: variant.swatchHex }}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-xs text-[#5C5952] truncate">
            {selectedVariant.label}
          </span>
        </div>

        <div className="mt-auto pt-3.5 border-t border-[#EFECE6] space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[15px] font-medium text-[#141413] tabular-nums">
              {formattedPrice}
            </span>
            <span className="font-mono text-xs text-[#5C5952] tabular-nums">
              {product.specs.caseSize.split('×')[0].trim()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onInspect(product)}
              className="px-3 py-2.5 min-h-[44px] text-xs font-medium text-[#141413] bg-[#F6F4F0] rounded-md hover:bg-[#EAE5DC] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => onQuickAdd(product, selectedVariant)}
              aria-label={`Add ${product.name} (${selectedVariant.label}) to bag`}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] text-xs font-medium bg-[#1B2421] text-[#FAF8F5] rounded-md hover:bg-[#2A3732] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2]" aria-hidden="true" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
