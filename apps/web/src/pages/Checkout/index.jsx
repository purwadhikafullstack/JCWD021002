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
  DrawerCloseButton,
  useDisclosure,
  Divider,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { PiMapPinFill } from 'react-icons/pi';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { LiaBoxSolid } from 'react-icons/lia';
import { IconChevronLeft } from '@tabler/icons-react';

import Voucher from '../../assets/voucher.png';
import BebasOngkir from '../../assets/bebas_ongkir.png';
import { CheckoutHeader } from '../../components/Checkout/Checkout.Header';
import { CheckoutFooter } from '../../components/Checkout/Checkout.Footer';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useWebSize } from '../../provider.websize';

export const Checkout = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const userId = user?.id;
  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { size, handleWebSize } = useWebSize();

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
      setOrderDetail(response?.data?.data[0]?.OrderDetails || []);
    } catch (err) {
      //   console.warn('Cart not found for user:', userId);
      console.error('Error fetching cart:', err);
    }
  };

  console.log('cek data order: ', orderDetail);

  useEffect(() => {
    fetchOrder(userId);
  }, [user, userId]);

  return (
    <Box
      p="0"
      w={{ base: '100vw', md: size }}
      h={'fit-content'}
      transition="width 0.3s ease"
      backgroundColor="#f5f5f5"
    >
      <CheckoutHeader handleWebSize={handleWebSize} size={size} />

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
          <Flex flexDirection="column">
            <Flex alignItems="center" gap={1}>
              <Icon as={PiMapPinFill} boxSize={5} color="green.600" />
              <Text fontWeight="semibold">Kinur</Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pr={0}
            mr={0}
          >
            <Text flexWrap="wrap">
              Jl. Perum Sari Boga no.6 Kec. Sukasari, Kab. Bandung Barat Bandung
              44465
            </Text>
            <IconButton
              variant="ghost"
              _hover={{ color: 'black', opacity: 0.9 }}
              transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
              color="gray.600"
              icon={<IoIosArrowForward />}
            />
          </Flex>

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
                  <Text fontSize="md" color="green.700">
                    Tambah Alamat
                  </Text>
                </Flex>
              </DrawerHeader>
              <DrawerBody pt={5}>
                <VStack
                  w="full"
                  pt={5}
                  p={3}
                  px={4}
                  pb={4}
                  //   pr={4}
                  borderWidth={1}
                  //   borderColor="green.600"
                  borderColor="gray"
                  //   color="green.600"
                  rounded={12}
                  spacing={4}
                >
                  <Box>
                    <Text fontWeight="semibold">Kinur</Text>
                    <Text fontSize="sm">+628123456789</Text>
                    <Text flexWrap="wrap" fontSize="sm">
                      Jl. Perum Sari Boga no.6 Kec. Sukasari, Kab. Bandung Barat
                      Bandung 44465
                    </Text>
                  </Box>
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
                </VStack>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  w="full"
                  background="green.700"
                  color="white"
                  _hover={{ background: 'green.900', opacity: 0.9 }}
                  transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                  // onClick={handleCheckout}
                >
                  Pilih Alamat
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Stack>

        {orderDetail.map((item, index) => (
          <Stack key={index} p={4} pl={5} pr={5} background="white">
            <Text>{item.ProductStock?.Store.name}</Text>
            <Flex gap={2}>
              {/* {`${import.meta.env.VITE_API_IMAGE_URL}/products/${
                item.?.ProductStock?.Product.ProductImages[0].imageUrl
              }`} */}
              <Image
                w="4em"
                h="4em"
                backgroundColor="white"
                src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${
                  item.ProductStock?.Product?.ProductImages[0]?.imageUrl
                }`}
                alt={item.ProductStock?.Product?.name}
                objectFit="cover"
                rounded={10}
              />
              <Box>
                <Text>{item.ProductStock.Product.name}</Text>
                <Text fontWeight="semibold">
                  {item.quantity} x{' '}
                  {angkaRupiahJs(item.ProductStock.Product.price, {
                    formal: false,
                  })}
                </Text>
              </Box>
            </Flex>
            <Button
              rightIcon={<IoIosArrowForward color="gray.600" />}
              variant="outline"
              // _hover={{ color: 'black', opacity: 0.9 }}
              // transition='color 0.3s ease-in-out, opacity 0.3s ease-in-out'
              fontWeight="medium"
              justifyContent="space-between"
              onClick={onOpen}
            >
              Pilih Pengiriman
            </Button>
          </Stack>
        ))}

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
          <Button
            rightIcon={<IoIosArrowForward />}
            variant="ghost"
            _hover={{ color: 'black', opacity: 0.9 }}
            transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
            fontWeight="medium"
            color="gray.600"
          >
            Gunakan Voucher
          </Button>
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
                {angkaRupiahJs(30000, { formal: false })}
              </Text>
              <Text fontSize="sm">
                - {angkaRupiahJs(24000, { formal: false })}
              </Text>
              <Text fontSize="sm">
                - {angkaRupiahJs(400000, { formal: false })}
              </Text>
            </Flex>
          </Flex>
        </Stack>
        {/* ))} */}
      </Flex>
      <CheckoutFooter handleWebSize={handleWebSize} size={size} order={order} />
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent width="500px" mx="auto">
          <DrawerHeader>
            <Heading size="md">Metode Pengiriman</Heading>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={2}
          >
            <Stack
              w="full"
              p={1}
              pl={3}
              borderWidth={1}
              borderColor="green.600"
              color="green.600"
              rounded={15}
            >
              <Flex alignItems="center" gap={1}>
                <Icon as={LiaBoxSolid} boxSize={5} />
                <Text flexWrap="wrap">
                  Dikirim dari Kota Kota Binjai . Berat 0.1 kg
                </Text>
              </Flex>
            </Stack>
            <Box
              w="full"
              pb={2}
              cursor="pointer"
              borderBottom="2px"
              borderColor="gray"
            >
              <Icon as={Image} src={BebasOngkir} w="5em" h="fit-content" />
              <Text fontWeight="bold">
                Estimasi Tiba 27 - 30 Jan
                <Box as="span" color="tomato" marginLeft={1}>
                  ({angkaRupiahJs(0, { dot: '.', floatingPoint: 0 })})
                </Box>
              </Text>
            </Box>
            <Box
              w="full"
              pb={2}
              cursor="pointer"
              borderBottom="1px"
              borderColor="gray"
            >
              <Box>
                <Text fontWeight="bold">
                  Reguler
                  <Box as="span" color="tomato" marginLeft={1}>
                    ({angkaRupiahJs(13000, { dot: '.', floatingPoint: 0 })})
                  </Box>
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Estimasi Tiba 27 - 30 Jan
                </Text>
              </Box>
            </Box>
            <Box
              w="full"
              pb={2}
              cursor="pointer"
              borderBottom="1px"
              borderColor="gray"
            >
              <Box>
                <Text fontWeight="bold">
                  Kargo
                  <Box as="span" color="tomato" marginLeft={1}>
                    ({angkaRupiahJs(65000, { dot: '.', floatingPoint: 0 })})
                  </Box>
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Estimasi Tiba 27 - 30 Jan
                </Text>
              </Box>
            </Box>
            <Box
              w="full"
              pb={2}
              cursor="pointer"
              borderBottom="1px"
              borderColor="gray"
            >
              <Box>
                <Text fontWeight="bold">
                  Ekonomi
                  <Box as="span" color="tomato" marginLeft={1}>
                    ({angkaRupiahJs(10000, { dot: '.', floatingPoint: 0 })})
                  </Box>
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Estimasi Tiba 27 - 30 Jan
                </Text>
              </Box>
            </Box>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
