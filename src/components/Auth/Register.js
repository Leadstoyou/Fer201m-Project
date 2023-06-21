import React, { useState } from "react";
import { useNavigate } from "react-router";
const Register = () => {
  const listUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(listUsers);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigate();

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    const newUser = {
      id: users.length + 1,
      username: username,
      password: password,
      email: email,
      address: address,
      phone: phone,
      isAdmin: false,
    };
    const userExists = users.find((user) => user.email === newUser.email);
    if (userExists) {
      document.getElementById("mess").innerHTML = "Email exists";
    } else if (newUser.username == null || newUser.password === null) {
      document.getElementById("mess").innerHTML =
        "Email field or password is required";
      return navigation("/register");
    } else {
      console.log(newUser);
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      return navigation("/login");
    }
  };

  return (
    <div>
      <div className="register">
        <form className="login-form" onSubmit={handleSubmitRegister}>
          <div className="register_form">
            <div className="register_title">Đăng kí</div>
            <div className="register_input">
              <input
                type="email"
                placeholder="Email address *"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="register_input">
              <input
                type="password"
                placeholder="Password *"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="register_input">
              <input
                type="text"
                placeholder="Fullname"
                name="fullName"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="register_input">
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="register_input">
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div id="mess"></div>
            <div>
              <p>
                Nếu tài khoản đã tồn tại <a href="/login">Đăng nhập</a>
              </p>
            </div>
            <div className="Register_button">
              <button type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
