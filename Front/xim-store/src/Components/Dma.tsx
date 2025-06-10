import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Navbar from './Navbar';
import axios from 'axios';

const Dma: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products?category=dma`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <Navbar />
      <div className="p-2 md:p-4">
        <div className="relative w-full h-64 mb-4" style={{ marginTop: '100px' }}>
          {/* Requirements/Features Section */}
        <div className="max-w-6xl mx-auto my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full">
          {/* Card 1 */}
          <div className="rounded-3xl shadow-xl p-8 flex flex-col items-center text-center" style={{ 
            background: 'linear-gradient(135deg, rgba(9, 18, 44, 0.7) 0%, rgba(135, 35, 65, 0.7) 100%)',
            backdropFilter: 'blur(10px)'
          }}>
            <span className="text-3xl text-indigo-400 mb-4">
              {/* Computer Icon */}
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="8" height="6" rx="1"/><rect x="14" y="6" width="8" height="6" rx="1"/><rect x="6" y="16" width="12" height="6" rx="1"/></svg>
            </span>
            <h3 className="text-2xl font-semibold text-white mb-2">Two computers</h3>
            <p className="text-lg text-gray-300">One of which could be a laptop.</p>
          </div>
          {/* Card 2 */}
          <div className="rounded-3xl shadow-xl p-8 flex flex-col items-center text-center" style={{ 
            background: 'linear-gradient(135deg, rgba(9, 18, 44, 0.7) 0%, rgba(135, 35, 65, 0.7) 100%)',
            backdropFilter: 'blur(10px)'
          }}>
            <span className="text-3xl text-indigo-400 mb-4">
              {/* PCIe Icon */}
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="8" rx="2"/><rect x="9" y="16" width="6" height="4" rx="1"/></svg>
            </span>
            <h3 className="text-2xl font-semibold text-white mb-2">Free PCIe slot</h3>
            <p className="text-lg text-gray-300">Make sure that your main PC has at least one free PCI-Express slot for installing a DMA card.</p>
          </div>
          {/* Card 3 */}
          <div className="rounded-3xl shadow-xl p-8 flex flex-col items-center text-center" style={{ 
            background: 'linear-gradient(135deg, rgba(9, 18, 44, 0.7) 0%, rgba(135, 35, 65, 0.7) 100%)',
            backdropFilter: 'blur(10px)'
          }}>
            <span className="text-3xl text-indigo-400 mb-4">
              {/* USB Icon */}
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="20" rx="4"/><rect x="2" y="8" width="20" height="8" rx="4"/></svg>
            </span>
            <h3 className="text-2xl font-semibold text-white mb-2">USB 3.0 cable</h3>
            <p className="text-lg text-gray-300">You can buy it from us or use your own</p>
          </div>
          {/* Card 4 */}
          <div className="rounded-3xl shadow-xl p-8 flex flex-col items-center text-center" style={{ 
            background: 'linear-gradient(135deg, rgba(9, 18, 44, 0.7) 0%, rgba(135, 35, 65, 0.7) 100%)',
            backdropFilter: 'blur(10px)'
          }}>
            <span className="text-3xl text-indigo-400 mb-4">
              {/* Windows Icon */}
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4"/></svg>
            </span>
            <h3 className="text-2xl font-semibold text-white mb-2">Windows 10 or 11</h3>
            <p className="text-lg text-gray-300">Our DMA card and cheat support Windows 10 and Windows 11 up to 24H2.</p>
          </div>
        </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Dma Products</h1>
        {products.length === 0 ? (
          <p className="text-lg">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg shadow-md p-4 flex flex-col items-center"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Same semi-transparent background as Cart
              >
                <div className="relative w-full h-64 mb-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <h2 className="text-lg font-bold text-center mb-2">{product.title}</h2>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Undetected
                  </span>
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Updating
                  </span>
                </div>
                <p className="text-green-500 font-bold text-lg mb-4">From ${product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dma;