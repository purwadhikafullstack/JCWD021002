import { Box, Button, HStack, Icon, Input, InputGroup, InputLeftAddon, InputLeftElement, Spacer, Text, Image, IconButton, Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, VStack, useColorModeValue, Select, FormLabel, Flex } from "@chakra-ui/react"
import { IconGraphFilled,IconArrowNarrowDown, } from '@tabler/icons-react'
import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useWebSize } from '../../provider.websize';
import SideBar from '../../components/SideBar/SideBar';

function formatPriceToIDR(price) {
  // Use Intl.NumberFormat to format the number as IDR currency
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);
}

const DashboardAdmin = () => {
const {size, handleWebSize } = useWebSize();
const [salesData, setSalesData] = useState([]);
  const [salesData1, setSalesData1] = useState([]);
  const [dataCategory, setDataCategory] = useState([])
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(0)
  const [storeId, setStoreId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

 // Get today's date
const today = new Date();

// Get yesterday's date
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

// Format the dates to a string in "YYYY-MM-DD" format
const formattedToday = formatDate(today);
const formattedYesterday = formatDate(yesterday);

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

console.log('Today:', formattedToday);
console.log('Yesterday:', formattedYesterday);

  

  const fetchDataToday = async () => {
    try {

      const response = await axios.get(
          `http://localhost:8000/api/report/sales-by-date?startDate=${formattedToday}&endDate=${formattedToday}&storeId=&&productId`
      );
      setSalesData(response?.data);
      
      
  } catch (err) {
      console.log(err);
  }
  }

  const fetchDataYesterday = async () => {
    try {

      const response = await axios.get(
          `http://localhost:8000/api/report/sales-by-date?startDate=${formattedYesterday}&endDate=${formattedYesterday}&storeId=&categoryId=&productId`
      );
      setSalesData1(response?.data);
      
      
  } catch (err) {
      console.log(err);
  }
  }

  useEffect(() => {
    fetchDataToday();
    fetchDataYesterday();
  }, []);

  console.log("ini data", salesData);
  console.log("ini data1", salesData1);

  let percentageTotalSales;
  let percentageTotalQuantity;
  let percentageTotalTransactions;

  if (salesData) {
    // salesData?.sort((a, b) => new Date(a.saleDate) - new Date(b.saleDate));

// Calculate percentage change for each metric
const percentageChanges = {
  totalSales: calculatePercentageChange(salesData[0]?.totalSales, salesData1[0]?.totalSales),
  totalQuantity: calculatePercentageChange(salesData[0]?.totalQuantity, salesData1[0]?.totalQuantity),
  totalTransactions: calculatePercentageChange(salesData[0]?.totalTransactions, salesData1[0]?.totalTransactions)
};

function calculatePercentageChange(currentValue, previousValue) {
  return ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
}

console.log('Percentage Change in Total Sales:', percentageChanges.totalSales.toFixed(2) + '%');
percentageTotalSales = percentageChanges.totalSales.toFixed(2) + '%';
console.log('Percentage Change in Total Quantity:', percentageChanges.totalQuantity.toFixed(2) + '%');
percentageTotalQuantity = percentageChanges.totalQuantity.toFixed(2) + '%'
console.log('Percentage Change in Total Transactions:', percentageChanges.totalTransactions.toFixed(2) + '%');
percentageTotalTransactions = percentageChanges.totalTransactions.toFixed(2) + '%'
  }

  return (
      <>
        <Box w={{ base: '100vw', md: size }} overflowX='hidden'>
          <SideBar size={size} handleWebSize={handleWebSize}/>
    <Box width='100vw' height='fit-content' backgroundColor='#fbfaf9' p='50px'>
        <Box pl={size == '500px' ? '0px' : '150px'}>
  <HStack mb='10px'>
      <Text>Sale Today ({formattedToday})</Text>
    <Spacer /> 
   </HStack>
   
   
   <Flex flexDirection={size == '500px' ? 'column' : 'row'} mt='10px' columnGap='10px'>
        <Box width='40%' p="20px" boxShadow='0px 1px 5px gray' borderRadius='10px'>
            <FormLabel>Revenue</FormLabel>
            <Heading mb='5px'>{formatPriceToIDR(salesData[0]?.totalSales)}</Heading>
            <HStack width='fit-content' borderRadius='full' p='10px' border= {percentageTotalSales > '0%' ? 'solid #06b300 3px' : 'solid #ff7c00 3px'} backgroundColor={percentageTotalSales > '0%' ? 'rgba(9, 255, 0, 0.75)' : 'rgba(255, 150, 0, 0.75)'} >
              <Box textColor= {percentageTotalSales > '0%' ? '#059900' : '#ff7200'}><IconGraphFilled /></Box>
              <Text>{percentageTotalSales}</Text>
            </HStack>
        </Box>
        <Box width='30%' p="20px" boxShadow='0px 1px 5px gray' borderRadius='10px'>
        <FormLabel>Products Sold</FormLabel>
        <Heading mb='5px'>{salesData[0]?.totalQuantity}</Heading>
        <HStack width='fit-content' borderRadius='full' p='10px' border= {percentageTotalQuantity > '0%' ? 'solid #06b300 3px' : 'solid #ff7c00 3px'} backgroundColor={percentageTotalQuantity > '0%' ? 'rgba(9, 255, 0, 0.75)' : 'rgba(255, 150, 0, 0.75)'}  textColor='black'>
              <Box textColor= {percentageTotalQuantity > '0%' ? '#059900' : '#ff7200'}><IconGraphFilled /></Box>
              <Text>{percentageTotalQuantity}</Text>
            </HStack>
        </Box>
        <Box width='30%' p="20px" boxShadow='0px 1px 5px gray' borderRadius='10px'>
        <FormLabel>Transactions</FormLabel>
        <Heading mb='5px'>{salesData[0]?.totalTransactions}</Heading>
        <HStack width='fit-content' borderRadius='full' p='10px' border= {percentageTotalTransactions > '0%' ? 'solid #06b300 3px' : 'solid #ff7c00 3px'} backgroundColor={percentageTotalTransactions > '0%' ? 'rgba(9, 255, 0, 0.75)' : 'rgba(255, 150, 0, 0.75)'}  textColor='black'>
              <Box textColor= {percentageTotalTransactions > '0%' ? '#059900' : '#ff7200'}><IconGraphFilled /></Box>
              <Text>{percentageTotalTransactions}</Text>
            </HStack>
        </Box>
    </Flex>
        </Box>
    </Box>
    </Box>
    
    </>
  )
}

export default DashboardAdmin;