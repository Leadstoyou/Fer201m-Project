import React, { useState } from "react";

const ResetPassword = () => {
  const listUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(listUsers);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("UserID"));
    currentUser.password = password2;
    localStorage.setItem("UserID", JSON.stringify(currentUser));
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        user.password = password2;
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <h1>Tạo Mật Khẩu mới</h1>
        <p>nhập mật khẩu mới</p>
        <input
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <p>nhập lại mật khẩu</p>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
