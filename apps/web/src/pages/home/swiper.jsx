/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export const MySwiper = ({ size }) => {
  const slider = [
    { slide: 'Slide 1' },
    { slide: 'Slide 2' },
    { slide: 'Slide 3' },
    { slide: 'Slide 4' },
    { slide: 'Slide 5' },
  ];
  return (
    <Flex h={'fit-content'}>
      <Swiper
        slidesPerView={1.2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        loop={true}
        className="mySwiper"
        modules={[Autoplay]}
        style={{ height: 'fit-content', width: size, padding: '20px' }}
      >
        {slider?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              style={{
                height: size == "500px" ? '144px': "300px",
                width: size,
                backgroundColor: 'red',
                borderRadius: '8px',
              }}
            >
              {item.slide}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Flex>
  );
};
