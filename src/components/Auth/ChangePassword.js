import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import ToastComponent from "../Custom/Toast";
const CryptoJS = require("crypto-js");

function ChangePassword({ userParams, changePassMode }) {
  const [user, setUser] = useState(userParams);
  const [matching, setMatching] = useState(false);
  const [password, setPassword] = useState();
  const [showToast, setShowToast] = useState(false);

  const handleToggleToast = () => {
    setShowToast(!showToast);
  };
  const handleButtonClick = () => {
    const result = window.confirm(
      "Are you sure you want to change your password"
    );
    const current_password = document.getElementById('current_password');
    if (result && matching && CryptoJS.MD5(current_password).toString() == user.password) {
      user.password = CryptoJS.MD5(password).toString();
      const users = JSON.parse(localStorage.getItem("users"));
      const updatedUsers = users.map((item) => {
        if (item.id == user.id) {
          return user;
        }
        return item;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      changePassMode();
      return;
    } 
    handleToggleToast();    
  };

  const handleConfirmPasswordChange = () => {
    if (
      document.getElementById("newpass").value ===
      document.getElementById("newpass2").value
    ) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = "Matching";
      setMatching(true);
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML = "Not matching";
    }
  };

  return (
    <Container
      className="bootstrap snippets bootdey"
      style={{ marginTop: "10px" }}
    >
            <ToastComponent message="Please try again" showToast={showToast} handleCloseToast={handleToggleToast} />

      <h1 className="text-primary">Change Password</h1>
      <hr />
      <Row>
        <Col md={3}>
          <Card.Body>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            />
          </Card.Body>
        </Col>
        <Col md={9} className="personal-info">
          <h3>Change Password</h3>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column lg={3} className="control-label">
                Password:
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  required
                  placeholder="Password(*)"
                  type="password"
                  name="password"
                  id="current_password"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg={3} className="control-label">
                New Password:
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  id="newpass"
                  required
                  placeholder="Enter New Password(*)"
                  type="password"
                  name="newpass"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column lg={3} className="control-label">
                Confirm Password:
              </Form.Label>
              <Col lg={8}>
                <Form.Control
                  id="newpass2"
                  onKeyUp={handleConfirmPasswordChange}
                  required
                  placeholder="Confirm New Password(*)"
                  type="password"
                  name="newpass2"
                  onCanPlay={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <div>
        <p style={{ marginLeft: "300px" }} id="message"></p>
      </div>
      <div style={{ marginLeft: "300px", color: "red" }}></div>
      <div className="form-group" style={{ textAlign: "center" }}>
        <Button onClick={() => handleButtonClick()} variant="success">
          Save
        </Button>
      </div>
    </Container>
  );
}

export default ChangePassword;
