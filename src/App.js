import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./screens/Cart";
import Home from "./screens/Home";
import Ao from "./screens/Ao";
import Quan from "./screens/Quan";
import PhuKien from "./screens/PhuKien";
import ProductDetail from "./screens/ProductDetail";
import { useEffect } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ShowProfile from "./components/Auth/ShowProfile";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
