import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Text,
  Spacer, FormLabel,
  useDisclosure,
  Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Input, Flex, Select, VStack, } from '@chakra-ui/react';
import { IconAdjustmentsHorizontal, } from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { TableLists } from './TableLists';
import { useWebSize } from '../../provider.websize';
import { exportToExcel } from './exportToExcel';
import { useSelector } from 'react-redux';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import CartLoading from '../../components/Loaders/CartLoading';

const ReportSales = () => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(page);
  const [roleId, setRoleId] = useState('');
  const [username, setUsername] = useState();
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
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
        `${import.meta.env.VITE_API_URL}/user/get-all-store`
      );

      setDataStore(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStore();
    if (user?.store_idstore) {
      setStoreId(user?.store_idstore);
    }
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/category-lists`
      );

      setDataCategory(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    try { setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/report/sales-report?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}&categoryId=${categoryId}&productId=${productId}&sortOrder=&storeId=${storeId}`,
      );

      setData(response?.data);
    } catch (err) {
      console.log(err);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    setSearchParams({ page, pageSize, startDate, endDate, categoryId, storeId, productId, });
  }, [page, pageSize, startDate, endDate, categoryId, storeId, productId, ]);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const startDateFromUrl = searchParams.get('startDate') || '';
    const endDateFromUrl = searchParams.get('endDate') || '';
    const categoryIdFromUrl = searchParams.get('categoryId') || '';
    const storeIdFromUrl = searchParams.get('storeId') || '';
    const productIdFromUrl = searchParams.get('productId') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setStartDate(startDateFromUrl);
    setEndDate(endDateFromUrl);
    setCategoryId(categoryIdFromUrl);
    setStoreId(storeIdFromUrl);
    setProductId(productIdFromUrl);
    setSelectedPage(pageFromUrl);
  }, []); // This useEffect runs only once when the component mounts

  useEffect(() => {
    fetchReportSales();
  }, [page, pageSize, startDate, endDate, categoryId, storeId, productId]);

  return (
    <Box w={{ base: '100vw', md: size }} overflowX='hidden'>
          <SideBar size={size} handleWebSize={handleWebSize}/>
      <Box w={{ base: '100vw', md: size }} height='full' backgroundColor='#fbfaf9' >
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
          <Flex flexDir='row' flexWrap='wrap' mt='10px' mb='10px' >
          <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} width='fit-content' type='date' />
        <Text pl='10px' pr='10px'>_</Text>
      <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} width='fit-content' type='date' />
            <Spacer />
            <Button borderRadius="full" backgroundColor="#286043" textColor="white" border="solid 1px #286043" onClick={() => exportToExcel(data, startDate, endDate)} >Export to Excel</Button>
            </Flex>
          {startDate?.length > 0 && endDate?.length > 0 && loading == false ? <TableLists data={data}/> : (loading == true) ? <VStack><CartLoading /></VStack> : <Text>Please fill all date, first</Text>} 
            {data?.data?.length == 0 || data?.length == 0 ? null : <PaginationControls  page= {page} pageSize={pageSize} selectedPage={selectedPage} setPage={setPage} setPageSize={setPageSize} setSelectedPage={setSelectedPage} data={data} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportSales;