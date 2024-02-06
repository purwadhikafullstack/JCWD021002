import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Tabs, Tab, TabList, TabPanels, TabPanel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, FormLabel } from '@chakra-ui/react';
import { IconChevronLeft, IconCircleXFilled, IconCirclePlus, IconTrashXFilled, IconSquareRoundedPlusFilled, IconClock, IconPlus } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconEditCircle, IconTrashX, IconInfoCircle, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags, IconCircleCheckFilled} from '@tabler/icons-react'
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toRupiah from '@develoka/angka-rupiah-js';
import { IoIosArrowForward } from 'react-icons/io';
import { useWebSize } from '../../provider.websize';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VoucherPage = ({ order, setDiscountVoucher, fetchOrder, }) => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [userStore, setUserStore] = useState(user?.store_idstore);
  const userId = user?.id;
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addToStockModalIsOpen, setAddToStockModalIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState()
  const [categoryId, setCategoryId] = useState();
  const [productName, setProductName] = useState()
  const [dataCategory, setDataCategory] = useState([])
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
  const [status, setStatus] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedStore, setSelectedStore] = useState(userStore);
  const [stockAmount, setStockAmount] = useState(1);
  const [voucherUser, setVoucherUser] = useState([]);
  const token = localStorage.getItem("token");
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    fetchVoucherUser();
    fetchData();
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const fetchData = async () => {
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/discount/voucher-lists?page=${page}&pageSize=${pageSize}&typeId&discountName&usageRestrictionId&productName=${productName}&status&sortOrder=`
        );
        setData(response?.data);
  } catch (err) {
      console.log(err);
  }
  }

  const fetchVoucherUser = async () => {
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/voucher/voucher-user-lists?page=${page}&pageSize=${pageSize}`,
          {headers: {
            Authorization: `Bearer ${token}`,
          }}
        );
        setVoucherUser(response?.data);
  } catch (err) {
      console.log(err);
  }
  }

  console.log("ini voucher user", voucherUser);

  useEffect(() => {
    setSearchParams({ page, pageSize, });
  }, [page, pageSize, ]);
  
  console.log("ini data", data);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setSelectedPage(pageFromUrl);
  }, []);

  useEffect(() => {
    fetchData();
    fetchVoucherUser();
  }, [page, pageSize, sortField, sortOrder, status]);

  console.log(data);

  const handleSortOrder = (order) => {
    setSortOrder(order);
    // onClose();
  };

  const handleUseVoucher = (item) => {
    try {
      if(item?.usageRestrictionId == 1) {
        useVoucher(item);
      } else {
        useShippingVoucher(item);
      }
    } catch (err) {
      conosle.log(err)
    }
  };

  const useVoucher = async (item) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/voucher/use-voucher`,
      {
        order: order,
        voucher: item,
      }, 
      {headers: {
        Authorization: `Bearer ${token}`,
      }}
      )

      console.log("ini response voucher", response?.data?.data);
      await fetchOrder(userId);
      setDiscountVoucher(response?.data?.data);
      toast.success('Voucher used');
      setDrawerOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  const useShippingVoucher = async (item) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/voucher/use-shipping-voucher`,
      {
        order: order,
        voucher: item,
      }, 
      {headers: {
        Authorization: `Bearer ${token}`,
      }}
      )

      console.log("ini response voucher", response?.data?.data);
      await fetchOrder(userId);
      setDiscountVoucher(response?.data?.data);
      toast.success('Voucher used');
      setDrawerOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchCategory = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/category/category-lists`
        );
        console.log(response?.data);
        setDataCategory(response?.data);
    } catch (err) {
        console.log(err);
    }
};

console.log('ini category',dataCategory);


useEffect(() => {
    fetchCategory();
}, []);

console.log(data);
  
  const fetchStore = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}user/store-lists`
      );

      setDataStore(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

      console.log("ini data di voucher", order);

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <Box>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
          <Button
            rightIcon={<IoIosArrowForward />}
            variant="ghost"
            _hover={{ color: 'black', opacity: 0.9 }}
            transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
            fontWeight="medium"
            color="gray.600"
            onClick={handleDrawerOpen}
            isDisabled={order?.totalDiscount ? true : false || order?.totalShippingDiscount ? true : false }
          >
            Gunakan Voucher
          </Button>
    <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent height='90vh' margin='auto' width='500px'>
            <DrawerCloseButton />
            <DrawerHeader>Voucher</DrawerHeader>
            <DrawerBody w='500px' >
            <Box backgroundColor='#f5f5f5'  w={'500px'} p='6' height='fit-content'>
    <Box>

                <Tabs>
            <TabList justifyContent='center' width='100%'>
              <Tab
                _selected={{
                  borderBottom: '2px solid #286043',
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
                }} width='100%' >
                <Text>Voucher General</Text>
              </Tab>
              <Tab
                _selected={{
                  borderBottom: '2px solid #286043',
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
                width='100%'
              >
                <Text>Voucher User</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              <Stack spacing='4' direction='row' flexWrap='wrap' justifyContent={size == '500px' ? 'center' : 'flex-start'}>
      
            {data?.discounts &&
              data?.discounts.map((item, index) => (
                <>
                
                <Card key={item.id} w='450px' minHeight='250px' maxHeight='270px' bg={useColorModeValue('white', 'gray.800')}
            boxShadow='0px 1px 5px gray' border={item?.status == 1 ? 'solid 2px green' : 'solid 2px red'} _hover={{ cursor: 'pointer' }}>
              <Image
                      key={item?.banner}
                      src={item?.banner ? `http://localhost:8000/uploads/discounts/${item?.banner}` : (LogoGroceria)}
                      alt={item.name}
                      objectFit='cover'
                      width='100%'
                      height='100px'
                      borderRadius='3px 3px 10px 10px'
                      justifySelf='center'
                    />
                  <CardBody>
                    <Stack mt='-3' spacing='0'>
                    <Flex justifyContent='center' flexDirection='row' zIndex='99' bgColor='white' w='fit-content' pl='2px' pr='5px' ml='-20px' borderRadius='10px' mt='-30px' flexWrap='wrap'>
                          <Text  color={item?.status == 1 ? "green" : "red"}>{item?.status == 1 ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
                          <Text color={item?.status == 1 ? 'green' : 'red'} fontWeight='bold'>
                          {item?.status == 1 ? 'Active' : 'Deactive'}
                          </Text>
                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/product-detail-admin/${item?.id}`)} /> */}
                      </Flex>
                    <Heading size='sm' width='200px' isTruncated>{item.name}</Heading>
                      {/* <Text isTruncated maxW='200px'>
                        {item.description}
                      </Text> */}
                        <Flex dir='row' gap='1' flexWrap='wrap'>
                        <Text fontSize='xs' mt='5px'>{item?.ProductStock?.Product?.name}</Text>
                        </Flex>
                   
                        <Text fontWeight='bold' fontSize='sm' color='orangered' >
                            {item?.DiscountType?.type} | {item?.UsageRestriction?.restriction}
                        </Text>
                        <Text fontSize='sm' fontWeight='bold' color='orangered' mb='5px'>
                        {item?.discountValue ?
                              (item?.minimumPurchase ?
                                  `Buy total ${toRupiah(item?.minimumPurchase)}, get ${item?.discountValue}% discount` :
                                  `${item?.discountValue}% discount`
                              ) :
                              (item?.discountNom ?
                                  `${toRupiah(item?.discountNom)} discount` :
                                  (item?.buy_quantity ? 
                                      `Buy ${item?.buy_quantity} Get ${item?.get_quantity}` :
                                      null
                                  )
                              )
                          }
                        </Text>
                      <Flex justifyContent='flex-start' flexDirection='row' gap='2px' borderRadius='10px' >
                          <Text color='green'><IconClock /></Text>
                          <Flex flexDirection='row' p='2px' flexWrap='wrap'>
                          <Text color='black' fontSize='xs' fontWeight='bold'>
                          {new Date(item?.startDate).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long', // 'long' for full month name, 'short' for abbreviated
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                timeZone: 'Asia/Jakarta', // Adjust the time zone to match Indonesia's time zone
                            })}
                          </Text> <Text fontSize='xs' pl='2px' pr='2px'> | </Text>
                          <Text color='black' fontSize='xs' fontWeight='bold'>
                          {new Date(item?.endDate).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long', // 'long' for full month name, 'short' for abbreviated
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                timeZone: 'Asia/Jakarta', // Adjust the time zone to match Indonesia's time zone
                            })}
                          </Text>
                          </Flex>
                      </Flex>
                      <Button onClick={() => {handleUseVoucher(item);}}>Gunakan</Button>
                    </Stack>
                  </CardBody>
                  {/* <CardFooter>
                      
                  </CardFooter> */}
                </Card>
                </>
              ))}
          </Stack>
          <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data} />
          
              </TabPanel>
              <TabPanel>
              <Box>
              <Stack spacing='4' direction='row' flexWrap='wrap' justifyContent={size == '500px' ? 'center' : 'flex-start'}>
      
            {voucherUser?.data &&
              voucherUser?.data?.map((item, index) => (
                <>
                
                <Card key={item.id} w='450px' minHeight='250px' maxHeight='270px' bg={useColorModeValue('white', 'gray.800')}
            boxShadow='0px 1px 5px gray' border={item?.Discount?.status == 1 ? 'solid 2px green' : 'solid 2px red'} _hover={{ cursor: 'pointer' }}>
              <Image
                      key={item?.Discount?.banner}
                      src={item?.Discount?.banner ? `http://localhost:8000/uploads/discounts/${item?.Discount?.banner}` : (LogoGroceria)}
                      alt={item.name}
                      objectFit='cover'
                      width='100%'
                      height='100px'
                      borderRadius='3px 3px 10px 10px'
                      justifySelf='center'
                    />
                  <CardBody>
                    <Stack mt='-3' spacing='0'>
                    <Flex justifyContent='center' flexDirection='row' zIndex='99' bgColor='white' w='fit-content' pl='2px' pr='5px' ml='-20px' borderRadius='10px' mt='-30px' flexWrap='wrap'>
                          <Text  color={item?.Discount?.status == 1 ? "green" : "red"}>{item?.Discount?.status == 1 ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
                          <Text color={item?.Discount?.status == 1 ? 'green' : 'red'} fontWeight='bold'>
                          {item?.Discount?.status == 1 ? 'Active' : 'Deactive'}
                          </Text>
                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/product-detail-admin/${item?.Discount?.id}`)} /> */}
                      </Flex>
                    <Heading size='sm' width='200px' isTruncated>{item?.Discount?.name}</Heading>
                      {/* <Text isTruncated maxW='200px'>
                        {item.description}
                      </Text> */}
                        <Flex dir='row' gap='1' flexWrap='wrap'>
                        <Text fontSize='xs' mt='5px'>{item?.Discount?.ProductStock?.Product?.name}</Text>
                        </Flex>
                   
                        <Text fontWeight='bold' fontSize='sm' color='orangered' >
                            {item?.Discount?.DiscountType?.type} | {item?.Discount?.UsageRestriction?.restriction}
                        </Text>
                        <Text fontSize='sm' fontWeight='bold' color='orangered' mb='5px'>
                        {item?.Discount?.discountValue ?
                              (item?.Discount?.minimumPurchase ?
                                  `Buy total ${toRupiah(item?.Discount?.minimumPurchase)}, get ${item?.Discount?.discountValue}% discount` :
                                  `${item?.Discount?.discountValue}% discount`
                              ) :
                              (item?.Discount?.discountNom ?
                                  `${toRupiah(item?.Discount?.discountNom)} discount` :
                                  (item?.Discount?.buy_quantity ? 
                                      `Buy ${item?.Discount?.buy_quantity} Get ${item?.Discount?.get_quantity}` :
                                      null
                                  )
                              )
                          }
                        </Text>
                      <Flex justifyContent='flex-start' flexDirection='row' gap='2px' borderRadius='10px' >
                          <Text color='green'><IconClock /></Text>
                          <Flex flexDirection='row' p='2px' flexWrap='wrap'>
                          <Text color='black' fontSize='xs' fontWeight='bold'>
                          {new Date(item?.Discount?.startDate).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long', // 'long' for full month name, 'short' for abbreviated
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                timeZone: 'Asia/Jakarta', // Adjust the time zone to match Indonesia's time zone
                            })}
                          </Text> <Text fontSize='xs' pl='2px' pr='2px'> | </Text>
                          <Text color='black' fontSize='xs' fontWeight='bold'>
                          {new Date(item?.Discount?.endDate).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long', // 'long' for full month name, 'short' for abbreviated
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                timeZone: 'Asia/Jakarta', // Adjust the time zone to match Indonesia's time zone
                            })}
                          </Text>
                          </Flex>
                      </Flex>
                      <Button onClick={() => {handleUseVoucher(item?.Discount);}}>Gunakan</Button>
                    </Stack>
                  </CardBody>
                  {/* <CardFooter>
                      
                  </CardFooter> */}
                </Card>
                </>
              ))}
          </Stack>
          <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data} />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
    
            
      

      
      
    </Box>
    </Box>
            </DrawerBody>
        </DrawerContent>
    </Drawer>
    </Box>
  );
}
