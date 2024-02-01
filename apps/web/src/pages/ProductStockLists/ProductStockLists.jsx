import { useEffect, useState } from 'react';
import axios from 'axios';
import {  Text,  Box,  HStack,  Flex,  Button,  Input,  Modal,  ModalOverlay,  ModalContent, ModalHeader,  ModalCloseButton,  ModalBody,  ModalFooter,  useDisclosure,  InputGroup,  InputLeftElement, IconButton, } from '@chakra-ui/react';
import { IconChevronLeft, } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, } from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { fetchStore } from './services/serviceStore';
import { fetchCategory } from './services/serviceCategory';
import { handleDeleteProductStock } from './services/serviceDeleteStock';
import { CardProductStock } from './CardProductStock';
import { FilterModal } from './FilterModal';
import { EditModal } from './EditModal';
import { handleActivateProductStock } from './services/serviceActivateStock';
import { useWebSize } from '../../provider.websize';

function ProductStockLists() {
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const {size, handleWebSize } = useWebSize();
  const [userStore, setUserStore] = useState(user?.store_idstore);
  const [data, setData] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editToStockModalIsOpen, setEditToStockModalIsOpen] = useState(false);
  const [activateModalOpen, setActivateModalOpen] = useState(false)
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState();
  const [categoryId, setCategoryId] = useState('');
  const [productName, setProductName] = useState();
  const [dataCategory, setDataCategory] = useState([]);
  const [storeId, setStoreId] = useState();
  const [statusStock, setStatusStock] = useState(1);
  const [selectedPage, setSelectedPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
  const [selectedProductStock, setSelectedProductStock] = useState([]);
  const [selectedStore, setSelectedStore] = useState(userStore);
  const [stockAmount, setStockAmount] = useState(1);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/product-lists?page=${page}&pageSize=${pageSize}
        &sortField=${sortField}&sortOrder=${sortOrder}&categoryId=${categoryId}
        &productName=${productName}&storeId=${user?.store_idstore ? user?.store_idstore : storeId
        }&statusProduct=1&statusStock=${statusStock}`,
      );
      setData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSearchParams({ page, pageSize, productName, storeId, categoryId });
  }, [page, pageSize, productName, storeId, categoryId]);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const productNameFromUrl = searchParams.get('productName') || '';
    const storeIdFromUrl = searchParams.get('storeId') || '';
    const categoryIdFromUrl = searchParams.get('categoryId') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setProductName(productNameFromUrl);
    setStoreId(storeIdFromUrl);
    setCategoryId(categoryIdFromUrl);
    setSelectedPage(pageFromUrl);
  }, []);

  useEffect(() => {
    fetchData();
  }, [ user, page, pageSize, sortField, sortOrder, categoryId, productName, statusStock, storeId,
  ]);

  useEffect(() => {
    fetchCategory(setDataCategory);
    fetchStore(setDataStore);
  }, []);
  
  return (
    <Box w={{ base: '100vw', md: size }} overflowX="hidden">
      <SideBar size={size} handleWebSize={handleWebSize} />
      <Box backgroundColor="#f5f5f5" w={{ base: '100vw', md: size }} p={size == '500px' ? 0 : 5} height="fit-content" >
        <HStack mb="10px" p={0}></HStack>
        <Box p={size == '500px' ? 0 : 5} pl={size == '500px' ? '0px' : '150px'} mt='80px' >
          <Flex dir="row" gap="10px" p={size == '500px' ? 6 : 0} mb="20px" flexWrap="wrap" >
            <IconButton backgroundColor="#f5f5f5"leftIcon={<IconChevronLeft />} />
            <Box w={size == '500px' ? '60%' : '70%'}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <IconSearch color="black" />
                </InputLeftElement>
                <Input
                  type="text"
                  backgroundColor="white"
                  placeholder="Search in Groceria"
                  width="50vw"
                  value={productName}
                  borderRadius="10px"
                  borderColor="solid grey 1px"
                  onChange={(e) => {setProductName(e.target.value); setPage(1);}}
                />
              </InputGroup>
            </Box>
            <Box>
              <Button leftIcon={<IconAdjustmentsHorizontal />} borderRadius="full" border="solid 1px black"onClick={onOpen}>
                Filter
              </Button>
            </Box>
          </Flex>
          <CardProductStock data={data} setSelectedProductStock={setSelectedProductStock} setStockAmount={setStockAmount} setEditToStockModalIsOpen={setEditToStockModalIsOpen} setDeleteModalOpen={setDeleteModalOpen} setActivateModalOpen={setActivateModalOpen} />
          <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data}
            />
          <EditModal
        editToStockModalIsOpen={editToStockModalIsOpen}
        selectedProductStock={selectedProductStock}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
        stockAmount={stockAmount}
        setStockAmount={setStockAmount}
        handleCancel={() => setEditToStockModalIsOpen(false)}
        dataStore={dataStore} />
          <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Deactive Product Stock</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold">Name Product</Text>
                <Text>{selectedProductStock.name}</Text>
                <Text>Deactive this product from your store ?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => {handleDeleteProductStock(selectedProductStock, token ) .then(() => { setDeleteModalOpen(false); fetchData(); }) .catch((error) => { console.error('Error in handleEditToStock:', error);});} }>
                  Deactive from Stock
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
              <ModalHeader>Activate Product Stock</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold">Name Product</Text>
                <Text>{selectedProductStock.name}</Text>
                <Text>Activate this product to your store ?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => {handleActivateProductStock(selectedProductStock, token ) .then(() => { setActivateModalOpen(false); fetchData(); }) .catch((error) => { console.error('Error in handleEditToStock:', error);});} }>
                  Activate to Stock
                </Button>
                <Button colorScheme="red" onClick={() => setActivateModalOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <FilterModal
          isOpen={isOpen}
          onClose={onClose}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
          dataCategory={dataCategory}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          dataStore={dataStore}
          storeId={storeId}
          setStoreId={setStoreId}
          statusStock={statusStock}
          setStatusStock={setStatusStock}
          sortOrder={sortOrder}
          sortField={sortField}
        />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductStockLists;