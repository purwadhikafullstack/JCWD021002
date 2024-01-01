/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../config/firebase-config';

import { Button, Flex, Text } from '@chakra-ui/react';
import { Header } from './header';
import { MySwiper } from './swiper';
import { SwiperCategory } from './swiperCategory';
import { PiGift } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { BottomBar } from '../../components/BottomBar';
import { Collections } from './collections';
import { ProductList } from './productList';
import { logoutSuccess } from '../../redux/reducer/authReducer';
// import './Home.css';

export const Home = ({ handleWebSize, size }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.AuthReducer.user);
  const dispatch = useDispatch();
  const onLogout = () => {
    const result = logout();
    dispatch(logoutSuccess());
    if (result === 'logout success') {
      navigate('/login');
    }
  };


  return (
    <Flex
      w={{ base: '100vw', lg: size }}
      direction={'column'}
      bgColor={"#F8F9FAFF"}
    >
      <Header size={size} handleWebSize={handleWebSize} />
      <Flex>
        <MySwiper size={size} />
      </Flex>
      <SwiperCategory size={size} />
      <Flex
        p={'20px'}
        direction={'column'}
        gap={5}
        w={{base: "full", lg: size}}
        overflowX={'hidden'}
      >
        <Flex
          justify={'space-between'}
          align={'center'}
          bgColor={'colors.secondary'}
          color={'colors.primary'}
          h={'36px'}
          px={'10px'}
          borderRadius={'4px'}
          cursor={'pointer'}
        >
          <Flex gap={2} >
            <PiGift size={'20px'} />
            <Text fontWeight={400} fontSize={'14px'}>
              You have 5 voucher here
            </Text>
          </Flex>
          <IoIosArrowForward />
        </Flex>

        <Collections size={size} />

        <ProductList />
        <Button onClick={onLogout}>Log out</Button>
        <Flex mb={'100px'} direction={'column'}>
          <Text>{user.username}</Text>
          <Text>{user.email}</Text>
          <Text>{user.fullname}</Text>
        </Flex>
      </Flex>
      <Flex position={'fixed'} bottom={0} w={{base: "full", md: size}}>
        <BottomBar />
      </Flex>
    </Flex>
  );
};
