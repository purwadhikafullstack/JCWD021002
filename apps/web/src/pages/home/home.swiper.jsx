/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Img1 from '../../assets/LP_IMAGEBLOCK_05012024031519_HqTNv.jpg';
import Img2 from '../../assets/LP_IMAGEBLOCK_05012024053913_dhdRs.jpg';
import Img3 from '../../assets/LP_IMAGEBLOCK_05012024015446_JaHnn.jpg';
import 'swiper/css';

export const MySwiper = ({ size }) => {
  const slider = [
    { slide: Img1 },
    { slide: Img2 },
    { slide: Img3 },
    { slide: Img1 },
    { slide: Img2 },
  ];
  return (
    <Flex h={'fit-content'} w={'full'} >
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        loop={true}
        className="mySwiper"
        modules={[Autoplay]}
        style={{
          height: 'fit-content',
          width: size,
          padding: '20px',
          transition: 'width .2s ease-in-out',
        }}
      >
        {slider?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              style={{
                height: size == '500px' ? '200px' : '500px',
                width: size,
                borderRadius: '8px',
                justifyContent: 'center',
                background: `url(${item.slide})`,
                backgroundPosition: 'bottom',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                transition: 'width .1s ease-in-out',
              }}
            ></SwiperSlide>
          );
        })}
      </Swiper>
    </Flex>
  );
};
