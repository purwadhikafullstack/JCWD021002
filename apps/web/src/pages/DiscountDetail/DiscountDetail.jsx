import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box, Button, HStack, Icon, Input, useColorModeValue, InputLeftAddon, InputLeftElement, Spacer, Text, Image, IconButton,
  Card, CardBody, useTheme, Heading, Divider, CardFooter, ButtonGroup, useDisclosure, Modal, ModalOverlay, ModalHeader,
  ModalContent, ModalCloseButton, ModalBody, ModalFooter, VStack, Flex, FormLabel, Checkbox, Textarea, InputRightElement, Select, RadioGroup, Radio
} from "@chakra-ui/react";
import {
  IconPlus, IconArrowLeft, IconDiscount, IconX, IconArrowRight, IconEye, IconEyeOff, IconDeviceFloppy
} from '@tabler/icons-react';
import SideBar from '../../components/SideBar/SideBar';
import { useSelector } from "react-redux";
import { useWebSize } from '../../provider.websize';

function formatPriceToIDR(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);
}

const DiscountDetail = () => {
    const { id } = useParams();
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState([]);
  const [fieldImage, setFieldImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();
  const [dataStore, setDataStore] = useState([]);
  const [type, setType] = useState();
  const [discValue, setDiscValue] = useState();
  const [usageType, setUsageType] = useState();
  const [distribution, setDistribution] = useState();
  const [percent, setPercent] = useState();
  const [nominal, setNominal] = useState();
  const [minNom, setMinNom] = useState();
  const [buy, setBuy] = useState();
  const [get, setGet] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [max, setMax] = useState();
  const [referral, setReferral] = useState();
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState();
  const [productId2, setProductId2] = useState();
  const [editData, setEditData] = useState();
  const [status, setStatus] = useState();
  const [storeId, setStoreId] = useState();
  const fetchStore = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}user/store-lists`
      );

      setDataStore(response?.data);
      setProductId(0);
      setProductId(productId2);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchData = async () => {
    try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/products/product-lists?page=${1}&pageSize=&sortField=name&sortOrder=asc&categoryId=&productName=${productName}&storeId=${user?.store_idstore ? user?.store_idstore : storeId}&statusProduct=1&statusStock=1`
          );
          setData(response?.data);
  } catch (err) {
      console.log(err);
  }
  }

  useEffect(() => {
    if (storeId) {
      fetchData();
      setProductId(productId2);
    }
  }, [productName, storeId]);

  useEffect(() => {
    if (data?.products && data.products.length > 0 && storeId) {
      const defaultProductId = data.products[0]?.ProductStocks[0]?.id;
      setProductId(productId2);
    }
  }, [data, storeId]);
  useEffect(() => {
  const fetchDiscountDetails = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}discount/discount-detail/${id}`
      );
      setEditData(response?.data);
      setDistribution(response?.data?.distributionId);
      setUsageType(response?.data?.usageRestrictionId);
      setType(response?.data?.type);
      setDiscValue(response?.data?.discountValue ? 1 : 2);
      setPercent(response?.data?.discountValue);
      setNominal(response?.data?.discountNom);
      setMinNom(response?.data?.minimumPurchase);
      setBuy(response?.data?.buy_quantity);
      setGet(response?.data?.get_quantity);
      setStartDate(new Date(response?.data?.startDate)?.toISOString()?.split('T')[0]);
      setEndDate(new Date(response?.data?.endDate)?.toISOString()?.split('T')[0]);
      setName(response?.data?.name);
      setDescription(response?.data?.description);
      setMax(response?.data?.discountAmount);
      setReferral(response?.data?.referralCode == true ? 1 : 0);
      setStatus(response?.data?.status == true ? 1 : 0);
      setStoreId(response?.data?.store_idstore);
        setProductId2(response?.data?.productStock_idproductStock);
      if(response?.data?.banner) {
        setSelectedImage(`${
            import.meta.env.VITE_API_IMAGE_URL
          }/discounts/${response?.data?.banner}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
    fetchDiscountDetails(id);
  }, [id]);
  return (
    <>
      <Box w={{ base: '100vw', md: size }}>
          <SideBar size={size} handleWebSize={handleWebSize}/>
          <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Box w={{ base: '98.7vw', md: size }} overflowX='hidden' height='100vh' backgroundColor='#fbfaf9' p='20px'>
      <Box pl={size == '500px' ? '0px' : '150px' } pr={size == '500px' ? '0px' : '20px'} pt='20px' pb='20px' mt='70px' >
        <HStack mb='10px'>
          <Button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/discount-lists')}>Back</Button>
          <Spacer />
        </HStack>
        <Box borderRadius='10px' p='20px' backgroundColor='white' boxShadow='0px 1px 5px gray'>
          <form>
            <FormLabel>Discount Information</FormLabel>
            <Box>
              <VStack>
            {selectedImage ? <Image
            src={selectedImage}
            alt="Selected Image"
            // boxSize="fit-content"
            width='300px'
            objectFit="cover"
            borderRadius="10px"/> : <Box bgColor='#ebf5ff' p='20px' display='flex' justifyContent='center' width='350px' borderRadius='10px'><IconDiscount color='#0049cc' size='100px' /></Box> }
    </VStack>
            </Box>
            <Text fontSize='large' fontWeight='bold' mt='10px'>Distribution Discount</Text>
            {distribution == 1 ? <Text>Regular Discount</Text> : <Text>Voucher</Text>}
            <Text fontSize='large' fontWeight='bold'>Usage Restriction Type</Text>
            {usageType == 1 ? <Text>Purchase</Text> : <Text>Shipping</Text>}
            <Text fontSize='large' fontWeight='bold' mt='10px'>Discount Type</Text>
            <Text>
                {type === 4
                    ? "Direct Discount"
                    : type === 5
                    ? "Minimum Amount Discount"
                    : type === 6
                    ? "B O G O"
                    : ""}
            </Text>

            <Text fontSize='large' fontWeight='bold'>Discount Value Type</Text>
            <Text>
      {discValue === 1
        ? "Percentage"
        : discValue === 2
        ? "Nominal"
        : ""}
    </Text>
            <Flex columnGap='10px' mb='20px' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Discount Value</Text>
                <FormLabel>Discount Percentage</FormLabel>
                <Text>
      {(discValue === 1 && type === 4) || (discValue === 1 && type === 5)
        ? percent
        : ""}
    </Text>
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Discount Nominal</FormLabel>
                <Text>
      {(discValue === 2 && type === 4) || (discValue === 2 && type === 5)
        ? nominal
        : ""}
    </Text>
              </Box>
            </Flex>

            <Flex columnGap='10px' mb='20px' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Minimum Purchase</Text>
                <FormLabel>Minimum Nominal</FormLabel>
                <Text>{type === 5 ? minNom : ""}</Text>
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Minimum Buy Product</FormLabel>
                <Text>{type === 6 ? buy : ""}</Text>
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Got Product</FormLabel>
                <Text>{type === 6 ? get : ""}</Text>
              </Box>
            </Flex>

            <Flex columnGap='10px' mb='20px' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Duration Date</Text>
                <FormLabel>Start Date</FormLabel>
                <Text>{startDate}</Text>
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>End Date</FormLabel>
                <Text>{endDate}</Text>
              </Box>
            </Flex>

            <Text fontSize='large' fontWeight='bold'>Name Discount</Text>
            <Text>{name}</Text>
              
            <Box width={size == '500px' ? '100%' : '60%'} pb='50px'>
            <Text fontSize='large' fontWeight='bold'>Description</Text>
                <Text>{description}</Text>
            </Box>
                <Text fontSize='large' fontWeight='bold'>Remaining Discount</Text>
                <Text>{max}</Text>
              
                <Text fontSize='large' fontWeight='bold'>Referral Code</Text>
                {/* <Input mb='20px' placeholder= 'Ex. GROCERIAANNIV1' name='name' width={size == '500px' ? '100%' : '50%'} value={referral} onChange={(e) => setReferral(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' /> */}
                <Text>{referral == 1 ? "Yes" : "No"}</Text>

                <Text fontSize='large' fontWeight='bold'>Status</Text>
                <Text>{status == 1 ? "Active" : "Deactive"}</Text>
                

            <Flex columnGap='10px' mb='20px ' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Product</Text>
                <FormLabel>Store</FormLabel>
                <Text>{editData?.Store?.name}</Text>
              </Box>
              <Box pt ='27px' width='100%'>
                  <Flex flexDir='row'>
                <FormLabel>Product</FormLabel>
                </Flex>
                <Text>{editData?.ProductStock?.Product?.name} - Stock : {editData?.ProductStock?.stock}</Text>
              </Box>
            </Flex>
          </form>
        </Box>
        </Box>
      </Box>
      </Box>
    </>
  );
};

export default DiscountDetail;
