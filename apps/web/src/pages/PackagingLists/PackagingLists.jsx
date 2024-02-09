import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button, HStack, Text, Spacer, IconButton, FormLabel, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Input, } from "@chakra-ui/react";
import { IconPlus, IconSortAscendingLetters, IconSortDescendingLetters, IconEditCircle, IconTrashX, } from '@tabler/icons-react';
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar';
import { useWebSize } from '../../provider.websize';
import { PaginationControls } from "../../components/PaginationControls/PaginationControls";

const PackagingLists = () => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [dataPackaging, setDataPackaging] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPackaging, setSelectedPackaging] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newPackaging, setNewPackaging] = useState("");
  const [editPackaging, setEditPackaging] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize, sortOrder });
  const [selectedPage, setSelectedPage] = useState(page);

  const addNewPackaging = async () => {
    try {
      const result = await axios.post(
        `http://localhost:8000/api/packaging/add-packaging`, {
          packaging: newPackaging
        }, );
        
      if (result?.data?.result == 'Packaging name already added'){
          toast.warning(result?.data?.result); } else { toast.success('Packaging added') }
      onClose();
      fetchPackaging();
      setNewPackaging()
    } catch (err) {
      console.log(err);
    }
  };

  const confirmEditPackaging = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/packaging/change-packaging`, {
          packagingId: selectedPackaging?.id,
          packagingNew: editPackaging
        });

      toast.success("Edit packaging successful");
      onClose();
      setEditModalOpen(false)
      fetchPackaging();
      setEditPackaging("")
    } catch (err) {
      toast.error("error");
    }
  };

  const confirmDeletePackaging = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/packaging/remove-packaging/${selectedPackaging.id}`
      );

      toast.success("Delete packaging successful");
      onClose();
      setDeleteModalOpen(false);
      fetchPackaging();
    } catch (err) {
      console.log(err);
      toast.error("Packaging used in another data");
    }
  };

  const fetchPackaging = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/packaging/packaging-lists?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`
      );

      setDataPackaging(response?.data);
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
    fetchPackaging();
  }, [page, pageSize, sortOrder]);

  return (
    <Box w={{ base: '100vw', md: size }} overflowX="hidden">
      <SideBar size={size} handleWebSize={handleWebSize} />
      <Box w={{ base: '98.7vw', md: size }} height='100vh' backgroundColor='#fbfaf9'>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Box p='50px'>
        <Box pl={size == '500px' ? '0px' : '150px' } mt='80px' >
          <HStack mb='10px'>
            <Button leftIcon={<IconPlus />} isDisabled={ user?.role_idrole == 1 ? false : true } backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={onOpen}>Add Packaging</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Filter</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormLabel>Packaging Name</FormLabel>
                  <Input border='solid black 1px' name='newPackaging' value={newPackaging} onChange={(e) => setNewPackaging(e.target.value)} type='text'></Input>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                  <Button colorScheme='green' mr={3} onClick={addNewPackaging}>Add Packaging</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Spacer /> 
            <Button leftIcon={<IconSortAscendingLetters />} border="solid black 1px" borderRadius="full" onClick={() => setSortOrder('asc')} isDisabled={sortOrder == 'asc' ? true : false} fontSize='small' > Ascending </Button>
            <Button leftIcon={<IconSortDescendingLetters />} border="solid black 1px" borderRadius="full" onClick={() => setSortOrder('desc')} isDisabled={sortOrder == 'desc' ? true : false} fontSize='small' > Descending </Button>
          </HStack>
          <Box p="20px" boxShadow='0px 1px 5px gray'>
            <HStack mb='5px'>
              <Text fontWeight='bold'>Packaging Name</Text>
              <Spacer /> 
              { user?.role_idrole == 1 ? <Text fontWeight='bold' mr='10px'>Action</Text> : null }
            </HStack>
            <Box as='hr' borderTopWidth='3px' borderTopColor='black.200'></Box>
            {dataPackaging?.packaging?.map((item, index) => (
              <>
                <HStack m='10px' >
                  <Text width='210px' isTruncated textOverflow='ellipsis' whiteSpace='nowrap' >{item?.name}</Text>
                  <Spacer />
                  { user?.role_idrole == 1 ? <><IconButton  icon={<IconEditCircle />} variant='ghost' colorScheme='blue' onClick={() => { setSelectedPackaging(item); setEditModalOpen(true); }} />
                  <IconButton  icon={<IconTrashX />} variant='ghost' colorScheme='red' onClick={() => { setSelectedPackaging(packaging); setDeleteModalOpen(true); }} /></> : null }
                </HStack>
                <Box as='hr' borderTopWidth='1px' borderTopColor='black.200' />
              </>
            ))}
          </Box>
          {deleteModalOpen && (
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Packaging</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Are you sure you want to delete the packaging "{selectedPackaging?.name}"?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                  <Button colorScheme='red' onClick={confirmDeletePackaging}>Delete</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          {editModalOpen && (
            <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Packaging {selectedPackaging?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormLabel>New Packaging Name</FormLabel>
                  <Input border='solid black 1px' name='editPackaging' value={editPackaging} onChange={(e) => setEditPackaging(e.target.value)} type='text'></Input>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setEditModalOpen(false)}>Cancel</Button>
                  <Button colorScheme='red' onClick={confirmEditPackaging}>Edit</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          <PaginationControls  page= {page} pageSize={pageSize} selectedPage={selectedPage} setPage={setPage}
              setPageSize={setPageSize} setSelectedPage={setSelectedPage} data={dataPackaging} />
        </Box>
        </Box>
      </Box>
      </Box>
  );
};

export default PackagingLists ;