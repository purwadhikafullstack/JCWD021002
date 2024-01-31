/* eslint-disable react/prop-types */

<<<<<<< Updated upstream
import { Header } from './header';
import { Collections } from './collections';
import { MySwiper } from './swiper';
import { ProductList } from './productList';
=======
import { Header } from '../../components/navbar/header';
import { Collections } from './home.collections';
import { MySwiper } from './home.swiper';
import { ProductList } from './home.productList';
>>>>>>> Stashed changes
import { BottomBar } from '../../components/BottomBar';
import { SwiperCategory } from './home.swiperCategory';

import { Flex, Text } from '@chakra-ui/react';
import { PiGift } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { useWebSize } from '../../provider.websize';
import { Footer } from './home.footer';

export const Home = () => {

  const {size, handleWebSize } = useWebSize()

  return (
    <Flex
      w={{ base: '100vw', lg: size }}
      direction={'column'}
      bgColor={'#F8F9FAFF'}
      transition={"all .3s ease-in-out"}
    >
      <Header size={size} handleWebSize={handleWebSize} />
      <Flex>
        <MySwiper size={size} />
      </Flex>
      <SwiperCategory size={size} />
      <Flex
        direction={'column'}
        gap={5}
        w={{ base: 'full', lg: size }}
        overflowX={'hidden'}
<<<<<<< Updated upstream
        mb={"60px"}
=======
        mb={size == '500px' && '60px'}
>>>>>>> Stashed changes
      >
        <Flex
          justify={'space-between'}
          align={'center'}
          bgColor={'red'}
          color={'colors.primary'}
          h={'36px'}
          p={'10px'}
          borderRadius={'4px'}
          cursor={'pointer'}
          m={'10px 20px'}
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
      <Flex position={'fixed'} bottom={0} w={{ base: 'full', md: size }}>
        <BottomBar />
      </Flex>
    </Flex>
  );
};
