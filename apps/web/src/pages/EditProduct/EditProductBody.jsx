import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, HStack, Spacer, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, FormLabel, } from "@chakra-ui/react";
import {
  IconPlus, IconArrowLeft, IconLibraryPhoto, IconX, IconArrowRight, IconEye, IconEyeOff, IconDeviceFloppy
} from '@tabler/icons-react';
import SideBar from '../../components/SideBar/SideBar'
import ProductForm from "./ProductForm";

const EditProductForm = ({
  size,
  handleWebSize,
  navigate,
  addProduct,
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
  status,
  setStatus,
  dataMass,
  dataPackaging,
  selectedC,
  increment,
  decrement,
  dataCategory,
  data,
  openDeleteProductCategoryModal,
  openDeleteImageModal,
  isDeleteImageModalOpen,
  closeDeleteImageModal,
  imageToDelete,
  confirmDeleteImage,
  isDeleteProductCategoryModalOpen,
  closeDeleteProductCategoryModal,
  confirmDeleteProductCategory,
}) => {
  return (
    <>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Box w={{ base: '100vw', md: size }}>
          <SideBar size={size} handleWebSize={handleWebSize}/>
      <Box w={{ base: '98.7vw', md: size }} overflowX='hidden' height='100vh' backgroundColor='#fbfaf9' p='20px'>
      <Box pl={size == '500px' ? '0px' : '150px' } pr={size == '500px' ? '0px' : '20px'} pt='20px' pb='20px' mt='70px' >
        <HStack mb='10px'>
          <Button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/product-lists')}>Back</Button>
          <Spacer />
          <Button rightIcon={<IconDeviceFloppy />} borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => addProduct()}>Save</Button>
        </HStack>
        <Box borderRadius='10px' p='20px' backgroundColor='white' boxShadow='0px 1px 5px gray'>
        <form>
                <FormLabel>Product Information</FormLabel>
                <ProductForm
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
                  status={status}
                  setStatus={setStatus}
                  dataMass={dataMass}
                  dataPackaging={dataPackaging}
                  selectedC={selectedC}
                  increment={increment}
                  decrement={decrement}
                  dataCategory={dataCategory}
                  data={data}
                  openDeleteProductCategoryModal={openDeleteProductCategoryModal}
                  openDeleteImageModal={openDeleteImageModal}
                />
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
            <Button colorScheme="red" onClick={() => confirmDeleteImage(imageToDelete, closeDeleteImageModal).then(() => {toast.success('Delete image success'); setTimeout(() => { window.location.reload(); }, 3000); }).catch((err) => { console.error(err); })}>
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

export default EditProductForm;
