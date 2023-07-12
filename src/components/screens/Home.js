import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination, Scrollbar } from "swiper";
import { Container, Image } from "react-bootstrap";
import "./ScreensStyle.css";
import { Link } from "react-router-dom";
import Loader from "../layouts/Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:9999/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container border-0">
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
                    {[...products]
                      .sort((a, b) => {
                        return a.id - b.id;
                      })
                      .slice(0, 10)
                      .map((product, index) => (
                        <SwiperSlide key={index}>
                          <Link to={`/product/detail/${product.id}`}>
                            <Image
                              src={product.img}
                              alt={product.name}
                              style={{ width: "100%" }}
                            />
                            <h5 style={{ paddingTop: "10px" }}>
                              {product.name}
                            </h5>
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
                    {[...products]
                      .sort((a, b) => {
                        return a.id - b.id;
                      })
                      .map((product, index) => (
                        <SwiperSlide key={index}>
                          <Link to={`/product/detail/${product.id}`}>
                            <Image
                              src={product.img}
                              alt={product.name}
                              style={{ width: "100%" }}
                            />
                            <h5 style={{ paddingTop: "10px" }}>
                              {product.name}
                            </h5>
                          </Link>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </>
              </Container>
            </div>
          </DefaultLayout>
        </div>
      )}
    </>
  );
};

export default Home;
