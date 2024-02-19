// Transaction.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  Stack,
  Image,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWebSize } from '../../provider.websize';
import { TransactionHeader } from '../../components/Transaction/Transaction.Header';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { PaymentDrawer } from '../../components/Transaction/Transaction.Payment';
import SideBar from '../../components/SideBar/SideBar';

const TabItem = ({ label, status, onClick }) => (
  <Tab
    onClick={onClick}
    _selected={{
      //   borderBottom: '2px solid #286043',
      fontWeight: 'bold',
      position: 'relative',
      _after: {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        right: 0,
        height: '4px',
        borderRadius: '4px 4px 0 0',
        background: '#286043',
      },
    }}
    style={{ height: '50px' }} // Set a fixed width for each TabItem
  >
    <Text textAlign="center" isTruncated>
      {label}
    </Text>
  </Tab>
);

const OrderItem = ({
  item,
  index,
  handleCancelOrder,
  handleCancelPayment,
  handleAcceptOrder,
  handleSendOrder,
}) => {
  const orderDetails = item?.OrderDetails;
  const productStock = item?.OrderDetails[index]?.ProductStock;

  return (
    <Box key={index} p={3} border="1px" rounded={5}>
      <Flex justifyContent="space-between" fontSize="11pt">
        <Flex justifyContent="center" alignItems="center">
          <HiOutlineShoppingBag boxSize={7} color="green.700" />
          <Box>
            <Text fontSize="medium" fontWeight="bold">
              Pesanan Baru
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
              })}
            </Text>
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
          <Text fontWeight="bold" color="green.700" textAlign="center">
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
      <Flex justifyContent="space-between" w="full">
        <Box>
          <Text fontSize="11pt">Total Belanja</Text>
          <Text fontWeight="bold">{formatAmount(item.totalAmount)}</Text>
        </Box>
        <Flex gap={2}>
          <Button
            hidden={isOrderConfirmation(item) ? false : true}
            onClick={() => handleAcceptOrder(item.id)}
            size="sm"
            background="green.700"
            color="white"
            _hover={{ background: 'green.900', opacity: 0.9 }}
            transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
            fontWeight="bold"
          >
            Terima Pesanan
          </Button>
          <Button
            hidden={isOrderConfirmation(item) ? false : true}
            onClick={() => handleCancelPayment(item.id)}
            size="sm"
            background="red.600"
            color="white"
            _hover={{ background: 'red.900', opacity: 0.9 }}
            transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
            fontWeight="bold"
          >
            Cancel Pesanan
          </Button>
          <Button
            hidden={isPaymentAccepted(item) ? false : true}
            onClick={() => handleSendOrder(item.id)}
            size="sm"
            background="green.700"
            color="white"
            _hover={{ background: 'green.900', opacity: 0.9 }}
            transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
            fontWeight="bold"
          >
            Kirim Pesanan
          </Button>
          <Button
            hidden={isPaymentAccepted(item) ? false : true}
            onClick={() => handleCancelOrder(item.id)}
            size="sm"
            background="red.500"
            color="white"
            _hover={{ background: 'red.900', opacity: 0.9 }}
            transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
            fontWeight="bold"
          >
            Batalkan Pesanan
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

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

const isOrderConfirmation = (item) => {
  return item.status === 'new_order' && item.paymentStatus === 'settlement';
};

const isPaymentAccepted = (item) => {
  return (
    item.status === 'payment_accepted' && item.paymentStatus === 'settlement'
  );
};

const formatAmount = (amount) => {
  return angkaRupiahJs(amount, { formal: false });
};

export const OrderManagement = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const userId = user?.id;
  const token = localStorage.getItem('token');
  const [orderId, setOrderId] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState();
  const [store, setStore] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(() => searchParams.get('status') || '');
  const [newStatus, setNewStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const toast = useToast();
  const [order, setOrder] = useState([]);
  const [payment, setPayment] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { size, handleWebSize } = useWebSize();

  const statusQueryParam = searchParams.get('status');
  const [defaultIndex, setDefaultIndex] = useState(() => {
    const foundIndex = statusList.findIndex(
      (statusItem) => statusItem.status === status,
    );
    return foundIndex !== -1 ? foundIndex : 0;
  });

  // useEffect(() => {
  //   fetchOrder(userId, newStatus, paymentStatus, selectedStoreId);
  //   setSearchParams({ status });
  // }, [status, setSearchParams]);

  // useEffect(() => {
  //   // Find the index of the status in the statusList array
  //   const foundIndex = statusList.findIndex(
  //     (statusItem) => statusItem.status === statusQueryParam,
  //   );

  //   // Set the defaultIndex to the found index or 0 if not found
  //   setDefaultIndex(foundIndex !== -1 ? foundIndex : 0);

  //   fetchOrder(userId, newStatus, paymentStatus, selectedStoreId);
  // }, [userId, status, statusQueryParam, statusList]);

  const tabListRef = useRef(null);

  const handleTabClick = (status, newStatus, newPaymentStatus) => {
    setStatus(status);
    setNewStatus(newStatus);
    setPaymentStatus(newPaymentStatus);
  };

  const handleBayarSekarang = async (orderId) => {
    setIsDrawerOpen(true);
    setOrderId(orderId);
    await fetchPaymentData(userId, orderId);
  };

  const fetchOrder = async (userId, newStatus, paymentStatus) => {
    try {
      if (!userId) {
        console.warn('User ID not available. Skipping order fetch.');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order-management/`,
        {
          storeId: selectedStoreId,
          status: newStatus,
          paymentStatus: paymentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrder(response?.data?.data);
    } catch (err) {
      console.error('Error fetching order', err);
    }
  };

  const fetchStore = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/order-management/all-store`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setStore(response?.data?.data);
    } catch (err) {
      console.err(err);
    }
  };

  const fetchPaymentData = async (userId, orderId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPayment(response?.data?.data);
    } catch (err) {
      console.error('Error fetching payment data', err);
    }
  };

  // useEffect(() => {
  //   fetchStore();
  //   fetchOrder(userId, newStatus, paymentStatus, selectedStoreId)
  //   if (isDrawerOpen && orderId) {
  //     fetchPaymentData(userId, orderId);
  //   }
  // }, [isDrawerOpen, userId, orderId]);

  const handleStoreChange = async (selectedStore) => {
    setSelectedStoreId(selectedStore);

    // Fetch orders based on the selected storeId
    await fetchOrder(userId, newStatus, paymentStatus, selectedStoreId);

    // Fetch payment data if drawer is open and orderId is available
    if (isDrawerOpen && orderId) {
      await fetchPaymentData(userId, orderId);
    }
  };

  useEffect(() => {
    // Fetch store data when component mounts
    fetchStore();
    fetchOrder(userId, newStatus, paymentStatus, selectedStoreId);
  }, [selectedStoreId]);

  useEffect(() => {
    // Fetch orders based on the selected storeId and status
    fetchOrder(userId, newStatus, paymentStatus, selectedStoreId);

    // Update search params when status changes
    setSearchParams({ status });
  }, [status, setSearchParams, selectedStoreId]);

  useEffect(() => {
    // Find the index of the status in the statusList array
    const foundIndex = statusList.findIndex(
      (statusItem) => statusItem.status === statusQueryParam,
    );

    // Set the defaultIndex to the found index or 0 if not found
    setDefaultIndex(foundIndex !== -1 ? foundIndex : 0);
  }, [status, statusQueryParam, statusList]);

  useEffect(() => {
    // Fetch orders based on the selected storeId, status, and paymentStatus
    fetchOrder(userId, newStatus, paymentStatus, selectedStoreId);

    // Fetch payment data if drawer is open and orderId is available
    if (isDrawerOpen && orderId) {
      fetchPaymentData(userId, orderId);
    }
  }, [
    userId,
    newStatus,
    paymentStatus,
    selectedStoreId,
    isDrawerOpen,
    orderId,
  ]);

  const handleAcceptOrder = async (orderId) => {
    try {
      setOrderId(orderId);
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}/order-management/accept/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast({
        title: 'Order Accepted',
        description: 'Terima Pesanan Berhasil',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return result;
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

  const handleSendOrder = async (orderId) => {
    try {
      const result = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/order-management/send-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast({
        title: 'Order Accepted',
        description: 'Terima Pesanan Berhasil',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return result;
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

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/order-management/cancel-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast({
        title: 'Order Cancel',
        description: 'Order dibatalkan',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return result;
    } catch (err) {
      console.error('Error accepting order', err);

      toast({
        title: 'Error to cancel Order',
        description: 'Terjadi kesalahan saat pesanan dibatalkan.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancelPayment = async (orderId) => {
    try {
      const result = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/order-management/cancel-payment/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast({
        title: 'Order Cancel',
        description: 'Order dibatalkan',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return result;
    } catch (err) {
      console.error('Error accepting order', err);

      toast({
        title: 'Error to cancel Order',
        description: 'Terjadi kesalahan saat pesanan dibatalkan.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      flexDirection="column"
      p="0"
      w={{ base: '100vw', md: size }}
      overflowX="hidden"
      h="fit-content"
      transition="width 0.3s ease"
      backgroundColor="#f5f5f5"
      display="flex"
    >
      <SideBar size={size} handleWebSize={handleWebSize} />
      {/* <TransactionHeader /> */}
      <Box
        w={{ base: 'full', md: size }}
        pl={size === '500px' ? 0 : '170px'}
        pt={'100px'}
        h="100vh"
        background="white"
      >
        {user.role_idrole === 1 && (
          <Select
            placeholder="Pilih Gudang"
            onChange={(e) => handleStoreChange(e.target.value)}
          >
            {store.map((item, index) => (
              <option key={index} value={item?.id}>
                {item?.name}
              </option>
            ))}
          </Select>
        )}
        <Tabs isLazy defaultIndex={defaultIndex}>
          <TabList
            display="flex"
            flexDirection="row"
            overflowX="auto"
            transition="transform 0.3s ease"
            ref={tabListRef}
            sx={{
              '::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',
              scrollbarWidth: 'none',
            }}
          >
            {statusList.map((statusItem, index) => (
              <TabItem
                key={index}
                label={statusItem.label}
                status={statusItem.status}
                onClick={() =>
                  handleTabClick(
                    statusItem.status,
                    statusItem.newStatus,
                    statusItem.paymentStatus,
                  )
                }
              />
            ))}
          </TabList>

          <TabPanels w="full" h="100vh">
            {statusList.map((statusItem, index) => (
              <TabPanel key={index} forceRender={status === statusItem.status}>
                <Stack spacing={3}>
                  {order?.map((item, index) => (
                    <OrderItem
                      key={index}
                      item={item}
                      index={index}
                      handleBayarSekarang={handleBayarSekarang}
                      handleAcceptOrder={handleAcceptOrder}
                      handleSendOrder={handleSendOrder}
                      handleCancelOrder={handleCancelOrder}
                      handleCancelPayment={handleCancelPayment}
                    />
                  ))}
                </Stack>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
      {/* Use the new PaymentDrawer component */}
      <PaymentDrawer
        payment={payment}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        formatAmount={formatAmount}
      />
    </Box>
  );
};

// Extracted status list to iterate over
const statusList = [
  {
    label: 'Semua Pesanan',
    status: 'all_order',
    newStatus: '',
    paymentStatus: '',
  },
  {
    label: 'Pesanan Baru',
    status: 'new_order',
    newStatus: 'new_order',
    paymentStatus: 'settlement',
  },
  {
    label: 'Siap Dikirim',
    status: 'on_process',
    newStatus: 'payment_accepted',
    paymentStatus: 'settlement',
  },
  {
    label: 'Dalam Pengiriman',
    status: 'delivery',
    newStatus: 'delivery',
    paymentStatus: 'settlement',
  },
  {
    label: 'Selesai',
    status: 'done',
    newStatus: 'done',
    paymentStatus: 'settlement',
  },
  {
    label: 'Dibatalkan',
    status: 'cancel',
    newStatus: 'cancel',
    paymentStatus: 'pending',
  },
];
