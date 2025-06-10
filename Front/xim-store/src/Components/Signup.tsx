import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/users/register', { username, email, password });
      alert('Signup successful!');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      alert(`Signup failed: ${errorMessage}`);
    }
  };

  return (
    <>
      {/* Custom CSS for animated gradient border */}
      <style>{`
        .animated-gradient-border {
          background: linear-gradient(270deg, #09122C, #BE3144, #872341, #09122C);
          background-size: 600% 600%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div className="flex items-center justify-center min-h-screen text-white p-2 md:p-0" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
        <div className="w-full max-w-md p-1.5 rounded-2xl animated-gradient-border shadow-[0_0_16px_4px_rgba(190,49,68,0.4)]">
          <div className="bg-[#232341]/80 rounded-2xl shadow-xl border border-transparent p-8 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-[#BE3144]"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-[#BE3144]"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-[#BE3144] pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#BE3144] hover:text-[#E17564] focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-[#BE3144] pr-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#BE3144] hover:text-[#E17564] focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#BE3144] hover:bg-[#E17564] text-white font-bold py-3 rounded-lg transition duration-300"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;