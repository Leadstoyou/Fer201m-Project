import DefaultLayoutDetail from "../layouts/DefaultLayoutDetail";
import "../styles/DefaultLayoutStyle.css";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuantityButton from "../components/Custom/QuantityButton";
import { Cart, CreditCard, Repeat, XLg } from "react-bootstrap-icons";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import renderCart from "./ProductCart";
import { Button, Offcanvas } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(true);
  //hover and click size and color properties
  const [hoveredColor, setHoveredColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [hoveredSize, setHoveredSize] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  //Cắt chuỗi description
  const description = product && product.description ? product.description : "";
  const splitStrings = description.split(/THIẾT KẾ:|CHẤT LIỆU:/);
  const substringDesign = splitStrings[1] ? splitStrings[1].split("\n") : [];
  const substringMaterial = splitStrings[2] ? splitStrings[2].split("\n") : [];

  const [price, setPrice] = useState(0);

  let foundProduct = JSON.parse(localStorage.getItem("products")).find(
    (product) => product.id === parseInt(id)
  );

  useEffect(() => {
    setProduct(foundProduct);
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //HIỂN THỊ CART
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn color và size!");
      return;
    }
    handleShow();
  };

  // PRODUCT DETAIL

  //set số lượng của quantityButton
  const [quantity, setQuantity] = useState(1);

  //Click ảnh thumbnail -> hiện ảnh carousel tương ứng
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverThumbnail, setIsHoveredThumbnail] = useState([]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setIsHoveredThumbnail(
      Array(product.img?.length || 0)
        .fill(false)
        .map((val, i) => i === index)
    );
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return product ? (
    <DefaultLayoutDetail className="container">
      <div className="row" style={{ marginTop: "60px" }}>
        {/* Image Product */}
        <div className="col-2">
          <div style={{ marginLeft: "30px" }}>
            <div style={{ flexDirection: "column" }}>
              <div className="swiperImgProduct_detail">
                <div>
                  <Image
                    src={product.img}
                    // ảnh nhỏ
                    thumbnail
                    onClick={() => handleThumbnailClick(0)}
                    index={0}
                    style={{
                      border: isHoverThumbnail[0] ? "2px solid #000" : "none",
                    }}
                  />
                </div>
                <div>
                  <Image
                    src={product.blurImg}
                    thumbnail
                    onClick={() => handleThumbnailClick(1)}
                    index={1}
                    style={{
                      border: isHoverThumbnail[1] ? "2px solid #000" : "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="col-6">
          <Carousel
            activeIndex={activeIndex}
            onSelect={(index) => setActiveIndex(index)}
            style={{ width: "100%" }}
          >
            <Carousel.Item>
              <img
                style={{ width: "100%" }}
                src={product.img}
                alt={product.name}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ width: "100%" }}
                src={product.blurImg}
                alt={product.name}
              />
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Thông tin sản phẩm -> add to cart */}
        <div className="col-4" style={{ marginTop: "25px" }}>
          <h1 className="name_production">{product.name}</h1>
          <p className="price_production">{product.price}</p>
          <p
            style={{ marginTop: "10px", marginBottom: "0px" }}
            className="color_production"
          >
            <p>Chọn màu</p>
            {product && product.color && (
              <ul className="select_product_color">
                {product.color.map((color) => {
                  return (
                    <p
                      key={color}
                      onMouseEnter={() => {
                        setHoveredColor(color);
                      }}
                      onMouseLeave={() => {
                        setHoveredColor(null);
                      }}
                      onClick={() => {
                        setSelectedColor(color);
                      }}
                      style={{
                        borderBottom:
                          hoveredColor === color || selectedColor === color
                            ? "2px solid black"
                            : "none",
                      }}
                    >
                      {color}
                    </p>
                  );
                })}
              </ul>
            )}
          </p>

          <div style={{ marginTop: "0px" }} className="size_production">
            <pre>Chọn size</pre>
            {product && product.size && (
              <ul className="select_product_size">
                {product.size.map((size) => {
                  return (
                    <p
                      key={size}
                      onMouseEnter={() => {
                        setHoveredSize(size);
                      }}
                      onMouseLeave={() => {
                        setHoveredSize(null);
                      }}
                      onClick={() => {
                        setSelectedSize(size);
                      }}
                      style={{
                        borderBottom:
                          hoveredSize === size || selectedSize === size
                            ? "2px solid black"
                            : "none",
                      }}
                    >
                      {size}
                    </p>
                  );
                })}
              </ul>
            )}
          </div>

          <p style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "15px", marginBottom: "0px" }}>Số lượng</p>
            <QuantityButton onChange={handleQuantityChange} />
          </p>

          <div>
            <Button
              onClick={() => handleAddToCart(product)}
              className="add_to_cart"
              style={{ marginTop: "30px" }}
            >
              <Cart style={{ marginRight: "5px" }} />
              <p style={{ marginBottom: "0px" }}>Thêm vào giỏ hàng</p>
            </Button>
            {cartItems.length > 0 && renderCart}
          </div>

          <Button
            className="check_out_cart"
            style={{
              marginTop: "17px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Mua ngay
          </Button>
        </div>
      </div>

      {/* PRODUCT DESCRIPTION */}
      <div style={{ marginBottom: "60px", marginTop: "30px" }}>
        <p style={{ fontWeight: "600", fontSize: "18px" }}>
          Thông tin sản phẩm
        </p>
        <p
          style={{
            width: "100%",
            height: "0.7px",
            backgroundColor: "gray",
            opacity: "0.5",
          }}
        ></p>
        <p>{splitStrings[0]}</p>
        <p>THIẾT KẾ:</p>
        <p>
          {substringDesign.map((substring, index) => {
            return <p key={index}>{substring}</p>;
          })}
        </p>
        <p>CHẤT LIỆU:</p>
        <p>
          {substringMaterial.map((substring, index) => {
            return <p key={index}>{substring}</p>;
          })}
        </p>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </DefaultLayoutDetail>
  ) : (
    "No product matched/found!"
  );
  
};

export default ProductDetail;
