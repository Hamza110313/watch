import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem, OrderConfirmation, PaymentMethod, RegisteredMember } from '../types/watch';
import { formatPKR } from '../utils/currency';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  registeredMember?: RegisteredMember | null;
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
  onRedeemWelcomeCredit?: () => void;
  onOrderPlaced?: (order: OrderConfirmation) => void;
}

const FREE_SHIPPING_THRESHOLD = 25000;
const SHIPPING_FEE = 850;
const WELCOME_CREDIT_AMOUNT = 5000;
const WELCOME_CREDIT_MIN_SUBTOTAL = 30000;

export function CartDrawer({
  isOpen,
  onClose,
  items,
  registeredMember,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onRedeemWelcomeCredit,
  onOrderPlaced,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const hadMemberRef = useRef(Boolean(registeredMember));

  useEffect(() => {
    if (registeredMember) {
      setFullName(registeredMember.fullName);
      setEmail(registeredMember.email);
      setPhone(registeredMember.phone);
      setAddress(registeredMember.address);
      setPostalCode(registeredMember.postalCode);
      hadMemberRef.current = true;
    } else if (hadMemberRef.current) {
      setFullName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setPostalCode('');
      hadMemberRef.current = false;
    }
  }, [registeredMember]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0 && step === 'confirmed') {
      setStep('bag');
      setConfirmation(null);
    }
    if (items.length === 0 && step === 'checkout') {
      setStep('bag');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const qualifiesMemberFreeShipping = Boolean(registeredMember);
  const qualifiesFreeShipping =
    qualifiesMemberFreeShipping || subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingCost = qualifiesFreeShipping ? 0 : SHIPPING_FEE;

  const welcomeDiscount =
    registeredMember?.welcomeCreditAvailable && subtotal >= WELCOME_CREDIT_MIN_SUBTOTAL
      ? WELCOME_CREDIT_AMOUNT
      : 0;

  const grandTotal = Math.max(0, subtotal - welcomeDiscount + shippingCost);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    const orderNum = `VH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderConfirmation = {
      orderNumber: orderNum,
      customerName: fullName.trim(),
      email: email.trim(),
      address: `${address.trim()}, ${postalCode.trim()}`,
      paymentMethod,
      total: grandTotal,
      itemCount: totalCount,
      placedAt: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    setConfirmation(newOrder);
    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
    if (welcomeDiscount > 0 && onRedeemWelcomeCredit) {
      onRedeemWelcomeCredit();
    }
    onClearCart();
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
    setStep('confirmed');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag and checkout"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-[100dvh] bg-[#FAF8F5] border-l border-[#E5E1D8] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-[#E5E1D8] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to shopping bag"
                className="inline-flex items-center justify-center w-9 h-9 -ml-1.5 rounded-md text-[#5C5952] hover:text-[#141413] hover:bg-[#F1EFEA] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-2xl font-semibold text-[#141413]">
              {step === 'bag' && `Your Bag (${totalCount})`}
              {step === 'checkout' && 'Insured Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag drawer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#5C5952] hover:text-[#141413] hover:bg-[#F1EFEA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
          {step === 'confirmed' && confirmation && (
            <div className="bg-white border border-[#E5E1D8] rounded-lg p-5 sm:p-6">
              <div className="flex items-center gap-2.5 text-[#1B2421] mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#2D5A43] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#5C5952]">
                    Order #{confirmation.orderNumber} Confirmed
                  </p>
                  <p className="text-base font-semibold text-[#141413]">
                    Preparing Insured Shipment
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#5C5952] leading-relaxed mb-5">
                Thank you, {confirmation.customerName}. A dispatch dossier and tracking reference have been sent to {confirmation.email}.
              </p>

              <dl className="space-y-2.5 text-xs border-t border-[#E5E1D8] pt-4 mb-6">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#5C5952]">Pieces Ordered</dt>
                  <dd className="font-mono font-medium text-[#141413] tabular-nums">
                    {confirmation.itemCount}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#5C5952]">Delivery Destination</dt>
                  <dd className="font-medium text-[#141413] text-right">
                    {confirmation.address}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#5C5952]">Payment Method</dt>
                  <dd className="font-medium text-[#141413]">
                    {confirmation.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Insured Card'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#5C5952]">Return Privilege</dt>
                  <dd className="font-medium text-[#141413]">90-Day Unworn Returns</dd>
                </div>
                <div className="flex justify-between gap-4 pt-2 border-t border-[#EFECE6]">
                  <dt className="font-semibold text-[#141413]">Total</dt>
                  <dd className="font-mono font-semibold text-[#141413] tabular-nums">
                    {formatPKR(confirmation.total)}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => {
                  setStep('bag');
                  onClose();
                }}
                className="w-full py-3 px-4 min-h-[44px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          )}

          {step === 'bag' && items.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#8C6A3B]">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="font-display text-2xl font-semibold text-[#141413] mb-2">
                Your bag is currently empty
              </p>
              <p className="text-sm text-[#5C5952] mb-6 max-w-[30ch] mx-auto">
                Explore our Male, Female, Kids, Wall Clocks, and horological object collections.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 min-h-[44px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          )}

          {step === 'bag' && items.length > 0 && (
            <div className="space-y-4">
              {/* Sign-up Program or Free shipping threshold notice */}
              <div className="px-4 py-3 rounded-md bg-white border border-[#E5E1D8] text-xs text-[#5C5952]">
                {registeredMember ? (
                  <span>
                    Member privilege active ({registeredMember.memberId}): Complimentary insured courier
                    {welcomeDiscount > 0 ? ' + PKR 5,000 welcome credit applied.' : '.'}
                  </span>
                ) : qualifiesFreeShipping ? (
                  <span>
                    Complimentary insured courier delivery unlocked (orders over PKR 25,000).
                  </span>
                ) : (
                  <span>
                    Add <span className="font-mono font-medium text-[#141413] tabular-nums">{formatPKR(FREE_SHIPPING_THRESHOLD - subtotal)}</span> more for complimentary insured courier delivery.
                  </span>
                )}
              </div>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.variant.id}`}
                    className="flex gap-3.5 sm:gap-4 p-3.5 bg-white border border-[#E5E1D8] rounded-lg"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-[#F1EFEA] shrink-0 border border-[#EFECE6]">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#141413] truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-[#5C5952] truncate">
                            {item.product.category} · {item.variant.label}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.variant.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="inline-flex items-center justify-center w-9 h-9 -mt-1 -mr-1 text-[#5C5952] hover:text-[#9E2A2B] transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-3">
                        <div className="inline-flex items-center border border-[#E5E1D8] rounded-md bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.variant.id, -1)}
                            aria-label="Decrease quantity"
                            className="w-9 h-9 inline-flex items-center justify-center text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-medium tabular-nums text-[#141413]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.variant.id, 1)}
                            aria-label="Increase quantity"
                            className="w-9 h-9 inline-flex items-center justify-center text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-medium text-[#141413] tabular-nums">
                          {formatPKR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 'checkout' && items.length > 0 && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              {registeredMember && (
                <div className="px-4 py-3 rounded-md bg-white border border-[#E5E1D8] text-xs text-[#5C5952]">
                  Pre-filled from your Collector Profile ({registeredMember.memberId}).
                </div>
              )}

              <div className="bg-white border border-[#E5E1D8] rounded-lg p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141413]">
                  Payment Terms
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2.5 px-3 min-h-[44px] text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#1B2421] bg-[#1B2421] text-[#FAF8F5]'
                        : 'border-[#E5E1D8] bg-[#FAF8F5] text-[#141413] hover:border-[#B9B2A6]'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 min-h-[44px] text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#1B2421] bg-[#1B2421] text-[#FAF8F5]'
                        : 'border-[#E5E1D8] bg-[#FAF8F5] text-[#141413] hover:border-[#B9B2A6]'
                    }`}
                  >
                    Insured Card
                  </button>
                </div>

                {paymentMethod === 'cod' ? (
                  <p className="text-xs text-[#5C5952] leading-relaxed">
                    Pay {formatPKR(grandTotal)} upon insured courier handoff across Pakistan. Phone verification is required before dispatch.
                  </p>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label htmlFor="card-number" className="block text-xs font-medium text-[#5C5952] mb-1">
                        Card Number
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        required={paymentMethod === 'card'}
                        minLength={12}
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm font-mono bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="card-expiry" className="block text-xs font-medium text-[#5C5952] mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          id="card-expiry"
                          type="text"
                          inputMode="numeric"
                          required={paymentMethod === 'card'}
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="09/29"
                          className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm font-mono bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                        />
                      </div>
                      <div>
                        <label htmlFor="card-cvc" className="block text-xs font-medium text-[#5C5952] mb-1">
                          Security Code
                        </label>
                        <input
                          id="card-cvc"
                          type="password"
                          inputMode="numeric"
                          required={paymentMethod === 'card'}
                          minLength={3}
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm font-mono bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border border-[#E5E1D8] rounded-lg p-4 space-y-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141413]">
                  Delivery Verification
                </p>

                <div>
                  <label htmlFor="checkout-name" className="block text-xs font-medium text-[#5C5952] mb-1">
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Amina Tariq"
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-medium text-[#5C5952] mb-1">
                      Email
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amina@example.com"
                      className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="block text-xs font-medium text-[#5C5952] mb-1">
                      Phone
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 4819204"
                      className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-address" className="block text-xs font-medium text-[#5C5952] mb-1">
                    Street Address &amp; City
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House 18, Street 4, Gulberg III, Lahore"
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                  />
                </div>

                <div>
                  <label htmlFor="checkout-postal" className="block text-xs font-medium text-[#5C5952] mb-1">
                    Postal Code
                  </label>
                  <input
                    id="checkout-postal"
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="54660"
                    className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {step !== 'confirmed' && items.length > 0 && (
          <div className="px-4 sm:px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-white border-t border-[#E5E1D8] space-y-3 shrink-0">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#5C5952]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#141413]">{formatPKR(subtotal)}</span>
              </div>
              {welcomeDiscount > 0 && (
                <div className="flex justify-between text-[#2D5A43]">
                  <span>Sign-Up Welcome Credit</span>
                  <span className="font-mono tabular-nums">-{formatPKR(welcomeDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#5C5952]">
                <span>Insured Courier</span>
                <span className="font-mono tabular-nums text-[#141413]">
                  {shippingCost === 0 ? 'Complimentary' : formatPKR(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EFECE6] font-semibold text-[#141413]">
                <span>Total</span>
                <span className="font-mono tabular-nums">{formatPKR(grandTotal)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 px-4 min-h-[46px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3 px-4 min-h-[46px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer"
              >
                Place Order — {formatPKR(grandTotal)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
