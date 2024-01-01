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
} from "@chakra-ui/react";
import {
  IconPlus,
  IconArrowNarrowDown,
  IconEditCircle,
  IconTrashX,
} from '@tabler/icons-react';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';

const CategoryLists = ({size, handleWebSize}) => {
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

  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const addNewCategory = async () => {
    try {
      const result = await axios.post(
        `http://localhost:8000/api/category/add-category`, {
          category: newCategory
        },
      );

      alert(result?.data?.result);
  console.log("ini result",result);

      onClose();
      fetchCategory();
      setNewCategory()
    } catch (err) {
      console.log(err);
    }
  };

  const confirmEditCategory = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/category/change-category`, {
          category_id: selectedCategory?.id,
          categoryNew: editCategory
        });

      alert("Edit category successful");
      onClose();
      fetchCategory();
      setEditCategory("")
    } catch (err) {
      alert("error");
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

  return (
    <>
      <Box w={{ base: '98.7vw', md: size }} height='100vh' backgroundColor='#fbfaf9'>
      <Flex
        position={'relative'}
        // top={{ base: '20px', lg: '-30px' }}
        px={'20px'}
        h={"10vh"}
        justify={"space-between"}
        align={"center"}
      >
        <Image src={LogoGroceria} h={'30px'} />
        <ResizeButton webSize={size} handleWebSize={handleWebSize} color={"black"}/>
      </Flex>
      <Box p='50px'>
        <Box pl={size == '500px' ? '0px' : '150px' } >
          <HStack mb='10px'>
            <Button leftIcon={<IconPlus />} backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={onOpen}>Add Category</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Filter</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
            <Button onClick={exportToExcel} borderRadius='full' border='solid 1px black' leftIcon={<IconArrowNarrowDown />}>Download</Button>
          </HStack>
          <Box p="20px" boxShadow='0px 1px 5px gray'>
            <HStack mb='5px'>
              <Text fontWeight='bold'>Category Name</Text>
              <Spacer /> 
              <Text fontWeight='bold' mr='10px'>Action</Text>
            </HStack>
            <Box as='hr' borderTopWidth='3px' borderTopColor='black.200'></Box>
            {dataCategory?.categories?.map((item, index) => (
              <>
                <HStack m='10px' >
                  <Text width='210px' isTruncated textOverflow='ellipsis' whiteSpace='nowrap' >{item?.category}</Text>
                  <Spacer />
                  <IconButton  icon={<IconEditCircle />} variant='ghost' colorScheme='blue' onClick={() => handleEditCategory(item)} />
                  <IconButton  icon={<IconTrashX />} variant='ghost' colorScheme='red' onClick={() => handleDeleteCategory(item)} />
                </HStack>
                <Box as='hr' borderTopWidth='1px' borderTopColor='black.200' />
              </>
            ))}
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
    </>
  );
};

export default CategoryLists ;