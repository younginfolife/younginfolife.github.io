"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  "/carousel/1.jpg",
  "/carousel/2.jpg",
  "/carousel/3.jpg",
  "/carousel/4.JPG",
  "/carousel/5.jpeg",
];

const ImageCarousel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true, dynamicBullets: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full max-w-2xl"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
