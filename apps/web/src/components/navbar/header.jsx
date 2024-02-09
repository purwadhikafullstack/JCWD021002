/* eslint-disable react/prop-types */
import {
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  Image,
  Avatar,
  HStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';
import { ResizeButton } from '../ResizeButton';
import { Link, useNavigate } from 'react-router-dom';
import { useWebSize } from '../../provider.websize';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { MenuLocation } from './menuLocation';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../redux/reducer/authReducer';
import { useLocation } from 'react-router-dom';
import { CartIcon } from '../Cart/Cart.Icon';
import { logout } from '../../config/firebase-config';
import toast from 'react-hot-toast';
import DeleteAlert from '../DeleteAlert';

export const Header = () => {
  const { size } = useWebSize();
  const { user } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()?.pathname;
  const userRole = useSelector((state) => state.AuthReducer?.user?.role_idrole);
  const isLogin = useSelector((state) => state.AuthReducer?.isLogin);

  const onLogout = () => {
    const result = logout();
    dispatch(logoutSuccess());
    toast.success('Log out Success');
    if (result === 'logout success') {
      navigate('/');
    }
  };
  console.log({ isLogin });
  return (
    <Flex
      // bgColor={size == '500px' ? 'colors.primary' : 'colors.secondary'}
      sx={
        size == '500px'
          ? { bgColor: 'colors.primary' }
          : { bgGradient: 'linear(to-r, #f2ffed, #fcfdde)' }
      }
      h={size == '500px' ? 'fit-content' : '100px'}
      direction={'column'}
      p={size == '500px' ? '20px' : '10px 30px'}
      pb={size == '500px' ? 5 : 0}
      gap={3}
      transition={'width 2s ease-in-out'}
      boxShadow={size == '500px' ? 'base' : 'none'}
    >
      <Flex
        justify={'space-between'}
        h={'full'}
        direction={size == '500px' ? 'row' : 'column-reverse'}
        // gap={size == '500px' ? 0 : 2}
      >
        <Flex w={'100%'}>
          <MenuLocation />
        </Flex>
        <Flex
          gap={5}
          w={size == '500px' ? '20%' : 'full'}
          justify={size == '500px' ? 'end' : 'space-between'}
          align={'center'}
        >
          <Flex
            gap={'50px'}
            align={'center'}
            display={size == '500px' ? 'none' : 'flex'}
          >
            <Link to={'/'}>
              <Image src={LogoGroceria} h={'30px'} />
            </Link>
            <Flex gap={3}>
              <Link to={'/'}>
                <Text>Home</Text>
              </Link>
              <Link to={'/product-catalogue'}>
                <Text>Product</Text>
              </Link>
              <Link to={'/about'}>
                <Text>About</Text>
              </Link>
              <Link to={'/contact'}>
                <Text>Contact</Text>
              </Link>
            </Flex>
          </Flex>
          <Flex gap={5}>
            <Flex display={size == '500px' ? 'none' : 'flex'} align={'center'}>
              <Link to={'/product-search'}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <IoIosSearch size={'20px'} color="black" />
                  </InputLeftElement>
                  <Input
                    bgColor={'white'}
                    borderRadius={'5px'}
                    placeholder="Search"
                    h={'35px'}
                    w={'318px'}
                    readOnly
                  />
                </InputGroup>
              </Link>
            </Flex>
            <Flex display={size == '500px' ? 'none' : 'flex'} align={'center'}>
              <CartIcon transform={'translate(70%, 110%)'} />
            </Flex>
            <ResizeButton
              color={size == '500px' ? 'white' : 'colors.primary'}
            />
            {/* menu icon */}
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{
                  boxShadow: 'none',
                  borderColor: 'transparent',
                  outlineColor: 'transparent',
                }}
                _hover={{ borderColor: 'transparent' }}
                display={size == '500px' ? 'none' : 'block'}
              >
                <HStack>
                  {isLogin ? (
                    user?.avatar ? (
                      <Avatar
                        key={user?.avatar}
                        name={user?.username}
                        src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                          user?.avatar
                        }`}
                        w={'45px'}
                        h={'45px'}
                      />
                    ) : (
                      <Avatar
                        key={user?.avatar}
                        name={user?.username}
                        bg="rgba(40, 96, 67, 1)"
                        src={'https://bit.ly/broken-link'}
                        w={'45px'}
                        h={'45px'}
                        color={'white'}
                      />
                    )
                  ) : (
                    <Avatar
                      bg="rgba(40, 96, 67, 1)"
                      src={'https://bit.ly/broken-link'}
                      w={'45px'}
                      h={'45px'}
                      color={'white'}
                    />
                  )}
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                zIndex={10}
              >
                {userRole == 1 ? (
                  <MenuItem onClick={() => navigate(`/dashboard`)}>
                    Dashboard
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() =>
                      navigate(
                        `/profile?fromPage=${encodeURIComponent(location)}`,
                      )
                    }
                  >
                    Profile
                  </MenuItem>
                )}
                <MenuDivider />
                {isLogin ? (
                  <MenuItem
                  // onClick={() => {
                  //   dispatch(logoutSuccess());
                  //   navigate('/login');
                  // }}
                  >
                    <DeleteAlert
                      btnValue={'Log out'}
                      style={{
                        fontWeight: '400',
                        variant: 'unstyled',
                        padding: '0',
                        size: '',
                      }}
                      deleteAction={onLogout}
                      titleValue={'Log out'}
                      mainValue={
                        'Anda akan keluar dari akun anda. Yakin ingin melanjutkan?'
                      }
                      buttonActionValue={'lanjutkan'}
                      navigateTo={'/login'}
                    />
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    Login
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>

      <Link style={{ width: '100%' }} to={'/product-search'}>
        <InputGroup
          alignItems={'center'}
          display={size == '500px' ? 'flex' : 'none'}
        >
          <InputLeftElement pointerEvents="none">
            <IoIosSearch size={'20px'} color="black" />
          </InputLeftElement>
          <Input
            bgColor={'white'}
            borderRadius={'5px'}
            placeholder="Search"
            readOnly
          />
        </InputGroup>
      </Link>
    </Flex>
  );
};
