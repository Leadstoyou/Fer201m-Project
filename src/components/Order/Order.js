import React, { useEffect, useRef, useState } from "react";
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
import emailjs from "@emailjs/browser";
import ToastComponent from "../Custom/Toast";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID"))
      : { id: "PUBLIC_USER" }
  );
  const currentTime = new Date();
  const [orders, setOrders] = useState([]);
  const order_address = useRef(0);
  const order_telephone = useRef(0);
  const order_email = useRef(0);
  const form = useRef({});
  const [showToast, setShowToast] = useState(false);
  const handleToggleToast = () => {
    setShowToast(!showToast);
  };
  const [message, setMessage] = useState("");
  const listCart = JSON.parse(localStorage.getItem("carts")).filter(
    (cart) => cart.userId == user.id
  )[0];
  const navigation = useNavigate();
  const listProducts = JSON.parse(localStorage.getItem("products"));
  const mergedCart = listCart
    ? listCart.products
        .map((item) => {
          const product = listProducts.find((p) => p.id === item.productId);
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
        .filter((item) => item !== null)
    : [];

  useEffect(() => {
    setProducts(mergedCart);
    setTotalPrice(
      mergedCart.reduce((total, current) => {
        const price = parseInt(current.price.replace(/\D/g, ""));
        return total + price * current.quantity;
      }, 0)
    );
    setOrders(JSON.parse(localStorage.getItem("orders")));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const convertToCurrencyFormat = (number) => {
    const numberString = number.toString();
    let formattedString = "";

    for (let i = numberString.length - 1, count = 0; i >= 0; i--, count++) {
      if (count !== 0 && count % 3 === 0) {
        formattedString = "." + formattedString;
      }
      formattedString = numberString[i] + formattedString;
    }

    return formattedString;
  };
  const handleSubmit = (e) => {
    if (products.length === 0) {
      console.log(products);
      setMessage("Hãy chọn mua 1 sản phẩm");
      handleToggleToast();

      return;
    } else {
      if (user.id == "PUBLIC_USER") {
        handleShow();
        return;
      }
      const confirm = window.confirm("Bạn có muốn đặt hàng không");
      if (confirm) {
        const clearCart = JSON.parse(localStorage.getItem("carts")).map(
          (item) => {
            if (item.userId == user.id) {
              return { ...item, products: [] };
            }
            return item;
          }
        );

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
        emailjs
          .send(
            "service_3kxpvwn",
            "template_k6q9att",
            {
              order_date: `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`,
              order_address: user.address,
              order_telephone: user.phone,
              order_email: user.email,
            },
            "oBQVy9OW2Wok5Hzji"
          )
          .then(
            (result) => {
              setMessage("Order sucessfully");
              handleToggleToast();
              setTimeout(() => {
                navigation("/home");
              }, 3000);
              console.log(result);
            },
            (error) => {
              console.log(error);
            }
          );

      }
    }
  };
  const handleSubmitPublicUser = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3kxpvwn",
        "template_k6q9att",
        e.target,
        "oBQVy9OW2Wok5Hzji"
      )
      .then(
        (result) => {
          setMessage("Order sucessfully");
          handleToggleToast();
          setShow(false);
          const clearCart = JSON.parse(localStorage.getItem("carts")).map(
            (item) => {
              if (item.userId == user.id) {
                return { ...item, products: [] };
              }
              return item;
            }
          );

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
          setTimeout(() => {
            navigation("/home");
          }, 4500);
          setTotalPrice(0);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="container border-0">
      <ToastComponent
        message={message}
        showToast={showToast}
        handleCloseToast={handleToggleToast}
      />
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
        <Form
          onSubmit={handleSubmitPublicUser}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }}
          ref={form}
        >
          <Modal.Header
            closeButton={() => {
              setShow(false);
            }}
          >
            <Modal.Title> Order </Modal.Title>
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
                <br />
                <div className="form_value">
                  <Row
                    className="justify-content-between"
                    style={{ paddingTop: "15px" }}
                  >
                    <Form.Group controlId="email">
                      <Form.Label className="fw-bold">Email</Form.Label>
                      <Form.Control
                        ref={order_email}
                        name="order_email"
                        type="email"
                        className="fw-bold"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row
                    className="justify-content-between"
                    style={{ paddingTop: "15px" }}
                  >
                    <Form.Group controlId="telephone">
                      <Col className="fw-bold">Số điện thoại</Col>
                      <Form.Control
                        ref={order_telephone}
                        name="order_telephone"
                        className="fw-bold"
                        placeholder="Số điện thoại"
                        aria-label="Số điện thoại"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </Form.Group>
                  </Row>
                  <Row
                    className="justify-content-between"
                    style={{ paddingTop: "15px" }}
                  >
                    <Form.Group controlId="address">
                      <Col className="fw-bold">Địa chỉ</Col>
                      <Form.Control
                        ref={order_address}
                        name="order_address"
                        className="fw-bold"
                        placeholder="Địa chỉ"
                        aria-label="Địa chỉ"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </Form.Group>
                  </Row>
                </div>
                <input
                  style={{ display: "none" }}
                  name="order_date"
                  value={`${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`}
                />
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                if (!(user.id == "PUBLIC_USER")) {
                  setShow(false);
                }
              }}
              type="submit"
            >
              Xác nhận
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;
