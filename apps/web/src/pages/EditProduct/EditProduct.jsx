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
  IconPlus, IconArrowLeft, IconLibraryPhoto, IconX, IconArrowRight, IconEye, IconEyeOff
} from '@tabler/icons-react';
import AvatarSVG from './icon-default-avatar.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { useWebSize } from '../../provider.websize';
import toRupiah from '@develoka/angka-rupiah-js';
import SideBar from '../../components/SideBar/SideBar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProduct = () => {
  const {size, handleWebSize } = useWebSize();
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataMass, setDataMass] = useState([]);
  const [dataPackaging, setDataPackaging] = useState([]);
  const [fieldImage, setFieldImage] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedC, setSelectedC] = useState([]);
  const navigate = useNavigate();
  const [dataStore, setDataStore] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [massProduct, setMassProduct] = useState("");
  const [massId, setMassId] = useState("");
  const [packagingId, setPackagingId] = useState("");
  const [status, setStatus] = useState("")
  const token = localStorage.getItem("token");


  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [storeId, setStoreId] = useState();
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/product-detail-v2/${id}`
        );
        setData(response?.data);
        setName(response?.data?.result?.name);
        setDescription(response?.data?.result?.description);
        setPrice(response?.data?.result?.price);
        setMassProduct(response?.data?.result?.massProduct);
        setMassId(response?.data?.result?.Mass?.id);
        setPackagingId(response?.data?.result?.Packaging?.id);
        setStatus(response?.data?.result?.status == true ? 1 : 0);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData(id);
  }, [id]);
  
console.log("ini data", data);

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

  console.log("ini status",status);

  const addProduct = async () => {
    try {
        // const fields = [
        //     { value: name.trim(), message: 'name' },
        //     { value: price, message: 'price' },
        //     { value: description.trim(), message: 'description' },
        //     { value: massProduct.trim(), message: 'massProduct' },
        //     { value: massId, message: 'mass' },
        //     { value: packagingId, message: 'packaging' },
        //   ];
          
        //   for (const field of fields) {
        //     if (!field.value) {
        //       toast.warn(`Please enter ${field.message}`);
        //       return;
        //     }
        //   }

      let formData = new FormData();
      formData.append("id", data?.result?.id);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("status", status);
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

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/update-product`,
        formData, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
          }
      );

      navigate("/product-lists");
      toast.success("Success");
    } catch (err) {
      console.log(err);
    }
  };

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

const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false);
const [imageToDelete, setImageToDelete] = useState({ imageUrl: "", productId: "" });

const openDeleteImageModal = (imageUrl, productId) => {
  setImageToDelete({ imageUrl, productId });
  setIsDeleteImageModalOpen(true);
};

const closeDeleteImageModal = () => {
  setImageToDelete({ imageUrl: "", productId: "" });
  setIsDeleteImageModalOpen(false);
};

const confirmDeleteImage = async () => {
  try {
    const { imageUrl, productId } = imageToDelete;
    console.log('ini di dalam confirmdeleteimage',imageUrl, productId);

    await axios.delete(`${import.meta.env.VITE_API_URL}products/delete-product-image`,
    {
        data: { imageUrl, productId },
    });

    window.location.reload();
    toast.success('Image deleted successfully');
    closeDeleteImageModal(); // Close the modal after successful deletion
  } catch (err) {
    console.error(err);
  }
};


const [isDeleteProductCategoryModalOpen, setIsDeleteProductCategoryModalOpen] = useState(false);
const [productCategoryToDelete, setProductCategoryToDelete] = useState({ categoryId: "", productId: "" });

const openDeleteProductCategoryModal = (categoryId, productId) => {
  setProductCategoryToDelete({ categoryId, productId });
  setIsDeleteProductCategoryModalOpen(true);
};

const closeDeleteProductCategoryModal = () => {
    setProductCategoryToDelete({ categoryId: "", productId: "" });
    setIsDeleteProductCategoryModalOpen(false);
};

const confirmDeleteProductCategory = async () => {
  try {
    const { categoryId, productId } = productCategoryToDelete;

    await axios.delete(`${import.meta.env.VITE_API_URL}category/remove-category-product`,
    {
        data: { categoryId, productId },
    });

    window.location.reload();
    toast.success('Category for product deleted successfully');
    closeDeleteProductCategoryModal(); // Close the modal after successful deletion
  } catch (err) {
    console.error(err);
  }
};

console.log('category', selectedC);
  return (
    <>
      {/* <SidebarWithHeader /> */}
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Box w={{ base: '100vw', md: size }}>
          <SideBar size={size} handleWebSize={handleWebSize}/>
      <Box w={{ base: '98.7vw', md: size }} overflowX='hidden' height='100vh' backgroundColor='#fbfaf9' p='20px'>
      
      <Box pl={size == '500px' ? '0px' : '150px' } pr={size == '500px' ? '0px' : '20px'} pt='20px' pb='20px'>
        <HStack mb='10px'>
          <Button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/product-lists')}>Back</Button>
          <Spacer />
          <Button rightIcon={<IconArrowRight />} borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => addProduct()}>Edit Item</Button>
        </HStack>
        <Box borderRadius='10px' p='20px' backgroundColor='white' boxShadow='0px 1px 5px gray'>
          <form>
            <FormLabel>Product Information</FormLabel>
            <Box>
            <VStack>
            <Flex flexWrap='wrap' gap={2}>
  {data?.result?.ProductImages?.map((image, index) => (
    <Flex key={index} align="flex-start">
    <Image
      src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${image.imageUrl}`}
      alt={`Selected Image ${index + 1}`}
      boxSize="150px"
      objectFit="cover"
      borderRadius="10px"
    />
    <Box ml='-40px'>
    <IconButton
      onClick={() => openDeleteImageModal(image.imageUrl, image.product_idproduct)}
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
  {selectedImages.length == 0 ? (<Box bgColor='#ebf5ff' p='20px' borderRadius='10px'><IconLibraryPhoto color='#0049cc' size='100px' /></Box>) : null}
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
              <Flex flexDir='row'><FormLabel>Price</FormLabel><Text>{price ? toRupiah(price) : null}</Text></Flex>
                <Input placeholder= 'Ex. 12000' name='price' value={price} onChange={(e) => setPrice(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' onKeyPress={(e) => {
      const isValidInput = /^\d$/.test(e.key) || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight';
      if (!isValidInput) {
        e.preventDefault();
      }
    }}/>
                </Box>
              
            </Flex>
            <Box width='60%' pb='30px'>
                <FormLabel>Description</FormLabel>
                {/* <Textarea name='desc' value={description} onChange={(e) => setDescription(e.target.value)} type='text' border='solid gray 1px' borderRadius='10px' height='20vh'/> */}
                <ReactQuill
        value={description}
        onChange={(value) => setDescription(value)}
        theme='snow'
        style={{ height:'200px'}}
      />
            </Box>
            <Flex columnGap='10px' mb='20px ' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box pt='27px' width='100%'>
                <FormLabel>Mass Product</FormLabel>
                <Input placeholder= 'Mass Product' name='massProduct' value={massProduct} onChange={(e) => setMassProduct(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt ='27px' width='100%'>
                <FormLabel>Mass</FormLabel>
              <Select border='solid gray 1px' borderRadius='full' placeholder="Select option" value={massId} onChange={(e) => setMassId(parseInt(e.target.value))}>
            {dataMass?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
            </Select>
              </Box>
              <Box pt ='27px' width='100%'>
                <FormLabel>Packaging</FormLabel>
              <Select border='solid gray 1px' borderRadius='full' placeholder="Select option" value={packagingId} onChange={(e) => setPackagingId(parseInt(e.target.value))}>
            {dataPackaging?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
            </Select>
              </Box>
            </Flex>

            <FormLabel>Status</FormLabel>
              <Select mb='20px' border='solid gray 1px' borderRadius='full' width={size == '500px' ? '100%' : '50%'} placeholder="Select option" value={status} onChange={(e) => setStatus(parseInt(e.target.value))}>
              <option value={1}>Active</option>
              <option value={0}>Deactive</option>
            </Select>

            <Flex mb='20px' flexDirection='column'>
        {/* Display categories in "Category Right Now" */}
<FormLabel>Category Right Now</FormLabel>
<Flex flexWrap="wrap" columnGap='5px'>
  {data?.result?.ProductCategories?.map((productCategory) => (
    <Box key={productCategory.id} borderRadius="full" mb='5px' pl="10px" pr='10px' pt='5px' pb='5px' border="solid blue 1px" bgColor='blue.100'>
      <HStack>
        <Text color='blue'>{productCategory?.category}</Text>
        <IconButton
          onClick={() => openDeleteProductCategoryModal(productCategory?.id, data?.result?.id)}
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
        </Flex>
        {/* Display available categories for selection */}
<FormLabel>Category</FormLabel>
<Flex columnGap='10px' mb='20px ' flexWrap='wrap'>
  {dataCategory
    ?.filter(category => 
      !selectedC?.some(selectedCategory => selectedCategory?.category.id === category?.id) && 
      !data?.ProductCategories?.some(productCategory => productCategory.id === category?.id)
    )
    ?.map((category) => (
      <Box key={category?.id} mb='5px'>
        <HStack>
          <Button p='5px' border='solid black 1px' onClick={() => increment(category)} bg='transparent' borderRadius='full' size='10px' leftIcon={<IconPlus />}>
            {category?.category}
          </Button>
        </HStack>
      </Box>
  ))}
</Flex>


        {/* Display selected categories */}
<FormLabel>Selected Category</FormLabel>
<Flex columnGap="10px" mb="20px " flexWrap='wrap'>
  {selectedC?.map((selectedCategory) => (
    <Box key={selectedCategory?.category.id} mb='5px' borderRadius="full" p="5px" border="solid blue 1px" bgColor='blue.100'>
      <HStack>
        <Text color='blue'>{selectedCategory?.category?.category}</Text>
        <IconButton
          onClick={() => decrement(selectedCategory?.category)}
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
        <Modal isOpen={isDeleteImageModalOpen} onClose={closeDeleteImageModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this image?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeDeleteImageModal}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmDeleteImage}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isDeleteProductCategoryModalOpen} onClose={closeDeleteProductCategoryModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this category?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeDeleteProductCategoryModal}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmDeleteProductCategory}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Box>
      </Box>
      </Box>
    </>
  );
};

export default EditProduct;
