import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import {
  OrderConfirmation,
  RegisteredMember,
  ReturnRequest,
  ReturnResolution,
} from '../types/watch';
import { formatPKR } from '../utils/currency';

interface ReturnsSectionProps {
  currentMember: RegisteredMember | null;
  recentOrders: OrderConfirmation[];
  returnRequests: ReturnRequest[];
  onSubmitReturn: (request: ReturnRequest) => void;
}

const RETURN_WINDOW_DAYS = 90;

const RETURN_POLICY_POINTS = [
  {
    index: '01.',
    title: '90-Day Unworn Home Inspection',
    detail:
      'Every wristwatch, wall clock, and winder may be returned within 90 calendar days of delivery provided factory protective seals remain intact.',
  },
  {
    index: '02.',
    title: 'Complimentary Insured Courier Pickup',
    detail:
      'Once approved below, we schedule a sealed, insured courier collection from your doorstep anywhere across Pakistan at zero cost.',
  },
  {
    index: '03.',
    title: 'Full PKR Refund or Direct Exchange',
    detail:
      'Receive a full refund in PKR to your original payment method or bank account within 5 business days of atelier inspection, or swap strap/reference.',
  },
];

const RETURN_REASONS = [
  'Proportion or wrist fit adjustment',
  'Dial finish or strap preference',
  'Gift exchange for another collection',
  'Order discrepancy or transit concern',
  'Changed mind within 90-day period',
];

export function ReturnsSection({
  currentMember,
  recentOrders,
  returnRequests,
  onSubmitReturn,
}: ReturnsSectionProps) {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [watchReference, setWatchReference] = useState('');
  const [daysSinceDelivery, setDaysSinceDelivery] = useState<number>(12);
  const [reason, setReason] = useState(RETURN_REASONS[0]);
  const [resolution, setResolution] = useState<ReturnResolution>('refund');
  const [conditionConfirmed, setConditionConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [latestRequest, setLatestRequest] = useState<ReturnRequest | null>(null);

  useEffect(() => {
    if (currentMember && !email) {
      setEmail(currentMember.email);
    }
  }, [currentMember, email]);

  const parsedDays = Number.isFinite(daysSinceDelivery) ? Math.max(0, daysSinceDelivery) : 0;
  const isWithinWindow = parsedDays <= RETURN_WINDOW_DAYS;
  const daysRemaining = Math.max(0, RETURN_WINDOW_DAYS - parsedDays);

  const handlePrefillOrder = (order: OrderConfirmation) => {
    setOrderNumber(order.orderNumber);
    setEmail(order.email);
    setDaysSinceDelivery(0);
    setErrorMessage('');
    setLatestRequest(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isWithinWindow) {
      setErrorMessage(
        `This purchase is ${parsedDays} days past delivery, which exceeds our 90-day return window. Please contact atelier servicing for care options.`
      );
      return;
    }

    if (!conditionConfirmed) {
      setErrorMessage(
        'Please confirm that the timepiece or clock is unworn with original box and tags intact.'
      );
      return;
    }

    const newRequest: ReturnRequest = {
      returnId: `RET-${Math.floor(1000 + Math.random() * 9000)}`,
      orderNumber: orderNumber.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      watchReference: watchReference.trim().toUpperCase() || 'ORDER-FULL',
      daysSinceDelivery: parsedDays,
      reason,
      resolution,
      conditionConfirmed,
      submittedAt: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      status: 'Approved for Pickup',
    };

    onSubmitReturn(newRequest);
    setLatestRequest(newRequest);
    setOrderNumber('');
    setWatchReference('');
    setConditionConfirmed(false);
  };

  return (
    <section id="returns" className="border-t border-[#E5E1D8] bg-[#F4F1EB] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column: 90-Day Return Guarantee Policy */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8C6A3B] mb-3">
              90-Day Return Guarantee
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#141413] leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Return or exchange within 90 days.
            </h2>
            <p className="text-sm sm:text-base text-[#5C5952] leading-relaxed mb-7 sm:mb-8 max-w-[46ch]">
              Selecting a timepiece or wall clock should feel effortless. Every Vespera order includes a 90-day unworn return window with complimentary insured pickup.
            </p>

            <div className="space-y-5 border-t border-[#DFD9CE] pt-6">
              {RETURN_POLICY_POINTS.map((item) => (
                <div key={item.index} className="grid grid-cols-12 gap-3">
                  <span className="col-span-2 sm:col-span-1 font-mono text-xs font-medium text-[#8C6A3B] pt-0.5 tabular-nums">
                    {item.index}
                  </span>
                  <div className="col-span-10 sm:col-span-11">
                    <h3 className="text-sm font-semibold text-[#141413] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5C5952] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive 90-Day Return Request Portal */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5E1D8] rounded-xl p-6 sm:p-8">
              {latestRequest ? (
                <div>
                  <div className="flex items-start gap-3 pb-5 border-b border-[#E5E1D8] mb-6">
                    <CheckCircle2 className="w-6 h-6 text-[#2D5A43] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#5C5952]">
                        {latestRequest.returnId} · {latestRequest.status}
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-[#141413] mt-0.5">
                        90-Day Return Scheduled
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-[#5C5952] leading-relaxed mb-6">
                    Your insured return pickup for order{' '}
                    <span className="font-mono font-medium text-[#141413]">
                      {latestRequest.orderNumber}
                    </span>{' '}
                    has been registered within our 90-day window ({latestRequest.daysSinceDelivery} days since delivery). Courier pickup details have been dispatched to{' '}
                    <span className="font-medium text-[#141413]">{latestRequest.email}</span>.
                  </p>

                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#FAF8F5] border border-[#E5E1D8] rounded-lg p-4 mb-6">
                    <div>
                      <dt className="text-[#5C5952] uppercase tracking-[0.08em]">Return ID</dt>
                      <dd className="font-mono font-semibold text-[#141413] mt-1">
                        {latestRequest.returnId}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#5C5952] uppercase tracking-[0.08em]">Timepiece Ref</dt>
                      <dd className="font-mono font-medium text-[#141413] mt-1">
                        {latestRequest.watchReference}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#5C5952] uppercase tracking-[0.08em]">Resolution</dt>
                      <dd className="font-medium text-[#141413] mt-1">
                        {latestRequest.resolution === 'refund' && 'Full PKR Refund'}
                        {latestRequest.resolution === 'exchange' && 'Reference / Size Exchange'}
                        {latestRequest.resolution === 'credit' && 'PKR Atelier Credit'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#5C5952] uppercase tracking-[0.08em]">Reason</dt>
                      <dd className="font-medium text-[#141413] mt-1">{latestRequest.reason}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => setLatestRequest(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[42px] bg-[#1B2421] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Submit Another Return</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-[#E5E1D8]">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-[#141413]">
                        Initiate a 90-Day Return
                      </h3>
                      <p className="text-xs text-[#5C5952] mt-0.5">
                        Verify eligibility and schedule complimentary insured pickup.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#8C6A3B] tabular-nums">
                      Max 90 Days
                    </span>
                  </div>

                  {recentOrders.length > 0 && (
                    <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E1D8]">
                      <p className="text-xs font-medium text-[#141413] mb-2">
                        Recent Orders Eligible for 90-Day Return (click to pre-fill):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recentOrders.slice(0, 3).map((ord) => (
                          <button
                            key={ord.orderNumber}
                            type="button"
                            onClick={() => handlePrefillOrder(ord)}
                            className="px-3 py-1.5 min-h-[34px] text-xs font-mono bg-white border border-[#E5E1D8] rounded-md text-[#141413] hover:border-[#8C6A3B] transition-colors cursor-pointer"
                          >
                            {ord.orderNumber} · {formatPKR(ord.total)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <div
                      role="alert"
                      className="px-3.5 py-2.5 rounded-md bg-[#FDF2F2] border border-[#E8C5C5] text-xs font-medium text-[#8C1D1D]"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ret-order" className="block text-xs font-medium text-[#5C5952] mb-1">
                        Order Number *
                      </label>
                      <input
                        id="ret-order"
                        type="text"
                        required
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="VH-4812"
                        className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] font-mono focus:outline-none focus:border-[#8C6A3B]"
                      />
                    </div>

                    <div>
                      <label htmlFor="ret-email" className="block text-xs font-medium text-[#5C5952] mb-1">
                        Order Email *
                      </label>
                      <input
                        id="ret-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hamza@example.com"
                        className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ret-ref" className="block text-xs font-medium text-[#5C5952] mb-1">
                        Timepiece / Clock Reference
                      </label>
                      <input
                        id="ret-ref"
                        type="text"
                        value={watchReference}
                        onChange={(e) => setWatchReference(e.target.value)}
                        placeholder="e.g. VH-408 or VH-701"
                        className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] font-mono focus:outline-none focus:border-[#8C6A3B]"
                      />
                    </div>

                    <div>
                      <label htmlFor="ret-days" className="block text-xs font-medium text-[#5C5952] mb-1">
                        Days Since Delivery *
                      </label>
                      <input
                        id="ret-days"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={365}
                        required
                        value={daysSinceDelivery}
                        onChange={(e) => setDaysSinceDelivery(Number(e.target.value))}
                        className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] font-mono tabular-nums focus:outline-none focus:border-[#8C6A3B]"
                      />
                    </div>
                  </div>

                  {/* Live 90-Day Window Eligibility Indicator */}
                  <div
                    className={`px-3.5 py-2.5 rounded-md border text-xs ${
                      isWithinWindow
                        ? 'bg-[#FAF8F5] border-[#E5E1D8] text-[#141413]'
                        : 'bg-[#FDF2F2] border-[#E8C5C5] text-[#8C1D1D]'
                    }`}
                  >
                    {isWithinWindow ? (
                      <span>
                        Eligible under 90-Day Guarantee —{' '}
                        <span className="font-mono font-semibold tabular-nums">
                          {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
                        </span>{' '}
                        remaining in your return window.
                      </span>
                    ) : (
                      <span>
                        Outside 90-day return window ({parsedDays} days elapsed). Eligible for 5-year atelier servicing only.
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ret-reason" className="block text-xs font-medium text-[#5C5952] mb-1">
                        Reason for Return
                      </label>
                      <select
                        id="ret-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-[#FAF8F5] border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B] cursor-pointer"
                      >
                        {RETURN_REASONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="block text-xs font-medium text-[#5C5952] mb-1">
                        Preferred Resolution
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(
                          [
                            { id: 'refund', label: 'Refund' },
                            { id: 'exchange', label: 'Exchange' },
                            { id: 'credit', label: 'Credit' },
                          ] as const
                        ).map((opt) => {
                          const active = resolution === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setResolution(opt.id)}
                              className={`py-2.5 px-2 min-h-[44px] text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                                active
                                  ? 'border-[#1B2421] bg-[#1B2421] text-[#FAF8F5]'
                                  : 'border-[#E5E1D8] bg-[#FAF8F5] text-[#5C5952] hover:text-[#141413]'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 pt-1 text-xs text-[#5C5952] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={conditionConfirmed}
                      onChange={(e) => setConditionConfirmed(e.target.checked)}
                      className="mt-0.5 rounded border-[#D3CBBF] accent-[#1B2421]"
                    />
                    <span>
                      I confirm the watch or clock is unworn, unmounted, and packed in its original presentation box with seals intact.
                    </span>
                  </label>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isWithinWindow}
                      className={`px-6 py-3 min-h-[44px] text-sm font-medium rounded-md transition-colors ${
                        isWithinWindow
                          ? 'bg-[#1B2421] text-[#FAF8F5] hover:bg-[#2A3732] cursor-pointer'
                          : 'bg-[#E5E1D8] text-[#8A857C] cursor-not-allowed'
                      }`}
                    >
                      Request 90-Day Return Pickup
                    </button>
                  </div>
                </form>
              )}

              {returnRequests.length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#E5E1D8]">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141413] mb-3">
                    Submitted Return Requests ({returnRequests.length})
                  </p>
                  <ul className="space-y-2">
                    {returnRequests.slice(0, 4).map((req) => (
                      <li
                        key={req.returnId}
                        className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-md bg-[#FAF8F5] border border-[#E5E1D8] text-xs"
                      >
                        <div className="flex items-center gap-2 font-mono text-[#141413]">
                          <span className="font-semibold">{req.returnId}</span>
                          <span className="text-[#8A857C]">·</span>
                          <span>Order {req.orderNumber}</span>
                          <span className="text-[#8A857C]">·</span>
                          <span>{req.daysSinceDelivery}d window</span>
                        </div>
                        <span className="font-medium text-[#2D5A43]">{req.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
