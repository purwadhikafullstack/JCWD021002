import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
// import { SidebarWithHeader } from '../../components/SideBar/SideBar';
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box, Button, HStack, Icon, Input, InputGroup, InputLeftAddon, InputLeftElement, Spacer, Text, Image, IconButton,
  Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, useDisclosure, Modal, ModalOverlay, ModalHeader,
  ModalContent, ModalCloseButton, ModalBody, ModalFooter, VStack, Flex, FormLabel, Checkbox, Textarea, InputRightElement, Select
} from "@chakra-ui/react";
import {
  IconPlus, IconArrowLeft, IconPhotoUp, IconX, IconArrowRight, IconEye, IconEyeOff
} from '@tabler/icons-react';
import AvatarSVG from './icon-default-avatar.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { useSelector } from "react-redux";

function formatPriceToIDR(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);
}

const AddProductStock = ({size, handleWebSize}) => {
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const { productId } = useParams();
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataMass, setDataMass] = useState([]);
  const [dataPackaging, setDataPackaging] = useState([]);
  const [fieldImage, setFieldImage] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedC, setSelectedC] = useState([]);
  const navigate = useNavigate();
  const [dataStore, setDataStore] = useState([]);
  const [userStore, setUserStore] = useState(user?.store_idstore);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [massProduct, setMassProduct] = useState("");
  const [massId, setMassId] = useState("");
  const [packagingId, setPackagingId] = useState("");
  const token = localStorage.getItem("token");


  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [storeId, setStoreId] = useState();

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
  }, []);

  const addProduct = async () => {
    try {
        const fields = [
            { value: name.trim(), message: 'full name' },
            { value: price.trim(), message: 'username' },
            { value: description.trim(), message: 'email address' },
            { value: massProduct.trim(), message: 'password' },
            { value: massId, message: 'mass' },
            { value: packagingId, message: 'packaging' },
          ];
          
          for (const field of fields) {
            if (!field.value) {
              toast.warn(`Please enter ${field.message}`);
              return;
            }
          }

      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      selectedC.forEach((item, i) => {
        formData.append(`category[${i}][id]`, item.category.id);
        formData.append(`category[${i}][category]`, item.category.category);
      });
      formData.append("massProduct", massProduct);
      formData.append("massId", massId);
      formData.append("packagingId", packagingId);

      for (let i = 0; i < fieldImage.length; i++) {
        formData.append(`images`, fieldImage[i]);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/products/add-product`,
        formData, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
          }
      );

      navigate("/user-lists");
      toast.success("Success");
    } catch (err) {
      console.log(err);
    }
  };

  console.log('ini data user', user);

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.currentTarget.files);
  
    if (selectedFiles.length > 0) {
      const fileSizeExceedsLimit = selectedFiles.some(
        (file) => file.size / (1024 * 1024) > 1
      );
  
      if (fileSizeExceedsLimit) {
        // Display toast message for image size greater than 1 MB
        toast.warning("Selected images should be less than 1 MB each");
        return; // Don't proceed with further handling
      }
  
      setFieldImage((prevImages) => [...prevImages, ...selectedFiles]);

      const objectURLs = selectedFiles.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...objectURLs]);
    }
  };
  console.log("ini image",fieldImage);
  console.log('ini images',selectedImages);

  const handleDeleteImage = (index) => {
    setFieldImage((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  
  const increment = (category) => {
    const exist = selectedC.find((item) => item.category.id === category.id);

    if (!exist) {
      setSelectedC([...selectedC, { category }]);
    }
  };

  const decrement = (category) => {
    const updatedCategories = selectedC.filter((item) => item.category.id !== category.id);
    setSelectedC(updatedCategories);
  };

  const fetchCategory = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}category/category-lists`
        );

        setDataCategory(response?.data?.categories)
    } catch (err) {
        console.log(err);
    }
}

    const fetchMass = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}mass/mass-lists`
            );

            setDataMass(response?.data?.mass)
        } catch (err) {
            console.log(err);
        }
    }

    const fetchPackaging = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}packaging/packaging-lists`
            );

            setDataPackaging(response?.data?.packaging)
        } catch (err) {
            console.log(err);
        }
    }

useEffect(() => {
    fetchCategory();
    fetchMass();
    fetchPackaging();
}, [])

console.log('category', selectedC);
  return (
    <>
      {/* <SidebarWithHeader /> */}
      <ToastContainer />
      <Box w={{ base: '98.7vw', md: size }} overflowX='hidden' height='100vh' backgroundColor='#fbfaf9' p='20px'>
      <Flex
        position={'relative'}
        // top={{ base: '20px', lg: '-30px' }}
        // px={'20px'}
        h={"10vh"}
        justify={"space-between"}
        align={"center"}
      >
        <Image src={LogoGroceria} h={'30px'} />
        <ResizeButton webSize={size} handleWebSize={handleWebSize} color={"black"}/>
      </Flex>
      <Box pl={size == '500px' ? '0px' : '150px' } pr={size == '500px' ? '0px' : '20px'} pt='20px' pb='20px'>
        <HStack mb='10px'>
          <Button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/user-lists')}>Back</Button>
          <Spacer />
          <Button rightIcon={<IconArrowRight />} borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => addProduct()}>Add Item</Button>
        </HStack>
        <Box borderRadius='10px' p='20px' backgroundColor='white' boxShadow='0px 1px 5px gray'>
          <form>
            <FormLabel>Product Information</FormLabel>
            <Box>
            <VStack>
                <Flex flexWrap='wrap' gap={2}>
  {selectedImages.map((image, index) => (
    <Flex key={index} align="flex-start">
    <Image
      src={image}
      alt={`Selected Image ${index + 1}`}
      boxSize="150px"
      objectFit="cover"
      borderRadius="10px"
    />
    <Box ml='-40px'>
    <IconButton
      onClick={() => handleDeleteImage(index)}
      icon={<IconX color="white" />}
      variant="outline"
      background="red"
      borderRadius="50%"
      colorScheme="white"
      border="solid white 2px"
    ></IconButton>
  </Box>
  </Flex>
  ))}
  </Flex>
  {selectedImages.length == 0 ? (<Image src={AvatarSVG} />) : null}
  <Box mt="-50px" mr="-90px">
    <Input
      display="none"
      id="fileInput"
      type="file"
      name="image"
      size="md"
      onChange={(event) => handleImageChange(event)}
      multiple // Add the multiple attribute
    />
    <IconButton
      onClick={() => document.getElementById("fileInput").click()}
      icon={<FiUpload color="white" />}
      variant="outline"
      background="blue"
      borderRadius="50%"
      colorScheme="white"
      border="solid white 2px"
    ></IconButton>
  </Box>
</VStack>

    

            </Box>

            <Flex columnGap='10px' mb='20px ' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Name</Text>
                <FormLabel>Name Product</FormLabel>
                <Input placeholder= 'Name Product' name='name' value={name} onChange={(e) => setName(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Price</FormLabel>
                <Input placeholder= 'Price' name='username' value={price} onChange={(e) => setPrice(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              
            </Flex>
            <Box width='60%'>
                <FormLabel>Description</FormLabel>
                <Textarea name='desc' value={description} onChange={(e) => setDescription(e.target.value)} type='text' border='solid gray 1px' borderRadius='10px' height='20vh'/>
            </Box>
            <Flex columnGap='10px' mb='20px ' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box pt='27px' width='100%'>
                <FormLabel>Mass Product</FormLabel>
                <Input placeholder= 'Mass Product' name='massProduct' value={massProduct} onChange={(e) => setMassProduct(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt ='27px' width='100%'>
                <FormLabel>Mass</FormLabel>
              <Select border='solid gray 1px' borderRadius='full' placeholder="Select option" value={massId} onChange={(e) => setMassId(e.target.value)}>
            {dataMass?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
            </Select>
              </Box>
              <Box pt ='27px' width='100%'>
                <FormLabel>Packaging</FormLabel>
              <Select border='solid gray 1px' borderRadius='full' placeholder="Select option" value={packagingId} onChange={(e) => setPackagingId(e.target.value)}>
            {dataPackaging?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
            </Select>
              </Box>
            </Flex>

            <Text fontSize='large' fontWeight='bold'>Category</Text>

        <Flex columnGap='10px' mb='20px ' flexWrap='wrap'>
        {dataCategory
  .filter(category => !selectedC.some(selectedCategory => selectedCategory.category.id === category.id))
  .map((category) => (
    <Box key={category.id} mb='5px'>
      <HStack>
        <Button p='5px' border='solid black 1px' onClick={() => increment(category)} bg='transparent' borderRadius='full' size='10px' leftIcon={<IconPlus />}>
          {category.category}
        </Button>
      </HStack>
    </Box>
))}
        </Flex>
        <Text fontSize='large' fontWeight='bold'>Selected Category</Text>
        <Flex columnGap='10px' mb='20px ' flexWrap='wrap'>
        {selectedC.map((selectedCategory) => (
          <Box key={selectedCategory.category.id} mb='5px' borderRadius="full" p="5px" border="solid blue 1px" bgColor='blue.100'>
            <HStack>
              <Text color='blue'>{selectedCategory.category.category}</Text>
              <IconButton
                onClick={() => decrement(selectedCategory.category)}
                bg="transparent"
                borderRadius="full"
                size="10px"
                color='blue'
                icon={<IconX />}
              />
            </HStack>
          </Box>
        ))}
      </Flex>

            
          </form>
        </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddProductStock;
