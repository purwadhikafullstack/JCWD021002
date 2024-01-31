/* eslint-disable react/prop-types */


import { Header } from '../../components/navbar/header';
import { Collections } from './home.collections';
import { MySwiper } from './home.swiper';
import { ProductList } from './home.productList';
import { BottomBar } from '../../components/BottomBar';
import { SwiperCategory } from './home.swiperCategory';

import { Flex, Text } from '@chakra-ui/react';
import { PiGift } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { useWebSize } from '../../provider.websize';
import { Footer } from './home.footer';

export const Home = () => {
  const { size } = useWebSize();

  return (
    <Flex
      w={{ base: '100vw', lg: size }}
      direction={'column'}
      bgColor={'colors.secondary'}
      transition={'all .3s ease-in-out'}
      // gap={size == '500px' ? '0' : '100px'}
    >
      <Header /> 
      <Flex>
        <MySwiper size={size} />
      </Flex>

      <SwiperCategory size={size} />

      <Flex
        direction={'column'}
        gap={2}
        w={{ base: 'full', lg: size }}
        overflowX={'hidden'}
        mb={size == '500px' && '60px'}
      >
        <Flex
          display={size == '500px' ? 'flex' : 'none'}
          justify={'space-between'}
          align={'center'}
          bgColor={'white'}
          color={'colors.primary'}
          h={'36px'}
          p={'10px'}
          borderRadius={'4px'}
          cursor={'pointer'}
          m={size == '500px' ? '0 20px' : '30px 200px'}
        >
          <Flex gap={2}>
            <PiGift size={'20px'} />
            <Text fontWeight={400} fontSize={'14px'}>
              You have 5 voucher here
            </Text>
          </Flex>
          <IoIosArrowForward />
        </Flex>

        <Collections size={size} />

        <ProductList />

        <Footer />
      </Flex>
      <Flex
        position={'fixed'}
        bottom={0}
        w={{ base: 'full', md: size }}
        display={size == '500px' ? 'flex' : 'none'}
        zIndex={10}
      >
        <BottomBar />
      </Flex>
    </Flex>
  );
};
