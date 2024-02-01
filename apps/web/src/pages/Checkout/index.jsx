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
import { CheckoutFooter } from '../../components/Checkout/Checkout.Footer';
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

export const Checkout = () => {
  const [selectedItem, setSelectedItem] = useState();
  const [active, setActive] = useState();
  const user = useSelector((state) => state.AuthReducer.user);
  const userId = user?.id;
  const [heading, setHeading] = useState(null);
  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { size, handleWebSize } = useWebSize();
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const address = useSelector((state) => state.addressReducer?.address);
  const dispatch = useDispatch();
  const [selectedShipping, setSelectedshipping] = useState();
  const [userAddress, setUserAddress] = useState();

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

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/checkout/${userId}`,
      );

      console.log(
        'Cart API Response:',
        response?.data?.data[0]?.OrderDetails || [],
      );

      //   console.log(response);

      setOrder(response.data.data[0]);
      const groupedProduct = groupBy(
        response?.data?.data[0]?.OrderDetails || [],
        'ProductStock.store_idstore',
      );
      setOrderDetail(groupedProduct);
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
      w={{ base: '100vw', md: size }}
      h={'fit-content'}
      transition="width 0.3s ease"
      backgroundColor="#f5f5f5"
      className="hide-scrollbar"
    >
      <CheckoutHeader heading={heading} handleWebSize={handleWebSize} size={size} />

      <Flex
        flexDirection="column"
        w="full"
        h="100vh"
        overflowY="auto"
        position="relative"
        gap={3}
      >
        <Stack
          p={4}
          pl={5}
          pr={2}
          background="white"
          cursor="pointer"
          onClick={onOpenAddressDrawer}
        >
          <Text>Alamat Pengiriman</Text>
          {address?.addressLine ? (
            <Flex flexDirection="column">
              <Flex alignItems="center" gap={1}>
                <Icon as={PiMapPinFill} boxSize={5} color="green.600" />
                <Text fontWeight="semibold">{address?.recipientNames}</Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                pr={0}
                mr={0}
              >
                <Text flexWrap="wrap" pl={5}>
                  {address?.addressLine}, {address?.postalCode}
                  {/* Jl. Perum Sari Boga no.6 Kec. Sukasari, Kab. Bandung Barat Bandung
              44465 */}
                </Text>
                <IconButton
                  variant="ghost"
                  _hover={{ color: 'black', opacity: 0.9 }}
                  transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                  color="gray.600"
                  icon={<IoIosArrowForward />}
                />
              </Flex>
            </Flex>
          ) : (
            <Flex flexDirection="column">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                pr={0}
                mr={0}
              >
                <Flex alignItems="center" gap={1}>
                  <Icon as={PiMapPinFill} boxSize={5} color="green.600" />
                  <Text flexWrap="wrap" pl={5}>
                    Pilih alamat pengiriman
                  </Text>
                </Flex>
                <IconButton
                  variant="ghost"
                  _hover={{ color: 'black', opacity: 0.9 }}
                  transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                  color="gray.600"
                  icon={<IoIosArrowForward />}
                />
              </Flex>
            </Flex>
          )}

          {/* Drawer for Address */}
          <Drawer
            placement="right"
            isOpen={addressDrawerIsOpen}
            onClose={onCloseAddressDrawer}
            size="md"
          >
            <DrawerOverlay />
            {/* <DrawerContent width="500px" mx="auto"> */}

            <DrawerContent
              w="500px"
              h="full"
              mx="auto"
              pos="absolute"
              left={0}
              transform="translateX(-50%)"
            >
              <DrawerHeader borderBottom="2px solid green" textAlign="center">
                <Flex justifyContent="space-between" alignItems="center">
                  <Flex gap={0} alignItems="center">
                    <IconButton
                      variant="ghost"
                      icon={<IconChevronLeft />}
                      onClick={onCloseAddressDrawer}
                      _hover={{ color: 'gray.600', opacity: 0.9 }}
                      transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                    />
                    <Heading size="sm">Daftar Alamat</Heading>
                  </Flex>
                  <Link
                    to={`/profile/detail/address/add?fromPage=${encodeURIComponent(
                      location,
                    )}`}
                  >
                    <Text fontSize="md" color="green.700">
                      Tambah Alamat
                    </Text>
                  </Link>
                </Flex>
              </DrawerHeader>
              <DrawerBody
                pt={5}
                display={'flex'}
                flexDirection={'column'}
                gap={5}
              >
                {userAddress?.map((item, index) => {
                  return (
                    <Flex
                      key={index}
                      w="full"
                      pt={5}
                      px={4}
                      pb={4}
                      //   pr={4}
                      borderWidth={1}
                      //   borderColor="green.600"
                      borderColor="gray"
                      //   color="green.600"
                      rounded={12}
                      spacing={4}
                      onClick={() => {
                        setSelectedItem(item);
                        // setCityIdUser()
                        if (active != item?.id) {
                          setActive(item?.id);
                        } else if (active == item?.id) {
                          setActive();
                        }
                      }}
                      direction={'column'}
                      gap={5}
                      cursor={'pointer'}
                    >
                      <Flex justify={'space-between'}>
                        <Box>
                          <Text fontWeight="semibold">
                            {item?.recipientNames}
                          </Text>
                          <Text fontSize="sm">
                            {item?.recipientsMobileNumber}
                          </Text>
                          <Text flexWrap="wrap" fontSize="sm">
                            {item?.addressLine}
                          </Text>
                        </Box>
                        <IconButton
                          isRound={true}
                          variant="outline"
                          // colorScheme="teal"
                          aria-label="Done"
                          fontSize="10px"
                          icon={
                            selectedItem ? (
                              active == item.id ? (
                                <FaCheck />
                              ) : (
                                <></>
                              )
                            ) : location.id == item.id ? (
                              <FaCheck />
                            ) : active == item?.id ? (
                              <FaCheck />
                            ) : (
                              <></>
                            )
                          }
                          color={'teal'}
                          border={'1px solid teal'}
                          size={'xs'}
                        />
                      </Flex>

                      <Button
                        w="full"
                        colorScheme="green"
                        color="black"
                        fontWeight="semibold"
                        borderColor="gray"
                        rounded={10}
                        variant="outline"
                      >
                        Ubah Alamat
                      </Button>
                    </Flex>
                  );
                })}
              </DrawerBody>
              <DrawerFooter>
                <Button
                  w="full"
                  background="green.700"
                  color="white"
                  _hover={{ background: 'green.900', opacity: 0.9 }}
                  transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                  onClick={() => handleSelectAddress(selectedItem)}
                >
                  Pilih Alamat
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Stack>

        <ListProductOrder
          orderDetail={orderDetail}
          selectedItem={selectedItem}
          selectedShipping={selectedShipping}
          setSelectedshipping={setSelectedshipping}
          address={address}
        />

        <HStack
          cursor="pointer"
          justifyContent="space-between"
          h="3.5em"
          p={4}
          pl={5}
          pr={1}
          //   spacing={0}
          background="white"
        >
          <Flex alignItems="center" gap={2}>
            <Icon as={Image} src={Voucher} w={'43px'} h="22px" />
            <Text>Voucher Groceria</Text>
          </Flex>
          <VoucherPage order={order} setDiscountVoucher={setDiscountVoucher} fetchOrder={fetchOrder} />
        </HStack>

        {/* {order.length > 0 ? (order.map ((item, index) => ( */}
        <Stack p={4} pl={5} pr={5} spacing={0} background="white" pb={20}>
          <Text>Rincian Pembayaran</Text>
          <Flex w="full" justifyContent="space-between">
            <Flex flexDirection="column" background="white" color="gray.600">
              <Text fontSize="sm">Subtotal Untuk Produk (10 Barang)</Text>
              <Text fontSize="sm">Subtotal Untuk Pengiriman</Text>
              <Text fontSize="sm">Total Diskon Untuk Pengiriman</Text>
              <Text fontSize="sm">Voucher Diskon</Text>
            </Flex>
            <Flex
              flexDirection="column"
              alignItems="flex-end"
              background="white"
              color="gray.600"
            >
              <Text fontSize="sm">
                {angkaRupiahJs(1000000, { formal: false })}
              </Text>
              <Text fontSize="sm">
                {selectedShipping && angkaRupiahJs(selectedShipping?.cost[0]?.value, {
                  formal: false,
                })}
              </Text>
              <Text fontSize="sm">
                - {angkaRupiahJs(24000, { formal: false })}
              </Text>
              <Text fontSize="sm">
                - { order?.totalDiscount ? angkaRupiahJs(order?.totalDiscount, { formal: false }) : angkaRupiahJs(0, { formal: false }) }
              </Text>
              <Text fontSize="sm">
                - { order?.totalDiscount ? angkaRupiahJs(order?.totalDiscount, { formal: false }) : angkaRupiahJs(0, { formal: false }) }
              </Text>
            </Flex>
          </Flex>
        </Stack>
        {/* ))} */}
      </Flex>

      <CheckoutFooter
        handleWebSize={handleWebSize}
        size={size}
        order={order}
        selectedShipping={selectedShipping}
      />
    </Box>
  );
};
