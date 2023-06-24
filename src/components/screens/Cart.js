import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dash, Plus } from "react-bootstrap-icons";

const Cart = () => {
  const [mergeProducts, setMergeProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigate();
  const [user, setUser] = useState({});
  const listCart = JSON.parse(localStorage.getItem("carts")).filter(
    (cart) => cart.userId == (JSON.parse(localStorage.getItem('UserID'))).id
  )[0];

  const foundProduct = JSON.parse(localStorage.getItem("products"));
  const mergedCart =listCart ? listCart.products
    .map((item) => {
      const product = foundProduct.find((p) => p.id === item.productId);
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
    .filter((item) => item !== null) : [];
  const totalPriceTemp = mergedCart.reduce(function (acc, product) {
    var price = parseFloat(product.price.replace("đ", "").replace(",", ""));
    return acc + price * product.quantity;
  }, 0);
  useEffect(() => {
    setMergeProducts(mergedCart);
    setTotalPrice(totalPriceTemp);
    setUser(JSON.parse(localStorage.getItem('UserID')));
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
  const handleUpdateCart = (operator, productId, quantity) => {
    var updatedCart;
    if (operator === "+") {
      updatedCart = mergeProducts.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: quantity + 1 };
        }
        return product;
      });
    } else if (operator === "-") {
      updatedCart = mergeProducts.map((product) => {
        if (product.productId === productId) {
          if (quantity === 1) {
            return { ...product, quantity: 1 };
          }
          return { ...product, quantity: quantity - 1 };
        }
        return product;
      });
    }
    let lmeo = updatedCart.map((cartupdate) => {
      return {
        productId: cartupdate.productId,
        quantity: cartupdate.quantity,
        size: cartupdate.size,
        color: cartupdate.color,
      };
    });
    console.log(lmeo);
    const setUpdatedData = JSON.parse(localStorage.getItem("carts")).map(
      (data) => {
        if (data.userId == user.id) {
          return {
            ...data,
            products: lmeo,
          };
        }
        return data;
      }
    );
    console.log(setUpdatedData);
    localStorage.setItem("carts", JSON.stringify(setUpdatedData));
    setMergeProducts(updatedCart);
    setTotalPrice(
      updatedCart.reduce(function (acc, product) {
        var price = parseFloat(product.price.replace("đ", "").replace(",", ""));
        return acc + price * product.quantity;
      }, 0)
    );
  };

  const handleDeleteProductInCart = (id) => {
    const result = window.confirm("Bạn có chắc chắn muốn tiếp tục?");
    if (result) {
      let mergeProductsUpdated = mergeProducts.filter(function (product) {
        return product.productId !== id;
      });
      setMergeProducts(mergeProductsUpdated);
      let updatedData = JSON.parse(localStorage.getItem("carts")).map(function (
        item
      ) {
        if (item.userId == user.id) {
          const updatedProducts = item.products.filter(function (product) {
            return product.productId !== id;
          });

          return {
            userId: item.userId,
            products: updatedProducts,
          };
        }

        return item;
      });
      localStorage.setItem("carts", JSON.stringify(updatedData));
    }
  };

  return (
    <DefaultLayout className="container">
      <div className="row">
        <div className="col-8">
          <div className="heading_layout_other">
            <h2>GIỎ HÀNG CỦA BẠN ({mergeProducts.length})</h2>
          </div>
          <Table className="cart-table">
            <tbody>
              {mergeProducts.map((mergedCart,index) => (
                <tr key={index}>
                  <td width="180px">
                    <Link to={`/product/detail/${mergedCart.productId}`}>
                      <img
                        src={`${mergedCart.img}`}
                        className="img_prd_cart"
                        alt={`${mergedCart.productId}`}
                        style={{
                          display: "inline-block",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Link>
                  </td>
                  <td>
                    <div className="info-production">
                      <h3 className="name_production">
                        <p
                          onClick={() => {
                            navigation(
                              `/product/detail/${mergedCart.productId}`
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {mergedCart.name}
                        </p>
                      </h3>
                      <div>
                        <div className="chooseSize-group">
                          <span className="btn-chooseSize">
                            {mergedCart.color} / {mergedCart.size} <i></i>
                          </span>
                          {/* ... */}
                        </div>
                      </div>
                      <div className="option_production">
                        <div className="option_production-number">
                          <InputGroup>
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                handleUpdateCart(
                                  "-",
                                  mergedCart.productId,
                                  mergedCart.quantity
                                )
                              }
                            >
                              <Dash style={{ color: "black" }} />
                            </Button>
                            <Form.Control
                              type="text"
                              className="quantity"
                              value={mergedCart.quantity}
                              onChange={() => {}}
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                handleUpdateCart(
                                  "+",
                                  mergedCart.productId,
                                  mergedCart.quantity
                                )
                              }
                            >
                              <Plus style={{ color: "black" }} />
                            </Button>
                          </InputGroup>
                        </div>
                        <span
                          className="btn-delete-item"
                          onClick={() => {
                            handleDeleteProductInCart(mergedCart.productId);
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.cursor = "pointer";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.cursor = "auto";
                          }}
                        >
                          Xóa
                        </span>
                      </div>
                    </div>
                  </td>
                  <td width="150px" style={{ verticalAlign: "top" }}>
                    <div class="product-price">{mergedCart.price}</div>
                  </td>
                  <td style={{ verticalAlign: "top" }}>
                    <span className="btn-favorite " data-id="4063">
                      <i></i>
                    </span>
                    {/* ... */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-4">
          <div className="box_order_cart">
            <div className="box_order_cart__price">
              <ul>
                <li>
                  <span className="tille">Tạm tính:</span>
                  <span className="price black">
                    {convertToCurrencyFormat(totalPrice)}.000 đ
                  </span>
                </li>
              </ul>
            </div>
            <div className="note_footer">
              <p>
                <strong>Miễn phí</strong> vận chuyển cho đơn hàng từ{" "}
                <strong>500k</strong>
              </p>
            </div>

            <Button
              type="button"
              className="btn btn-default-black btn_buy_now"
              variant="dark"
              onClick={() => {
                navigation("/order");
              }}
              style={{ padding: "11px" }}
            >
              TIẾN HÀNH ĐẶT HÀNG ({mergeProducts.length})
            </Button>
            <p>
              <strong>Ưu đãi hội viên</strong>
            </p>
            <p>
              Tích điểm đổi quà và rất nhiều ưu đãi đặc biệt khác, chỉ dành cho
              hội viên của Aristino.
            </p>
            <p>
              <Link to="/login">Đăng nhập</Link>/
              <Link to="/register">Đăng ký</Link>
            </p>
          </div>
        </div>
      </div>
      ;
    </DefaultLayout>
  );
};

export default Cart;
