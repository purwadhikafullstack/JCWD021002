import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button, HStack, Text, Spacer, IconButton, FormLabel, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Input, } from "@chakra-ui/react";
import { IconPlus, IconSortAscendingLetters, IconSortDescendingLetters, IconEditCircle, IconTrashX, } from '@tabler/icons-react';
import { useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar';
import { useWebSize } from '../../provider.websize';
import { PaginationControls } from "../../components/PaginationControls/PaginationControls";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MassLists = () => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [data, setData] = useState([]);
  const [dataMass, setDataMass] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMass, setSelectedMass] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newMass, setNewMass] = useState("");
  const [editMass, setEditMass] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize, sortOrder });
  const [selectedPage, setSelectedPage] = useState(page);

  const addNewMass = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/mass/add-mass`, {
          mass: newMass
        },
      );

      if (result?.data?.result == 'Mass name already added'){
        toast.warning(result?.data?.result); } else { toast.success('Mass added') }
      onClose();
      fetchMass();
      setNewMass()
    } catch (err) {
      console.log(err);
    }
  };

  const confirmEditMass = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/mass/change-mass`, {
          massId: selectedMass?.id,
          massNew: editMass
        });

      toast.success("Edit mass successful");
      onClose();
      setEditModalOpen(false)
      fetchMass();
      setEditMass("")
    } catch (err) {
      toast.error("error");
    }
  };

  const confirmDeleteMass = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/mass/remove-mass/${selectedMass.id}`
      );

      toast.success("Delete mass successful");
      onClose();
      setDeleteModalOpen(false);
      fetchMass();
    } catch (err) {
      toast.error("Mass used in another data");
    }
  };

  const fetchMass = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mass/mass-lists?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`
      );

      setDataMass(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSearchParams({ page, pageSize, sortOrder });
  }, [page, pageSize, sortOrder]);
  

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const sortOrderFromUrl = searchParams.get('sortOrder') || 'asc';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setSortOrder(sortOrderFromUrl);
    setSelectedPage(pageFromUrl);
  }, []); // This useEffect runs only once when the component mounts
  
  useEffect(() => {
    fetchMass();
  }, [page, pageSize, sortOrder]);
  
  return (
    <Box w={{ base: '100vw', md: size }} overflowX="hidden">
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <SideBar size={size} handleWebSize={handleWebSize} />
      <Box w={{ base: '98.7vw', md: size }} height='100vh' backgroundColor='#fbfaf9'>
      <Box p='50px'>
        <Box pl={size == '500px' ? '0px' : '150px' } mt='80px' >
          <HStack mb='10px'>
            <Button leftIcon={<IconPlus />} isDisabled={user?.role_idrole == 1 ? false : true} backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={onOpen}>Add Mass</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Mass Unit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormLabel>Mass Name</FormLabel>
                  <Input border='solid black 1px' name='newMass' value={newMass} onChange={(e) => setNewMass(e.target.value)} type='text'></Input>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                  <Button colorScheme='green' mr={3} onClick={addNewMass}>Add Mass</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Spacer /> 
            <Button leftIcon={<IconSortAscendingLetters />} border="solid black 1px" borderRadius="full" onClick={() => setSortOrder('asc')} isDisabled={sortOrder == 'asc' ? true : false} fontSize='small' > Ascending </Button>
            <Button leftIcon={<IconSortDescendingLetters />} border="solid black 1px" borderRadius="full" onClick={() => setSortOrder('desc')} isDisabled={sortOrder == 'desc' ? true : false} fontSize='small' > Descending </Button>
          </HStack>
          <Box p="20px" boxShadow='0px 1px 5px gray'>
            <HStack mb='5px'>
              <Text fontWeight='bold'>Mass Name</Text>
              <Spacer /> 
              {user?.role_idrole == 1 ? <Text fontWeight='bold' mr='10px'>Action</Text> : null}
            </HStack>
            <Box as='hr' borderTopWidth='3px' borderTopColor='black.200'></Box>
            {dataMass?.mass?.map((item, index) => (
              <><HStack m='10px' >
                  <Text width='210px' isTruncated textOverflow='ellipsis' whiteSpace='nowrap' >{item?.name}</Text>
                  <Spacer />
                  {user?.role_idrole == 1 ? <><IconButton  icon={<IconEditCircle />} variant='ghost' colorScheme='blue' onClick={() => { setSelectedMass(item); setEditModalOpen(true); }} />
                  <IconButton  icon={<IconTrashX />} variant='ghost' colorScheme='red' onClick={() => { setSelectedMass(item); setDeleteModalOpen(true); }} /></> : null}
                </HStack>
                <Box as='hr' borderTopWidth='1px' borderTopColor='black.200' /></>
            ))}
          </Box>
          {deleteModalOpen && (
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Mass</ModalHeader>
                <ModalCloseButton />
                <ModalBody><Text>Are you sure you want to delete the mass "{selectedMass?.name}"?</Text></ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                  <Button colorScheme='red' onClick={confirmDeleteMass}>Delete</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          {editModalOpen && (
            <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Mass {selectedMass?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormLabel>New Mass Name</FormLabel>
                  <Input border='solid black 1px' name='editMass' value={editMass} onChange={(e) => setEditMass(e.target.value)} type='text'></Input>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setEditModalOpen(false)}>Cancel</Button>
                  <Button colorScheme='red' onClick={confirmEditMass}>Edit</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          <PaginationControls  page= {page} pageSize={pageSize} selectedPage={selectedPage} setPage={setPage}
              setPageSize={setPageSize} setSelectedPage={setSelectedPage} data={dataMass} />
        </Box>
        </Box>
      </Box>
      </Box>
  );
};

export default MassLists ;