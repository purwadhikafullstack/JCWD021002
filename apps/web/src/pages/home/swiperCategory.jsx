/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const SwiperCategory = ({ size }) => {
  const slider = [
    { slide: 'Slide 1' },
    { slide: 'Slide 2' },
    { slide: 'Slide 3' },
    { slide: 'Slide 4' },
    { slide: 'Slide 5' },
    { slide: 'Slide 6' },
    { slide: 'Slide 7' },
    { slide: 'Slide 8' },
    { slide: 'Slide 9' },
    { slide: 'Slide 10' },
  ];
  console.log(size);
  return (
    <Flex h={'fit-content'}>
      <Swiper
        slidesPerView={size == '500px' ? 5 : 6}
        spaceBetween={30}
        className="mySwiper"
        style={{ height: 'fit-content', width: size, padding: '0 20px' }}
      >
        {slider?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',
                height: 'fit-content',
                alignItems: 'center',
              }}
            >
              <Flex
                bgColor={'green'}
                h={size == '500px' ? '70px' : '100px'}
                w={size == '500px' ? '70px' : '100px'}
                borderRadius={'50%'}
              />
              {item.slide}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Flex>
  );
};
