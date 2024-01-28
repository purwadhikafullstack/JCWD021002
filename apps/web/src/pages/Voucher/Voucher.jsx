import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react';
import { IconChevronLeft, IconCircleXFilled, IconCirclePlus, IconTrashXFilled, IconSquareRoundedPlusFilled, IconClock, IconPlus } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconEditCircle, IconTrashX, IconInfoCircle, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags, IconCircleCheckFilled} from '@tabler/icons-react'
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toRupiah from '@develoka/angka-rupiah-js';
import SideBar from '../../components/SideBar/SideBar'
import { useWebSize } from '../../provider.websize';

const MAX_VISIBLE_PAGES = 3; 

function Voucher() {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [userStore, setUserStore] = useState(user?.store_idstore);

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
  const token = localStorage.getItem("token");
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
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

  useEffect(() => {
    setSearchParams({ page, pageSize, productName, categoryId });
  }, [page, pageSize, productName, categoryId]);
  
  console.log("ini data", data);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const productNameFromUrl = searchParams.get('productName') || '';
    const categoryIdFromUrl = searchParams.get('categoryId') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setProductName(productNameFromUrl);
    setCategoryId(categoryIdFromUrl);
    setSelectedPage(pageFromUrl);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortField, sortOrder, categoryId, productName, status]);

  console.log(data);

  const handleSortOrder = (order) => {
    setSortOrder(order);
    // onClose();
  };

  const handleSortField = (order) => {
    setSortField(order);
    // onClose();
  };

  const handleProductName = (value) => {
    setProductName(value);
    setPage(1);
  };

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

  const getPageNumbers = () => {
    const totalPages = data?.totalPages || 0;
    const currentPage = selectedPage;
  
    let startPage = Math.max(currentPage - Math.floor(MAX_VISIBLE_PAGES / 2), 1);
    let endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);
  
    if (totalPages - endPage < Math.floor(MAX_VISIBLE_PAGES / 2)) {
      startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
    }
  
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    if (startPage > 1) {
      pages.unshift("...");
    }
  
    if (endPage < totalPages) {
      pages.push("...");
    }
  
    return pages;
  };

  
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

      console.log("ini data store id",user.store_idstore);

  useEffect(() => {
    fetchStore();
  }, []);

  return (
      <Box w={{ base: '100vw', md: size }}>
          <Button onClick={handleDrawerOpen}>Open Drawer</Button>
    <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent height='90vh' margin='auto' width='500px'>
            <DrawerCloseButton />
            <DrawerHeader>Voucher</DrawerHeader>
            <DrawerBody>
            <Box backgroundColor='#f5f5f5'  w={{ base: '100vw', md: size }} p='6' height='fit-content'>
    <Box p={size == '500px' ? 0 : 5}>
    <Flex dir='row' gap='10px' mb='20px' flexWrap='wrap'>
                
                <Box>
    <Button leftIcon={<IconAdjustmentsHorizontal />} borderRadius='full' border='solid 1px black' onClick={onOpen}>Filter</Button>

                </Box>
                </Flex>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Sort Order</Text>
            <HStack><Button leftIcon={<IconSortAscending2 />} border='solid black 1px' borderRadius='full' onClick={() => handleSortOrder("asc")} isDisabled={sortOrder == "asc" ? true : false}>Ascending</Button><Button leftIcon={<IconSortDescending2 />} border='solid black 1px' borderRadius='full' onClick={() => handleSortOrder("desc")} isDisabled={sortOrder == "desc" ? true : false}>Descending</Button></HStack>
            <Text>Sort Field</Text>
            <HStack><Button leftIcon={<IconAbc />} border='solid black 1px' borderRadius='full' onClick={() => handleSortField("name")} isDisabled={sortField == "name" ? true : false}>Name</Button><Button leftIcon={<IconTags />} border='solid black 1px' borderRadius='full' onClick={() => handleSortField("price")} isDisabled={sortField == "price" ? true : false}>Price</Button></HStack>
            <Text>Category</Text>
            <Select placeholder="Select option" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {dataCategory?.categories?.map((category) => ( 
              <option key={category.id} value={category.id}>{category.category}</option>
            ))}
            </Select>
            <Text>Status Product</Text>
            <Select placeholder="Select option" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={''}>All</option>
              <option value={parseInt(1)}>Active</option>
              <option value={parseInt(0)}>Deactive</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

            
      

      <Stack spacing='4' direction='row' flexWrap='wrap' justifyContent={size == '500px' ? 'center' : 'flex-start'}>
      
            {data?.discounts &&
              data?.discounts.map((item, index) => (
                <>
                
                <Card key={item.id} w='450px' minHeight='250px' maxHeight='270px' bg={useColorModeValue('white', 'gray.800')}
            boxShadow='0px 1px 5px gray' border={item?.status == 1 ? 'solid 2px green' : 'solid 2px red'} onClick={() => navigate(`/product-detail-admin/${item?.id}`)} _hover={{ cursor: 'pointer' }}>
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
                    </Stack>
                  </CardBody>
                  {/* <CardFooter>
                      
                  </CardFooter> */}
                </Card>
                </>
              ))}
          </Stack>
         
      
    </Box>
    </Box>
            </DrawerBody>
        </DrawerContent>
    </Drawer>
      </Box>
  );
}

export default Voucher;
