import React, { useMemo, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Loader2, Landmark, CircleDollarSign, X } from 'lucide-react';
import { PaymentPageCopy } from '../utils/pageContent';
import { Logo } from './Logo';
import { COUNTRIES } from '../utils/countries';

type PlanId = 'basic' | 'pro';
type PaymentMethod = 'card' | 'paypal' | 'bank';
type BankMethod = 'interac' | 'online';
type ToastState = { type: 'success' | 'error'; message: string } | null;

interface PaymentPageProps {
  copy?: PaymentPageCopy;
  initialPlan?: PlanId;
  onBack: () => void;
  onGoDashboard: () => void;
  onPaymentSuccess: (plan: PlanId, method: PaymentMethod) => void;
}

const CANADA_POSTAL_REGEX = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
const BANKS = ['RBC', 'TD', 'Scotiabank', 'BMO', 'CIBC', 'National Bank', 'Desjardins'];

function createInteracReference() {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `BORDERAI-${digits}`;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function MastercardIcon() {
  return (
    <span className="relative inline-flex h-4 w-7">
      <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#EB001B]" />
      <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#F79E1B]" />
    </span>
  );
}

export function PaymentPage({ copy, initialPlan = 'basic', onBack, onGoDashboard, onPaymentSuccess }: PaymentPageProps) {
  const headerTitle = copy?.headerTitle || 'Choose your plan and pay';
  const backButtonLabel = copy?.backButtonLabel || 'Back to plans';
  const supportEmail = copy?.supportEmail || 'billing@border-ai.com';
  const secondaryButtonLabel = copy?.secondaryButtonLabel || 'Go to dashboard';
  const secondaryNote = copy?.secondaryNote || 'Takes you to eligibility check result page.';
  const basicFeatures = copy?.basicFeatures || [
    'AI-powered eligibility check',
    'Personalized visa checklist',
    'Document organization hub',
    'Update and reminders'
  ];
  const proFeatures = copy?.proFeatures || [
    'Everything in Basic',
    'Unlimited document workspaces',
    'Real-time status insights',
    'Advisor marketplace priority'
  ];
  const termsBullets = copy?.termsBullets || [
    'Subscriptions renew automatically every billing cycle.',
    'You can cancel anytime from your account settings.',
    'Taxes may apply based on your province.',
    'Border AI services are informational and not legal advice.'
  ];

  const [selectedPlan, setSelectedPlan] = useState<PlanId>(initialPlan);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [bankMethod, setBankMethod] = useState<BankMethod>('interac');
  const [interacSent, setInteracSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [billing, setBilling] = useState({
    email: '',
    fullName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    country: ''
  });

  const [card, setCard] = useState({
    nameOnCard: '',
    number: '',
    expiry: '',
    cvc: '',
    postalCode: ''
  });

  const [bankPayer, setBankPayer] = useState({
    fullName: '',
    email: '',
    onlineBank: ''
  });

  const interacReference = useMemo(() => createInteracReference(), []);
  const selectedPrice = selectedPlan === 'basic' ? 19 : 99;
  const tax = 0;
  const total = selectedPrice + tax;

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!billing.email.trim()) nextErrors.billingEmail = 'Email is required.';
    if (!billing.fullName.trim()) nextErrors.billingFullName = 'Full name is required.';
    if (!billing.address1.trim()) nextErrors.billingAddress1 = 'Address line 1 is required.';
    if (!billing.city.trim()) nextErrors.billingCity = 'City is required.';
    if (!billing.province.trim()) nextErrors.billingProvince = 'Province is required.';
    if (!billing.country.trim()) nextErrors.billingCountry = 'Country is required.';
    if (!billing.postalCode.trim()) {
      nextErrors.billingPostalCode = 'Postal code is required.';
    } else if (billing.country === 'Canada' && !CANADA_POSTAL_REGEX.test(billing.postalCode.trim())) {
      nextErrors.billingPostalCode = 'Use Canadian format (e.g., A1A 1A1).';
    }

    if (paymentMethod === 'card') {
      if (!card.nameOnCard.trim()) nextErrors.cardName = 'Name on card is required.';
      if (card.number.replace(/\D/g, '').length !== 16) nextErrors.cardNumber = 'Enter a valid 16-digit card number.';
      const expiryMatch = card.expiry.match(/^(\d{2})\/(\d{2})$/);
      if (!expiryMatch) {
        nextErrors.cardExpiry = 'Use MM/YY format.';
      } else {
        const month = Number(expiryMatch[1]);
        if (month < 1 || month > 12) {
          nextErrors.cardExpiry = 'Enter a valid month.';
        }
      }
      if (!/^\d{3,4}$/.test(card.cvc)) nextErrors.cardCvc = 'Enter a valid CVC.';
      if (!card.postalCode.trim()) {
        nextErrors.cardPostal = 'Postal code is required.';
      } else if (billing.country === 'Canada' && !CANADA_POSTAL_REGEX.test(card.postalCode.trim())) {
        nextErrors.cardPostal = 'Use Canadian format (e.g., A1A 1A1).';
      }
    }

    if (paymentMethod === 'bank') {
      if (!bankPayer.fullName.trim()) nextErrors.bankName = 'Payer full name is required.';
      if (!bankPayer.email.trim()) nextErrors.bankEmail = 'Payer email is required.';
      if (bankMethod === 'online' && !bankPayer.onlineBank) nextErrors.onlineBank = 'Please choose a bank.';
      if (!interacSent) nextErrors.bankSent = 'Please confirm transfer before activating.';
    }

    return nextErrors;
  };

  const isFormValid = Object.keys(validate()).length === 0;

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    window.setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      showToast('error', 'Please fix the highlighted fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (paymentMethod === 'paypal') {
        showToast('success', 'Redirecting to PayPal...');
        await wait(1100);
      } else {
        await wait(900);
      }
      showToast('success', 'Payment successful. Subscription activated.');
      await wait(500);
      onPaymentSuccess(selectedPlan, paymentMethod);
    } catch {
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf9f6] text-[#151515]">
      {toast ? (
        <div
          className={`fixed right-4 top-4 z-50 rounded-xl border px-4 py-3 text-sm shadow-lg ${
            toast.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-[76rem] space-y-6 p-6 md:p-8">
        <div className="relative flex h-10 items-center">
          <Button
            aria-label={backButtonLabel}
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-xl border-[#eadfd8] bg-white p-0 text-[#151515] hover:bg-[#fbe6da]"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo className="h-12" />
          </div>
        </div>

        <h1 className="text-3xl font-bold">{headerTitle}</h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Card className="rounded-xl border border-[#eadfd8] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <h2 className="text-xl font-semibold">Plan selection</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlan('basic')}
                  className={`rounded-xl border p-4 text-left transition ${
                    selectedPlan === 'basic'
                      ? 'border-[#d9713d] bg-[#fbe6da]'
                      : 'border-[#eadfd8] bg-white hover:border-[#d9713d]'
                  }`}
                >
                  <p className="text-xl font-bold">Basic</p>
                  <p className="mt-1 text-lg font-semibold">$19/case</p>
                  <ul className="mt-3 space-y-1 text-sm text-[#5f5f5f]">
                    {basicFeatures.map((feature) => (
                      <li key={feature}>- {feature}</li>
                    ))}
                  </ul>
                  {selectedPlan === 'basic' ? <p className="mt-3 text-sm font-semibold text-[#b4572b]">Selected</p> : null}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan('pro')}
                  className={`rounded-xl border p-4 text-left transition ${
                    selectedPlan === 'pro'
                      ? 'border-[#d9713d] bg-[#fbe6da]'
                      : 'border-[#eadfd8] bg-white hover:border-[#d9713d]'
                  }`}
                >
                  <p className="text-xl font-bold">Pro</p>
                  <p className="mt-1 text-lg font-semibold">$99/case</p>
                  <ul className="mt-3 space-y-1 text-sm text-[#5f5f5f]">
                    {proFeatures.map((feature) => (
                      <li key={feature}>- {feature}</li>
                    ))}
                  </ul>
                  {selectedPlan === 'pro' ? <p className="mt-3 text-sm font-semibold text-[#b4572b]">Selected</p> : null}
                </button>
              </div>
            </Card>

            <Card className="rounded-xl border border-[#eadfd8] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <h2 className="text-xl font-semibold">Payment method</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`rounded-xl border p-3 text-left ${
                    paymentMethod === 'paypal' ? 'border-[#d9713d] bg-[#fbe6da]' : 'border-[#eadfd8]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-[#d9713d]" />
                    <p className="font-semibold">PayPal</p>
                  </div>
                  <p className="mt-1 text-xs text-[#5f5f5f]">Pay via your PayPal account</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`rounded-xl border p-3 text-left ${
                    paymentMethod === 'card' ? 'border-[#d9713d] bg-[#fbe6da]' : 'border-[#eadfd8]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MastercardIcon />
                    <p className="font-semibold">Card</p>
                  </div>
                  <p className="mt-1 text-xs text-[#5f5f5f]">Mastercard + other cards</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`rounded-xl border p-3 text-left ${
                    paymentMethod === 'bank' ? 'border-[#d9713d] bg-[#fbe6da]' : 'border-[#eadfd8]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-[#d9713d]" />
                    <p className="font-semibold">Canadian bank</p>
                  </div>
                  <p className="mt-1 text-xs text-[#5f5f5f]">Interac or online banking</p>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="card-name">Name on card</Label>
                    <Input
                      id="card-name"
                      value={card.nameOnCard}
                      onChange={(event) => setCard((prev) => ({ ...prev, nameOnCard: event.target.value }))}
                    />
                    {errors.cardName ? <p className="mt-1 text-xs text-red-600">{errors.cardName}</p> : null}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="card-number">Card number</Label>
                    <Input
                      id="card-number"
                      value={card.number}
                      onChange={(event) => setCard((prev) => ({ ...prev, number: formatCardNumber(event.target.value) }))}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber ? <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p> : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">Expiry (MM/YY)</Label>
                    <Input
                      id="card-expiry"
                      value={card.expiry}
                      onChange={(event) => setCard((prev) => ({ ...prev, expiry: formatExpiry(event.target.value) }))}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry ? <p className="mt-1 text-xs text-red-600">{errors.cardExpiry}</p> : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-cvc">CVC</Label>
                    <Input
                      id="card-cvc"
                      value={card.cvc}
                      onChange={(event) => setCard((prev) => ({ ...prev, cvc: event.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      placeholder="123"
                    />
                    {errors.cardCvc ? <p className="mt-1 text-xs text-red-600">{errors.cardCvc}</p> : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-postal">Postal code</Label>
                    <Input
                      id="card-postal"
                      value={card.postalCode}
                      onChange={(event) => setCard((prev) => ({ ...prev, postalCode: event.target.value.toUpperCase() }))}
                      placeholder={billing.country === 'Canada' ? 'A1A 1A1' : 'Postal / ZIP'}
                    />
                    {errors.cardPostal ? <p className="mt-1 text-xs text-red-600">{errors.cardPostal}</p> : null}
                  </div>
                </div>
              ) : null}

              {paymentMethod === 'paypal' ? (
                <div className="mt-5 rounded-xl border border-[#eadfd8] bg-[#fdf9f6] p-4 text-sm text-[#5f5f5f]">
                  You will be redirected to PayPal to complete payment.
                </div>
              ) : null}

              {paymentMethod === 'bank' ? (
                <div className="mt-5 space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setBankMethod('interac')}
                      className={`rounded-xl border p-3 text-left ${
                        bankMethod === 'interac' ? 'border-[#d9713d] bg-[#fbe6da]' : 'border-[#eadfd8]'
                      }`}
                    >
                      <p className="font-semibold">Interac e-Transfer</p>
                      <p className="mt-1 text-xs text-[#5f5f5f]">Manual transfer and confirmation</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBankMethod('online')}
                      className={`rounded-xl border p-3 text-left ${
                        bankMethod === 'online' ? 'border-[#d9713d] bg-[#fbe6da]' : 'border-[#eadfd8]'
                      }`}
                    >
                      <p className="font-semibold">Online banking</p>
                      <p className="mt-1 text-xs text-[#5f5f5f]">Choose your bank and continue</p>
                    </button>
                  </div>

                  {bankMethod === 'interac' ? (
                    <div className="rounded-xl border border-[#eadfd8] bg-[#fdf9f6] p-4 text-sm">
                      <p>Send transfer to: <span className="font-semibold">{supportEmail}</span></p>
                      <p className="mt-1">Reference code: <span className="font-semibold">{interacReference}</span></p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="online-bank">Choose your bank</Label>
                      <select
                        id="online-bank"
                        className="h-10 w-full rounded-md border border-[#e5e5e5] bg-white px-3 text-sm"
                        value={bankPayer.onlineBank}
                        onChange={(event) => setBankPayer((prev) => ({ ...prev, onlineBank: event.target.value }))}
                      >
                        <option value="">Select bank</option>
                        {BANKS.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                      {errors.onlineBank ? <p className="mt-1 text-xs text-red-600">{errors.onlineBank}</p> : null}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bank-payer-name">Payer full name</Label>
                      <Input
                        id="bank-payer-name"
                        value={bankPayer.fullName}
                        onChange={(event) => setBankPayer((prev) => ({ ...prev, fullName: event.target.value }))}
                      />
                      {errors.bankName ? <p className="mt-1 text-xs text-red-600">{errors.bankName}</p> : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-payer-email">Payer email</Label>
                      <Input
                        id="bank-payer-email"
                        value={bankPayer.email}
                        onChange={(event) => setBankPayer((prev) => ({ ...prev, email: event.target.value }))}
                      />
                      {errors.bankEmail ? <p className="mt-1 text-xs text-red-600">{errors.bankEmail}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="interac-sent" checked={interacSent} onCheckedChange={(checked) => setInteracSent(Boolean(checked))} />
                    <Label htmlFor="interac-sent" className="text-sm font-normal">
                      I have sent the transfer
                    </Label>
                  </div>
                  {errors.bankSent ? <p className="text-xs text-red-600">{errors.bankSent}</p> : null}
                </div>
              ) : null}
            </Card>

            <Card className="rounded-xl border border-[#eadfd8] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <h2 className="text-xl font-semibold">Billing details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Email</Label>
                  <Input
                    id="billing-email"
                    value={billing.email}
                    onChange={(event) => setBilling((prev) => ({ ...prev, email: event.target.value }))}
                  />
                  {errors.billingEmail ? <p className="mt-1 text-xs text-red-600">{errors.billingEmail}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-name">Full name</Label>
                  <Input
                    id="billing-name"
                    value={billing.fullName}
                    onChange={(event) => setBilling((prev) => ({ ...prev, fullName: event.target.value }))}
                  />
                  {errors.billingFullName ? <p className="mt-1 text-xs text-red-600">{errors.billingFullName}</p> : null}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="billing-company">Company (optional)</Label>
                  <Input
                    id="billing-company"
                    value={billing.company}
                    onChange={(event) => setBilling((prev) => ({ ...prev, company: event.target.value }))}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="billing-address1">Address line 1</Label>
                  <Input
                    id="billing-address1"
                    value={billing.address1}
                    onChange={(event) => setBilling((prev) => ({ ...prev, address1: event.target.value }))}
                  />
                  {errors.billingAddress1 ? <p className="mt-1 text-xs text-red-600">{errors.billingAddress1}</p> : null}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="billing-address2">Address line 2 (optional)</Label>
                  <Input
                    id="billing-address2"
                    value={billing.address2}
                    onChange={(event) => setBilling((prev) => ({ ...prev, address2: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-city">City</Label>
                  <Input
                    id="billing-city"
                    value={billing.city}
                    onChange={(event) => setBilling((prev) => ({ ...prev, city: event.target.value }))}
                  />
                  {errors.billingCity ? <p className="mt-1 text-xs text-red-600">{errors.billingCity}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-province">Province / State</Label>
                  <Input
                    id="billing-province"
                    value={billing.province}
                    onChange={(event) => setBilling((prev) => ({ ...prev, province: event.target.value }))}
                    placeholder="Enter province or state"
                  />
                  {errors.billingProvince ? <p className="mt-1 text-xs text-red-600">{errors.billingProvince}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-postal">Postal code</Label>
                  <Input
                    id="billing-postal"
                    value={billing.postalCode}
                    onChange={(event) => setBilling((prev) => ({ ...prev, postalCode: event.target.value.toUpperCase() }))}
                    placeholder={billing.country === 'Canada' ? 'A1A 1A1' : 'Postal / ZIP'}
                  />
                  {errors.billingPostalCode ? <p className="mt-1 text-xs text-red-600">{errors.billingPostalCode}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-country">Country</Label>
                  <select
                    id="billing-country"
                    className="h-10 w-full rounded-md border border-[#e5e5e5] bg-white px-3 text-sm"
                    value={billing.country}
                    onChange={(event) => setBilling((prev) => ({ ...prev, country: event.target.value }))}
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.billingCountry ? <p className="mt-1 text-xs text-red-600">{errors.billingCountry}</p> : null}
                </div>
              </div>
            </Card>

            <div className="rounded-xl border border-[#eadfd8] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full rounded-xl bg-[#d9713d] py-2.5 font-semibold text-white shadow-[0_10px_25px_rgba(217,113,61,0.3)] hover:bg-[#c96433]"
              >
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {paymentMethod === 'card'
                  ? `Pay $${selectedPrice}`
                  : paymentMethod === 'paypal'
                    ? 'Continue to PayPal'
                    : 'Confirm and activate'}
              </Button>

              <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
                <Button type="button" variant="outline" onClick={onGoDashboard}>
                  {secondaryButtonLabel}
                </Button>
                <p className="text-sm text-[#5f5f5f]">{secondaryNote}</p>
              </div>
            </div>
          </form>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <Card className="rounded-xl border border-[#eadfd8] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Product</span>
                  <span>Border AI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{selectedPlan === 'basic' ? 'Basic' : 'Pro'} plan</span>
                  <span>${selectedPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[#5f5f5f]">
                  <span>GST/HST/PST (placeholder)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#eadfd8] pt-2 text-base font-semibold">
                  <div className="flex items-center justify-between">
                    <span>Total due today</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#5f5f5f]">Cancel anytime.</p>
              <button type="button" className="mt-3 text-sm text-[#d9713d] underline" onClick={() => setIsTermsOpen(true)}>
                View terms
              </button>
            </Card>
          </aside>
        </div>
      </div>

      {isTermsOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl border border-[#eadfd8] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Terms</h3>
              <button type="button" onClick={() => setIsTermsOpen(false)} aria-label="Close terms">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#5f5f5f]">
              {termsBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button className="mt-5 w-full" onClick={() => setIsTermsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
