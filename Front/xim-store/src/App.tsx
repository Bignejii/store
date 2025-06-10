import './index.css'
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Xim from './Components/Xim';
import Dma from './Components/Dma';
import Zen from './Components/Zen';
import Reasnow from './Components/Reasnow';
import Optimizer from './Components/Optimizer';
import OneProduct from './Components/OneProudect';
import Cart from './Components/Cart';
import Dashboard from './Components/Dashboard';
import ManageProducts from './Components/ManageProducts';
import Payment from './Components/Payment';
import ManageUsers from './Components/ManageUsers';
import AddProduct from './Components/AddProduct';
import PurchaseSuccess from './Components/PurchaseSuccess';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/xim" element={<Xim />} />
      <Route path="/dma" element={<Dma />} />
      <Route path='/zen' element={<Zen />} />
      <Route path='/reasnow' element={<Reasnow />} />
      <Route path='/optimizer' element={<Optimizer />} />
      <Route path="/product/:id" element={<OneProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/manage-products" element={<ManageProducts />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/purchase-success" element={<PurchaseSuccess />} />
    </Routes>
  );
}

export default App
