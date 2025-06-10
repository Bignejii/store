import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PurchaseSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Expecting fileUrl and/or key in location.state
  const fileUrl = location.state?.fileUrl as string | undefined;
  const key = location.state?.key as string | undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-600">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">Thank You for Your Purchase!</h2>
        <p className="mb-6 text-gray-700">Your order was successful. You will receive an email with your order details soon.</p>
        {key && (
          <div className="mb-6">
            <div className="font-semibold mb-2">Your Key:</div>
            <div className="bg-gray-100 text-gray-800 rounded p-3 break-all font-mono text-lg border border-gray-300 inline-block">{key}</div>
          </div>
        )}
        {fileUrl && (
          <div className="mb-6">
            <a
              href={fileUrl}
              download
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Download Your File
            </a>
          </div>
        )}
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PurchaseSuccess; 