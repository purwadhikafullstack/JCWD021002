import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box, Button, HStack, Icon, Input, InputGroup, InputLeftAddon, InputLeftElement, Spacer, Text, Image, IconButton,
  Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, useDisclosure, Modal, ModalOverlay, ModalHeader,
  ModalContent, ModalCloseButton, ModalBody, ModalFooter, VStack, Flex, FormLabel, Checkbox, Textarea, InputRightElement, Select, RadioGroup, Radio
} from "@chakra-ui/react";
import {
  IconPlus, IconArrowLeft, IconDiscount, IconX, IconArrowRight, IconEye, IconEyeOff
} from '@tabler/icons-react';
import SideBar from '../../components/SideBar/SideBar';
import { useSelector } from "react-redux";
import { useWebSize } from '../../provider.websize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddDiscount = () => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState([]);
  const [fieldImage, setFieldImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedC, setSelectedC] = useState([]);
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
  const token = localStorage.getItem("token");






  console.log("ini type", type);
  const [storeId, setStoreId] = useState();

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
    fetchData();
  }, [productName, storeId]);

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



  const addProduct = async () => {
    try {
        

      let formData = new FormData();
      formData.append("distributionId", distribution);
      formData.append("type", type);
      formData.append("minimumPurchase", minNom);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("get_quantity", get);
      formData.append("buy_quantity", buy);
      formData.append("discountAmount", max);
      formData.append("usageRestrictionId", usageType);
      formData.append("referralCode", referral);
      formData.append("discountNom", nominal);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("productStock_idproductStock", productId);
      formData.append("discount", fieldImage);

      await axios.post(
        `${import.meta.env.VITE_API_URL}discount/add-discount`,
        formData,
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
      );

      navigate("/discount-lists");
      toast.success("Success");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(fieldImage);

  const handleImageChange = (event) => {
    const selectedFile = event.currentTarget.files[0];

  if (selectedFile) {
    const fileSizeInMB = selectedFile.size / (1024 * 1024); // Convert size to megabytes

    if (fileSizeInMB > 1) {
      // Display toast message for image size greater than 1 MB
      toast.warning("Selected image size should be less than 1 MB");
      return; // Don't proceed with further handling
    }

    setFieldImage(selectedFile);
    const objectURL = URL.createObjectURL(selectedFile);
    setSelectedImage(objectURL);
  }
  };

  const handleReset = () => {
  setType(0);
  setDiscValue(0);
  setPercent(0);
  setNominal(0);
  setMinNom(undefined);
  setGet(undefined);
  setBuy(undefined);
  setMax(undefined);
  setReferral(undefined);
  }

  console.log(data);

  return (
    <>
      {/* <SidebarWithHeader /> */}
      <Box w={{ base: '100vw', md: size }}>
          <SideBar size={size} handleWebSize={handleWebSize}/>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Box w={{ base: '98.7vw', md: size }} overflowX='hidden' height='100vh' backgroundColor='#fbfaf9' p='20px'>
      
      <Box pl={size == '500px' ? '0px' : '150px' } pr={size == '500px' ? '0px' : '20px'} pt='20px' pb='20px' mt='70px' >
        <HStack mb='10px'>
          <Button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/discount-lists')}>Back</Button>
          <Spacer />
          <Button rightIcon={<IconArrowRight />} borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => addProduct()}>Add Item</Button>
        </HStack>
        <Box borderRadius='10px' p='20px' backgroundColor='white' boxShadow='0px 1px 5px gray'>
          <form>
            <FormLabel>Discount Information</FormLabel>
            <Box>
              <VStack>
            {selectedImage ? <Image
            src={selectedImage}
            alt="Selected Image"
            width="350px"
            objectFit="cover"
            borderRadius="10px"/> : <Box bgColor='#ebf5ff' p='20px' display='flex' justifyContent='center' width='350px' borderRadius='10px'><IconDiscount color='#0049cc' size='100px' /></Box>}
            <Box mt='-50px' mr='-90px'>
      <Input display="none" id="fileInput" 
              type="file"
              name="image"
              size="md"
              onChange={(event) => {
                setFieldImage(event.currentTarget.files[0]);
              }, handleImageChange}
            />
      <IconButton
        onClick={() => document.getElementById('fileInput').click()}
        icon={<FiUpload color='white' />}
        variant='outline'
        background='blue'
        borderRadius='50%'
        colorScheme="white"
        border='solid white 2px'
      >
      </IconButton>
    </Box>
    </VStack>
    

            </Box>
            <Text fontSize='large' fontWeight='bold' mt='10px'>Distribution Discount</Text>
            <RadioGroup mb='20px' value={distribution} onChange={(value) => { handleReset(); setDistribution(value); }}>
                <Stack spacing={4} direction='row' display='flex' flexWrap='wrap'>
                    <Radio value='1'>Regular Discount</Radio>
                    <Radio value='2'>Voucher</Radio>
                </Stack>
            </RadioGroup>

            <Text fontSize='large' fontWeight='bold'>Usage Restriction Type</Text>
            <RadioGroup mb='20px' value={usageType} onChange={(value) => { handleReset(); setUsageType(value); }}>
                <Stack spacing={4} direction='row' display='flex' flexWrap='wrap'>
                    <Radio value='1' isDisabled={distribution == null ? true : false} >Purchase</Radio>
                    <Radio value='2' isDisabled={ distribution == null ? true : false || distribution == 1 ? true : false }>Shipping</Radio>
                </Stack>
            </RadioGroup>

            <Text fontSize='large' fontWeight='bold' mt='10px'>Discount Type</Text>
            <RadioGroup mb='20px' value={type} onChange={(value) => { handleReset(); setType(value); }}>
                <Stack spacing={4} direction='row' display='flex' flexWrap='wrap'>
                    <Radio value='4' isDisabled={usageType == null ? true : false}>Direct Discount</Radio>
                    <Radio value='5' isDisabled={usageType == null ? true : false}>Minimum Amount Discount</Radio>
                    <Radio value='6' isDisabled={usageType == 2 || usageType == null ? true : false || distribution == 2 ? true : false }>B O G O</Radio>
                </Stack>
            </RadioGroup>

            <Text fontSize='large' fontWeight='bold'>Discount Value Type</Text>
            <RadioGroup isDisabled={type == 4 || type == 5 ? false : true} mb='20px' value={discValue} onChange={(value) => { setPercent(); setNominal(); setDiscValue(value); }}>
                <Stack spacing={4} direction='row' display='flex' flexWrap='wrap'>
                    <Radio value='1'>Percentage</Radio>
                    <Radio value='2'>Nominal</Radio>
                </Stack>
            </RadioGroup>

            

            <Flex columnGap='10px' mb='20px' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Discount Value</Text>
                <FormLabel>Discount Percentage</FormLabel>
                <Input variant='filled' isDisabled={(discValue == 1 && type == 4) || (discValue == 1 && type == 5) ? false : true} placeholder= 'Ex. 10' name='percent' value={percent} onChange={(e) => setPercent(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Discount Nominal</FormLabel>
                <Input variant='filled' isDisabled={(discValue == 2 && type == 4) || (discValue == 2 && type == 5)  ? false : true} placeholder= 'Ex. 10000' name='nominal' value={nominal} onChange={(e) => setNominal(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              
            </Flex>

            <Flex columnGap='10px' mb='20px' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Minimum Purchase</Text>
                <FormLabel>Minimum Nominal</FormLabel>
                <Input isDisabled={type == 5 ? false : true} placeholder= 'Ex. 100000' name='fullname' value={minNom} onChange={(e) => setMinNom(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Minimum Buy Product</FormLabel>
                <Input isDisabled={type == 6 ? false : true} placeholder= 'Ex. 2' name='username' value={buy} onChange={(e) => setBuy(e.target.value)} type='number' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Got Product</FormLabel>
                <Input isDisabled={type == 6 ? false : true} placeholder= 'Ex. 1' name='email' value={get} onChange={(e) => setGet(e.target.value)} type='number' border='solid gray 1px' borderRadius='full' />
              </Box>
            </Flex>

            <Flex columnGap='10px' mb='20px' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Duration Date</Text>
                <FormLabel>Start Date</FormLabel>
                <Input placeholder= 'Ex. 100000' name='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} type='date' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>End Date</FormLabel>
                <Input placeholder= 'Ex. 1' name='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} type='date' border='solid gray 1px' borderRadius='full' />
              </Box>
            </Flex>

            <Text fontSize='large' fontWeight='bold'>Name Discount</Text>
                <Input mb='20px' placeholder= 'Ex. Diskon 2.2' name='name' width={size == '500px' ? '100%' : '50%'} value={name} onChange={(e) => setName(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              
            <Box pb='60px'>
            <Text fontSize='large' fontWeight='bold'>Description</Text>
            <ReactQuill
        value={description}
        onChange={(value) => setDescription(value)}
        theme='snow'
        style={{ height:'200px'}}
      />
            </Box>
                <Text fontSize='large' fontWeight='bold'>Max Usage Discount (Voucher)</Text>
                <Input mb='20px' isDisabled={distribution == 2 ? false : true} placeholder= 'Ex. 250' name='max' width={size == '500px' ? '100%' : '50%'} value={max} onChange={(e) => setMax(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              
                <Text fontSize='large' fontWeight='bold'>Referral Code</Text>
                <Input mb='20px' isDisabled={distribution == 2 ? false : true} placeholder= 'Ex. GROCERIAANNIV1' name='name' width={size == '500px' ? '100%' : '50%'} value={referral} onChange={(e) => setReferral(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              

            <Flex columnGap='10px' mb='20px ' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Product</Text>
                <FormLabel>Store</FormLabel>
                <Select isDisabled={user?.store_idstore ? true : false} border='solid gray 1px' borderRadius='full' placeholder="Select option" value={storeId} onChange={(e) => setStoreId(e.target.value)}>
            {dataStore?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
            </Select>
              </Box>
              <Box pt ='27px' width='100%'>
                  <Flex flexDir='row'>
                <FormLabel>Product</FormLabel>
                <Input height='30px' mt='-5px' placeholder= 'Ex. Indomie' name='productName' width={size == '500px' ? '100%' : '50%'} value={productName} onChange={(e) => setProductName(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
                </Flex>
              <Select isDisabled={ usageType == null ? true : false || usageType == 2 ? true : false } border='solid gray 1px' borderRadius='full' placeholder="Select option" value={productId} onChange={(e) => setProductId(e.target.value)}>
            {data?.products?.map((item) => ( 
              <option key={item?.id} value={item?.ProductStocks[0].id}>{item?.name}</option>
            ))}
            </Select>
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

export default AddDiscount;
