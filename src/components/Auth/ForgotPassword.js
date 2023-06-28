import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import emailjs from "@emailjs/browser";
import "./AuthStyle.css";
import { Link } from "react-router-dom";
import Top from "../layouts/Top";
const ForgotPassword = () => {
  const listUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(listUsers);
  const [email, setEmail] = useState("");
  const [forgotPasswordLink, setForgotPasswordLink] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    let flag = true;
    await JSON.parse(localStorage.getItem("users")).map((user) => {
      if (user.email == email) {
        //create forgotpassword link
        const currentPort = window.location.origin;
        const apiToken = uuidv4();
        let AT = `${currentPort}/reset-password?AT=${apiToken}`;
        setForgotPasswordLink(AT);

        //take time
        const currentTime = new Date();
        const futureTime = new Date(currentTime.getTime() + 5 * 60000);

        //get fotgotpassword DB
        const forgotpassDb = JSON.parse(
          localStorage.getItem("forgot_password")
        );
        if (!forgotpassDb) {
          const array = [];
          array.push({ forgotPasswordLink, email, expireTime: futureTime });
          localStorage.setItem("forgot_password", JSON.stringify(array));
        } else {
          let flag = true;
          forgotpassDb.map((item) => {
            if (item.email == email) {
              item.forgotPasswordLink = forgotPasswordLink;
              item.futureTime = futureTime;
              flag = false;
            }
          });
          if (flag) {
            forgotpassDb.push({
              forgotPasswordLink,
              email,
              expireTime: futureTime,
            });
          }
          localStorage.setItem("forgot_password", JSON.stringify(forgotpassDb));
        }
        flag = false;
        document.getElementById("messageError").innerText = `PROCESSING`;
        emailjs
          .sendForm(
            "service_3kxpvwn",
            "template_j5gm6et",
            e.target,
            "oBQVy9OW2Wok5Hzji"
          )
          .then(
            (result) => {
              alert("successfully,please check your email address");
              return;
            },
            (error) => {
              document.getElementById("messageError").innerText = "Email Error";
              console.log(error.text);
            }
          );
      }
    });
    if (flag) {
      document.getElementById(
        "messageError"
      ).innerText = `Email doesn't exists`;
    }
  };

  return (
    <div>
      <Top />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submitHandler}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Forgot password</h3>
            <div className="text-center">
              Already registered?
              <Link to="/login">
                <span className="link-primary">Sign In</span>
              </Link>
            </div>
            <p style={{ color: "red" }} id="messageError"></p>
            <div className="form-group mt-3">
              <label>Email address </label>
              <input
                type="email"
                value={email}
                className="form-control mt-1"
                onChange={(e) => setEmail(e.target.value)}
                name="user_email"
                required
              />
            </div>

            <input
              style={{ display: "none" }}
              name="forgot_pass_link"
              value={forgotPasswordLink}
            />
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
