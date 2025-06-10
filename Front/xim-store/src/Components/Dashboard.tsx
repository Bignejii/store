import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AdminNavbar from './AdminNavbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

interface Cart {
  id: number;
  productId: number;
  totalAmount: number;
  paymentStatus: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReviews: 0
  });
  const [totalSales, setTotalSales] = useState(0);
  const [salesByCategory, setSalesByCategory] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is admin
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (!isLoggedIn || userRole !== 'admin') {
      navigate('/login');
      return;
    }
    // Fetch users count
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setStats(prev => ({ ...prev, totalUsers: response.data.length }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    // Fetch reviews count
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reviews');
        setStats(prev => ({ ...prev, totalReviews: response.data.length }));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    // Fetch sales data
    const fetchSales = async () => {
      try {
        const [cartsRes, productsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/cart'),
          axios.get('http://localhost:3000/api/products'),
        ]);
        const carts: Cart[] = cartsRes.data;
        const products: Product[] = productsRes.data;
        // Only count paid orders
        const paidCarts = carts.filter(cart => cart.paymentStatus === 'paid');
        let total = 0;
        const byCategory: { [key: string]: number } = {};
        paidCarts.forEach(cart => {
          const product = products.find(p => p.id === cart.productId);
          if (product) {
            total += cart.totalAmount || 0;
            if (!byCategory[product.category]) byCategory[product.category] = 0;
            byCategory[product.category] += cart.totalAmount || 0;
          }
        });
        setTotalSales(total);
        setSalesByCategory(byCategory);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };
    fetchUsers();
    fetchReviews();
    fetchSales();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-600" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <AdminNavbar />
      <nav className="bg-white shadow-lg">
       
      </nav>
      <main className="max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8 w-full">
        <div className="px-2 py-4 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Quick Actions */}
            <div className="bg-[#232341]/80 shadow-2xl rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Quick Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/add-product')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Add New Product
                </button>
                <button
                  onClick={() => navigate('/manage-products')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Manage Products
                </button>
                <button
                  onClick={() => navigate('/manage-users')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Manage Users
                </button>
                <button
                  onClick={() => navigate('/manage-reviews')}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md"
                >
                  Manage Reviews
                </button>
              </div>
            </div>
            {/* Sales Overview Box */}
            <div className="bg-[#232341]/80 shadow-2xl rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Sales Overview</h2>
              <div className="mb-4">
                <span className="text-lg font-semibold text-white">Total Sales: </span>
                <span className="text-2xl text-green-600 font-bold">{totalSales.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Sales by Category:</h3>
              <ul>
                {Object.entries(salesByCategory).map(([cat, amount]) => (
                  <li key={cat} className="mb-1">
                    <span className="font-medium capitalize">{cat}:</span> <span className="text-green-700 font-bold">{amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Sales Bar Chart Box */}
            <div className="bg-[#232341]/80 shadow-2xl rounded-3xl p-6 flex justify-center items-center">
              <div className="w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4 text-center text-white">Sales by Category (Graph)</h3>
                <Bar
                  data={{
                    labels: Object.keys(salesByCategory),
                    datasets: [
                      {
                        label: 'Sales ($)',
                        data: Object.values(salesByCategory),
                        backgroundColor: [
                          '#09122C',
                          '#BE3144',
                          '#872341',
                          '#232341',
                          '#E17564',
                          '#23232a',
                        ],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      title: { display: false },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: '#fff',
                          callback: function(value: any) {
                            return '$' + value;
                          },
                        },
                        grid: {
                          color: '#44405a',
                        },
                      },
                      x: {
                        ticks: {
                          color: '#fff',
                        },
                        grid: {
                          color: '#44405a',
                        },
                      },
                    },
                  }}
                  height={200}
                />
              </div>
            </div>
            {/* Statistics */}
            <div className="bg-[#232341]/80 shadow-2xl rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Statistics</h2>
              <div className="space-y-4">
                <div className="bg-[#2d2341]/80 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-white">Total Users</h3>
                  <p className="text-3xl font-bold text-[#38bdf8]">{stats.totalUsers}</p>
                </div>
                <div className="bg-[#2d2341]/80 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-white">Total Reviews</h3>
                  <p className="text-3xl font-bold text-[#38bdf8]">{stats.totalReviews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 