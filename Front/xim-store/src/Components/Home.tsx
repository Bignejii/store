import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';


const Home: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <Navbar />
      <div style={{ marginTop: '100px' }}>
      <div className="max-w-6xl mx-auto my-12 p-4 md:p-8 bg-[#232341]/80 rounded-3xl flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-2xl">
        {/* Left: Text Content */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 md:mb-8 leading-tight">Welcome to Game Cheats!</h2>
          <ol className="space-y-4 text-base md:text-lg text-[#bfc6e0]">
            <li className="flex items-start gap-3"><span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#1a1e2e] text-blue-400 font-bold text-lg">①</span> We offer a wide selection of premium game enhancement tools and hardware, including DMA cards, Kmbox, Fuser, and more. Whether you're looking for powerful aimbots, triggerbots, wallhacks </li>
            <li className="flex items-start gap-3"><span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#1a1e2e] text-blue-400 font-bold text-lg">②</span> and  the latest in gaming optimization technology, our products are designed to give you the edge you need. All our solutions are easy to use, secure, and compatible with the most popular games. Shop with confidence and take your gaming experience to the next level! </li>
          </ol>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center w-full mt-6 md:mt-0">
          <img
            src="https://static.wixstatic.com/media/d538b7_2459357b87314b59b9e237ec2cead4d2~mv2.jpg/v1/fill/w_792,h_828,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4a609798.jpg"
            alt="DMA Cheat"
            className="rounded-2xl w-full max-w-xs md:max-w-xs lg:max-w-xs object-cover shadow-xl"
          />
        </div>
      </div>
        <div className="max-w-6xl mx-auto my-12 p-8 bg-[#232341]/80 rounded-3xl shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">What People Are Saying</h1>
          <div className="overflow-hidden h-[800px] relative">
            <div className="animate-scroll">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-black/30 rounded-lg shadow-lg p-6 backdrop-blur-sm"
                >
                  <p className="text-xl font-semibold mb-2">
                    <span className="text-red-500">{"★".repeat(review.rating)}</span>
                  </p>
                  <p className="text-lg italic mb-4 text-white">{review.comment}</p>
                  <p className="text-sm text-gray-300">— {review.User?.username || 'Anonymous'}</p>
                </div>
                
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer with Payment Methods */}
      <footer className="mt-auto py-8 bg-black/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-[#E17564]">Accepted Payment Methods</h3>
            <div className="flex gap-8">
              <div className="flex items-center justify-center bg-[#232341]/80 rounded-xl p-4">
                <FaCcVisa className="text-5xl text-[#BE3144]" />
              </div>
              <div className="flex items-center justify-center bg-[#232341]/80 rounded-xl p-4">
                <FaCcMastercard className="text-5xl text-[#E17564]" />
              </div>
              <div className="flex items-center justify-center bg-[#232341]/80 rounded-xl p-4">
                <FaCcPaypal className="text-5xl text-[#872341]" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-6">Copyright © 2025 BigNeji・All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;