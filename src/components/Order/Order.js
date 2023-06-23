import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
  Form,
  Image,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const data = JSON.parse(localStorage.getItem("carts"))
    .filter((cart) => cart.userId === "1")[0]
    .products.map((item) => {
      const product = JSON.parse(localStorage.getItem("products")).find(
        (p) => p.id === item.productId
      );
      if (product) {
        return {
          ...item,
          name: product.name,
          price: product.price,
          img: product.img,
          blurImg: product.blurImg,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  useEffect(() => {
    setProducts(data);
    setTotalPrice(
      data.reduce((total, current) => {
        const price = parseInt(current.price.split("đ")[0].replace(".", ""));
        return total + price;
      }, 0)
    );
    setUser(JSON.parse(localStorage.getItem("UserID")));
    setOrders(JSON.parse(localStorage.getItem("orders")));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigation = useNavigate();

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
  const handleSubmit = () => {
    const clearCart = JSON.parse(localStorage.getItem("carts")).map((item) => {
      if (item.userId === "1") {
        return { ...item, products: [] };
      }
      return item;
    });

    localStorage.setItem("carts", JSON.stringify(clearCart));
    setProducts([]);
    const lastId = parseInt(orders[orders.length - 1].id) + 1;
    const newProductsOrder = products.map((product) => {
      return { productId: product.productId, quantity: product.quantity };
    });
    const currentTime = new Date();
    const newOrder = {
      id: lastId.toString(),
      userId: user.id,
      products: newProductsOrder,
      total: totalPrice,
      status: "completed",
      timestamp: `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`,
    };
    let addNewOrder = JSON.parse(localStorage.getItem("orders"));
    addNewOrder.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(addNewOrder));
    setTotalPrice(0);
    navigation("/home");
  };
  return (
    <Container style={{ border: "" }}>
      <Card>
        <Card.Header
          style={{
            fontFamily: "emoji",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <p style={{ fontSize: "xx-large", margin: "0" }}>Đặt Hàng</p>
          <Button
            size="lg"
            variant="dark"
            onClick={() => {
              navigation("/cart");
            }}
          >
            Sửa
          </Button>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col lg={8}>
              <ListGroup variant="flush">
                {products.map((product, index) => (
                  <Row key={index} style={{ padding: "0 0 10px" }}>
                    <Col lg={8}>
                      <ListGroup.Item>
                        <strong>{product.name}</strong>
                        <br />
                        Quantity: {product.quantity}
                        <br />
                        Size: {product.size}
                        <br />
                        Color: {product.color}
                      </ListGroup.Item>
                    </Col>
                    <Col log={4}>
                      <Image
                        src={product.img}
                        rounded
                        style={{ maxWidth: "112px" }}
                      />
                    </Col>
                  </Row>
                ))}
              </ListGroup>
            </Col>
            <Col lg={4}>
              <Card>
                <Card.Header>Đơn hàng của bạn</Card.Header>
                <Card.Body>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th className="product-name">Sản phẩm</th>
                        <th className="product-total">Tạm tính</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr className="cart_item" key={index}>
                          <td className="product-name">
                            {product.name}
                            <strong className="product-quantity">
                              × {product.quantity}
                            </strong>
                          </td>
                          <td className="product-total">
                            <span className="woocommerce-Price-amount amount">
                              <bdi>{product.price}</bdi>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="cart-subtotal">
                        <th>Tạm tính</th>
                        <td>
                          <span className="woocommerce-Price-amount amount">
                            <bdi>{convertToCurrencyFormat(totalPrice)} ₫</bdi>
                          </span>
                        </td>
                      </tr>
                      <tr className="woocommerce-shipping-totals shipping">
                        <td className="shipping__inner" colSpan="2">
                          <Table className="shipping__table">
                            <tbody>
                              <tr>
                                <th>Giao hàng</th>
                                <td data-title="Giao hàng">
                                  <ul className="shipping__list woocommerce-shipping-methods">
                                    <li className="shipping__list_item">
                                      <input
                                        type="hidden"
                                        name="shipping_method[0]"
                                        data-index="0"
                                        id="shipping_method_0_free_shipping1"
                                        value="free_shipping:1"
                                        className="shipping_method"
                                      />
                                      <label
                                        className="shipping__list_label"
                                        htmlFor="shipping_method_0_free_shipping1"
                                      >
                                        Giao hàng miễn phí
                                      </label>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </td>
                      </tr>
                      <tr className="order-total">
                        <th>Tổng</th>
                        <td>
                          <strong>
                            <span className="woocommerce-Price-amount amount">
                              <bdi>{convertToCurrencyFormat(totalPrice)} ₫</bdi>
                            </span>
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                  <div id="payment" className="woocommerce-checkout-payment">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="dark"
                        type="submit"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Đặt hàng
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ border: "none" }}>
            <Card.Header
              as="h5"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Card.Text>Thank You</Card.Text>
              <p>{user.username}</p>
            </Card.Header>

            <Card.Body>
              <Card.Title>
                <Card.Text class="mb-0" style={{ color: "#35558a" }}>
                  Tóm tắt thanh toán
                </Card.Text>
              </Card.Title>

              <hr
                className="mt-2 mb-4"
                style={{
                  height: 0,
                  backgroundColor: "transparent",
                  opacity: 0.75,
                }}
              />
              {products.map((product, index) => (
                <Row
                  className="justify-content-between"
                  key={index}
                  style={{ borderBottom: "2px #9e9e9e" }}
                >
                  <Col className="fw-bold mb-0">
                    {product.name}(Qty:{product.productId})
                  </Col>
                  <Col className="text-muted mb-0">
                    {convertToCurrencyFormat(product.price)}
                  </Col>
                </Row>
              ))}

              <Row
                className="justify-content-between"
                style={{ paddingTop: "15px" }}
              >
                <Col className="fw-bold">Total</Col>
                <Col className="fw-bold" style={{ color: "#35558a" }}>
                  {`${convertToCurrencyFormat(totalPrice)}đ`}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Order;
