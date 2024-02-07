import { Stack,Flex, Card, CardBody, IconButton, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { 
    IconEditCircle,
    IconCircleCheckFilled,
    IconCircleXFilled, 
    IconTrashXFilled,
    IconProgressCheck, } from '@tabler/icons-react';
import { useWebSize } from '../../provider.websize';
import toRupiah from '@develoka/angka-rupiah-js';
import star from '../ProductDetail/star-svgrepo-com.svg';
import { useNavigate } from "react-router-dom";

export const CardProductStock = ({data, setSelectedProductStock, setStockAmount, setEditToStockModalIsOpen, setDeleteModalOpen, setActivateModalOpen}) => {
    const navigate = useNavigate();
    const { size, handleWebSize } = useWebSize;

    return (
        <>
        <Stack
            spacing="4"
            direction="row"
            flexWrap="wrap"
            justifyContent={size == '500px' ? 'center' : 'flex-start'}
          >
            {data?.products &&
              data?.products?.map((item, index) => (
                <>
                  <Card
                    key={item.id}
                    maxW={size == '500px' ? '40%' : '17%'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="0px 1px 5px gray"
                    border={
                      item?.ProductStocks[0]?.status == 1
                        ? 'solid 2px green'
                        : 'solid 2px red'
                    }
                    onClick={() =>
                      navigate(`/product-detail-admin/${item?.id}`)
                    }
                    _hover={{ cursor: 'pointer' }}
                  >
                    <Image
                      key={item?.ProductImages[0]?.imageUrl}
                      src={`http://localhost:8000/uploads/products/${item?.ProductImages[0]?.imageUrl}`}
                      alt={item.name}
                      objectFit="cover"
                      width="100%"
                      height="200px"
                      borderRadius="3px 3px 10px 10px"
                      justifySelf="center"
                    />
                    <CardBody>
                      <Stack mt="-3" spacing="0">
                        <Heading size="sm" width="180px" flexWrap='wrap'>
                          {item.name}
                        </Heading>
                        <Flex dir="row" gap="1" flexWrap="wrap">
                          <Text fontSize="xs" mt="5px">
                            {item?.massProduct} {item?.Mass?.name}/
                            {item.Packaging?.name}{' '}
                          </Text>
                        </Flex>
                        <Flex dir='row' mt='5px'>
                        <Image boxSize='17px' src={star} />
                        <Text fontSize='xs' fontWeight='bold'>{item?.averageRating?.toFixed(1) || 0.0}/5.0 ({item?.totalReviews})</Text>
                        </Flex>

                        <Text fontWeight="bold" color="orangered">
                          {toRupiah(item.price)}
                        </Text>
                        <Text fontWeight="bold" color="blue" mb="10px">
                          Stock : {item?.ProductStocks[0]?.stock}
                        </Text>
                        <Flex
                          flexWrap="wrap"
                          column="row"
                          justifyContent="center"
                        >
                          <IconButton
                            icon={<IconEditCircle />}
                            variant="ghost"
                            colorScheme="blue"
                            onClick={(event) => {
                              setSelectedProductStock(item);
                              setStockAmount(item?.ProductStocks[0]?.stock);
                              setEditToStockModalIsOpen(true);
                              event.stopPropagation();
                            }}
                            isDisabled={item?.ProductStocks[0]?.status == 1 ? false : true}
                          />
                          {item?.ProductStocks[0]?.status == 1 ? 
                        <IconButton
                        icon={<IconTrashXFilled />}
                        variant="ghost"
                        colorScheme="red"
                        onClick={(event) => {
                          setSelectedProductStock(item);
                          setDeleteModalOpen(true);
                          event.stopPropagation();
                        }}
                      /> : 
                      <IconButton
                            icon={<IconProgressCheck />}
                            variant="ghost"
                            colorScheme="blue"
                            onClick={(event) => {
                              setSelectedProductStock(item);
                              setActivateModalOpen(true);
                              event.stopPropagation();
                            }}
                          />  
                        }
                          
                        </Flex>
                        <Flex
                          justifyContent="center"
                          flexDirection="row"
                          flexWrap="wrap"
                        >
                          <Text
                            color={
                              item?.ProductStocks[0]?.status == 1
                                ? 'green'
                                : 'red'
                            }
                          >
                            {item?.ProductStocks[0]?.status == 1 ? (
                              <IconCircleCheckFilled />
                            ) : (
                              <IconCircleXFilled />
                            )}
                          </Text>
                          <Text
                            color={
                              item?.ProductStocks[0]?.status == 1
                                ? 'green'
                                : 'red'
                            }
                            fontWeight="bold"
                          >
                            {item?.ProductStocks[0]?.status == 1
                              ? 'Active'
                              : 'Deactive'}
                          </Text>
                        </Flex>
                      </Stack>
                    </CardBody>
                  </Card>
                </>
              ))}
          </Stack>
        </>
    )
}