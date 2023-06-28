import React, { useEffect, useRef, useState } from "react";

import DefaultLayout from "../layouts/DefaultLayout";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Scrollbar } from "swiper";
import { Container, Image } from "react-bootstrap";
import "./ScreensStyle.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")));
  }, []);

  return (
    <DefaultLayout>
      <div className="product-famous">
        <Container fluid style={{ padding: "0 0 0 78px" }}>
          <h3>DANH MỤC NỔI BẬT</h3>
          <>
            <Swiper
              slidesPerView={5}
              centeredSlides={true}
              spaceBetween={30}
              grabCursor={true}
              preventClicks="false"
              scrollbar={{
                hide: true,
              }}
              modules={[Pagination, Scrollbar]}
              className="mySwiper"
              loop={true}
              style={{ height: "360px", width: "auto" }}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/product/detail/${product.id}`}>
                    <Image
                      src={product.img}
                      alt={product.name}
                      style={{ width: "100%" }}
                    />
                    <h5 style={{ paddingTop: "10px" }}>{product.name}</h5>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        </Container>
      </div>

      <br />
      <Image src="/assets/Banner/Banner-web.png" fluid />
      <br />
      <div className="product-famous">
        <Container fluid style={{ padding: "0 0 0 78px" }}>
          <h3>Sản Phẩm Mới</h3>
          <>
            <Swiper
              slidesPerView={5}
              centeredSlides={true}
              spaceBetween={30}
              grabCursor={true}
              preventClicks="false"
              scrollbar={{
                hide: true,
              }}
              modules={[Pagination, Scrollbar]}
              className="mySwiper"
              loop={true}
              style={{ height: "360px", width: "auto" }}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <Link to={`/product/detail/${product.id}`}>
                    <Image
                      src={product.img}
                      alt={product.name}
                      style={{ width: "100%" }}
                    />
                    <h5 style={{ paddingTop: "10px" }}>{product.name}</h5>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default Home;
