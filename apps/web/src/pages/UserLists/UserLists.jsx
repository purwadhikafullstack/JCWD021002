import React, { useState, useEffect } from "react";
import axios from 'axios';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
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
  Tooltip,
  Flex,
  Image
} from "@chakra-ui/react";
import {
  IconPlus,
  IconArrowNarrowDown,
  IconEditCircle,
  IconTrashX,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Navigate, useNavigate } from "react-router-dom";
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const UserLists = ({size, handleWebSize}) => {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [editUser, setEditUser] = useState("");
  const navigate = useNavigate();


  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const addNewUser = async () => {
    // try {
    //   await axios.post(
    //     `http://localhost:8000/api/category/add-category`, {
    //       category: newCategory
    //     },
    //   );

    //   alert("Success");
    //   onClose();
    //   fetchCategory();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const confirmEditCategory = async () => {
    // try {
    //   await axios.patch(
    //     `http://localhost:8000/api/category/change-category`, {
    //       category_id: selectedCategory?.id,
    //       categoryNew: editCategory
    //     });

    //   alert("Edit category successful");
    //   onClose();
    //   fetchCategory();
    //   setEditCategory("")
    // } catch (err) {
    //   alert("error");
    // }
  };

  const confirmDeleteUser = async () => {
    // try {
    //   await axios.delete(
    //     `http://localhost:8000/api/category/remove-category/${selectedCategory.id}`
    //   );

    //   alert("delete category successful");
    //   onClose();
    //   fetchCategory();
    // } catch (err) {
    //   alert("category used in another data");
    // }
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

  useEffect(() => {
    if (data) {
      exportToPDF();
    }
  }, [data]);

  const exportToPDF = () => {
    // if (data) {
    //   const docDefinition = {
    //     content: [
    //       { text: 'Product List', style: 'header' },
    //       '\n',
    //       {
    //         table: {
    //           headerRows: 1,
    //           widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
    //           body: [
    //             ['ID', 'Name', 'Price', 'Description', 'Status', 'Quantity', 'Created At', 'Updated At'],
    //             ...data.products.map((product) => [
    //               product.id,
    //               product.name,
    //               formatPriceToIDR(product.price),
    //               product.description,
    //               product.status,
    //               product.quantity,
    //               new Date(product.created_at).toLocaleString(),
    //               new Date(product.updated_at).toLocaleString(),
    //             ]),
    //           ],
    //         },
    //       },
    //     ],
    //     styles: {
    //       header: {
    //         fontSize: 18,
    //         bold: true,
    //         alignment: 'center',
    //       },
    //     },
    //   };

    //   pdfMake.createPdf(docDefinition).download('product_list.pdf');
    // }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/user-lists`
      );

      setDataUser(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dataUser);
  console.log(size);
  console.log(handleWebSize);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Box w={{ base: '98.7vw', md: size }} height='100vh' backgroundColor='#fbfaf9' >
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
        <Button onClick={handleWebSize}>Klik</Button>
      </Flex>
      <Box p='20px'>
     
        <Box pl={size == '500px' ? '0px' : '150px' }>
          <HStack mb='10px'>
            <Button leftIcon={<IconPlus />} backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={onOpen}>Add User</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Filter</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormLabel>User Name</FormLabel>
                  <Input border='solid black 1px' name='newUser' value={newUser} onChange={(e) => setNewUser(e.target.value)} type='text'></Input>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme='green' mr={3} onClick={addNewUser}>
                    Add User
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Spacer /> 
            <Button onClick={exportToPDF} borderRadius='full' border='solid 1px black' leftIcon={<IconArrowNarrowDown />}>Download</Button>
          </HStack>
          <Box p="20px" boxShadow='0px 1px 5px gray'>
            <HStack mb='5px'>
              <Text fontWeight='bold'>User Name</Text>
              <Spacer /> 
              <Text fontWeight='bold' mr='10px'>Action</Text>
            </HStack>
            <Box as='hr' borderTopWidth='3px' borderTopColor='black.200'></Box>
            {dataUser?.allUsers?.map((item, index) => (
              <>
                <HStack m='10px' >
                <Tooltip label={`Email: ${item?.email} \b Full Name: ${item?.fullname}`} fontSize="md" placement="top">
                    <Text
                      width='210px'
                      isTruncated
                      textOverflow='ellipsis'
                      whiteSpace='nowrap'
                      _hover={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => navigate(`/detail-user/${item?.id}`)}
                    >
                      {item?.username}
                    </Text>
                  </Tooltip>
                  <Spacer />
                  <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/detail-user/${item?.id}`)} />
                  <IconButton  icon={<IconEditCircle />} variant='ghost' colorScheme='blue' onClick={() => handleEditUser(item)} />
                  <IconButton  icon={<IconTrashX />} variant='ghost' colorScheme='red' onClick={() => handleDeleteUser(item)} />
                </HStack>
                <Box as='hr' borderTopWidth='1px' borderTopColor='black.200' />
              </>
            ))}
          </Box>
          {deleteModalOpen && (
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    Are you sure you want to delete the User "{selectedUser?.username}"?
                  </Text>
                  <VStack>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={confirmDeleteUser}>
                    Delete
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
          }

// export default UserLists ;
