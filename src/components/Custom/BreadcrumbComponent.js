import { Breadcrumb, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
const BreadcrumbComponent = () => {
  return (
    <Nav className="" activeKey="/home">
      <Breadcrumb>
        <Breadcrumb.Item
          itemProp="itemListElement"
          itemScope
          className="breadcrumb-item"
        >
          <NavLink to="/home" className="link-in-react-router-dom">Home</NavLink>
          <meta itemProp="position" content="1" />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          itemProp="itemListElement"
          itemScope
          className="breadcrumb-item"
        >
          <NavLink to="/" className="link-in-react-router-dom" >Đơn hàng</NavLink>
          <meta itemProp="position" content="2" />
        </Breadcrumb.Item>
      </Breadcrumb>
    </Nav>
  );
};

export default BreadcrumbComponent;
