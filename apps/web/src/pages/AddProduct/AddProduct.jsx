import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box, Button, HStack, Input, Spacer, Text, Image, IconButton, VStack, Flex, FormLabel, Select
} from "@chakra-ui/react";
import {
  IconPlus, IconArrowLeft, IconLibraryPhoto, IconX, IconArrowRight, IconEye, IconEyeOff
} from '@tabler/icons-react';
import { useWebSize } from '../../provider.websize';
import toRupiah from '@develoka/angka-rupiah-js';
import SideBar from '../../components/SideBar/SideBar'
import { ProductForm } from './ProductForm';
import { fetchPackaging } from './services/fetchPackaging';
import { fetchMass } from './services/fetchMass';
import { fetchCategory } from './services/fetchCategory';
import { fetchStore } from './services/fetchStore';

const AddProduct = () => {
  const {size, handleWebSize } = useWebSize();
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
  const token = localStorage.getItem("token");

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
        toast.warning("Selected images should be less than 1 MB each");
        return; 
      }
  
      setFieldImage((prevImages) => [...prevImages, ...selectedFiles]);

      const objectURLs = selectedFiles.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...objectURLs]);
    }
  };

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

useEffect(() => {
    fetchStore(setDataStore);
    fetchCategory(setDataCategory);
    fetchMass(setDataMass);
    fetchPackaging(setDataPackaging);
}, [])

  return (
    <>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Box w={{ base: '100vw', md: size }}>
          <SideBar size={size} handleWebSize={handleWebSize}/>
      <Box w={{ base: '100vw', md: size }} overflowX='hidden' height='100vh' backgroundColor='#fbfaf9' p='20px'>
      <Box pl={size == '500px' ? '0px' : '150px' } pr={size == '500px' ? '0px' : '20px'} pt='20px' pb='20px' mt='70px' >
        <HStack mb='10px'>
          <Button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/product-lists')}>Back</Button>
          <Spacer />
          <Button rightIcon={<IconArrowRight />} borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => addProduct()}>Add Item</Button>
        </HStack>
        <Box borderRadius='10px' p='20px' backgroundColor='white' boxShadow='0px 1px 5px gray'>
        <ProductForm
        size={size}
        selectedImages={selectedImages}
        handleImageChange={handleImageChange}
        handleDeleteImage={handleDeleteImage}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        massProduct={massProduct}
        setMassProduct={setMassProduct}
        massId={massId}
        setMassId={setMassId}
        packagingId={packagingId}
        setPackagingId={setPackagingId}
        dataMass={dataMass}
        dataPackaging={dataPackaging}
        dataCategory={dataCategory}
        selectedC={selectedC}
        increment={increment}
        decrement={decrement}
      />
        </Box>
        </Box>
      </Box>
      </Box>
    </>
  );
};

export default AddProduct;
