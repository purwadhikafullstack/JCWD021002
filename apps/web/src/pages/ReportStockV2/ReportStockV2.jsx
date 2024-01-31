import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, HStack, Text, Spacer, VStack, FormLabel, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Input, Flex, Select, } from '@chakra-ui/react';
import { IconAdjustmentsHorizontal, IconSortAscending2, IconSortDescending2, } from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { TableLists } from './TableLists';
import { useWebSize } from '../../provider.websize';
import { useSelector } from 'react-redux';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { exportToExcel } from './exportToExcel';
import { fetchStore } from './service/serviceStore';
import { fetchCategory } from './service/serviceCategory';
import { fetchReportSales } from './service/serviceSale';
import { fetchDataProduct } from './service/serviceProduct';

export const ReportStockV2 = () => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(page);
  const [storeId, setStoreId] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize, storeId, productId, startDate, endDate });
  const [categoryId, setCategoryId] = useState('');
  const [dataCategory, setDataCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataStore, setDataStore] = useState([]);


  useEffect(() => {
    fetchCategory(setDataCategory);
    fetchStore(setDataStore);
    if (user?.store_idstore) {
      setStoreId(user?.store_idstore);
    }
  }, []);

  useEffect(() => {
      fetchDataProduct( categoryId, productName, setDataProduct )
  }, [productName, categoryId]);

  useEffect(() => {
    setSearchParams({ page, pageSize, storeId, productId, startDate, endDate, });
  }, [page, pageSize, storeId, productId ]);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const storeIdFromUrl = searchParams.get('storeId') || '';
    const productIdFromUrl = searchParams.get('productId') || '';
    const startDateFromUrl = searchParams.get('startDate') || '';
    const endDateFromUrl = searchParams.get('endDate') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setStoreId(storeIdFromUrl);
    setProductId(productIdFromUrl);
    setStartDate(startDateFromUrl);
    setEndDate(endDateFromUrl);
    setSelectedPage(pageFromUrl);
  }, []); 

  useEffect(() => {
    fetchReportSales( startDate, endDate, page, pageSize, productId, sortOrder, storeId, setData );
  }, [page, pageSize, startDate, endDate, sortOrder, categoryId, storeId, productId]);

  return (
    <Box  overflowX='hidden'>
      <Box  height='fit-content' backgroundColor='#fbfaf9' >
      <Box><Box><Flex dir='row' gap='10px'><Box>
    <Button leftIcon={<IconAdjustmentsHorizontal />} borderRadius='full' border='solid 1px black' onClick={onOpen}>Filter</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormLabel>Sort Order</FormLabel>
            <HStack><Button leftIcon={<IconSortAscending2 />} border='solid black 1px' borderRadius='full' onClick={() => setSortOrder("asc")} isDisabled={sortOrder == "asc" ? true : false}>Ascending</Button><Button leftIcon={<IconSortDescending2 />} border='solid black 1px' borderRadius='full' onClick={() => setSortOrder("desc")} isDisabled={sortOrder == "desc" ? true : false}>Descending</Button></HStack>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select option" border='solid gray 1px' borderRadius='full' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {dataCategory?.categories?.map((category) => ( 
              <option key={category?.id} value={category?.id}>{category?.category}</option>
            ))}
            </Select>
            <FormLabel>Store</FormLabel>
            <Select mb='10px' border='solid gray 1px' borderRadius='full' placeholder="Select option" isDisabled={ user?.store_idstore ? true : false } value={storeId} onChange={(e) => setStoreId(e.target.value)}>
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
            <Button borderRadius="full" backgroundColor="#286043" textColor="white" border="solid 1px #286043" onClick={() => { exportToExcel(data, startDate, endDate); }}>Export to Excel</Button>
            </Flex>
          <TableLists data={data} navigate={navigate} />
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