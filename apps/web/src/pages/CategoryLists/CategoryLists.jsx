import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  Button,
  HStack,
  Text,
  Spacer,
  IconButton,
  VStack,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Flex,
  Image,
  Avatar,
  Icon,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer
} from "@chakra-ui/react";
import {
  IconPlus,
  IconArrowNarrowDown,
  IconEditCircle,
  IconTrashXFilled,
} from '@tabler/icons-react';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Logo-Groceria-no-Bg.png';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar';
import { FiUpload } from "react-icons/fi";
import { useWebSize } from '../../provider.websize';

const CategoryLists = () => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [fieldImage, setFieldImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

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

      alert(result?.data?.result);
      console.log("ini result",result);

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
      formData.append("category", editCategory);
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
      alert("Edit category successful");
    } catch (err) {
      alert("error");
      console.log(err);
    }
  };

  const confirmDeleteCategory = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/category/remove-category/${selectedCategory.id}`
      );

      alert("delete category successful");
      onClose();
      setDeleteModalOpen(false);
      fetchCategory();
    } catch (err) {
      alert("category used in another data");
    }
  };

  const handleItemClick = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };


  const exportToExcel = () => {
    if (dataCategory && dataCategory.categories?.length > 0) {
      const ws = utils.json_to_sheet(dataCategory?.categories);
      const wb = write({ Sheets: { 'Categories': ws }, SheetNames: ['Categories'] }, { bookType: 'xlsx', bookSST: true, type: 'binary' });

      const buffer = new ArrayBuffer(wb.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < wb.length; i++) {
        view[i] = wb.charCodeAt(i) & 0xFF;
      }

      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      saveAs(blob, 'categories.xlsx');
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/category/category-lists`
      );

      setDataCategory(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dataCategory);

  useEffect(() => {
    fetchCategory();
  }, []);

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

  return (
    <>
    <Box w={{ base: '100vw', md: size }} overflowX="hidden">
      <SideBar size={size} handleWebSize={handleWebSize} />
      <Box w={{ base: '98.7vw', md: size }} height='fit-content' backgroundColor='#fbfaf9'>
      <Box p='50px'>
        <Box pl={size == '500px' ? '0px' : '150px' } >
          <HStack mb='10px'>
            <Button leftIcon={<IconPlus />} backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={onOpen}>Add Category</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <VStack>
                    {selectedImage ? <Image
                    src={selectedImage}
                    alt="Selected Image"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="50%"/> : <Image src={LogoGroceria} />}
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
                  <FormLabel>Category Name</FormLabel>
                  <Input border='solid black 1px' name='newCategory' value={newCategory} onChange={(e) => setNewCategory(e.target.value)} type='text'></Input>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme='green' mr={3} onClick={addNewCategory}>
                    Add Category
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Spacer /> 
          </HStack>
          <Box overflowX='auto'>
        <TableContainer borderRadius='10px' border='solid black 1px'>
        <Table size='sm' border='solid 1 px black' variant='striped' colorScheme='gray'>
      <Thead>
        <Tr bgColor='gray' >
            <Th textColor='white'>Photo</Th>
          <Th textColor='white'>Category Name</Th>
          <Th textColor='white'>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
      {dataCategory?.categories?.map((item, index) => (
          <Tr key={index}>
              <Td>
              <Avatar
                        key={item?.imageUrl}
                        boxSize={'64px'}
                        name={item?.category}
                        borderRadius={'full'}
                        src={
                          item?.imageUrl
                            ? `${import.meta.env.VITE_API_IMAGE_URL}/categories/${item?.imageUrl}`
                            : 'https://bit.ly/broken-link'
                        }
                        cursor="pointer"
                        _hover={{
                          transform: 'scale(1.1)',
                        }}
                      />
              </Td>
            <Td>{item.category}</Td>
            <Td>
            <Flex alignItems={'center'} gap={'8px'}>
                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/detail-user/${item?.id}`)} /> */}
                          <IconButton
                            icon={<IconEditCircle />}
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => handleEditCategory(item)}
                          />
                          <IconButton
                            icon={<IconTrashXFilled />}
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDeleteCategory(item)}
                          />
                        </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
        </TableContainer>
        </Box>
          {deleteModalOpen && (
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    Are you sure you want to delete the category "{selectedCategory?.category}"?
                  </Text>
                  <VStack>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={confirmDeleteCategory}>
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          {editModalOpen && (
            <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Category {selectedCategory?.category}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <VStack>
                    {selectedImage ? <Image
                    src={selectedImage}
                    alt="Selected Image"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="50%"/> : <Image src={LogoGroceria} />}
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
                  <FormLabel>New Category Name</FormLabel>
                  <Input border='solid black 1px' name='editCategory' value={editCategory} onChange={(e) => setEditCategory(e.target.value)} type='text'></Input>
                  <VStack>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={confirmEditCategory}>
                    Edit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Box>
        </Box>
      </Box>
      </Box>
    </>
  );
};

export default CategoryLists ;
