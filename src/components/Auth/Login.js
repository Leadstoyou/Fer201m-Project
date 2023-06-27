import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const CryptoJS = require("crypto-js");

const Login = () => {

  const listUsers = JSON.parse(localStorage.getItem("users"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let flag = false;

  const navigation = useNavigate();
  const [userData, setuserData] = useState(listUsers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      flag = true;
      const messusername = document.getElementById("mess-username");
      messusername.innerText = email === "" ? "Email không được để trống" : "";
      messusername.style.color = "red";

      const messpassword = document.getElementById("mess-password");
      messpassword.innerText =
        password === "" ? "Mật khẩu không được để trống" : "";
      messpassword.style.color = "red";
    } else {
      const user = userData.find(
        (u) => u.email == email && u.password ==  CryptoJS.MD5(password).toString()
      );
      if (user) {
        localStorage.setItem("UserID", JSON.stringify(user));
        navigation("/home");
      } else {
        const a = !user && !flag;
        const mess = document.getElementById("mess");
        mess.innerText = a ? "Email hoặc mật khẩu không đúng" : "";
        mess.style.color = "red";
      }
    }
  };

  return (
    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <form class="login" onSubmit={handleSubmit}>
            <p id="mess-username"></p>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input
                type="text"
                class="login__input"
                placeholder="User name / Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p id="mess-password"></p>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                type="password"
                class="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p id="mess"></p>
            <button class="button login__submit">
              <span class="button__text">Log In Now</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div class="register">
            <Link to="/register">
              Đăng ký
            </Link>
          </div>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
