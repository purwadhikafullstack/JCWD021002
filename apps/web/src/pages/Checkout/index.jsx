import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Heading,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { PiMapPinFill } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { LiaBoxSolid } from 'react-icons/lia';
import { IconChevronLeft } from '@tabler/icons-react';
import { calculateDiscountPrice } from '../../utils/calculateDiscountPrice';
import { Link, useLocation } from 'react-router-dom';

import Voucher from '../../assets/voucher.png';
import { CheckoutHeader } from '../../components/Checkout/Checkout.Header';
import { CheckoutSidebar } from '../../components/Checkout/Checkout.Sidebar';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useWebSize } from '../../provider.websize';
import { VoucherPage } from '../Voucher/Voucher';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../redux/reducer/addressReducer';
import { groupBy } from 'lodash';
import { ListProductOrder } from './listProductOrder';
import '../../scrollbar.css';
import { CheckoutAddress } from '../../components/Checkout/Checkout.Address';

export const Checkout = () => {
  const [selectedItem, setSelectedItem] = useState();
  const [active, setActive] = useState();
  const user = useSelector((state) => state.AuthReducer.user);
  console.log('User:', user); // Add this line to check the user object
  const [userAddress, setUserAddress] = useState();
  const userId = user?.id; // Use optional chaining to avoid errors if user is undefined
  console.log('UserID:', userId); // Ad
  const [heading, setHeading] = useState(null);
  const [order, setOrder] = useState([]);
  console.log('order', order);
  const [orderDetail, setOrderDetail] = useState([]);
  const { size, handleWebSize } = useWebSize();
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const address = useSelector((state) => state.addressReducer?.address);
  const dispatch = useDispatch();
  const [selectedShipping, setSelectedshipping] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const location = useLocation();
  const isCartShipment = location.pathname === '/cart/shipment';
  const isBeliSekarang = location.pathname === '/beli-sekarang';

  useEffect(() => {
    if (isCartShipment) {
      setHeading('Checkout');
    } else if (isBeliSekarang) {
      setHeading('Beli Sekarang');
    }
  }, [isCartShipment, isBeliSekarang]);

  const {
    isOpen: addressDrawerIsOpen,
    onOpen: onOpenAddressDrawer,
    onClose: onCloseAddressDrawer,
  } = useDisclosure();

  // console.log(`${import.meta.env.VITE_API_URL}/checkout/${userId}`);
  const fetchOrder = async (userId) => {
    try {
      //   if (!userId) {
      //     console.warn('User ID not available. Skipping cart fetch.');
      //     return;
      //   }
      console.log(
        `${import.meta.env.VITE_API_URL}/checkout/pre-checkout/${userId}`,
      );
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/checkout/pre-checkout/${userId}`,
      );

      // console.log(
      //   'Cart API Response:',
      //   response?.data?.data?.OrderDetails || [],
      // );

      //   console.log(response);

      setOrder(response?.data?.data);
      console.log('order: ', response?.data?.data);
      // const groupedProduct = groupBy(
      //     response?.data?.data[0]?.OrderDetails || [],
      //     'Store.id',
      //   );
      // setOrderDetail(groupedProduct);
      setOrderDetail(response?.data?.data?.OrderDetails);
      // console.log('orderDetail: ', response?.data?.data?.OrderDetails);
    } catch (err) {
      //   console.warn('Cart not found for user:', userId);
      console.error('Error fetching cart:', err);
    }
  };

  // console.log('cek data order: ', order);

  const getAddress = async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/address/getAddress/${userId}`,
      );
      setUserAddress(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchOrder(userId);
    getAddress(userId);
  }, [user, userId]);

  const handleSelectAddress = (selectedItem) => {
    onCloseAddressDrawer();
    dispatch(setAddress(selectedItem));
  };

  return (
    <Box
      p="0"
      // w='full'
      w={{ base: '100vw', md: size }}
      h={'100vh'}
      transition="width 0.3s ease"
      backgroundColor="#f5f5f5"
      className="hide-scrollbar"
    >
      <CheckoutHeader
        heading={heading}
        handleWebSize={handleWebSize}
        size={size}
      />
      <>
        <Heading hidden={size == '500px'} px={175} py={5} size="md">
          Checkout
        </Heading>
        <Flex
          w={{ base: '100vw', md: size }}
          gap={5}
          alignItems="flex-start"
          px={size === '500px' ? 0 : 175}
          flexDirection={size == '500px' ? 'column' : 'row'}
          h={'full'}
        >
          {/* <Flex
        // size={size}
        flexDirection={size == '500px' ? 'column' : 'row'}
        justifyContent='space-between'
        // justifyContent={size == '500px' ? 'normal' : 'space-between'}
        w="full"
        h="100vh"
        overflowY="auto"
        position="relative"
        gap={3}
        // p={size == '500px' ? 0 : 5}
      > */}
          <Stack w="full" overflowY="auto" position="relative">
            {/* <VStack w='full' spacing={3} > */}

            <CheckoutAddress
              address={address}
              // onOpenAddressDrawer={onOpenAddressDrawer}
            />
            {/* {order?.Store?.name} */}
            {/* {order.map((item, index) => (
          <Box key={index}>
            {item.id}
          </Box>
        ) )} */}

            <ListProductOrder
              order={order}
              orderDetail={orderDetail}
              selectedItem={selectedItem}
              selectedShipping={selectedShipping}
              setSelectedshipping={setSelectedshipping}
              address={address}
            />
            {/* </VStack> */}
          </Stack>

          <HStack
            w="full"
            cursor="pointer"
            justifyContent="space-between"
            h="3.5em"
            p={4}
            pl={5}
            pr={1}
            //   spacing={0}
            background="white"
            hidden={size == '500px' ? false : true}
          >
            <Flex alignItems="center" gap={2}>
              <Icon as={Image} src={Voucher} w={'43px'} h="22px" />
              <Text>Voucher Groceria</Text>
            </Flex>
            <VoucherPage
              order={order}
              setDiscountVoucher={setDiscountVoucher}
              fetchOrder={fetchOrder}
            />
          </HStack>

          {/* {order.length > 0 ? (order.map ((item, index) => ( */}

          <Flex
            w={size === '500px' ? size : '40em'}
            bg="white"
            rounded={size === '500px' ? 0 : 10}
            flexDirection="column"
            position={size == '500px' ? 'unset' : 'sticky'}
            top={size == '500px' ? undefined : '85px'}
            bottom={0}
          >
            {/* hai */}
            {/* <Box w='30em'> */}
            <Stack p={4} px={5} spacing={0} h="fit-content">
              <Text fontWeight="bold">Rincian Pembayaran</Text>
              <Flex w="full" justifyContent="space-between">
                <Flex flexDirection="column" color="gray.600">
                  <Text fontSize="sm">Subtotal Untuk Produk (10 Barang)</Text>
                  <Text fontSize="sm">Subtotal Untuk Pengiriman</Text>
                  <Text fontSize="sm">Voucher Diskon Untuk Pengiriman</Text>
                  <Text fontSize="sm">Voucher Diskon Untuk Produk</Text>
                </Flex>
                <Flex
                  flexDirection="column"
                  alignItems="flex-end"
                  // background="white"
                  color="gray.600"
                >
                  <Text fontSize="sm">
                    {order?.totalAmount
                      ? angkaRupiahJs(order?.totalAmount, { formal: false })
                      : angkaRupiahJs(0, { formal: false })}
                  </Text>
                  <Text fontSize="sm">
                    {selectedShipping &&
                      angkaRupiahJs(selectedShipping?.cost[0]?.value, {
                        formal: false,
                      })}
                  </Text>
                  <Text fontSize="sm">
                    {order?.totalShipping
                      ? angkaRupiahJs(order?.totalShipping, { formal: false })
                      : angkaRupiahJs(0, { formal: false })}
                  </Text>
                  <Text fontSize="sm">
                    -{' '}
                    {order?.totalShippingDiscount
                      ? angkaRupiahJs(order?.totalShippingDiscount, {
                          formal: false,
                        })
                      : angkaRupiahJs(0, { formal: false })}
                  </Text>
                  <Text fontSize="sm">
                    -{' '}
                    {order?.totalDiscount
                      ? angkaRupiahJs(order?.totalDiscount, { formal: false })
                      : angkaRupiahJs(0, { formal: false })}
                  </Text>
                </Flex>
              </Flex>
            </Stack>
            <Divider hidden={size == '500px' ? true : false} />
            <HStack
              w="full"
              cursor="pointer"
              justifyContent="space-between"
              h="3.5em"
              p={4}
              pl={5}
              pr={1}
              //   spacing={0}
              background="white"
              hidden={size == '500px' ? true : false}
            >
              <Flex alignItems="center" gap={2}>
                <Icon as={Image} src={Voucher} w={'43px'} h="22px" />
                <Text>Voucher Groceria</Text>
              </Flex>
              <VoucherPage
                order={order}
                setDiscountVoucher={setDiscountVoucher}
                fetchOrder={fetchOrder}
              />
            </HStack>
            <Flex
              // w='full'
              bg="white"
              flexDirection="column"
              position={size == '500px' ? 'fixed' : 'sticky'}
              top={size == '500px' ? undefined : '85px'}
              bottom={0}
            >
              <CheckoutSidebar
                handleWebSize={handleWebSize}
                size={size}
                order={order}
                selectedShipping={selectedShipping}
              />
            </Flex>
            {/* </Box> */}
          </Flex>
          {/* ))} */}
        </Flex>
        {/* </Flex> */}
      </>

      {/* <HStack>
        @2004, Groceria. All Rights Reserved
      </HStack> */}
    </Box>
  );
};
