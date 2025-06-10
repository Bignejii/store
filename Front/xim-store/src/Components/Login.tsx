import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
      const { user } = response.data;
      console.log('Login response:', response.data); // Debug log

      // Set login state and user data in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('user', JSON.stringify(user)); // Store the complete user object
      console.log('Stored user:', user); // Debug log

      if (user.role === 'admin') {
        navigate('/dashboard'); // Redirect to admin dashboard
      } else if (user.role === 'user') {
        navigate('/'); // Redirect to home page
      } else {
        alert('Unknown role');
      }
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error); // Debug log
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      alert(`Login failed: ${errorMessage}`);
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
      <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
        <div className="flex-1 flex items-center justify-center p-2 md:p-4">
          <div className="w-full max-w-md p-1.5 rounded-2xl animated-gradient-border shadow-[0_0_16px_4px_rgba(190,49,68,0.4)]">
            <div className="bg-[#232341]/80 rounded-2xl shadow-xl border border-transparent p-8 w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-[#BE3144] transition-all duration-300 focus:shadow-[0_0_15px_rgba(190,49,68,0.5)]"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-[#BE3144] transition-all duration-300 focus:shadow-[0_0_15px_rgba(190,49,68,0.5)] pr-12"
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
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="w-full bg-[#BE3144] hover:bg-[#E17564] text-white font-bold py-3 rounded-lg transition duration-300 mb-4"
                >
                  Sign Up
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#232341] hover:bg-[#872341] text-white font-bold py-3 rounded-lg transition duration-300"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-blue-400 hover:text-blue-300 mt-4 block w-full text-center"
                >
                  Forgot Password?
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;