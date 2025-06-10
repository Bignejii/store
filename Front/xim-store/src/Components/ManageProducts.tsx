import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  downloadUrl: string;
}

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    category: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTextFile, setSelectedTextFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/login');
      return;
    }

    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        thumbnail: URL.createObjectURL(file)
      }));
    }
  };

  const handleTextFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedTextFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return; // Prevent null error
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('description', formData.description);
      fd.append('price', formData.price);
      fd.append('category', formData.category);
      // If a new file is selected, use it. Otherwise, send the existing thumbnail string (if any)
      if (selectedFile) {
        fd.append('thumbnail', selectedFile);
      } else if (formData.thumbnail && typeof formData.thumbnail === 'string') {
        fd.append('thumbnail', formData.thumbnail);
      }
      // If you have other fields (like amount, downloadUrl), add them here

      await axios.put(
        `http://localhost:3000/api/products/${editingProduct.id}`,
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      // Optionally refresh products or reset form here
      setEditingProduct(null);
      setSelectedFile(null);
      setFormData({ title: '', description: '', price: '', thumbnail: '', category: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      thumbnail: product.thumbnail,
      category: product.category
    });
    setPreviewUrl(product.thumbnail);
    setSelectedFile(null);
    setSelectedTextFile(null);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${productId}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <AdminNavbar />
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-4 px-2 sm:px-6 lg:px-8 w-full">
        <div className="px-2 py-4 sm:px-0">
          <div className="bg-[#232341]/80 shadow-2xl rounded-3xl p-4 md:p-6 mb-8 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 md:gap-0">
              <h2 className="text-2xl font-bold text-white">Product List</h2>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#2d2341]/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-700 text-white">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.thumbnail && product.thumbnail !== '' && (
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-12 w-12 object-cover rounded"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit Product Form */}
          {editingProduct && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    id="thumbnail"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    accept="image/*"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageProducts; 