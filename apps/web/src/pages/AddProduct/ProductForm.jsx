// ProductForm.js
import React from "react";
import { Box, Flex, Text, Input, FormLabel, Select, IconButton, HStack, VStack, Button, Image } from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { IconPlus, IconX, IconLibraryPhoto } from '@tabler/icons-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toRupiah from '@develoka/angka-rupiah-js';

export const ProductForm = ({
  size,
  selectedImages,
  handleImageChange,
  handleDeleteImage,
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  massProduct,
  setMassProduct,
  massId,
  setMassId,
  packagingId,
  setPackagingId,
  dataMass,
  dataPackaging,
  dataCategory,
  selectedC,
  increment,
  decrement,
}) => {
  return (
    <>
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
                <Input placeholder= 'Ex. Indomie' name='name' value={name} onChange={(e) => setName(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt='27px' width='100%'>
                <Flex flexDir='row'><FormLabel>Price</FormLabel><Text>{toRupiah(price)}</Text></Flex>
                <Input placeholder= 'Ex. 12000' name='price' value={price} onChange={(e) => setPrice(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' onKeyPress={(e) => {
      const isValidInput = /^\d$/.test(e.key) || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight';
      if (!isValidInput) {
        e.preventDefault();
      }
    }}/>
              </Box>
              
            </Flex>
            <Box width={size == '500px' ? '100%' : '60%'} pb='30px'>
                <FormLabel>Description</FormLabel>
                <ReactQuill
        value={description}
        onChange={(value) => setDescription(value)}
        theme='snow'
        style={{ height:'200px'}}
      />
            </Box>
            <Flex columnGap='10px' mb='20px ' flexDir={size == '500px' ? 'column' : 'row'}>
              <Box pt='27px' width='100%'>
                <FormLabel>Weight Product</FormLabel>
                <Input placeholder= 'Ex. 950' name='massProduct' value={massProduct} onChange={(e) => setMassProduct(e.target.value)} type='text' border='solid gray 1px' borderRadius='full' />
              </Box>
              <Box pt ='27px' width='100%'>
                <FormLabel>Unit</FormLabel>
              <Select border='solid gray 1px' borderRadius='full' placeholder="Ex. gram" value={massId} onChange={(e) => setMassId(e.target.value)}>
            {dataMass?.map((item) => ( 
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
            </Select>
              </Box>
              <Box pt ='27px' width='100%'>
                <FormLabel>Packaging</FormLabel>
              <Select border='solid gray 1px' borderRadius='full' placeholder="Ex. pcs" value={packagingId} onChange={(e) => setPackagingId(e.target.value)}>
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
    </>
  );
};
