import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUsers,
} from 'react-icons/fi';
import {
  IconLayoutDashboard,
  IconPasswordUser,
  IconBox,
  IconReportMoney,
  IconReportAnalytics,
  IconHierarchy2,
  IconScaleOutline,
  IconPackage,
  IconDiscount,
  IconPackages,
} from "@tabler/icons-react";
import LogoIcon from "../../assets/Groceria-no-Bg.png";
// import { useAppSelector } from "../../redux/hook";
// import { useAppDispatch } from "../../redux/hook";
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../redux/reducer/authReducer';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ResizeButton } from '../../components/ResizeButton';

const LinkItems = [
  {
    name: 'Dashboard',
    icon: IconLayoutDashboard,
    to: '/dashboard-admin',
  },
  { name: "Product", icon: IconBox, to: "/product-lists" },
  { name: "Stock", icon: IconPackages, to: "/product-stock-lists" },
  { name: "Sales Report", icon: IconReportMoney, to: "/sales-report" },
  { name: "Stock Report", icon: IconReportAnalytics, to: "/stock-report" },
  { name: "Category", icon: IconHierarchy2, to: "/category-lists" },
  { name: "Mass Unit", icon: IconScaleOutline, to: "/mass-lists" },
  { name: "Packaging", icon: IconPackage, to: "/packaging-lists" },
  { name: "Discount", icon: IconDiscount, to: "/discount-lists" },
];

const SuperAdminLinkItems = [
  { name: "Admin", icon: IconPasswordUser, to: "/user-lists" },
  { name: 'Store', icon: IconPasswordUser, to: '/store' },
];

const SidebarContent = ({ onClose, size, handleWebSize, ...rest }) => {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 40 }}
      pos="fixed"
      h="full"
      overflowY="scroll"
      // scrollBehavior='smooth'
      // overscrollY='auto'
      {...rest}
    >
      <Flex justifyContent={'flex-end'}>
        <CloseButton
          // display={{ base: "flex", md: "none" }}
          display={size == '500px' ? 'flex' : 'none'}
          onClick={onClose}
          margin={'20px 20px'}
        />
      </Flex>

      <Flex h="20" alignItems="center" justifyContent="space-between">
        <Image src={LogoIcon} margin={'auto'} width="130px" />
      </Flex>
      
      {user?.role_idrole == 1 ? (
        <>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} to={link.to}>
              {link.name}
            </NavItem>
          ))}
          {SuperAdminLinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} to={link.to}>
              {link.name}
            </NavItem>
          ))}
        </>
      ) : (
        LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        ))
      )}
    </Box>
  );
};

const NavItem = ({ icon, children, to, ...rest }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Box
        as="a"
        href="#"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        padding={'16px'}
      >
        <Flex
          className="nav-item-container"
          align="center"
          p="2"
          margin={isActive ? '0 16px' : '0 auto'}
          flexDirection={'column'}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#EAEFEC',
            color: '#286043',
            margin: '0 16px',
          }}
          {...rest}
          bg={isActive ? '#EAEFEC' : ''}
          color={isActive ? '#286043' : ''}
        >
          {icon && (
            <Icon
              mb="3"
              fontSize="24px"
              stroke={'1px'}
              _groupHover={{
                color: '#286043',
              }}
              as={icon}
            />
          )}
          <Box className="name-container" fontSize={'14px'}>
            {children}
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, size, handleWebSize, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  return (
    <Flex
      className="mobile-nav-container"
      ml={{ base: 0, md: 0 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        // display={{ base: "flex", md: "none" }}
        display={size == '500px' ? 'flex' : 'none'}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Flex
        alignItems={'center'}
        gap={'10px'}
        // display={{ base: "flex", md: "none" }}
        display={size == '500px' ? 'flex' : 'none'}
        flexDirection={'row'}
      >
        <Image src={LogoIcon} w="150px" />
      </Flex>

      <HStack
        className="navTop"
        spacing={{ base: '0', md: '6' }}
        marginRight={{ base: '0', md: '60px' }}
      >
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <ResizeButton webSize={size} handleWebSize={handleWebSize} />
        <Flex alignItems={'center'}>
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
            >
              <HStack>
                {user?.avatar ? (
                  <Avatar
                    key={user?.avatar}
                    name={user?.username}
                    src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                      user?.avatar
                    }`}
                    w={'56px'}
                    h={'56px'}
                  />
                ) : (
                  <Avatar
                    key={user?.avatar}
                    name={user?.username}
                    bg="rgba(40, 96, 67, 1)"
                    src={'https://bit.ly/broken-link'}
                    w={'56px'}
                    h={'56px'}
                    color={'white'}
                  />
                )}
                <VStack
                  // display={{ base: "none", md: "flex" }}
                  display={size == '500px' ? 'none' : 'flex'}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role_idrole == 1 ? 'Super Admin' : 'Admin Store'}
                  </Text>
                </VStack>
                <Box
                  // display={{ base: "none", md: "flex" }}
                  display={size == '500px' ? 'none' : 'flex'}
                >
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  dispatch(logoutSuccess());
                  navigate('/');
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ size, handleWebSize }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContent
        onClose={onClose}
        // display={{ base: "none", md: "block" }}
        display={size == '500px' ? 'none' : 'block'}
        size={size}
        handleWebSize={handleWebSize}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            size={size}
            handleWebSize={handleWebSize}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} size={size} handleWebSize={handleWebSize} />
    </>
  );
};

export default SidebarWithHeader;
