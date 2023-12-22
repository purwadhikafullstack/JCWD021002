/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../config/firebase-config';

import { Button, Flex, Text } from '@chakra-ui/react';
import { Header } from './header';
import { MySwiper } from './swiper';
import { SwiperCategory } from './swiperCategory';
import { PiGift } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
// import './Home.css';

export const Home = ({ handleWebSize, size }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    const result = logout();
    if (result === 'logout success') {
      navigate('/login');
    }
  };

  const user = useSelector((state) => state.authReducer);
  console.log('user Home', user);

  return (
    <Flex
      w={size}
      direction={'column'}
      // mt={"-52px"}
    >
      <Header size={size} handleWebSize={handleWebSize} />
      <Flex>
        <MySwiper size={size} />
      </Flex>
      <SwiperCategory size={size} />
      <Flex p={'20px'} direction={'column'} gap={5}>
        <Flex
          justify={'space-between'}
          align={'center'}
          bgColor={'colors.secondary'}
          color={'colors.primary'}
          h={'36px'}
          px={"10px"}
          borderRadius={"4px"}
          cursor={"pointer"}
        >
          <Flex gap={2}>
            <PiGift size={'20px'} />
            <Text fontWeight={400} fontSize={'14px'}>
              You have 5 voucher here
            </Text>
          </Flex>
          <IoIosArrowForward />
        </Flex>
        <Button onClick={onLogout}>Log out</Button>
      </Flex>
    </Flex>
  );
};
