import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Text,
  Spacer,
  VStack,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Flex,
  Select,
} from '@chakra-ui/react';
import {
  IconAdjustmentsHorizontal,
} from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { TableLists } from './TableLists';
import { useWebSize } from '../../provider.websize';
import { exportToExcel } from './exportToExcel';
import { useSelector } from 'react-redux';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';

const ReportSales = () => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(page);
  const [roleId, setRoleId] = useState('');
  const [username, setUsername] = useState();
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
  const [viewType, setViewType] = useState('table'); // 'grid' or 'table'
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [categoryId, setCategoryId] = useState('');
  const [dataCategory, setDataCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const [storeId, setStoreId] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');

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

      console.log("ini data store",dataStore);

  useEffect(() => {
    fetchStore();
    if (user?.store_idstore) {
      setStoreId(user?.store_idstore);
    }
  }, []);


  const handleDeleteOrder = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}user/update-user`,
        {
          id: selectedUser?.id,
          status: 'Deactive',
        },
      );

      if (result) {
        alert('User deactive successful');
        setDeleteModalOpen(false);
        fetchReportSales();
      }
    } catch (err) {
      alert('User used in another data');
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/category/category-lists`
      );

      setDataCategory(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dataCategory);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchDataProduct = async () => {
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/product-lists-v2?categoryId=${categoryId}&productName=${productName}`
        );
        setDataProduct(response?.data);
      
      
  } catch (err) {
      console.log(err);
  }
  }


  useEffect(() => {
      fetchDataProduct()
  }, [productName, categoryId]);

  const fetchReportSales = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/report/sales-report?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}&categoryId=${categoryId}&productId=${productId}&sortOrder=&storeId=${storeId}`,
      );

      console.log('API Request URL:', response.config.url);
      setData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSearchParams({ page, pageSize, username, roleId });
  }, [page, pageSize, username, roleId, ]);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const usernameFromUrl = searchParams.get('username') || '';
    const roleIdFromUrl = searchParams.get('roleId') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setUsername(usernameFromUrl);
    setRoleId(roleIdFromUrl);
    setSelectedPage(pageFromUrl);
  }, []); // This useEffect runs only once when the component mounts

  useEffect(() => {
    fetchReportSales();
  }, [page, pageSize, startDate, endDate, categoryId, storeId, productId]);


  return (
    <Box w={{ base: '100vw', md: size }} overflowX='hidden'>
          <SideBar size={size} handleWebSize={handleWebSize}/>
      <Box w={{ base: '100vw', md: size }} height='fit-content' backgroundColor='#fbfaf9' >
      <Box p='20px'>
        <Box pl={size == '500px' ? '0px' : '150px' } mt='80px' >
                <Flex dir='row' gap='10px'>
                
          <Box>
          <Box>
    <Button leftIcon={<IconAdjustmentsHorizontal />} borderRadius='full' border='solid 1px black' onClick={onOpen}>Filter</Button>

                </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select option" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {dataCategory?.categories?.map((category) => ( 
              <option key={category?.id} value={category?.id}>{category?.category}</option>
            ))}
            </Select>
            <FormLabel>Store</FormLabel>
            <Select placeholder="Select option" isDisabled={ user?.store_idstore ? true : false } value={storeId} onChange={(e) => setStoreId(e.target.value)}>
            {dataStore?.map((item) => ( 
              <option key={item?.id} value={item?.id}>{item?.name}</option>
            ))}
            </Select>
            <Flex flexDir='row'>
                <FormLabel>Product</FormLabel>
                <Input height='30px' mt='-5px' placeholder= 'Ex. Indomie' name='productName' width={size == '500px' ? '100%' : '50%'} value={productName} onChange={(e) => setProductName(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
                </Flex>
              <Select border='solid gray 1px' borderRadius='full' placeholder="Select option" value={productId} onChange={(e) => setProductId(e.target.value)}>
            {dataProduct?.products?.map((item) => ( 
              <option key={item?.id} value={item?.id}>{item?.name}</option>
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
          </Box>
                </Flex>
          <Flex flexDir='row' flexWrap='wrap' mb='10px'>
          <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} width='fit-content' type='date' />
        <Text>-</Text>
      <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} width='fit-content' type='date' />
            <Spacer />
            <Button
  borderRadius="full"
  backgroundColor="#286043"
  textColor="white"
  border="solid 1px #286043"
  onClick={() => exportToExcel(data, startDate, endDate)}
>
  Export to Excel
</Button>
            </Flex>
          <TableLists data={data} handleDeleteOrder={handleDeleteOrder} navigate={navigate} />
            
            {deleteModalOpen && (
              <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete User</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>
                      Are you sure you want to delete the User "
                      {selectedUser?.username}"?
                    </Text>
                    <VStack></VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => setDeleteModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={confirmDeleteUser}>
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            )}
            <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportSales;
