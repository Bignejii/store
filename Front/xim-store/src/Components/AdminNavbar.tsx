import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="bg-[#232341]/80 text-white px-6 py-4 flex items-center justify-between shadow-lg rounded-b-2xl mb-8">
      <div className="text-2xl font-bold">Admin Panel</div>
      <div className="flex gap-6">
        <button onClick={() => navigate('/dashboard')} className="hover:underline">Dashboard</button>
        <button onClick={() => navigate('/add-product')} className="hover:underline">Add Product</button>
        <button onClick={() => navigate('/manage-products')} className="hover:underline">Manage Products</button>
        <button onClick={() => navigate('/manage-users')} className="hover:underline">Manage Users</button>
        <button onClick={() => navigate('/manage-reviews')} className="hover:underline">Manage Reviews</button>
        <button onClick={() => navigate('/')} className="hover:underline">Go Home</button>
        <button onClick={handleLogout} className="hover:underline text-red-400">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
