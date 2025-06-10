import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [referral, setReferral] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;
        const response = await axios.get(`http://localhost:3000/api/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      await axios.delete(`http://localhost:3000/api/cart/remove`, {
        data: { userId, productId },
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleCheckout = async () => {
    // Reset error
    setEmailError('');

    if (!email) {
      setEmailError('Please enter your email address before proceeding to payment.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Store email in localStorage for use in payment page
    localStorage.setItem('deliveryEmail', email);
    
    // Add your checkout logic here
    navigate('/payment');
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.Product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <Navbar />
      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-center w-full my-8" style={{paddingTop: '100px'}}>
        {/* Cart Step */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-600 text-white rounded-full w-20 h-8 flex items-center justify-center font-bold text-xs tracking-widest">CART</div>
        </div>
        <div className="h-0.5 w-24 bg-blue-600 mx-2"></div>
        {/* Payment Step */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-600 text-white rounded-full w-24 h-8 flex items-center justify-center font-bold text-xs tracking-widest">PAYMENT</div>
        </div>
        <div className="h-0.5 w-24 bg-[#23232a] mx-2"></div>
        {/* Invoice Step */}
        <div className="flex flex-col items-center">
          <div className="bg-[#23232a] text-white rounded-full w-20 h-8 flex items-center justify-center font-bold text-xs tracking-widest">INVOICE</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 max-w-7xl mx-auto w-full px-2 md:px-4 py-6 md:py-12" style={{paddingTop: '100px'}}>
        {/* LEFT: FORM & PAYMENT */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Delivery Email */}
          <div className="bg-[#232341]/80 rounded-2xl shadow-xl border border-[#23232a] p-6">
            <h2 className="text-lg font-semibold mb-2">
              Delivery Email
              <span className="text-red-500 ml-1">*</span>
            </h2>
            <input
              type="email"
              required
              className={`w-full bg-[#23232a] text-white border-none rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                emailError ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
              }`}
              placeholder="Enter your email address"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setEmailError(''); // Clear error when user types
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              * Enter the email address where you want your product to be sent. You will receive the invoice in your email.
            </p>
            {emailError && (
              <p className="text-xs text-red-500 mt-1">{emailError}</p>
            )}
          </div>
          {/* Referral Code */}
       
          {/* Payment Method */}
          <div className="bg-[#232341]/80 rounded-2xl shadow-xl border border-[#23232a] p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2">Choose Payment Method</h2>
            <button
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg border ${paymentMethod === 'card' ? 'border-[#BE3144] bg-[#872341]/80' : 'border-[#23232a] bg-[#232341]/80'} text-white font-semibold transition`}
              onClick={() => setPaymentMethod('card')}
            >
              <span>Debit/Credit Card</span>
              <span className="text-xs bg-[#BE3144] text-white px-2 py-1 rounded ml-2">$6</span>
              <span className="ml-auto text-xs bg-[#E17564] text-white px-2 py-1 rounded">Total ${(Number(calculateTotalPrice()) + 6).toFixed(2)}</span>
              <span className="ml-4 text-[#E17564]">{paymentMethod === 'card' ? 'Selected' : 'Select'}</span>
            </button>
            <div className="mt-2">
              <div className="text-sm text-gray-400 mb-2">Crypto Currency</div>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${paymentMethod === 'eth' ? 'border-[#BE3144] bg-[#872341]/80' : 'border-[#23232a] bg-[#232341]/80'} text-white`}
                  onClick={() => setPaymentMethod('eth')}
                >ETH</button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${paymentMethod === 'btc' ? 'border-[#BE3144] bg-[#872341]/80' : 'border-[#23232a] bg-[#232341]/80'} text-white`}
                  onClick={() => setPaymentMethod('btc')}
                >BTC</button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${paymentMethod === 'bnb' ? 'border-[#BE3144] bg-[#872341]/80' : 'border-[#23232a] bg-[#232341]/80'} text-white`}
                  onClick={() => setPaymentMethod('bnb')}
                >BNB</button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${paymentMethod === 'ltc' ? 'border-[#BE3144] bg-[#872341]/80' : 'border-[#23232a] bg-[#232341]/80'} text-white`}
                  onClick={() => setPaymentMethod('ltc')}
                >LTC</button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${paymentMethod === 'trx' ? 'border-[#BE3144] bg-[#872341]/80' : 'border-[#23232a] bg-[#232341]/80'} text-white`}
                  onClick={() => setPaymentMethod('trx')}
                >TRX</button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs bg-blue-700/80 text-blue-200 px-2 py-1 rounded">Total ${calculateTotalPrice()}</span>
                {paymentMethod !== 'card' && <span className="ml-2 text-blue-400">Selected</span>}
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT: ORDER SUMMARY */}
        <div className="w-full md:w-[400px] flex-shrink-0">
          <div className="bg-[#232341]/80 rounded-2xl shadow-xl border border-[#23232a] p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is currently empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b border-[#23232a] pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
                    <img src={item.Product.thumbnail} alt={item.Product.title} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="font-semibold text-white truncate">{item.Product.title}</div>
                      <div className="text-xs text-gray-400">Default Variant</div>
                      <div className="text-blue-400 font-bold">${item.Product.price.toFixed(2)}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white">{item.quantity}</span>
                      </div>
                      <button className="text-gray-500 hover:text-red-400 text-xs" onClick={() => handleDeleteProduct(item.productId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t border-[#23232a] pt-4 mt-4 flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Method Fee</span>
                    <span>{paymentMethod === 'card' ? '$30.00' : '$0.00'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(Number(calculateTotalPrice()) + (paymentMethod === 'card' ? 30 : 0)).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  className="mt-6 w-full bg-[#BE3144] hover:bg-[#E17564] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-lg"
                  onClick={handleCheckout}
                >
                  Proceed to Payment
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


