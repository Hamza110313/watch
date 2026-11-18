import { FormEvent, useState } from 'react';
import { CheckCircle2, Eye, EyeOff, LogOut, Plus } from 'lucide-react';
import { RegisteredMember, WatchCategory } from '../types/watch';
import { formatPKR } from '../utils/currency';

interface RegisterSectionProps {
  currentMember: RegisteredMember | null;
  accounts: RegisteredMember[];
  onRegisterAccount: (member: RegisteredMember) => void;
  onSignIn: (member: RegisteredMember) => void;
  onUpdateMember: (member: RegisteredMember) => void;
  onSignOut: () => void;
}

const PREFERRED_CATEGORIES: WatchCategory[] = [
  WatchCategory.MALE,
  WatchCategory.FEMALE,
  WatchCategory.KIDS,
  WatchCategory.WALL_CLOCKS,
  WatchCategory.OTHER,
];

const SIGNUP_PROGRAM_BENEFITS = [
  {
    index: '01.',
    title: 'PKR 5,000 Welcome Member Credit',
    detail:
      'Automatically applied to your first qualifying timepiece or wall clock order over PKR 30,000 at checkout.',
  },
  {
    index: '02.',
    title: 'Complimentary Insured Express Courier',
    detail:
      'Members enjoy zero courier fees (PKR 850 waived) on every order, regardless of cart subtotal.',
  },
  {
    index: '03.',
    title: 'Timepiece & 5-Year Warranty Registry',
    detail:
      'Bind any Vespera reference number to your collector profile for priority atelier servicing and small-batch alerts.',
  },
];

export function RegisterSection({
  currentMember,
  accounts,
  onRegisterAccount,
  onSignIn,
  onUpdateMember,
  onSignOut,
}: RegisterSectionProps) {
  const [authTab, setAuthTab] = useState<'register' | 'signin'>('register');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Register fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [preferredCategory, setPreferredCategory] = useState<WatchCategory>(WatchCategory.MALE);
  const [watchReference, setWatchReference] = useState('');
  const [receiveUpdates, setReceiveUpdates] = useState(true);

  // Sign-In fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Dashboard add-reference state
  const [newReference, setNewReference] = useState('');

  // Inline feedback
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenEdit = () => {
    if (!currentMember) return;
    setFullName(currentMember.fullName);
    setEmail(currentMember.email);
    setPhone(currentMember.phone);
    setPassword(currentMember.password);
    setConfirmPassword(currentMember.password);
    setAddress(currentMember.address);
    setPostalCode(currentMember.postalCode);
    setPreferredCategory(currentMember.preferredCategory);
    setReceiveUpdates(currentMember.receiveUpdates);
    setErrorMessage('');
    setIsEditingProfile(true);
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const normalizedEmail = email.trim().toLowerCase();

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both entries.');
      return;
    }

    if (isEditingProfile && currentMember) {
      const collidingAccount = accounts.find(
        (acc) =>
          acc.email.toLowerCase() === normalizedEmail &&
          acc.memberId !== currentMember.memberId
      );
      if (collidingAccount) {
        setErrorMessage('Another collector account already uses this email address.');
        return;
      }

      const updated: RegisteredMember = {
        ...currentMember,
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        password,
        address: address.trim(),
        postalCode: postalCode.trim(),
        preferredCategory,
        receiveUpdates,
      };
      onUpdateMember(updated);
      setIsEditingProfile(false);
      return;
    }

    const existingAccount = accounts.find(
      (acc) => acc.email.toLowerCase() === normalizedEmail
    );
    if (existingAccount) {
      setErrorMessage('An account with this email is already enrolled. Switch to Sign In.');
      return;
    }

    const initialRefs = watchReference.trim()
      ? [watchReference.trim().toUpperCase()]
      : [];

    const newMember: RegisteredMember = {
      memberId: `VH-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password,
      address: address.trim(),
      postalCode: postalCode.trim(),
      preferredCategory,
      registeredWatches: initialRefs,
      welcomeCreditAvailable: true,
      receiveUpdates,
      registeredAt: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    onRegisterAccount(newMember);
    setPassword('');
    setConfirmPassword('');
    setWatchReference('');
  };

  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const normalizedEmail = signInEmail.trim().toLowerCase();
    const matched = accounts.find(
      (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === signInPassword
    );

    if (!matched) {
      setErrorMessage('Invalid email or password. Register a new account or check your credentials.');
      return;
    }

    onSignIn(matched);
    setSignInPassword('');
  };

  const handleAddWatchRef = (e: FormEvent) => {
    e.preventDefault();
    if (!currentMember) return;
    const cleaned = newReference.trim().toUpperCase();
    if (!cleaned) return;
    if (currentMember.registeredWatches.includes(cleaned)) {
      setNewReference('');
      return;
    }
    onUpdateMember({
      ...currentMember,
      registeredWatches: [...currentMember.registeredWatches, cleaned],
    });
    setNewReference('');
  };

  const showDashboard = Boolean(currentMember && !isEditingProfile);

  return (
    <section id="register" className="border-t border-[#E5E1D8] bg-white scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column: Vespera Collector Sign-Up Program */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8C6A3B] mb-3">
              Vespera Sign-Up Program
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#141413] leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Join the Collector Sign-Up Program.
            </h2>
            <p className="text-sm sm:text-base text-[#5C5952] leading-relaxed mb-7 sm:mb-8 max-w-[46ch]">
              Register your profile to unlock an immediate PKR 5,000 welcome credit, complimentary insured courier on every piece, and lifetime timepiece warranty tracking.
            </p>

            <div className="space-y-5 border-t border-[#E5E1D8] pt-6">
              {SIGNUP_PROGRAM_BENEFITS.map((item) => (
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

          {/* Right Column: Signed-In Program Dashboard OR Register / Sign-In Forms */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] border border-[#E5E1D8] rounded-xl p-6 sm:p-8">
              {showDashboard && currentMember ? (
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#E5E1D8] mb-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#2D5A43] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#5C5952]">
                          {currentMember.memberId} · Founding Collector · Enrolled {currentMember.registeredAt}
                        </p>
                        <h3 className="font-display text-2xl font-semibold text-[#141413] mt-0.5">
                          Welcome, {currentMember.fullName}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingProfile(false);
                        onSignOut();
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[42px] text-xs font-medium text-[#141413] bg-white border border-[#E5E1D8] rounded-md hover:bg-[#EFECE6] transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  {/* Program Perks Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-white border border-[#E5E1D8] rounded-lg">
                      <p className="text-xs uppercase tracking-[0.08em] text-[#5C5952] mb-1">
                        Welcome Credit
                      </p>
                      <p className="font-mono text-lg font-semibold text-[#141413] tabular-nums">
                        {currentMember.welcomeCreditAvailable
                          ? `${formatPKR(5000)} Available`
                          : 'Redeemed'}
                      </p>
                      <p className="text-xs text-[#5C5952] mt-1">
                        {currentMember.welcomeCreditAvailable
                          ? 'Auto-applies in Bag on orders over PKR 30,000'
                          : 'Applied to your qualifying Vespera order'}
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-[#E5E1D8] rounded-lg">
                      <p className="text-xs uppercase tracking-[0.08em] text-[#5C5952] mb-1">
                        Courier Privilege
                      </p>
                      <p className="font-mono text-lg font-semibold text-[#141413]">
                        Complimentary
                      </p>
                      <p className="text-xs text-[#5C5952] mt-1">
                        Insured express delivery included on all orders
                      </p>
                    </div>
                  </div>

                  {/* Member Profile Summary */}
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6 pb-6 border-b border-[#E5E1D8]">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.08em] text-[#5C5952]">Email</dt>
                      <dd className="font-medium text-[#141413] mt-1">{currentMember.email}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.08em] text-[#5C5952]">Phone</dt>
                      <dd className="font-mono text-[#141413] tabular-nums mt-1">{currentMember.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.08em] text-[#5C5952]">Delivery Address</dt>
                      <dd className="font-medium text-[#141413] mt-1">
                        {currentMember.address}, {currentMember.postalCode}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.08em] text-[#5C5952]">Preferred Section</dt>
                      <dd className="font-medium text-[#141413] mt-1">
                        {currentMember.preferredCategory}
                      </dd>
                    </div>
                  </dl>

                  {/* Registered Timepieces & Warranty Registry */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#141413] mb-2.5">
                      Registered Timepieces ({currentMember.registeredWatches.length})
                    </p>
                    {currentMember.registeredWatches.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-3 text-xs font-mono text-[#141413]">
                        {currentMember.registeredWatches.map((ref, idx) => (
                          <span key={ref}>
                            Ref. {ref}
                            {idx < currentMember.registeredWatches.length - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#5C5952] mb-3">
                        No timepiece references linked yet. Add a reference below to activate 5-year warranty tracking.
                      </p>
                    )}

                    <form onSubmit={handleAddWatchRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={newReference}
                        onChange={(e) => setNewReference(e.target.value)}
                        placeholder="Add watch or clock ref (e.g. VH-401)"
                        aria-label="Add timepiece reference"
                        className="flex-1 px-3 py-2.5 min-h-[44px] text-base sm:text-xs bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs font-medium bg-[#1B2421] text-[#FAF8F5] rounded-md hover:bg-[#2A3732] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Register Ref</span>
                      </button>
                    </form>
                  </div>

                  <div className="pt-4 border-t border-[#E5E1D8] flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleOpenEdit}
                      className="px-4 py-2.5 min-h-[42px] text-xs font-medium bg-[#1B2421] text-[#FAF8F5] rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer"
                    >
                      Edit Profile Details
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Register / Sign In Tab Switcher */}
                  {!isEditingProfile && (
                    <div
                      role="tablist"
                      aria-label="Account registration or sign in"
                      className="grid grid-cols-2 gap-1 p-1 bg-[#EFECE6] rounded-lg mb-6"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={authTab === 'register'}
                        onClick={() => {
                          setAuthTab('register');
                          setErrorMessage('');
                        }}
                        className={`py-2.5 px-4 min-h-[42px] text-xs font-medium rounded-md transition-colors cursor-pointer ${
                          authTab === 'register'
                            ? 'bg-white text-[#141413] shadow-xs'
                            : 'text-[#5C5952] hover:text-[#141413]'
                        }`}
                      >
                        Register &amp; Enroll
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={authTab === 'signin'}
                        onClick={() => {
                          setAuthTab('signin');
                          setErrorMessage('');
                        }}
                        className={`py-2.5 px-4 min-h-[42px] text-xs font-medium rounded-md transition-colors cursor-pointer ${
                          authTab === 'signin'
                            ? 'bg-white text-[#141413] shadow-xs'
                            : 'text-[#5C5952] hover:text-[#141413]'
                        }`}
                      >
                        Member Sign In
                      </button>
                    </div>
                  )}

                  {errorMessage && (
                    <div
                      role="alert"
                      className="mb-4 px-3.5 py-2.5 rounded-md bg-[#FDF2F2] border border-[#E8C5C5] text-xs font-medium text-[#8C1D1D]"
                    >
                      {errorMessage}
                    </div>
                  )}

                  {authTab === 'signin' && !isEditingProfile ? (
                    <form onSubmit={handleSignInSubmit} className="space-y-4">
                      <div className="pb-2 border-b border-[#E5E1D8]">
                        <h3 className="font-display text-2xl font-semibold text-[#141413]">
                          Sign In to Collector Program
                        </h3>
                        <p className="text-xs text-[#5C5952] mt-1">
                          Access your PKR 5,000 welcome credit, saved delivery address, and registered references.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="signin-email" className="block text-xs font-medium text-[#5C5952] mb-1">
                          Email Address *
                        </label>
                        <input
                          id="signin-email"
                          type="email"
                          required
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="hamza@example.com"
                          className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                        />
                      </div>

                      <div>
                        <label htmlFor="signin-password" className="block text-xs font-medium text-[#5C5952] mb-1">
                          Password *
                        </label>
                        <div className="relative">
                          <input
                            id="signin-password"
                            type={showSignInPassword ? 'text' : 'password'}
                            required
                            value={signInPassword}
                            onChange={(e) => setSignInPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-3 pr-11 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignInPassword((prev) => !prev)}
                            aria-label={showSignInPassword ? 'Hide password' : 'Show password'}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#5C5952] hover:text-[#141413] cursor-pointer"
                          >
                            {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="submit"
                          className="px-6 py-3 min-h-[44px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer"
                        >
                          Sign In
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthTab('register');
                            setErrorMessage('');
                          }}
                          className="text-xs font-medium text-[#8C6A3B] hover:text-[#141413] transition-colors cursor-pointer"
                        >
                          New collector? Register here
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-[#E5E1D8]">
                        <h3 className="font-display text-2xl font-semibold text-[#141413]">
                          {isEditingProfile ? 'Update Member Profile' : 'Register & Join Sign-Up Program'}
                        </h3>
                        <span className="text-xs text-[#5C5952]">* Required</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="reg-name" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Full Name *
                          </label>
                          <input
                            id="reg-name"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Hamza Siddiqui"
                            className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                          />
                        </div>

                        <div>
                          <label htmlFor="reg-email" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Email Address *
                          </label>
                          <input
                            id="reg-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hamza@example.com"
                            className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="reg-phone" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Phone Number *
                          </label>
                          <input
                            id="reg-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+92 300 4819204"
                            className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                          />
                        </div>

                        <div>
                          <label htmlFor="reg-category" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Preferred Collection
                          </label>
                          <select
                            id="reg-category"
                            value={preferredCategory}
                            onChange={(e) => setPreferredCategory(e.target.value as WatchCategory)}
                            className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B] cursor-pointer"
                          >
                            {PREFERRED_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="reg-password" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Password * (min. 8 chars)
                          </label>
                          <div className="relative">
                            <input
                              id="reg-password"
                              type={showPassword ? 'text' : 'password'}
                              required
                              minLength={8}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full pl-3 pr-11 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#5C5952] hover:text-[#141413] cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="reg-confirm-password" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Confirm Password *
                          </label>
                          <input
                            id="reg-confirm-password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            minLength={8}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label htmlFor="reg-address" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Street Address &amp; City *
                          </label>
                          <input
                            id="reg-address"
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="House 18, Street 4, Gulberg III, Lahore"
                            className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                          />
                        </div>

                        <div>
                          <label htmlFor="reg-postal" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Postal Code *
                          </label>
                          <input
                            id="reg-postal"
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="54660"
                            className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                          />
                        </div>
                      </div>

                      {!isEditingProfile && (
                        <div>
                          <label htmlFor="reg-ref" className="block text-xs font-medium text-[#5C5952] mb-1">
                            Existing Watch or Wall Clock Reference (Optional)
                          </label>
                          <input
                            id="reg-ref"
                            type="text"
                            value={watchReference}
                            onChange={(e) => setWatchReference(e.target.value)}
                            placeholder="e.g. VH-401 or VH-701"
                            className="w-full px-3 py-2.5 min-h-[44px] text-base sm:text-sm bg-white border border-[#E5E1D8] rounded-md text-[#141413] focus:outline-none focus:border-[#8C6A3B]"
                          />
                        </div>
                      )}

                      <label className="flex items-start gap-2.5 pt-1 text-xs text-[#5C5952] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={receiveUpdates}
                          onChange={(e) => setReceiveUpdates(e.target.checked)}
                          className="mt-0.5 rounded border-[#D3CBBF] accent-[#1B2421]"
                        />
                        <span>
                          Enroll in small-batch release notices, PKR 5,000 welcome credit, and 5-year warranty updates.
                        </span>
                      </label>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          className="px-6 py-3 min-h-[44px] bg-[#1B2421] text-[#FAF8F5] text-sm font-medium rounded-md hover:bg-[#2A3732] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A3B]"
                        >
                          {isEditingProfile ? 'Save Profile Changes' : 'Register & Claim PKR 5,000 Credit'}
                        </button>
                        {isEditingProfile && (
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-4 py-3 min-h-[44px] text-sm font-medium text-[#5C5952] hover:text-[#141413] transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
