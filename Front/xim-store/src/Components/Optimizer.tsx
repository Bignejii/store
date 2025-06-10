import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const Optimizer: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products?category=optimizer`);
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
          <img
            src="https://imgs.search.brave.com/1HpQI-4cGhE-NKM3fgZ74JPqRnqZ1NuLdaZhM8yLKQE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X3hz/eG5vL3N0eWxlcy9i/YW5uZXJCYWNrZ3Jv/dW5kSW1hZ2VfNWtp/Y2wxNW5rdGlkMS5w/bmc"
            alt="Optimizer Banner"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">Optimizer Products</h1>
        {products.length === 0 ? (
          <p className="text-lg">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg shadow-md p-4 flex flex-col items-center"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Semi-transparent background
              >
                <div className="relative w-full h-64 mb-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <h2 className="text-lg font-bold text-center mb-2">{product.title}</h2>
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

export default Optimizer;