import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, VStack, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, Grid, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, IconButton } from '@chakra-ui/react';
import { IconSearch, IconAdjustmentsHorizontal, IconPlus, IconEditCircle, IconTrashX, IconInfoCircle, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags, IconCircleCheckFilled} from '@tabler/icons-react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar'
import { useWebSize } from '../../provider.websize';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { handleActivateProduct } from './services/serviceActivateProduct';
import { handleDeleteProduct } from './services/serviceDeleteProduct';
import CartLoading from '../../components/Loaders/CartLoading';
import { CardProduct } from './CardProduct';
import { fetchStore } from './services/serviceStore';
import { fetchCategory } from './services/serviceCategory';

function ProductLists() {

  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [userStore, setUserStore] = useState(user?.store_idstore);
  const [data, setData] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addToStockModalIsOpen, setAddToStockModalIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activateModalOpen, setActivateModalOpen] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedStore, setSelectedStore] = useState(userStore);
  const [stockAmount, setStockAmount] = useState(1);
  const token = localStorage.getItem("token");

  const handleAddToStock = async () => {
    try {
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
      setAddToStockModalIsOpen(false); 
      toast.success("Added to stock")
    } catch (error) {
      console.error(error);
      if(selectedStore > 0 || user.store_idstore > 0 ) { toast.error("Product already in stock"); } else { toast.warning("Please fill all input"); }
    }
  };

  const fetchData = async () => {
    try { setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/product-lists-v2?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&categoryId=${categoryId}&productName=${productName}&status=${status}`
        );
        setData(response?.data);
  } catch (err) {
      console.log(err);
  } finally {setLoading(false);}
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

useEffect(() => {
    fetchCategory(setDataCategory);
    fetchStore(setDataStore);
  }, []);

  return (
    <Box w={{ base: '100vw', md: size }} overflowX='hidden'>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
          <SideBar size={size} handleWebSize={handleWebSize}/>
    <Box backgroundColor='#f5f5f5'  w={{ base: '100vw', md: size }} p={size == '500px' ? 0 : 5} height='full' >
    <HStack mb='10px' p={0}>
    </HStack>
    <Box p={size == '500px' ? 0 : 5} pl={size == '500px' ? '0px' : '150px' } mt='80px' >
    <Flex dir='row' gap='10px' p={size == '500px' ? 6 : 0} mb='20px' flexWrap='wrap'>
                <Box w={size == '500px' ? '60%' : '70%'}>
                <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <IconSearch color='black' />
            </InputLeftElement>
            <Input type='text' backgroundColor='white' placeholder='Search in Groceria' width='50vw' value={productName} borderRadius='10px' borderColor='solid grey 1px' onChange={(e) => {setProductName(e.target.value); setPage(1);}} />
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
            <HStack><Button leftIcon={<IconSortAscending2 />} border='solid black 1px' borderRadius='full' onClick={() => setSortOrder("asc")} isDisabled={sortOrder == "asc" ? true : false}>Ascending</Button><Button leftIcon={<IconSortDescending2 />} border='solid black 1px' borderRadius='full' onClick={() => setSortOrder("desc")} isDisabled={sortOrder == "desc" ? true : false}>Descending</Button></HStack>
            <Text>Sort Field</Text>
            <HStack><Button leftIcon={<IconAbc />} border='solid black 1px' borderRadius='full' onClick={() => setSortField("name")} isDisabled={sortField == "name" ? true : false}>Name</Button><Button leftIcon={<IconTags />} border='solid black 1px' borderRadius='full' onClick={() => setSortField("price")} isDisabled={sortField == "price" ? true : false}>Price</Button></HStack>
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
      <Flex flexDir='row' flexWrap='wrap' mb='10px'>
            <Button ml={size == '500px' ? '20px' : '0px'} leftIcon={<IconPlus />} backgroundColor='#286043' textColor='white' border='solid 1px #286043' isDisabled={user?.role_idrole == 1 ? false : true} onClick={() => navigate('/add-product')}>Add Product</Button>
            <Spacer />
            </Flex>
            <Flex flexWrap='wrap' justifyContent='center'> {loading ? ( <VStack> <CartLoading /> </VStack> ) : ( (loading == false) && <CardProduct data={data} setSelectedProduct={setSelectedProduct} setAddToStockModalIsOpen={setAddToStockModalIsOpen} setDeleteModalOpen={setDeleteModalOpen} setActivateModalOpen={setActivateModalOpen} /> )} </Flex>
          <Box m='5'>{data?.products?.length != 0 ? <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data}
            /> : null}</Box>
    
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
            isDisabled={user?.store_idstore ? true : false}
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
          <Button isDisabled={selectedProduct?.status == true ? false : true } colorScheme="blue" mr={3} onClick={() => {handleDeleteProduct(selectedProduct, token ) .then(() => { setDeleteModalOpen(false); fetchData(); }) .catch((error) => { console.error('Error in handleEditToStock:', error);});} }>
            Deactive Product
          </Button>
          <Button colorScheme="red" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={activateModalOpen} onClose={() => setActivateModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Activate Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold">Name Product</Text>
                <Text>{selectedProduct.name}</Text>
                <Text>Activate this product ?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => {handleActivateProduct(selectedProduct, token ) .then(() => { setActivateModalOpen(false); fetchData(); }) .catch((error) => { console.error('Error in handleEditToStock:', error);});} }>
                  Activate Product
                </Button>
                <Button colorScheme="red" onClick={() => setActivateModalOpen(false)}>
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

