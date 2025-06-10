import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';

const categories = [
  'xim',
  'dma',
  'zen',
  'reasnow',
  'optimizer',
];

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [amount, setAmount] = useState('');

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailUrl(e.target.value);
    setThumbnailPreview(e.target.value);
    setThumbnailFile(null);
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailUrl('');
    setThumbnailPreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('amount', amount);
      // Thumbnail: prefer file, else URL
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      } else if (thumbnailUrl) {
        formData.append('thumbnailUrl', thumbnailUrl);
      }
      if (file) {
        formData.append('productFile', file);
      }
      // Send to backend
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        alert('Product added successfully!');
        // Optionally reset form here
      } else {
        alert('Failed to add product.');
      }
    } catch (err) {
      alert('Error adding product.');
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: 'linear-gradient(135deg, #09122C 0%, #872341 100%)' }}>
      <AdminNavbar />
      <div className="max-w-2xl mx-auto p-4 md:p-6 w-full">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="bg-[#232341]/80 rounded-3xl shadow-2xl p-4 md:p-6 w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#232341] text-white placeholder-[#bfc6e0] focus:outline-none focus:ring-2 focus:ring-[#872341]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 rounded-lg bg-[#232341] text-white placeholder-[#bfc6e0] focus:outline-none focus:ring-2 focus:ring-[#872341]" required>
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-3 rounded-lg bg-[#232341] text-white placeholder-[#bfc6e0] focus:outline-none focus:ring-2 focus:ring-[#872341]" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 rounded-lg bg-[#232341] text-white placeholder-[#bfc6e0] focus:outline-none focus:ring-2 focus:ring-[#872341]" required />
          </div>
          {/* Thumbnail Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Thumbnail</label>
            <input
              type="text"
              placeholder="Image URL"
              value={thumbnailUrl}
              onChange={handleThumbnailUrlChange}
              className="w-full p-2 rounded-lg bg-[#232341] text-white placeholder-[#bfc6e0] focus:outline-none focus:ring-2 focus:ring-[#872341] mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailFileChange}
              className="w-full p-2 rounded-lg bg-[#232341] text-white placeholder-[#bfc6e0] focus:outline-none focus:ring-2 focus:ring-[#872341]"
            />
            {(thumbnailPreview) && (
              <div className="mt-2 flex items-center gap-2">
                <img src={thumbnailPreview} alt="Thumbnail Preview" className="h-20 w-20 object-cover rounded" />
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Product File (PDF or TXT)</label>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 rounded-lg bg-[#232341] text-white placeholder-[#bfc6e0] focus:outline-none focus:ring-2 focus:ring-[#872341]"
            />
            {file && (
              <div className="mt-2 text-sm text-gray-700 flex items-center gap-2">
                <span>Selected file: {file.name}</span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="ml-2 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
