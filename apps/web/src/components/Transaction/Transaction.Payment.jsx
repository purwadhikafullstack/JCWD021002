import React, { useState } from 'react';
import {
  Stack,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
} from '@chakra-ui/react';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import axios from 'axios';

export const PaymentDrawer = ({
  userId,
  order,
  orderId,
  isOpen,
  onClose,
  toast,
  fetchOrder,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCancleOrder = async (orderId) => {
    try {
      const result = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/order-management/cancel-order/${userId}/${orderId}`,
      );

      toast({
        title: 'Order Cancel',
        description: 'Pesanan Berhasil Dibatalkan',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
      fetchOrder()

      return result;
    } catch (err) {
      console.error('Error canceling order', err);

      toast({
        title: 'Error Cancel Order',
        description: 'Terjadi kesalahan saat membatalkan pesanan.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Selesaikan Pembayaran</DrawerHeader>
        <DrawerBody>
          <Stack>
            {order?.length > 0 ? (
              order?.map((item, index) => (
                <Stack key={index}>
                  <Text>{item.paymentMethod}</Text>
                  <Text>Nomor Virtual Account: {item.paymentCode}</Text>
                  <Text fontWeight="bold">
                    Total Pembayaran:{' '}
                    {angkaRupiahJs(item.totalAmount, { formal: false })}
                  </Text>
                </Stack>
              ))
            ) : (
              <Text>No payment data available</Text>
            )}
            <Button
              onClick={() => handleCancleOrder(orderId)}
              colorScheme="red"
              transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
              fontWeight="bold"
            >
              Cancel Order
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
