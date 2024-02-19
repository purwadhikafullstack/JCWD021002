import { Flex, useDisclosure, Avatar, Tooltip, Box } from '@chakra-ui/react';
import { HiOutlineHome, HiHome } from 'react-icons/hi2';
import { MdArticle, MdOutlineArticle } from 'react-icons/md';
import { IoPersonCircleOutline, IoPersonCircleSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWebSize } from '../../provider.websize';
import { LoginModal } from '../LoginModal';
import { CartIcon } from '../Cart/Cart.CartIcon';

export const BottomBar = () => {
  const [active, setActive] = useState('');
  const path = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.AuthReducer.user);
  const token = localStorage.getItem('token');
  const { size } = useWebSize();
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);

  const bar = [
    {
      text: 'Home',
      icon: (
        <Tooltip label="Home" fontSize="md" hasArrow placement="top">
          <Box
            display="inline-block"
            bg={active === '/' ? 'green.700' : 'transparent'}
            borderRadius="full"
            p={1}
            cursor="pointer"
          >
            {active === '/' ? (
              <HiHome size={'26px'} color="white" />
            ) : (
              <HiOutlineHome size={'26px'} color="green.700" />
            )}
          </Box>
        </Tooltip>
      ),
      link: '/',
    },
    {
      text: 'Cart',
      icon: (
        <Tooltip label="Cart" fontSize="md" hasArrow placement="top">
          <Box
            display="inline-block"
            bg={active === '/cart' ? 'green.700' : 'transparent'}
            borderRadius="full"
            p={1}
            cursor="pointer"
          >
            <CartIcon />
          </Box>
        </Tooltip>
      ),
      link: '/cart',
    },
    {
      text: 'Transaction',
      icon: (
        <Tooltip label="Transaction" fontSize="md" hasArrow placement="top">
          <Box
            display="inline-block"
            bg={active === '/transaction' ? 'green.700' : 'transparent'}
            borderRadius="full"
            p={1}
            cursor="pointer"
          >
            {active === '/transaction' ? (
              <MdArticle size={'26px'} color="white" />
            ) : (
              <MdOutlineArticle size={'26px'} color="green.700" />
            )}
          </Box>
        </Tooltip>
      ),
      link: isLogin ? '/transaction?status=all_transaction' : '/profile', 
    },
    {
      text: 'Profile',
      icon: token ? (
        user.avatar ? (
          <Box
            display="inline-block"
            bg={active === '/profile' ? 'green.700' : 'transparent'}
            borderRadius="full"
            p={1}
            cursor="pointer"
          >
            <Avatar
              // size={'xs'}
              width={'28px'}
              height={'28px'}
              bgColor="#DAF1E8FF"
              color={'colors.primary'}
              src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                user?.avatar
              }`}
            />
          </Box>
        ) : (
          <Tooltip label="Profile" fontSize="md" hasArrow placement="top">
            <Box
              display="inline-block"
              bg={active === '/profile' ? 'green.700' : 'transparent'}
              borderRadius="full"
              p={1}
              cursor="pointer"
            >
              {active === '/profile' ? (
                <IoPersonCircleSharp size={'26px'} color="white" />
              ) : (
                <IoPersonCircleOutline size={'26px'} color="green.700" />
              )}
            </Box>
          </Tooltip>
        )
      ) : (
        <Tooltip label="Profile" fontSize="md" hasArrow placement="top">
          <Box
            display="inline-block"
            bg={active === '/profile' ? 'green.700' : 'transparent'}
            borderRadius="full"
            p={1}
            cursor="pointer"
          >
            {active === '/profile' ? (
              <IoPersonCircleSharp size={'26px'} color="white" />
            ) : (
              <IoPersonCircleOutline size={'26px'} color="green.700" />
            )}
          </Box>
        </Tooltip>
      ),
      link: '/profile',
    },
  ];

  useEffect(() => {
    const pathName = path.pathname;
    setActive(pathName);

    if (isLogin) {
      onClose;
    }
  }, [path, setActive, isLogin, onClose]);

  return (
    <Flex
      position={'fixed'}
      bottom={0}
      w={{ base: 'full', md: size }}
      display={size == '500px' ? 'flex' : 'none'}
      zIndex={10}
    >
      <Flex
        justify={'space-between'}
        w={'full'}
        bgColor={'white'}
        // p={'20px'}
        p={4}
        fontSize={'10px'}
        boxShadow={'0px -8px 8px -14px rgba(0,0,0,1)'}
        display={size == '500px' ? 'flex' : 'none'}
      >
        {bar?.map((item, index) => {
          return (
            <Link
              to={
                isLogin ? item?.link : item.link == '/profile' ? '#' : item.link
              }
              onClick={
                item.link == '/profile' ? (isLogin ? null : onOpen) : null
              }
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Flex
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                {item.icon}
              </Flex>
            </Link>
          );
        })}
        <LoginModal isOpen={isOpen} onClose={onClose} fromPage={'/profile'} />
      </Flex>
    </Flex>
  );
};
