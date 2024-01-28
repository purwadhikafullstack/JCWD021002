import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Avatar,
  Box,
} from '@chakra-ui/react';
import {
  HiOutlineHome,
  HiHome,
  HiOutlineShoppingCart,
  HiShoppingCart,
} from 'react-icons/hi2';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { IoPersonCircleOutline, IoPersonCircleSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const BottomBar = () => {
  const [active, setActive] = useState('');
  const path = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.AuthReducer.user);

  const [carts, setCarts] = useState([]);

  const fetchCarts = async (user) => {
    try {
      console.log('userId: ', user.id);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/${user.id}`,
      );
      console.log('res data: ', response?.data?.data);
      setCarts(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCarts(user);
  }, [user]);

  const bar = [
    {
      text: 'Home',
      icon:
        active == '/' ? (
          <HiHome size={'26px'} />
        ) : (
          <HiOutlineHome size={'26px'} />
        ),
      link: '/',
    },
    {
      text: 'Cart',
      icon: (
        <Flex alignItems='center'>
          {active == '/cart' ? (
            <HiShoppingCart size={'26px'} />
          ) : (
            // <HiOutlineShoppingCart size={'26px'} />
             <Link to='/cart'>
            <HiOutlineShoppingCart size={'26px'} />
            {carts.length > 0
              ? carts.map((item, index) => (
                  <Flex
                    hidden={item.totalQuantity === 0 ? true : false}
                    key={index}
                    position='absolute'
                    top={0}
                    w='5%'
                    h='37%'
                    borderRadius={'50%'}
                    justifyContent='center'
                    alignItems='center'
                    cursor={'pointer'}
                    transform='translate(35%, 35%)'
                    background='red'
                    color='white'
                    p={1.5}
                  >
                    <Text fontSize='10pt'>
                      {/* 300 */}
                      {item.totalQuantity}
                    </Text>
                  </Flex>
                ))
              : null}
          </Link>
          )}
        </Flex>
      ),
      link: '/cart',
    },
    {
      text: 'Favorite',
      icon:
        active == '/favorite' ? (
          <MdFavorite size={'26px'} />
        ) : (
          <MdFavoriteBorder size={'26px'} />
        ),
      link: '/favorite',
    },
    {
      text: 'Profile',
      icon:
        active == '/profile' ? (
          <IoPersonCircleSharp size={'26px'} />
        ) : (
          <IoPersonCircleOutline size={'26px'} />
        ),
      link: '/profile',
    },
  ];

  const isLogin = useSelector((state) => state.AuthReducer.isLogin);

  useEffect(() => {
    const pathName = path.pathname;
    setActive(pathName);

    if (isLogin) {
      onClose;
    }
  }, [path, setActive, isLogin, onClose]);

  return (
    <Flex
      justify={'space-between'}
      w={'full'}
      bgColor={'white'}
      p={'20px'}
      fontSize={'10px'}
      boxShadow={'0px -8px 8px -14px rgba(0,0,0,1)'}
    >
      {bar?.map((item, index) => {
        return (
          <Link
            to={isLogin ? item.link : '#'}
            onClick={item.link == '/' ? null : isLogin ? null : onOpen}
            key={index}
          >
            <Flex
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {item.link == '/profile' ? (
                user.avatar ? (
                  <Avatar
                    size={'xs'}
                    bgColor='#DAF1E8FF'
                    color={'colors.primary'}
                    src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                      user?.avatar
                    }`}
                  />
                ) : (
                  item.icon
                )
              ) : (
                item.icon
              )}
            </Flex>
          </Link>
        );
      })}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent alignItems={'center'} w={'80%'}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={5}
          >
            <Text textAlign={'center'}>
              Hanya satu langkah lagi! Silakan login untuk melanjutkan.
            </Text>
            <Link to={'/login'}>
              <Button
                variant='ghost'
                bgColor='colors.primary'
                color={'white'}
                _hover={{
                  transform: 'scale(1.1)',
                }}
                _active={{
                  transform: 'scale(1)',
                }}
                borderRadius={'10px'}
                px={'30px'}
              >
                Login
              </Button>
            </Link>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
