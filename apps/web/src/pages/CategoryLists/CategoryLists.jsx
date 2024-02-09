import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button, HStack, Text, Spacer, IconButton, VStack, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Flex, Avatar, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { IconPlus, IconEditCircle, IconTrashXFilled, IconSortAscendingLetters, IconSortDescendingLetters, } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar';
import { AddCategoryModal } from './AddCategoryModal';
import { EditModalCategory } from './EditModalCategory';
import { useWebSize } from '../../provider.websize';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { TableLists } from './TableLists';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryLists = () => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [dataCategory, setDataCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [fieldImage, setFieldImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedPage, setSelectedPage] = useState(page);

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditCategory(category?.category);
    setEditModalOpen(true);
  };

  const addNewCategory = async () => {
    try {
      let formData = new FormData();
      formData.append("category", newCategory);
      formData.append("category", fieldImage);

      const result = await axios.post(
        `http://localhost:8000/api/category/add-category`, 
        formData
      );

      if (result?.data?.result == 'Category name already added'){
        toast.warning(result?.data?.result); } else { toast.success('Category added') }
      onClose();
      fetchCategory();
      setNewCategory();
      setFieldImage(null);
      setSelectedImage('');
    } catch (err) {
      console.log(err);
    }
  };

  const confirmEditCategory = async () => {
    try {
      let formData = new FormData();
      formData.append("category_id", selectedCategory?.id);
      {editCategory == selectedCategory?.category ? null : formData.append("category", editCategory);}
      {fieldImage ? formData.append("category", fieldImage) : null }

      await axios.patch(
        `http://localhost:8000/api/category/change-category`, 
        formData
        );

      onClose();
      fetchCategory();
      setEditCategory("");
      setFieldImage(null);
      setSelectedImage('');
      setEditModalOpen(false);
      toast.success("Edit category successful");
    } catch (err) {
      toast.error("error");
    }
  };

  const confirmDeleteCategory = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/category/remove-category/${selectedCategory.id}`
      );

      toast.success("Delete category successful");
      onClose();
      setDeleteModalOpen(false);
      fetchCategory();
    } catch (err) {
      toast.error("category used in another data");
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/category/category-lists?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`
      );

      setDataCategory(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchCategory(); }, [page, pageSize, sortOrder]);

  const handleImageChange = (event) => {
    const selectedFile = event.currentTarget.files[0];

  if (selectedFile) {
    const fileSizeInMB = selectedFile.size / (1024 * 1024); // Convert size to megabytes

    if (fileSizeInMB > 1) {
      toast.warning("Selected image size should be less than 1 MB");
      return; // Don't proceed with further handling
    }

    setFieldImage(selectedFile);
    const objectURL = URL.createObjectURL(selectedFile);
    setSelectedImage(objectURL);
  }
  };

  return (
    <Box w={{ base: '100vw', md: size }} overflowX="hidden">
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <SideBar size={size} handleWebSize={handleWebSize} />
      <Box w={{ base: '98.7vw', md: size }} height='fit-content' backgroundColor='#fbfaf9'>
      <Box p='50px'>
        <Box pl={size == '500px' ? '0px' : '150px' } mt='80px' >
          <HStack mb='10px'>
            <Button leftIcon={<IconPlus />} backgroundColor='#286043' textColor='white' border='solid 1px #286043' isDisabled={user?.role_idrole == 1 ? false : true} onClick={onOpen}>Add Category</Button>
            <Spacer /> 
            <Button leftIcon={<IconSortAscendingLetters />} border="solid black 1px" borderRadius="full" onClick={() => setSortOrder('asc')} isDisabled={sortOrder == 'asc' ? true : false} fontSize='small' > Ascending </Button>
            <Button leftIcon={<IconSortDescendingLetters />} border="solid black 1px" borderRadius="full" onClick={() => setSortOrder('desc')} isDisabled={sortOrder == 'desc' ? true : false} fontSize='small' > Descending </Button>
          </HStack>
          <Box overflowX='auto'>
          <TableLists dataCategory={dataCategory} user={user} handleEditCategory={handleEditCategory} handleDeleteCategory={handleDeleteCategory} />
        </Box>
          {deleteModalOpen && (
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text> Are you sure you want to delete the category "{selectedCategory?.category}"? </Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                  <Button colorScheme='red' onClick={confirmDeleteCategory}>Delete</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          <AddCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        addNewCategory={addNewCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleImageChange={handleImageChange}
        fieldImage={fieldImage}
        selectedImage={selectedImage} />
      <EditModalCategory
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        confirmEditCategory={confirmEditCategory}
        editCategory={editCategory}
        setEditCategory={setEditCategory}
        handleImageChange={handleImageChange}
        fieldImage={fieldImage}
        selectedImage={selectedImage}
        selectedCategory={selectedCategory} />
      <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={dataCategory} />
        </Box> </Box> </Box> </Box>
  );
};

export default CategoryLists ;