import { useState } from "react";
import NotFound from "../layouts/NotFound";
import { Button, Col, Row, Table } from "react-bootstrap";

const UserManager = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID")).isAdmin
      : false
  );

  const UserInfoRow = ({ user, index }) => {
    const { id, username, email, phone, address, isActive } = user;
    const rowClass = isActive ? "active-row" : "deactive-row";
    return (
      <tr id={`activeStatus${id}`} key={index} className={rowClass}>
        <td>{id}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{address}</td>
        <td>{isActive ? "Active" : "De Active"}</td>
        <td>
          <Button
            variant={isActive ? "warning" : "success"}
            onClick={() => handleStatusChange(id)}
          >
            {isActive ? "De Active" : "Active"}
          </Button>
        </td>
      </tr>
    );
  };
  const handleStatusChange = (accountID) => {
    const updateUsers = users.map((user) =>
      user.id == accountID ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updateUsers);
    localStorage.setItem("users", JSON.stringify(updateUsers));
  };

  return isAdmin ? (
    <div className="container border-0" style={{ marginTop: "15px" }}>
      <div className="table-wrapper" style={{ paddingTop: "12px" }}>
        <div className="table-title">
          <Row>
            <Col sm={6}>
              <h2>Manager Users </h2>
            </Col>
            <Col sm={6}>
              <Button
                variant="dark"
                onClick={() => {
                  window.history.back(-1);
                }}
                style={{ marginLeft: "70%" }}
              >
                Quay lại
              </Button>
            </Col>
          </Row>
        </div>
        <div class="scrollable-area" style={{ overflow: "auto",paddingTop:'11px' }}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.isAdmin == false)
                .map((user, index) => (
                  <UserInfoRow key={index} user={user} index={index} />
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default UserManager;
