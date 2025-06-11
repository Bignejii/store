import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'QA', name: 'Qatar' },
  { code: 'EG', name: 'Egypt' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'FI', name: 'Finland' },
  { code: 'DK', name: 'Denmark' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'IE', name: 'Ireland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PL', name: 'Poland' },
  { code: 'GR', name: 'Greece' },
  { code: 'TR', name: 'Turkey' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'OTHER', name: 'Other' },
  { code: 'OM', name: 'OMAN' },

];

const PaymentInner: React.FC = () => {
  const [country, setCountry] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;
        const response = await axios.get(`http://localhost:3000/api/cart/${userId}`);
        setCartItems(response.data);
        const totalPrice = response.data.reduce((total: number, item: any) => total + item.Product.price * item.quantity, 0);
        setTotal(totalPrice);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Call your backend to create a PaymentIntent and get clientSecret
      const { data } = await axios.post('http://localhost:3000/api/payment/create-payment-intent', {
        amount: Math.round(total * 100), // Stripe expects amount in cents
      });
      const clientSecret = data.clientSecret;

      // 2. Confirm the card payment
      const result = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
          billing_details: {
            name: nameOnCard,
            address: {
              line1: address,
              postal_code: postalCode,
              city: city,
              country: country,
            },
            phone: phone,
          },
        },
      });

      if (result?.error) {
        setError(result.error.message || 'Payment failed');
      } else if (result?.paymentIntent?.status === 'succeeded') {
        setSuccess(true);
        navigate('/purchase-success');
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full min-h-screen p-2 md:p-0">
        {/* Left: Order Summary */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-8 justify-center bg-transparent border-r border-[#23232a] min-h-screen">
          <button className="flex items-center text-gray-400 hover:text-white mb-8 text-sm">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to the store
          </button>
          <div>
            <div className="text-gray-400 text-lg">Total</div>
            <div className="text-5xl font-extrabold tracking-tight mb-6">{total.toFixed(2)}€</div>
            <div className="bg-black/30 rounded-xl p-4 mb-6">
              {cartItems.map((item, idx) => (
                <div key={item.id || idx} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-black/20 rounded-lg p-2">
                      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 12h8M8 16h8M8 8h8" /></svg>
                    </span>
                    <div>
                      <div className="font-semibold text-white">{item.Product.title}</div>
                      <div className="text-xs text-gray-400">Quantity x{item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-white">{(item.Product.price * item.quantity).toFixed(2)}€</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-lg font-semibold">
              <span>Total Due</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
        {/* Right: Payment Form */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-8 justify-center bg-transparent min-h-screen">
          <form onSubmit={handleSubmit}>
            {/* Payment Method */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1 border-2 border-blue-600 bg-black/30 rounded-lg p-4 flex items-center gap-4">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                  <div>
                    <div className="font-semibold">Card</div>
                    <div className="text-xs text-gray-400">Use Credit Card to pay for checkout.</div>
                  </div>
                </div>
              </div>
            </div>
            {/* CC Information (Stripe) */}
            <div className="mb-6 bg-black/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">CC Information</h3>
              <CardElement className="p-3 rounded-lg bg-black/20 text-white" />
              <input
                type="text"
                placeholder="Name on card"
                className="w-full p-3 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mt-4"
                value={nameOnCard}
                onChange={e => setNameOnCard(e.target.value)}
              />
            </div>
            {/* Billing Address */}
            <div className="mb-6 bg-black/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Billing address</h3>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-1/2 p-3 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-1/2 p-3 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
              >
                <option value="">Select a country</option>
                {countries.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 rounded-lg bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800 font-bold text-lg transition mt-4"
              disabled={!stripe || loading}
            >
              {loading ? 'Processing...' : 'Pay'}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {success && <div className="text-green-500 mt-2">Payment successful!</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

const Payment: React.FC = () => (
  <Elements stripe={stripePromise}>
    <PaymentInner />
  </Elements>
);

export default Payment; 