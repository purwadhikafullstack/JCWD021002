import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Text, Spacer, VStack, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Input, Flex, Select, InputGroup, InputLeftElement, } from '@chakra-ui/react';
import { IconPlus, IconSearch, IconSortAscendingLetters, IconSortDescendingLetters, } from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { GridLists } from './GridLists';
import { TableLists } from './TableLists';
import { useWebSize } from '../../provider.websize';
import { PaginationControls } from './PaginationControls';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLists = () => {
  const {size, handleWebSize } = useWebSize();
  const [dataUser, setDataUser] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(page);
  const [roleId, setRoleId] = useState('2');
  const [username, setUsername] = useState();
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
  const [viewType, setViewType] = useState('table'); // 'grid' or 'table'

  const handleSwitchView = () => {
    setViewType((prevType) => (prevType === 'table' ? 'grid' : 'table'));
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      let newStatus = selectedUser?.status === 'Active' ? 'Deactive' : 'Active';
  
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/update-user`,
        {
          id: selectedUser?.id,
          status: newStatus,
        },
      );
  
      if (result) {
        if (newStatus === 'Active') {
          toast.success('User activated successfully');
        } else {
          toast.success('User deactivated successfully');
        }
        
        setDeleteModalOpen(false);
        fetchUser();
      }
    } catch (err) {
      toast.error('Error: User used in another data');
    }
  };
  

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/user-lists?page=${page}&pageSize=${pageSize}&roleId=${roleId}&username=${username}&sortOrder=${sortOrder}`,
      );

      setDataUser(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSearchParams({ page, pageSize, username, roleId });
  }, [page, pageSize, username, roleId]);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const usernameFromUrl = searchParams.get('username') || '';
    const roleIdFromUrl = searchParams.get('roleId') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setUsername(usernameFromUrl);
    setRoleId(roleIdFromUrl);
    setSelectedPage(pageFromUrl);
  }, []); 

  useEffect(() => {
    fetchUser();
  }, [page, pageSize, username, roleId, sortOrder]);

  return (
    <Box w={{ base: '100vw', md: size }} overflowX='hidden'>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
          <SideBar size={size} handleWebSize={handleWebSize}/>
      <Box w={{ base: '100vw', md: size }} height='full' backgroundColor='#fbfaf9' >
      <Box p='20px'>
        <Box pl={size == '500px' ? '0px' : '150px' } mt='80px' >
                <Flex flexWrap='wrap' dir='row' gap='10px'>
                <Box w='60%'>
                <InputGroup mb='20px'>
            <InputLeftElement pointerEvents='none'>
              <IconSearch color='black' />
            </InputLeftElement>
            <Input type='text' placeholder='Search by username' width='50vw' value={username} borderRadius='full' borderColor='solid grey 1px' onChange={(e) => setUsername(e.target.value)} />
          </InputGroup>
                </Box>
          <Box>
          <Select
          border='solid 1px black'
              width='fit-content'
              placeholder="Select role"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="2">Admin Store</option>
              <option value="3">User</option>
            </Select>
          </Box>
          <Button leftIcon={<IconSortAscendingLetters />} border="solid black 1px" borderRadius="full" onClick={() => setSortOrder('asc')} isDisabled={sortOrder == 'asc' ? true : false} fontSize='small' > Ascending </Button>
            <Button leftIcon={<IconSortDescendingLetters />} border="solid black 1px" borderRadius="full" onClick={() => setSortOrder('desc')} isDisabled={sortOrder == 'desc' ? true : false} fontSize='small' > Descending </Button>
                </Flex>
          <Flex flexDir='row' flexWrap='wrap' mt='10px' mb='10px'>
            <Button leftIcon={<IconPlus />} backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => navigate('/add-user')}>Add Admin Store</Button>
            <Spacer />
            <Button onClick={handleSwitchView} borderRadius='full' border='solid 1px black' >
            Switch View
          </Button>
            </Flex>
          {viewType === 'table' ? (
          <TableLists dataUser={dataUser} handleDeleteUser={handleDeleteUser} navigate={navigate} />
        ) : (
          <GridLists dataUser={dataUser} handleDeleteUser={handleDeleteUser} navigate={navigate} />
        )}
            {deleteModalOpen && (
              <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{selectedUser?.status == 'Active' ? "Delete User" : "Activated User" } </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>
                    {selectedUser?.status == 'Active' ? `Are you sure you want to delete the User "
                      ${selectedUser?.username}"?` : `Are you sure you want to Activated the User "
                      ${selectedUser?.username}"?`}
                    </Text>
                    <VStack></VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => setDeleteModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={confirmDeleteUser}>
                      {selectedUser?.status == 'Active' ? "Delete" : "Activated"}
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            )}
            <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              dataUser={dataUser}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserLists;
