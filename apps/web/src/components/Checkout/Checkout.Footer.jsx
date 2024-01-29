import { Button, Checkbox, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import axios from 'axios';

export const CheckoutFooter = ({
  size, order
}) => {
    const paymentGateway = async (dataPayment) => {
        try {
          const response = await axios.post( `${import.meta.env.VITE_API_URL}/payment`, {
            userId: dataPayment.userId,
            orderId: dataPayment.orderId,
            totalPrice: dataPayment.totalPrice,
            shippingCost: dataPayment.shippingCost,
            products: dataPayment.products,
          })
          console.log('midtransToken', response.data.data)
          // alert("payment created")
          return response.data.data
        } catch (err) {
          alert('Error occurred')
        }
    }

    const handlePayment = async (order) => {
        try {
            console.log('footer checkout: ', order);
            console.log('cek', order.user_iduser);
            const dataPayment = {
                userId: order.user_iduser,
                orderId: order.id,
                totalPrice: parseFloat(order.totalAmount),
                shippingCost: parseFloat(5000),
                products: order.OrderDetails.map((product) => ({
                  productId: product.productStock_idproductStock,
                  quantity: product.quantity,
                  price: parseFloat(product.ProductStock.Product.price),
                })),
              }
              console.log('data payment: ', dataPayment);
        
              const midtransToken = await paymentGateway(dataPayment)
              // setMidtransToken(token)
        
              if (midtransToken) {
                const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
                const clientKey = import.meta.env.MIDTRANS_CLIENT_KEY
                const script = document.createElement('script')
                script.src = snapScript
                script.setAttribute('data-client-key', clientKey)
                // script.async = true;
        
                script.onload = () => {
                  window.snap.pay(midtransToken, {
                    onSuccess: function (result) {
                      /* You may add your own implementation here */
                      alert('payment success!')
                      console.log(result)
                    //   CreatePayment(result)
                    },
                    onPending: function (result) {
                      /* You may add your own implementation here */
                      alert('wating your payment!')
                      console.log(result)
                    },
                    onError: function (result) {
                      /* You may add your own implementation here */
                      alert('payment failed!')
                      console.log(result)
                    },
                    onClose: function () {
                      /* You may add your own implementation here */
                      alert('you closed the popup without finishing the payment')
                    },
                  })
                }
                document.body.appendChild(script)
              } else {
                console.error('Failed to get Midtrans token')
              }
        } catch (err) {
            console.error('Failed to Payment', err);
        }
    }
  return (
    <Flex position='fixed' bottom={0} w={{ base: '100%', md: size }} > 
      <Flex
        justifyContent='flex-end'
        w='full'
        // p='20px'
        gap={4}
        bgColor='white'
        boxShadow='0px -4px 4px -2px rgba(0, 0, 0, 0.1)'
      >
        <Stack flexDirection='column' alignItems='center' spacing={0} >
          <Text fontSize>Total Pembayaran</Text>
          <Text fontSize='lg' fontWeight='bold' color='tomato'>
          {angkaRupiahJs(1000000, {formal: false})}
          </Text>
        </Stack>
          <Button
            w='9.5em'
            h='full'
            rounded={0}
            background='green.700'
            color='white'
            _hover={{ background: 'green.900', opacity: 0.9 }}
            transition='color 0.3s ease-in-out, opacity 0.3s ease-in-out'
            onClick={()=>handlePayment(order)}
          >
            Buat Pesanan
          </Button>
      </Flex>
    </Flex>
  );
};
