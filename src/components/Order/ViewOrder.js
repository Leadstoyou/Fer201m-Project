import { Container, Table } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import BreadcrumbComponent from "../Custom/BreadcrumbComponent";
import NavMenuDashboard from "../Custom/NavMenuDashboard";
import { useEffect, useState } from "react";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID"))
      : { id: "PUBLIC_USER" }
  );
  const addNameForProduct = (id, quantity) => {
    const data = JSON.parse(localStorage.getItem("products"));
    const changedProduct = data.filter((product) => product.id == id)[0];

    return {
      productId: id,
      quantity: quantity,
      name: changedProduct.name,
      price: parseInt(changedProduct.price.split("đ")[0].replace(".", "")),
    };
  };
  const data = JSON.parse(localStorage.getItem("orders"))
    .filter((order) => {
      return order.userId == user.id;
    })
    .map((order) => {
      const lmeo = order.products.map((product) => {
        return addNameForProduct(product.productId, product.quantity);
      });

      return { ...order, products: lmeo };
    });
  useEffect(() => {
    setOrders(data);
  }, []);
  const convertToCurrencyFormat = (number) => {
    var numberString = number.toString();
    var parts = numberString.split(".");
    var integerPart = parts[0];
    var decimalPart = parts.length > 1 ? parts[1] : "";

    var formattedNumber =
      integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      (decimalPart ? "." + decimalPart : "");

    return formattedNumber;
  };
  return (
    <DefaultLayout>
      <Container style={{ border: "none", paddingBottom: "250px" }}>
        <BreadcrumbComponent />
        <Table striped border="true" hover>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày mua</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá tiền</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.products.map((product, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.timestamp}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{`${convertToCurrencyFormat(
                    product.price * product.quantity
                  )}đ`}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </DefaultLayout>
  );
};

export default ViewOrder;
