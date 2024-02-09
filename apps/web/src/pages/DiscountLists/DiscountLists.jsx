import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, IconButton } from '@chakra-ui/react';
import { IconChevronLeft, IconCircleXFilled, IconCirclePlus, IconTrashXFilled, IconSquareRoundedPlusFilled, IconClock, IconPlus, IconProgressCheck } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconEditCircle, IconTrashX, IconInfoCircle, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags, IconCircleCheckFilled} from '@tabler/icons-react'
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toRupiah from '@develoka/angka-rupiah-js';
import SideBar from '../../components/SideBar/SideBar'
import { useWebSize } from '../../provider.websize';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';

function DiscountLists() {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [userStore, setUserStore] = useState(user?.store_idstore);

  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState()
  const [categoryId, setCategoryId] = useState();
  const [discountName, setDiscountName] = useState()
  const [dataCategory, setDataCategory] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
  const [typeId, setTypeId] = useState();
  const [restrictionId, setRestrictionId] = useState();
  const [distributionId, setDistributionId] = useState();
  const [status, setStatus] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedStore, setSelectedStore] = useState(userStore);
  const [stockAmount, setStockAmount] = useState(1);
  const token = localStorage.getItem("token");

  const handleDeleteDiscount = async () => {
    try { let formData = new FormData();
      formData.append("id", selectedProduct?.id)
      formData.append("status", (selectedProduct?.status == true ? 0 : 1 ));
      // You can replace this URL with your actual API endpoint for adding stock
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/discount/edit-discount`,
        formData,
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
      );
      // Handle the response as needed
      console.log(response);
      setDeleteModalOpen(false);
      fetchData(); // Close the modal after successful addition
    } catch (error) {
      console.log(error);
      // Handle error as needed
    }
  };

  console.log("ini selected store", selectedStore);

  const fetchData = async () => {
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/discount/discount-lists?page=${page}&pageSize=${pageSize}&discountName=${discountName}&usageRestrictionId=${restrictionId}&productName=&status=${status}&sortOrder=${sortOrder}&typeid=${typeId}&distributionId=${distributionId}`
        );
        setData(response?.data);
      
      
  } catch (err) {
      console.log(err);
  }
  }

  console.log("ini data", data);


  useEffect(() => {
    setSearchParams({ page, pageSize, discountName, typeId, restrictionId, distributionId });
  }, [page, pageSize, discountName, typeId, restrictionId, distributionId ]);
  

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const discountNameFromUrl = searchParams.get('discountName') || '';
    const typeIdfromUrl = searchParams.get('typeId') || '';
    const restrictionIdfromUrl = searchParams.get('restrictionId') || '';
    const distributionIdfromUrl = searchParams.get('distributionId') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setDiscountName(discountNameFromUrl);
    setTypeId(typeIdfromUrl);
    setRestrictionId(restrictionIdfromUrl);
    setDistributionId(distributionIdfromUrl);
    setSelectedPage(pageFromUrl);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortField, sortOrder, categoryId, discountName, status, restrictionId, typeId, distributionId]);

  console.log(data);

  const handleSortOrder = (order) => {
    setSortOrder(order);
    // onClose();
  };

  const handleSortField = (order) => {
    setSortField(order);
    // onClose();
  };

  const handleDiscountName = (value) => {
    setDiscountName(value);
    setPage(1);
  };
  console.log("ini disocunt name", discountName)

  const fetchFilter = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/discount/discount-filter`
        );
        console.log(response?.data);
        setDataFilter(response?.data);
    } catch (err) {
        console.log(err);
    }
};

console.log('ini category',dataCategory);


useEffect(() => {
    fetchFilter();
}, []);

console.log(dataFilter);

  
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
          <SideBar size={size} handleWebSize={handleWebSize}/>
    <Box backgroundColor='#f5f5f5'  w={{ base: '100vw', md: size }} p='6' height='fit-content'>
    <Box p={size == '500px' ? 0 : 5} pl={size == '500px' ? '0px' : '150px' } mt='80px' >
    <Flex dir='row' gap='10px' mb='20px' flexWrap='wrap'>
    <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />}></Button>

                <Box w={size == '500px' ? '60%' : '70%'}>
                <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <IconSearch color='black' />
            </InputLeftElement>
            <Input type='text' backgroundColor='white' placeholder='Search in Groceria' width='50vw' value={discountName} borderRadius='10px' borderColor='solid grey 1px' onChange={(e) => handleDiscountName(e.target.value)} />
          </InputGroup>
                </Box>
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
            <HStack><Button leftIcon={<IconAbc />} border='solid black 1px' borderRadius='full' onClick={() => handleSortField("name")} isDisabled={sortField == "name" ? true : false}>Name</Button><Button leftIcon={<IconTags />} border='solid black 1px' borderRadius='full' onClick={() => handleSortField("endDate")} isDisabled={sortField == "endDate" ? true : false}>Date</Button></HStack>
            <Text>Status Product</Text>
            <Select placeholder="Select option" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={''}>All</option>
              <option value={parseInt(1)}>Active</option>
              <option value={parseInt(0)}>Deactive</option>
            </Select>
            <Text>Discount Type</Text>
            <Select placeholder="Select option" value={typeId} onChange={(e) => setTypeId(Number(e.target.value))}>
            {dataFilter?.type?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.type}</option>
            ))}
            </Select><Text>Usage Restriction</Text>
            <Select placeholder="Select option" value={restrictionId} onChange={(e) => setRestrictionId(Number(e.target.value))}>
            {dataFilter?.restriction?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.restriction}</option>
            ))}
            </Select><Text>Discount Distribution</Text>
            <Select placeholder="Select option" value={distributionId} onChange={(e) => setDistributionId(Number(e.target.value))}>
            {dataFilter?.distribution?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.type}</option>
            ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack mb='10px'>
            <Button leftIcon={<IconPlus />} backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => navigate('/add-discount')}>Add Discount</Button>
            
            <Spacer /> 
            {/* <Button onClick={exportToPDF} borderRadius='full' border='solid 1px black' leftIcon={<IconArrowNarrowDown />}>Download</Button> */}
          </HStack>
      

      <Stack spacing='4' direction='row' flexWrap='wrap' justifyContent={size == '500px' ? 'center' : 'flex-start'}>
      
            {data?.discounts &&
              data?.discounts.map((item, index) => (
                <>
                
                <Card key={item.id} w='450px' minHeight='250px' maxHeight='270px' bg={useColorModeValue('white', 'gray.800')}
            boxShadow='0px 1px 5px gray' border={item?.status == 1 ? 'solid 2px green' : 'solid 2px red'} onClick={() => navigate(`/discount-detail/${item?.id}`)} _hover={{ cursor: 'pointer' }}>
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
                    <Flex justifyContent='center' flexDirection='row' bgColor='white' w='fit-content' pl='2px' pr='5px' ml='-20px' borderRadius='10px' mt='-30px' flexWrap='wrap'>
                          <Text  color={item?.status == 1 ? "green" : "red"}>{item?.status == 1 ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
                          <Text color={item?.status == 1 ? 'green' : 'red'} fontWeight='bold'>{item?.status == 1 ? 'Active' : 'Deactive'}</Text><Text fontWeight='bold'> | {item?.DiscountDistribution?.type}</Text>
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
                                // second: 'numeric',
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
                                // second: 'numeric',
                                timeZone: 'Asia/Jakarta', // Adjust the time zone to match Indonesia's time zone
                            })}
                          </Text>
                          </Flex>
                          
                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/product-detail-admin/${item?.id}`)} /> */}
                      </Flex>
                      <Flex flexWrap='wrap' column='row' justifyContent='center'>
                            {/* <IconButton  icon={<IconSquareRoundedPlusFilled />} isDisabled={item?.status == 0 ? true : false} variant='ghost' colorScheme='green' onClick={(event) => { setSelectedProduct(item); setAddToStockModalIsOpen(true); event.stopPropagation(); }} /> */}
                            {user?.role_idrole == 1 || user?.store_idstore == item?.store_idstore ? <IconButton  icon={<IconEditCircle />} variant='ghost' colorScheme='blue' onClick={(event) => { navigate(`/edit-discount/${item?.id}`); event.stopPropagation(); }} /> : (null) }
                            {user?.role_idrole == 1 || user?.store_idstore == item?.store_idstore ? <IconButton  icon={item?.status == true ? <IconTrashXFilled /> : <IconProgressCheck />} variant='ghost' colorScheme={item?.status == true ? 'red' : 'blue'} onClick={(event) => { setSelectedProduct(item); setDeleteModalOpen(true); event.stopPropagation(); }} /> : (null) }
                      </Flex>
                      
                    </Stack>
                  </CardBody>
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
              data={data}
            />
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        {/* ... (other modal content) */}
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>{selectedProduct?.status == true ? 'Deactive Discount' : 'Activate Discount'}</ModalHeader>

          <ModalCloseButton />
        <ModalBody>
        <Text fontWeight='bold'>Name Discount</Text>
        <Text> {selectedProduct?.name}</Text>
          <Text>{selectedProduct?.status == true ? 'Deactive this discount?' : 'Activate this discount?'}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleDeleteDiscount}>
            {selectedProduct?.status == true ? 'Deactive Discount' : 'Activate Discount'}
          </Button>
          <Button colorScheme="red" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </Box>
      </Box>
  );
}

export default DiscountLists;

