import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  Stack,
  Input,
  Spacer,
  Flex,
  Text,
  Button,
  Divider,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWebSize } from '../../provider.websize';
import { TransactionHeader } from '../../components/Transaction/Transaction.Header';
import { PaymentDrawer } from '../../components/Transaction/Transaction.Payment';
import { BottomBar } from '../../components/BottomBar';
import { TabItem } from '../../components/Transaction/Transaction.TabItem';
import { OrderItem } from '../../components/Transaction/Transaction.OrderItem';
import { statusList } from './statusList';

export const Transaction = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const userId = user?.id;
  const [orderId, setOrderId] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(() => searchParams.get('status') || '');
  const [newStatus, setNewStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const toast = useToast();
  const [order, setOrder] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { size } = useWebSize();

  const statusQueryParam = searchParams.get('status');
  const [defaultIndex, setDefaultIndex] = useState(() => {
    const foundIndex = statusList.findIndex(
      (statusItem) => statusItem.status === status,
    );
    return foundIndex !== -1 ? foundIndex : 0;
  });

  useEffect(() => {
    setSearchParams({ status });
  }, [status, setSearchParams]);

  useEffect(() => {
    // Find the index of the status in the statusList array
    const foundIndex = statusList.findIndex(
      (statusItem) => statusItem.status === statusQueryParam,
    );

    // Set the defaultIndex to the found index or 0 if not found
    setDefaultIndex(foundIndex !== -1 ? foundIndex : 0);

    fetchOrder(userId, newStatus, paymentStatus);
  }, [userId, status, statusQueryParam, statusList]);

  const tabListRef = useRef(null);

  const handleTabClick = (status, newStatus, newPaymentStatus, index) => {
    setStatus(status);
    setNewStatus(newStatus);
    setPaymentStatus(newPaymentStatus);

    // Calculate the scroll position based on the clicked tab's index and width
    const tabWidth = tabListRef.current.offsetWidth / statusList.length;
    const newScroll = index * tabWidth;

    // Scroll to the new position with smooth behavior
    tabListRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });
  };

  // const handleBayarSekarang = async (orderId) => {
  //   setIsDrawerOpen(true);
  //   setOrderId(orderId);
  // };

  const fetchOrder = async (
    userId,
    newStatus,
    paymentStatus,
    startDate,
    endDate,
  ) => {
    try {
      if (!userId) {
        console.warn('User ID not available. Skipping order fetch.');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/checkout/get-order/${userId}`,
        {
          status: newStatus,
          paymentStatus: paymentStatus,
          startDate: startDate,
          endDate: endDate,
        },
      );

      setOrder(response?.data?.data);
    } catch (err) {
      console.error('Error fetching order', err);
    }
  };

  useEffect(() => {
    // Fetch orders when any of these dependencies change
    fetchOrder(userId, newStatus, paymentStatus);
  }, [userId, newStatus, paymentStatus]);

  const filterOrderDate = () => {
    fetchOrder(userId, newStatus, paymentStatus, startDate, endDate);
  };

  return (
    <Box
      flexDirection="column"
      p="0"
      w={{ base: '100vw', md: size }}
      // h="fit-content"
      transition="width 0.3s ease"
      backgroundColor="#f5f5f5"
      display="flex"
    >
      <TransactionHeader />
      <Stack
        bg="white"
        w="full"
        px={size === '500px' ? 0 : 175}
        py={size === '500px' ? 0 : 5}
      >
        <Flex p={5} pb={2} gap={4} justifyContent="center">
          <Box w="full">
            <Heading hidden={size == '500px'} size="md">
              Pesanan Saya
            </Heading>
          </Box>
          <Flex
            w="full"
            justifyContent={size === '500px' ? 'flex-start' : 'flex-end'}
          >
            <Input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              width="fit-content"
              type="date"
            />
            <Text>-</Text>
            <Input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              width="fit-content"
              type="date"
            />
          </Flex>
          <Button
            onClick={filterOrderDate}
            w={size === '500px' ? 'full' : '5em'}
          >
            Filter
          </Button>
        </Flex>
        <Box h="fit-content">
          <Divider />
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
                      index,
                    )
                  }
                />
              ))}
            </TabList>

            <TabPanels w="full" h="100vh">
              {statusList.map((statusItem, index) => (
                <TabPanel key={index}>
                  <Stack spacing={3}>
                    {order?.map((item, index) => (
                      <OrderItem
                        key={index}
                        item={item}
                        index={index}
                        setOrderId={setOrderId}
                        setIsDrawerOpen={setIsDrawerOpen}
                        // handleBayarSekarang={handleBayarSekarang}
                        // handlePesananDiterima={handlePesananDiterima}
                      />
                    ))}
                  </Stack>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
      <BottomBar />
      <PaymentDrawer
        userId={userId}
        order={order}
        orderId={orderId}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        toast={toast}
        fetchOrder={fetchOrder}
      />
    </Box>
  );
};
