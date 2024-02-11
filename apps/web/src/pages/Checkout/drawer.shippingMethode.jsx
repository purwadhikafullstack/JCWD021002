/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Icon,
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
  Heading,
  Center,
  Skeleton,
} from '@chakra-ui/react';
import { LiaBoxSolid } from 'react-icons/lia';
import { useState } from 'react';
import BebasOngkir from '../../assets/bebas_ongkir.png';
// import { useSelector } from 'react-redux';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import { FaCheck } from 'react-icons/fa';
import { addTotalShipping } from './services/addTotalShipping';
import { useSelector } from 'react-redux';
export const DrawerShippingMethode = ({
  orderDetail,
  isOpen,
  onClose,
  // selectedItem,
  setSelectedshipping,
  selectedShipping,
  shipping,
  dateEstimate,
  orderId,
  fetchOrder
}) => {
  const [selectedActive, setSelectedActive] = useState();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.AuthReducer.user);
  const userId = user?.id;

  const handleSelectShipping = (item) => {
    setSelectedshipping(item);
    addTotalShipping(item?.cost[0]?.value, orderId, token)
    fetchOrder(userId)
    onClose();
  };
  return (
    <Flex>
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
                {/* {console.log(Object.keys(orderDetail).length)} */}
                <Text flexWrap="wrap">
                  {orderDetail &&
                    `Dikirim dari ${
                      orderDetail[0]?.ProductStock?.Store?.City?.city
                    }. Berat ${
                      orderDetail[0]?.ProductStock?.Product?.massProduct / 1000
                    }Kg`}
                </Text>
              </Flex>
            </Stack>
            {shipping ? (
              shipping?.map((item, index) => {
                return (
                  <Box key={index} w={'full'}>
                    <Box
                      w="full"
                      pb={2}
                      cursor="pointer"
                      borderBottom="2px"
                      borderColor="gray"
                    >
                      <Icon
                        as={Image}
                        src={BebasOngkir}
                        w="5em"
                        h="fit-content"
                      />
                      <Text fontWeight="bold">{item?.code.toUpperCase()}</Text>
                    </Box>
                    {item?.costs.map((serv, i) => {
                      return (
                        <Flex
                          w="full"
                          pb={2}
                          cursor="pointer"
                          borderBottom="1px"
                          borderColor="gray"
                          key={i}
                          onClick={() => {
                            handleSelectShipping(serv);
                            if (selectedShipping?.service !== serv?.service) {
                              setSelectedActive(i);
                            } else if (
                              selectedShipping?.service == serv?.service
                            ) {
                              setSelectedActive(i);
                            }
                          }}
                          justify={'space-between'}
                        >
                          <Flex direction={'column'}>
                            <Text fontWeight="bold">
                              {
                                serv?.description.split(' ')[
                                  serv?.description.split(' ').length - 1
                                ]
                              }
                              <Box as="span" color="tomato" marginLeft={1}>
                                (
                                {angkaRupiahJs(serv?.cost[0]?.value, {
                                  dot: '.',
                                  floatingPoint: 0,
                                })}
                                )
                              </Box>
                            </Text>

                            <Text fontSize="sm" color="gray.600">
                              Estimasi Tiba {dateEstimate(serv.cost[0].etd)}
                            </Text>
                          </Flex>

                          {selectedActive == i ? (
                            <Center mr={'10px'}>
                              <FaCheck size={'20px'} color="#A7DDC8FF" />
                            </Center>
                          ) : (
                            <></>
                          )}
                        </Flex>
                      );
                    })}
                  </Box>
                );
              })
            ) : (
              <>Loading...</>
            )}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
