import React, { useEffect, useRef, useState } from "react";

import DefaultLayout from "../layouts/DefaultLayout";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Scrollbar } from "swiper";
import { Image } from "react-bootstrap";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')));
  }, []);
  return (
    <DefaultLayout className="container">
      <h2>DANH MỤC NỔI BẬT</h2>
      <>
        <Swiper
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          scrollbar={{
            hide: true,
          }}
          modules={[Pagination, Scrollbar]}
          className="mySwiper"
          loop={true}
        >
          {
            products.map((product,index) => (
              <SwiperSlide key={index}>
                <Image src={product.img} alt={product.name} style={{width:'100%'}}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </>
      <br/>
        <Image src='/assets/Banner/Banner-web.png' fluid />
        <br/>
        <h2>Sản Phẩm Mới</h2>
        <>
        <Swiper
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          scrollbar={{
            hide: true,
          }}
          modules={[Pagination, Scrollbar]}
          className="mySwiper"
          loop={true}
        >
          {
            products.map((product,index) => (
              <SwiperSlide key={index}>
                <Image src={product.img} alt={product.name} style={{width:'100%'}}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </>
    </DefaultLayout>
  );
};

export default Home;
