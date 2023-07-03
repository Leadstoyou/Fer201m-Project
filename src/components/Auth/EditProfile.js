import React, { useState } from "react";

function EditProfile({ userParams,changeAuthMode }) {

  const [user, setUser] = useState(userParams);
  const handleSubmit = () => {
    let result = window.confirm("Are you sure you want to edit this profile?");
    if (result) {
      localStorage.setItem("UserID", JSON.stringify(user));
      const users = JSON.parse(localStorage.getItem("users"));
      const updatedUsers = users.map((item) => {
        if (item.id === user.id) {
          return user;
        }
        return item;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      changeAuthMode();
    }
  };
  return (
    <div
      className="container bootstrap snippets bootdey border-0"
      style={{ marginTop: "10px" }}
    >
      <h1 className="text-primary">Edit Profile</h1>
      <hr />
      <div className="row">
        <div className="col-md-3">
          <div className="card-body">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            />
          </div>
        </div>
        <div className="col-md-9 personal-info">
          <h3>Personal info</h3>
          <div className="form-group">
            <label className="col-lg-3 control-label">Name:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.username}
                name="accountname"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                readOnly
                type="text"
                defaultValue={user.email}
                name="accountemail"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Phone:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.phone}
                name="accountphone"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    phone: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Address:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                defaultValue={user.address}
                name="accountaddress"
                onChange={(e) => {
                  setUser((currentUser) => ({
                    ...currentUser,
                    address: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ color: "red", marginLeft: "300px" }}></div>
      <div className="form-group" style={{ textAlign: "center" }}>
        <input
          onClick={() => {
            handleSubmit();
          }}
          type="submit"
          value="Update"
          className="btn btn-success"
        />
      </div>
    </div>
  );
}

export default EditProfile;
