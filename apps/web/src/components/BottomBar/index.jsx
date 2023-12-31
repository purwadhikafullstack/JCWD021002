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

export const BottomBar = () => {
  const [active, setActive] = useState('');
  const path = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      icon:
        active == '/cart' ? (
          <HiShoppingCart size={'26px'} />
        ) : (
          <HiOutlineShoppingCart size={'26px'} />
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
            onClick={item.link == "/" ? null : isLogin ? null : onOpen}
            key={index}
          >
            <Flex
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {item.icon}
              {item.text}
            </Flex>
          </Link>
        );
      })}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Test</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
