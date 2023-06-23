import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/screens/Cart";
import Home from "./components/screens/Home";
import Ao from "./components/screens/Ao";
import Quan from "./components/screens/Quan";
import PhuKien from "./components/screens/PhuKien";
import ProductDetail from "./components/screens/ProductDetail";
import { useEffect } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ShowProfile from "./components/Auth/ShowProfile";
import 'bootstrap/dist/css/bootstrap.css';
import Order from "./components/Order/Order";
import ViewOrder from "./components/Order/ViewOrder";
import './components/styles/DefaultLayoutStyle.css';
import LoadData from './components/data/LoadData'
import ProductManager from "./components/Admin/ProductManager";
function App() {
  LoadData();
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<ShowProfile />} />
        <Route path="/ao" element={<Ao />} />
        <Route path="/quan" element={<Quan />} />
        <Route path="/phukien" element={<PhuKien />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/view-order" element={<ViewOrder />} />
        <Route path="/product-manage" element={<ProductManager />} />
      </Routes>
  );
}

export default App;
