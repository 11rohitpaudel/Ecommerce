import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slides = [
    {
        img: "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-d9ca2c0fbaff9d80e8dedfbd726aa438"
    },
    {
        img: "https://assetsio.gnwcdn.com/valorant-jett-and-phoenix-wallpaper-b.jpg?width=1200&height=630&fit=crop&enable=upscale&auto=webp"
    },
    {
        img: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc655d62fc92e4acd/649bdd9094be10f2698941ed/071123_Val_EP7_China_CG_Banner.jpg?auto=webp&disable=upscale&height=549"
    },
    {
        img: "https://www.alucare.fr/wp-content/uploads/2023/11/Valorant.jpg"
    },]


export default function SwiperSlider() {
    const progressCircle =useRef<any>(null);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[calc(100vh-80px)]"
      >
{
                    Slides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <img src={slide.img} className='w-full' alt='...' />
                        </SwiperSlide>
                    ))
                }


      </Swiper>
    </>
  );
}