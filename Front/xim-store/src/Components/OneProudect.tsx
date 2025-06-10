import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const OneProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!user || !user.id) {
        alert('You must be logged in to add to cart.');
        return;
      }
      const userId = user.id;
      const productId = product.id;
      await axios.post(`http://localhost:3000/api/cart/add`, { userId, productId, quantity });
      localStorage.setItem('user', JSON.stringify(user));
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  if (!product) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 max-w-7xl mx-auto w-full px-2 md:px-4 py-6 md:py-12" style={{ marginTop: '100px' }}>
        {/* Left: Product Image */}
        <div className="flex-1 flex flex-col items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="rounded-2xl w-full max-w-md object-cover shadow-2xl"
          />
        </div>
        {/* Right: Product Info */}
        <div className="w-full md:w-[500px] flex-shrink-0">
          <div className="bg-[#232341]/80 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#BE3144] text-white text-xs font-bold px-2 py-1 rounded">Instant Delivery</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#E17564] text-3xl font-bold">${product.price}</span>
              <div className="flex items-center ml-auto gap-2">
                <button className="bg-[#232341] text-white px-3 rounded" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button className="bg-[#232341] text-white px-3 rounded" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>
    
            <div className="flex gap-4 mt-2">
              <button
                className="flex-1 bg-[#BE3144] hover:bg-[#E17564] text-white font-bold py-3 rounded-xl transition"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button
                className="flex-1 bg-[#232341] hover:bg-[#BE3144] text-white font-bold py-3 rounded-xl transition"
                onClick={async () => {
                  if (!isLoggedIn) {
                    navigate('/login');
                    return;
                  }
                  try {
                    const user = JSON.parse(localStorage.getItem('user') || '{}');
                    const userId = user.id;
                    const productId = product.id;
                    await axios.post(`http://localhost:3000/api/cart/add`, { userId, productId, quantity });
                    navigate('/cart');
                  } catch (error) {
                    console.error('Error adding product to cart:', error);
                  }
                }}
              >
                Checkout
              </button>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Description :</h2>
              <div className="bg-black/20 rounded-xl p-4 text-white text-sm">{product.description}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-[#232341]/90 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-[#E17564] text-xl font-bold mb-4">Added to cart</h2>
            <p className="text-white mb-4">{product.title}</p>
            <p className="text-gray-400 mb-4">Quantity: {quantity}</p>
            <div className="flex justify-between">
              <button
                className="bg-[#232341] text-white font-bold py-2 px-4 rounded-lg"
                onClick={closeModal}
              >
                Continue Shopping
              </button>
              <button
                className="bg-[#BE3144] hover:bg-[#E17564] text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => navigate('/cart')}
              >
                Review & Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneProduct;