import { Box, Flex, Button, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

export const OrderItem = ({
  item,
  index,
  setOrderId,
  setIsDrawerOpen,
  toast,
  //   handleBayarSekarang,
  //   handlePesananDiterima,
}) => {
  const token = localStorage.getItem("token");
  const orderDetails = item?.OrderDetails;
  const productStock = item?.OrderDetails[index]?.ProductStock;

  const getStatusText = (status, paymentStatus) => {
    const statusMap = {
      new_order: {
        pending: 'Belum Bayar',
        settlement: 'Menunggu Konfirmasi',
      },
      payment_accepted: {
        settlement: 'On Process',
      },
      delivery: {
        settlement: 'Delivery',
      },
      done: {
        settlement: 'Selesai',
      },
      cancel: {
        pending: 'Cancel',
      },
    };

    return statusMap[status]?.[paymentStatus] || '';
  };

  const handlePesananDiterima = async (orderId) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/checkout/finish-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: 'Order Accepted',
        description: 'Terima Pesanan Berhasil',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return response;
    } catch (err) {
      console.error('Error accepting order', err);

      toast({
        title: 'Error Accepting Order',
        description: 'Terjadi kesalahan saat menerima pesanan.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleBayarSekarang = async (orderId) => {
    setIsDrawerOpen(true);
    setOrderId(orderId);
  };

  const isPaymentPending = (item) => {
    return item.status === 'new_order' && item.paymentStatus === 'pending';
  };

  const isDelivery = (item) => {
    return item.status === 'delivery' && item.paymentStatus === 'settlement';
  };

  return (
    <Box key={index} p={3} border="1px" rounded={5}>
      <Flex justifyContent="space-between" fontSize="11pt">
        <Flex justifyContent="center" alignItems="center">
          <HiOutlineShoppingBag boxSize={7} color="green.700" />
          <Box>
            <Text fontSize="medium" fontWeight="bold">
              Belanja
            </Text>
            <Text>
            {new Date(item.orderDate).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long', // 'long' for full month name, 'short' for abbreviated
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                // second: 'numeric',
                                timeZone: 'Asia/Jakarta', // Adjust the time zone to match Indonesia's time zone
                            })}</Text>
          </Box>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          w="7em"
          h="fit-content"
          p={1}
          bg="green.100"
          rounded={3}
        >
          <Text fontWeight="bold" color="green.700" textAlign='center' >
            {getStatusText(item.status, item.paymentStatus)}
          </Text>
        </Flex>
      </Flex>
      <Flex gap={2}>
        <Image
          w="4em"
          h="4em"
          backgroundColor="white"
          src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${
            productStock?.Product?.ProductImages[0]?.imageUrl
          }`}
          alt={productStock?.Product?.name}
          objectFit="cover"
          rounded={10}
        />
        <Box fontSize="11pt">
          <Text>{productStock?.Product?.name}</Text>
          <Text>
            {orderDetails.length
              ? `+${orderDetails.length} produk lainnya`
              : ''}
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between">
        <Box>
          <Text fontSize="11pt">Total Belanja</Text>
          <Text fontWeight="bold">
            {angkaRupiahJs(item.totalAmount, { formal: false })}
          </Text>
        </Box>
        <Button
          hidden={isPaymentPending(item) ? false : true}
          onClick={() => handleBayarSekarang(item.id)}
          size="sm"
          background="green.700"
          color="white"
          _hover={{ background: 'green.900', opacity: 0.9 }}
          transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
          fontWeight="bold"
        >
          Bayar Sekarang
        </Button>
        <Button
          hidden={isDelivery(item) ? false : true}
          onClick={() => handlePesananDiterima(item.id)}
          size="sm"
          background="green.700"
          color="white"
          _hover={{ background: 'green.900', opacity: 0.9 }}
          transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
          fontWeight="bold"
        >
          Selesaikan Pesanan
        </Button>
      </Flex>
    </Box>
  );
};
