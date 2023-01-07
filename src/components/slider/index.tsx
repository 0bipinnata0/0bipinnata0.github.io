import React from "react";
import { SliderContainer } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination, Autoplay } from "swiper";
import { IBanner } from "../../store/bannerListSlice";

// https://swiperjs.com/react
const Slider: React.FC<{ bannerList: IBanner[] }> = (props) => {
  const { bannerList } = props;

  return (
    <SliderContainer>
      <Swiper
        modules={[Pagination, Autoplay]}
        className="slider-container"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ el: ".swiper-pagination" }}
      >
        {bannerList.map((slider, index) => {
          return (
            <SwiperSlide className="swiper-slide" key={slider.imageUrl + index}>
              <div className="slider-nav">
                <img
                  src={slider.imageUrl}
                  width="100%"
                  height="100%"
                  alt="推荐"
                />
              </div>
            </SwiperSlide>
          );
        })}
        <div className="swiper-pagination"></div>
      </Swiper>
      {/* 轮播的功能已经具备，但是这个效果并不是我们想要的，我们希望它是两边并不是完全空白，而是有一部分红色做衬托， */}
      {/* 注释下面看效果 */}
      <div className="before"></div>
    </SliderContainer>
  );
};

export default React.memo(Slider);
