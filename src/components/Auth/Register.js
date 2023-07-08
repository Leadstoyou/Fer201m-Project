import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./AuthStyle.css";
import Top from "../layouts/Top";
const CryptoJS = require("crypto-js");

const Register = () => {
  const listUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(listUsers);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigate();
  const Validate = () => {
    const phonePattern = /^\d{10}$/;
    const passwordPattern = /^.{8,}$/;
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    const addressRegex = /^[a-zA-Z0-9\s\.,#-]{5,}$/;

    if (!passwordPattern.test(password)) {
      setErrorMessage("Password must be at least 8 characters long");
      return false;
    }

    if(!namePattern.test(username)) {
      setErrorMessage(
        "Name must be at least 2 characters long and contain only letters and spaces."
      );
      return false;
    }
    if(!addressRegex.test(address)) {
      setErrorMessage(
        "Invalid address. The address can only contain characters from a-z.The address must have at least 5 characters."
      );
      return false;
    }
    if (!phonePattern.test(phone)) {
      setErrorMessage(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const validator = Validate();
    const newUser = {
      id: users.length + 1,
      username: username,
      password: CryptoJS.MD5(password).toString(),
      email: email,
      address: address,
      phone: phone,
      isAdmin: false,
    };
    const userExists = users.find((user) => user.email === newUser.email);
    if (email === "" || password === "") {
      setErrorMessage("Email field or password is required");
      return;
    } else if (userExists) {
      setErrorMessage("Email exists");
      return navigation("/register");
    } else if(!validator){
      return;
    } else {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      return navigation("/login");
    }
  };

  return (
    <div>
      <Top />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmitRegister}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?
              <Link to="/login">
                <span className="link-primary">Sign In</span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address </label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email address "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Fullname"
                className="form-control mt-1"
                name="fullName"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                className="form-control mt-1"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone"
                className="form-control mt-1"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errorMessage && (
              <div className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </div>
            )}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              <Link to="/forgot-password">
                <span>Forgot password?</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
