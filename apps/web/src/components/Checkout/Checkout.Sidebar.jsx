/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const CheckoutSidebar = ({ size, order, selectedShipping }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const paymentGateway = async (dataPayment) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment`,
        {
          userId: dataPayment.userId,
          orderId: dataPayment.orderId,
          totalPrice: dataPayment.totalPrice,
          shippingCost: dataPayment.shippingCost,
          products: dataPayment.products,
        },
      );
      console.log('midtransToken', response.data.data);
      // alert("payment created")
      return response.data.data;
    } catch (err) {
      alert('Error occurred');
    }
  };

  const updatePaymentOrder = async (orderId) => {
    console.log('cek', orderId);
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/payment/${orderId}`);
      alert('Add payment data to order');
    } catch (err) {
      alert('Error occurred');
    }
  };

  // useEffect(() => {
  //  updatePaymentOrder()
  // }, [control]);

  // console.log(order)
  console.log('shipping cost', selectedShipping?.cost[0]?.value);

  const handlePayment = async (order, selectedShipping) => {
    try {
      console.log('footer checkout: ', order);
      console.log('cek', order?.user_iduser);
      const dataPayment = {
        userId: order?.user_iduser,
        orderId: order?.id,
        totalPrice: parseFloat(order?.totalAmount),
        shippingCost: parseFloat(selectedShipping?.cost[0]?.value),
        products: order?.OrderDetails.map((product) => ({
          productId: product?.productStock_idproductStock,
          quantity: product?.quantity,
          price: parseFloat(product?.ProductStock?.Product?.price),
        })),
      };
      console.log('data payment: ', dataPayment);

      const midtransToken = await paymentGateway(dataPayment);
      // setMidtransToken(token)

      if (midtransToken) {
        const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
        const clientKey = import.meta.env.MIDTRANS_CLIENT_KEY;
        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey);
        // script.async = true;

        script.onload = () => {
          window.snap.pay(midtransToken, {
              onSuccess: function (result) {
                toast({
                  title: 'Payment Success!',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
                console.log(result);
                updatePaymentOrder(order.id);
                navigate('/');
              },
              onPending: function (result) {
                toast({
                  title: 'Waiting for your payment',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                });
                updatePaymentOrder(order.id);
                navigate('/');
                console.log(result);
              },
              onError: function (result) {
                toast({
                  title: 'Payment Failed',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
                navigate('/');
                console.log(result);
              },
              onClose: function () {
                toast({
                  title: 'Payment Closed',
                  status: 'warning',
                  duration: 3000,
                  isClosable: true,
                });
                navigate('/');
              },
          });
        };
        document.body.appendChild(script);
      } else {
        console.error('Failed to get Midtrans token');
      }
    } catch (err) {
      console.error('Failed to Payment', err);
    }
  };

  return (
    <Flex
        // w='full'
        // w={{ base: '100vw', md: size }}
        // bg='red'
        w={size === '500px' ? size : 'full'}
        position='sticky'
        h='fit-content'
        flexDirection={size === '500px' ? 'row' : 'column'}
        gap={4}
        // bgColor="white"
        boxShadow={size === '500px' ? "0px -4px 4px -2px rgba(0, 0, 0, 0.1)" : 0}
      >      <Flex
        justifyContent={size === '500px' ? 'flex-end' : 'normal'}
        w="full"
        flexDirection={size === '500px' ? 'row' : 'column'}
        // h={size === '500px' ? '3.5em' : '3em'}
        // h='3.5em'
        gap={4}
        // bgColor="white"
        boxShadow="0px -4px 4px -2px rgba(0, 0, 0, 0.1)"
        pt={size === '500px' ? 0 : 2.5}
        pb={size === '500px' ? 0 : 4}
        px={size === '500px' ? 0 : 5}
      >
        <Flex
          flexDirection={size === '500px' ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems="center"
          // borderBottom={size === '500px' ? 0 : '1px solid gray'}
        >
          <Text fontSize="11pt">Total Belanja</Text>
          <Text fontSize="lg" fontWeight="bold" color="tomato">
            Rp. 1000000
            {/* {order?.totalAmount ? angkaRupiahJs(order?.totalAmount, {formal: false}) : null} */}
          </Text>
        </Flex>
        <Divider hidden={size === '500px' ? true : false} />
        <Button
          w={size === '500px' ? '9.5em' : 'full'}
          h="3em"
          rounded={size === '500px' ? 0 : 5}
          background="green.700"
          color="white"
          _hover={{ background: 'green.900', opacity: 0.9 }}
          transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
          onClick={() => handlePayment(order, selectedShipping)}
        >
          Buat Pesanan
        </Button>
      </Flex>
    </Flex>
  );
};
