import { Outlet } from "react-router-dom";

const ShowProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("UserID"));
  // let history = useHis();
  return (
    <div className="container">
      <h1>{currentUser.id}</h1>
      <h1>{currentUser.username}</h1>
      <h1>{currentUser.email}</h1>
      <h1>{currentUser.phone}</h1>
      <h1>{currentUser.address}</h1>
      <Outlet />
    </div>
  );
};
export default ShowProfile;
