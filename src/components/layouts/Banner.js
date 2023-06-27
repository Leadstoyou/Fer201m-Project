import Carousel from "react-bootstrap/Carousel";
import "../styles/DefaultLayoutStyle.css";
import { Container } from "react-bootstrap";
import  { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide,Swiper } from "swiper/react";

function Banner() {
  return (
    <div>
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className="d-block w-100" src="/assets/banner/3.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="d-block w-100" src="/assets/banner/2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="d-block w-100" src="/assets/banner/1.png" alt="" />
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
}
export default Banner;
