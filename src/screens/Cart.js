import { Button, FormControl, InputGroup, Table } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const [mergeProducts, setMergeProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const listCart = JSON.parse(localStorage.getItem("carts")).filter(
    (cart) => cart.userId == 1
  )[0];
  const foundProduct = JSON.parse(localStorage.getItem("products"));
  const mergedCart = listCart.products
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
    }).filter((item) => item !== null);

  useEffect(() => {
    setCarts(listCart.products);
    setProducts(foundProduct);
    setMergeProducts(mergedCart)
  },[]);

  const handleUpdateCart = (operator, productId, quantity) => {
    if (operator === "+") {
      const updatedCart = mergeProducts.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: quantity + 1 };
        }
        return product;
      });
      setMergeProducts(updatedCart)
    } else if(operator === '-'){
      const updatedCart = mergeProducts.map((product) => {
        if (product.productId === productId) {
          if (quantity === 0) {
            return { ...product, quantity: 0 };
          }
          return { ...product, quantity: quantity  - 1 };
        }
        return product;
      });
      setMergeProducts(updatedCart)
    }
  };
  return (
    <DefaultLayout className="container">
      <div className="row">
        <div className="col-8">
          <div className="heading_layout_other">
            <h2>GIỎ HÀNG CỦA BẠN ({mergeProducts.length})</h2>
          </div>
          <Table>
            <tbody>
              {mergeProducts.map((mergedCart) => (
                <tr key={mergedCart.productId} >
                  <td width="180px">
                    <a
                      href={`/product/detail/${mergedCart.productId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
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
                    </a>
                  </td>
                  <td>
                    <div className="info-production">
                      <h3 className="name_production">
                        <a
                          href={`/product/detail/${mergedCart.productId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {mergedCart.name}
                        </a>
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-dash-lg"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                                ></path>
                              </svg>
                            </Button>
                            <FormControl
                              type="text"
                              className="quantity"
                              value={mergedCart.quantity}
                              onChange={(e) => setQuantity(e.target.value)}
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-plus-lg"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                ></path>
                              </svg>
                            </Button>
                          </InputGroup>
                        </div>
                        <span className="btn-delete-item">Xóa</span>
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
                  <span className="price black">1.300.000đ</span>
                </li>
              </ul>
            </div>
            {/* ... */}
          </div>
        </div>
      </div>
      ;
    </DefaultLayout>
  );
};

export default Cart;
