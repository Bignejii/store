import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${userId}/role`, { role: newRole });
      setUsers(users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center p-2 md:p-0">
        <div className="bg-[#232341]/80 shadow-2xl rounded-3xl w-full max-w-4xl p-2 md:p-0">
          <div className="px-2 py-4 sm:p-6">
            <h2 className="text-lg font-medium mb-4 text-white">User Management</h2>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#2d2341]/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-700 text-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers; 