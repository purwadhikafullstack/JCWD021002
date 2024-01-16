import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, IconButton } from '@chakra-ui/react';
import { IconChevronLeft, IconCircleXFilled, IconCirclePlus, IconTrashXFilled, IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconEditCircle, IconTrashX, IconInfoCircle, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags, IconCircleCheckFilled} from '@tabler/icons-react'
import star from '../ProductDetail/star-svgrepo-com.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar'

const MAX_VISIBLE_PAGES = 3; 

function ProductLists({size, handleWebSize}) {
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
  const [cityId, setCityId] = useState("");
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    // variableWidth: true,
  });
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });

  const [status, setStatus] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedStore, setSelectedStore] = useState(userStore);
  const [stockAmount, setStockAmount] = useState(1);
  const token = localStorage.getItem("token");

  console.log('ini categoryId',categoryId);

  const handleDeleteProductStock = async () => {
    try {
      // You can replace this URL with your actual API endpoint for adding stock
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/product-soft-delete/${selectedProduct?.id}`,
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
      );
      // Handle the response as needed
      console.log(response);
      setDeleteModalOpen(false);
      fetchData(); // Close the modal after successful addition
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const handleAddToStock = async () => {
    try {
      // You can replace this URL with your actual API endpoint for adding stock
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stocks/add-product-stock`,
        {
          productId: selectedProduct.id,
          storeId: user.store_idstore ? user.store_idstore : selectedStore,
          stockProduct: stockAmount,
        },
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
      );
      // Handle the response as needed
      console.log(response);
      setAddToStockModalIsOpen(false); // Close the modal after successful addition
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  console.log("ini selected store", selectedStore);

  const fetchData = async () => {
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/product-lists-v2?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&categoryId=${categoryId}&productName=${productName}&status=${status}`
        );
        setData(response?.data);
      
      
  } catch (err) {
      console.log(err);
  }
  }


  useEffect(() => {
    setSearchParams({ page, pageSize, productName, categoryId });
  }, [page, pageSize, productName, categoryId]);
  

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
// console.log(data?.products[1]?.ProductStocks[0]?.id);
// console.log(data?.products[0]?.ProductImages[0]?.imageUrl);
//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products/product-detail/3`,
//       );
//       setSampleData(data);
//     })();
//   }, []);

//   console.log(sampleData);
function formatPriceToIDR(price) {
    // Use Intl.NumberFormat to format the number as IDR currency
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  }

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
    <Box w={{ base: '100vw', md: size }} overflowX='hidden'>
          <SideBar size={size} handleWebSize={handleWebSize}/>
    <Box backgroundColor='#f5f5f5'  w={{ base: '100vw', md: size }} p={size == '500px' ? 0 : 5} height='fit-content'>
    <HStack mb='10px' p={0}>
    </HStack>
    <Box p={size == '500px' ? 0 : 5} pl={size == '500px' ? '0px' : '150px' }>
    <Flex dir='row' gap='10px' p={size == '500px' ? 6 : 0} mb='20px' flexWrap='wrap'>
    <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />}></Button>

                <Box w={size == '500px' ? '60%' : '70%'}>
                <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <IconSearch color='black' />
            </InputLeftElement>
            <Input type='text' backgroundColor='white' placeholder='Search in Groceria' width='50vw' value={productName} borderRadius='10px' borderColor='solid grey 1px' onChange={(e) => handleProductName(e.target.value)} />
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
      
            {data?.products &&
              data?.products.map((item, index) => (
                <>
                
                <Card key={item.id} maxW={size == '500px' ? '40%' : '17%'} onClick={() => handleItemClick(item.id)} bg={useColorModeValue('white', 'gray.800')}
            boxShadow='0px 1px 5px gray' border={item?.status == 1 ? 'solid 2px green' : 'solid 2px red'} onClick={() => navigate(`/product-detail-admin/${item?.id}`)} _hover={{ cursor: 'pointer' }}>
              <Image
                      key={item?.ProductImages[0]?.imageUrl}
                      src={`http://localhost:8000/uploads/products/${item?.ProductImages[0]?.imageUrl}`}
                      alt={item.name}
                      objectFit='cover'
                      width='100%'
                      height='200px'
                      borderRadius='3px 3px 10px 10px'
                      justifySelf='center'
                    />
                  <CardBody>
                    <Stack mt='-3' spacing='0'>
                    <Heading size='sm' width='200px' isTruncated>{item.name}</Heading>
                      {/* <Text isTruncated maxW='200px'>
                        {item.description}
                      </Text> */}
                        <Flex dir='row' gap='1' flexWrap='wrap'>
                        <Text fontSize='xs' mt='5px'>{item?.massProduct} {item?.Mass?.name}/{item.Packaging?.name} </Text>
                        <Text>|</Text>
                        <Flex dir='row' mt='5px'>
                        <Image boxSize='17px' src={star} />
                        <Text fontSize='xs' fontWeight='bold'>5/5</Text>
                        </Flex>
                        </Flex>
                   
                        <Text fontWeight='bold' color='orangered' mb='10px'>
                        {formatPriceToIDR(item.price)}
                      </Text>
                      <Flex flexWrap='wrap' column='row' justifyContent='center'>
                            <IconButton  icon={<IconSquareRoundedPlusFilled />} isDisabled={item?.status == 0 ? true : false} variant='ghost' colorScheme='green' onClick={(event) => { setSelectedProduct(item); setAddToStockModalIsOpen(true); event.stopPropagation(); }} />
                            {user?.role_idrole == 1 ? <IconButton  icon={<IconEditCircle />} variant='ghost' colorScheme='blue' onClick={(event) => { navigate(`/edit-product/${item?.id}`); event.stopPropagation(); }} /> : (null) }
                            {user?.role_idrole == 1 ? <IconButton  icon={<IconTrashXFilled />} variant='ghost' colorScheme='red' onClick={(event) => { setSelectedProduct(item); setDeleteModalOpen(true); event.stopPropagation(); }} /> : (null) }
                      </Flex>
                      <Flex justifyContent='center' flexDirection='row' flexWrap='wrap'>
                          <Text  color={item?.status == 1 ? "green" : "red"}>{item?.status == 1 ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
                          <Text color={item?.status == 1 ? 'green' : 'red'} fontWeight='bold'>
                          {item?.status == 1 ? 'Active' : 'Deactive'}
                          </Text>




                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/product-detail-admin/${item?.id}`)} /> */}
                      </Flex>
                    </Stack>
                  </CardBody>
                  {/* <CardFooter>
                      
                  </CardFooter> */}
                </Card>
                </>
              ))}
          </Stack>
          <Flex marginTop='10px' p='10px' flexWrap='wrap'>
            <Box mt='20px'>
            <HStack>
            <Text>Show per Page</Text>
            <Select border='solid 1px black' width='fit-content' value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
              <option value={1}>1</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option>All</option>
            </Select>
            </HStack>
            </Box>
            <Spacer />
            <Box mt='20px'>
            <Button borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' leftIcon={<IconChevronLeft />} isDisabled={page == 1 ? true : false} onClick={() => {setPage(page - 1); setSelectedPage(selectedPage -1);}} ></Button>
  {getPageNumbers().map((pageNumber, index) => (
          <Button
            key={index}
            ml='2px'
            mr='2px'
            borderRadius='full'
            backgroundColor={selectedPage === pageNumber ? '#286043' : 'white'}
            textColor={selectedPage === pageNumber ? 'white' : '#286043'}
            border={`solid 1px ${selectedPage === pageNumber ? 'white' : '#286043'}`}
            onClick={() => {
              // Handle the case where the button is "..." separately
              if (pageNumber !== "...") {
                setPage(pageNumber);
                setSelectedPage(pageNumber);
              }
            }}
          >
            {pageNumber}
          </Button>
        ))}
  <Button borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' rightIcon={<IconChevronRight />} isDisabled={page == data?.totalPages ? true : false} onClick={() => {setSelectedPage(selectedPage +1); setPage(page+1);}}></Button>
            </Box>
  </Flex>
    
  <Modal isOpen={addToStockModalIsOpen} onClose={() => setAddToStockModalIsOpen(false)}>
        {/* ... (other modal content) */}
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Add Product Stock</ModalHeader>

          <ModalCloseButton />
        <ModalBody>
        <Text fontWeight='bold'>Name Product</Text>
        <Text>{selectedProduct.name}</Text>
          <Text fontWeight='bold'>Store</Text>
          <Select
            placeholder="Select store"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            isDisabled={user?.store_idstore != 0 ? true : false}
          >
            {dataStore?.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </Select>
          <Text fontWeight='bold'>Stock Amount</Text>
          <Input
            type="number"
            onInput={(e) => {
              const enteredValue = e.target.value;
              const parsedValue = Number(enteredValue);
      
              if (!isNaN(parsedValue) && parsedValue >= 0) {
                setStockAmount(String(parsedValue));
              }
            }}
            placeholder="Enter stock amount"
            value={stockAmount}
            onChange={(e) => setStockAmount(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddToStock}>
            Add to Stock
          </Button>
          <Button colorScheme="red" onClick={() => setAddToStockModalIsOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        {/* ... (other modal content) */}
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Deactive Product</ModalHeader>

          <ModalCloseButton />
        <ModalBody>
        <Text fontWeight='bold'>Name Product</Text>
        <Text> {selectedProduct?.name}</Text>
          <Text>Deactive this product from all store ?</Text>
        </ModalBody>
        <ModalFooter>
          <Button isDisabled={selectedProduct?.status == true ? false : true } colorScheme="blue" mr={3} onClick={handleDeleteProductStock}>
            {selectedProduct?.status == true ? 'Deactive Product' : 'Product was deactive'}
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

export default ProductLists;

