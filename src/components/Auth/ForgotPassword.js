import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import emailjs from "@emailjs/browser";
import { redirect } from "react-router-dom";

const ForgotPassword = () => {
  const listUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(listUsers);
  const [email, setEmail] = useState("");
  //   const CryptoJS = require("crypto-js");
  const [forgotPasswordLink, setForgotPasswordLink] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    JSON.parse(localStorage.getItem("users")).map((user) => {
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
              console.log(result.text);
            },
            (error) => {
              document.getElementById('messageError').innerText = 'Email Error'
              console.log(error.text);
            }
          );
      }
    });
    document.getElementById('messageError').innerText = `Email doesn't exists`
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <h1>Điền Email</h1>
        <p style={{ color: "red" }} id="messageError"></p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="user_email"
          required  
        />
        <input
          style={{ display: "none" }}
          name="forgot_pass_link"
          value={forgotPasswordLink}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
