/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import { DrawerShippingMethode } from './drawer.shippingMethode';
import { IoIosArrowForward } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { calculateDiscountPrice } from '../../utils/calculateDiscountPrice';

export const ListProductOrder = ({
  order,
  orderDetail,
  selectedItem,
  selectedShipping,
  setSelectedshipping,
  address,
  fetchOrder,
  selectedAddres,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [storeId, setStoreId] = useState();
  const [destination, setDestination] = useState();
  const [shipping, setShipping] = useState();

  const shippingCost = async (origin, destination) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/checkout/shippingCost`,
        {
          key: 'bfd51194adb513bfe32b3825a7acf0e5',
          origin: origin,
          destination: destination,
          weight: 1000,
          courier: 'jne',
        },
      );

      setShipping(res?.data?.data?.rajaongkir?.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoseShipping = (origin, destination) => {
    setStoreId(origin);
    setDestination(destination);
    shippingCost(origin, destination);
    onOpen();
  };
  console.log({ selectedAddres });
  console.log({ shipping });
  useEffect(() => {
    if (address) {
      shippingCost(storeId, address?.city_idcity);
    } else {
      shippingCost(storeId, destination);
    }
    if (selectedAddres) {
      setSelectedshipping();
    }
  }, [storeId, address, destination, selectedAddres, setSelectedshipping]);

  const dateEstimate = (estimateString) => {
    const [normalDays, expressDays] = estimateString.split('-').map(Number);

    const dayNow = new Date();
    const estimateDayNormal = new Date(dayNow);
    const estimateDayExpress = new Date(dayNow);

    estimateDayNormal.setDate(dayNow.getDate() + normalDays);
    estimateDayExpress.setDate(dayNow.getDate() + expressDays);

    const formattedNormal = estimateDayNormal.toLocaleDateString('id-ID', {
      day: 'numeric',
    });

    const formattedExpress = estimateDayExpress.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
    });

    return `${formattedNormal} - ${formattedExpress}`;
  };

  return (
    <Flex direction={'column'} w="full">
      {/* {order.map((item, index) => ( */}
      <Stack p={4} pl={5} pr={5} background="white">
        <Text>{order?.Store?.name}</Text>
        {/* <Text>{item?.id}</Text> */}
        {orderDetail.map((item, index) => (
          <Flex key={index} gap={2}>
            <Image
              w="4em"
              h="4em"
              backgroundColor="white"
              src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${
                item?.ProductStock?.Product?.ProductImages[0]?.imageUrl
              }`}
              alt={item?.ProductStock?.Product?.name}
              objectFit="cover"
              rounded={10}
            />
            <Box>
              <Text>{item?.ProductStock?.Product?.name}</Text>
              <Text fontWeight="semibold">
                {item?.quantity} x{' '}
                {angkaRupiahJs(item?.ProductStock?.Product?.price, {
                  formal: false,
                })}
              </Text>
            </Box>
          </Flex>
        ))}
        <Button
          rightIcon={<IoIosArrowForward color="gray.600" />}
          variant="outline"
          // _hover={{ color: 'black', opacity: 0.9 }}
          // transition='color 0.3s ease-in-out, opacity 0.3s ease-in-out'
          fontWeight="medium"
          justifyContent="space-between"
          onClick={() =>
            handleChoseShipping(
              order?.Store?.city_idcity,
              selectedAddres?.city_idcity,
            )
          }
          h={'fit-content'}
          p={'10px 10px'}
        >
          {selectedShipping?.service ? (
            <Flex justify={'space-between'} w={'full'} align={'center'}>
              <Flex direction={'column'} gap={2} textAlign={'start'}>
                <Text>
                  {
                    selectedShipping?.description.split(' ')[
                      selectedShipping?.description.split(' ').length - 1
                    ]
                  }
                </Text>
                <Text fontSize={'12px'} fontWeight={400}>
                  Estimasi tiba {dateEstimate(selectedShipping.cost[0].etd)}
                </Text>
              </Flex>

              <Box as="span" marginLeft={1}>
                {angkaRupiahJs(selectedShipping?.cost[0]?.value, {
                  dot: '.',
                  floatingPoint: 0,
                })}
              </Box>
            </Flex>
          ) : (
            <Text>Pilih Pengiriman</Text>
          )}
        </Button>
      </Stack>
      {/* ))} */}
      {/* {Object.keys(orderDetail)?.map((storeId) => (
        <Stack key={storeId} p={4} pl={5} pr={5} background="white">
          <Text>{orderDetail[storeId][0]?.ProductStock?.Store.name}</Text>
          {orderDetail[storeId].map((item, index) => (
            <>
              <Flex gap={2} key={index}>
                <Image
                  w="4em"
                  h="4em"
                  backgroundColor="white"
                  src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${
                    item?.ProductStock?.Product?.ProductImages[0]?.imageUrl
                  }`}
                  alt={item?.ProductStock?.Product?.name}
                  objectFit="cover"
                  rounded={10}
                />
                <Box>
                  <Text>{item?.ProductStock?.Product?.name}</Text>
                  <Text fontWeight="semibold">
                    {item?.quantity} x{' '}
                    {calculateDiscountPrice(item?.ProductStock?.Product?.price) ? angkaRupiahJs((calculateDiscountPrice(item?.ProductStock?.Product?.price, item?.ProductStock?.Discounts, item?.quantity)), {
                      formal: false,
                    }) : null}
                  </Text>
                  {item?.ProductStock?.Discounts.map((discount, index) => (
                      <React.Fragment key={index}>
                        {discount?.distributionId === 1 && (
                        <>
                          {discount?.DiscountType?.id === 4 && discount?.discountValue && ` (${discount.discountValue}% Off)`}
                          {discount?.DiscountType?.id === 4 && discount?.discountNom && ` (${angkaRupiahJs(discount?.discountNom, {formal: false,})} Off)`}
                          {discount?.DiscountType?.id === 5 && ` (Minimum Purchase) - ${discount?.discountValue}% Off`}
                          {discount?.DiscountType?.id === 6 && ` (Beli ${discount?.buy_quantity} Gratis ${discount?.get_quantity})`}
                          {index < item?.ProductStock?.Discounts?.length - 1 && ', '}
                        </>
                      )}
                      </React.Fragment>
                    ))}
                </Box>
              </Flex>
            </>
          ))} */}
      {/* <Button
            rightIcon={<IoIosArrowForward color="gray.600" />}
            variant="outline"
            // _hover={{ color: 'black', opacity: 0.9 }}
            // transition='color 0.3s ease-in-out, opacity 0.3s ease-in-out'
            fontWeight="medium"
            justifyContent="space-between"
            onClick={() =>
              handleChoseShipping(
                orderDetail[storeId][0]?.ProductStock?.Store?.city_idcity,
                selectedItem?.city_idcity,
              )
            }
            h={'fit-content'}
            p={'10px 10px'}
          >
            {selectedShipping?.service ? (
              <Flex justify={'space-between'} w={'full'} align={'center'}>
                <Flex direction={'column'} gap={2} textAlign={'start'}>
                  <Text>
                    {
                      selectedShipping?.description.split(' ')[
                        selectedShipping?.description.split(' ').length - 1
                      ]
                    }
                  </Text>
                  <Text fontSize={'12px'} fontWeight={400}>
                    Estimasi tiba {
                      dateEstimate(selectedShipping.cost[0].etd)
                    }
                  </Text>
                </Flex>

                <Box as="span" marginLeft={1}>
                  {angkaRupiahJs(selectedShipping?.cost[0]?.value, {
                    dot: '.',
                    floatingPoint: 0,
                  })}
                </Box>
              </Flex>
            ) : (
              <Text>Pilih Pengiriman</Text>
            )}
          </Button>
        </Stack>
      ))} */}
      <DrawerShippingMethode
        isOpen={isOpen}
        onClose={onClose}
        selectedItem={selectedItem}
        setSelectedshipping={setSelectedshipping}
        selectedShipping={selectedShipping}
        orderDetail={orderDetail}
        shipping={shipping}
        dateEstimate={dateEstimate}
        orderId={orderDetail[0]?.order_idorder}
        fetchOrder={fetchOrder}
      />
    </Flex>
  );
};
