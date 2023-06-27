import React, { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";
import NotFound from "../layouts/NotFound";

const ResetPassword = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const CryptoJS = require("crypto-js");
  const [user, setUser] = useState();
  useEffect(() => {
    JSON.parse(localStorage.getItem("forgot_password")).map((item) => {
      if (item.forgotPasswordLink == window.location.href) {
        setUser(item);
      }
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password1 == password2 && password1 != "") {
      setUsers(
        users.map((item) => {
          if (item.email == user.email) {
            item.password = CryptoJS.MD5(password2).toString();
            return item;
          }
          return item;
        })
      );
      localStorage.setItem("users", JSON.stringify(users));
      redirect("/login");
    }
  };
  
  return user ? (
    <div className="container">
      <form onSubmit={submitHandler}>
        <h1>Tạo Mật Khẩu mới</h1>
        <p>nhập mật khẩu mới</p>
        <p style={{ color: "red" }} id="messageError"></p>
        <input
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <p>nhập lại mật khẩu</p>
        <input
          type="password"
          value={password2}
          onChange={(e) => {
            if (password1 != e.target.value) {
              document.getElementById("messageError").innerText =
                "passwords do not match";
            } else {
              document.getElementById("messageError").innerText = "";
            }
            setPassword2(e.target.value);
          }}
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  ) : (
    <NotFound />
  );
};

export default ResetPassword;
