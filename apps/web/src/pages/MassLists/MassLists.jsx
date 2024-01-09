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
  Select
} from "@chakra-ui/react";
import {
  IconPlus,
  IconArrowNarrowDown,
  IconEditCircle,
  IconTrashX,
  IconChevronRight,
  IconChevronLeft,
} from '@tabler/icons-react';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
import { useSearchParams } from "react-router-dom";

const MAX_VISIBLE_PAGES = 3; 

const MassLists = ({size, handleWebSize}) => {
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
  const [massName, setMassName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
  const [selectedPage, setSelectedPage] = useState(page);


  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

  const handleDeleteMass = (mass) => {
    setSelectedMass(mass);
    setDeleteModalOpen(true);
  };

  const handleEditMass = (mass) => {
    setSelectedMass(mass);
    setEditModalOpen(true);
  };

  const addNewMass = async () => {
    try {
      const result = await axios.post(
        `http://localhost:8000/api/mass/add-mass`, {
          mass: newMass
        },
      );

      alert(result?.data?.result);
  console.log("ini result",result);

      onClose();
      fetchMass();
      setNewMass()
    } catch (err) {
      console.log(err);
    }
  };

  console.log("new mass", newMass);

  const confirmEditMass = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/mass/change-mass`, {
          massId: selectedMass?.id,
          massNew: editMass
        });

      alert("Edit mass successful");
      onClose();
      setEditModalOpen(false)
      fetchMass();
      setEditMass("")
    } catch (err) {
      alert("error");
    }
  };

  console.log('selectedMass',selectedMass);
  console.log('editMass', editMass);

  const confirmDeleteMass = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/mass/remove-mass/${selectedMass.id}`
      );

      alert("delete mass successful");
      onClose();
      setDeleteModalOpen(false);
      fetchMass();
    } catch (err) {
      console.log(err);
      alert("Mass used in another data");
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
    if (dataMass && dataMass.categories?.length > 0) {
      const ws = utils.json_to_sheet(dataMass?.categories);
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

  const fetchMass = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/mass/mass-lists?page=${page}&pageSize=${pageSize}&massName=${massName}`
      );

      setDataMass(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dataMass);

  useEffect(() => {
    setSearchParams({ page, pageSize, massName });
  }, [page, pageSize, massName]);
  

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const massNameFromUrl = searchParams.get('massName') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setMassName(massNameFromUrl);
    setSelectedPage(pageFromUrl);
  }, []); // This useEffect runs only once when the component mounts
  
  useEffect(() => {
    fetchMass();
  }, [page, pageSize, massName]);
  
const getPageNumbers = () => {
  const totalPages = dataMass?.totalPages || 0;
  const currentPage = selectedPage;

  let startPage = Math.max(currentPage - Math.floor(MAX_VISIBLE_PAGES / 2), 1);
  let endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

  if (totalPages - endPage < Math.floor(MAX_VISIBLE_PAGES / 2)) {
    startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (startPage > 1) {
    pages.unshift("...");
  }

  if (endPage < totalPages) {
    pages.push("...");
  }

  return pages;
};

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
            <Button leftIcon={<IconPlus />} backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={onOpen}>Add Mass</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Filter</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormLabel>Mass Name</FormLabel>
                  <Input border='solid black 1px' name='newMass' value={newMass} onChange={(e) => setNewMass(e.target.value)} type='text'></Input>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme='green' mr={3} onClick={addNewMass}>
                    Add Mass
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Spacer /> 
            <Button onClick={exportToExcel} borderRadius='full' border='solid 1px black' leftIcon={<IconArrowNarrowDown />}>Download</Button>
          </HStack>
          <Box p="20px" boxShadow='0px 1px 5px gray'>
            <HStack mb='5px'>
              <Text fontWeight='bold'>Mass Name</Text>
              <Spacer /> 
              <Text fontWeight='bold' mr='10px'>Action</Text>
            </HStack>
            <Box as='hr' borderTopWidth='3px' borderTopColor='black.200'></Box>
            {dataMass?.mass?.map((item, index) => (
              <>
                <HStack m='10px' >
                  <Text width='210px' isTruncated textOverflow='ellipsis' whiteSpace='nowrap' >{item?.name}</Text>
                  <Spacer />
                  <IconButton  icon={<IconEditCircle />} variant='ghost' colorScheme='blue' onClick={() => handleEditMass(item)} />
                  <IconButton  icon={<IconTrashX />} variant='ghost' colorScheme='red' onClick={() => handleDeleteMass(item)} />
                </HStack>
                <Box as='hr' borderTopWidth='1px' borderTopColor='black.200' />
              </>
            ))}
          </Box>
          {deleteModalOpen && (
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Mass</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    Are you sure you want to delete the mass "{selectedMass?.name}"?
                  </Text>
                  <VStack>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={confirmDeleteMass}>
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
                <ModalHeader>Edit Mass {selectedMass?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormLabel>New Mass Name</FormLabel>
                  <Input border='solid black 1px' name='editMass' value={editMass} onChange={(e) => setEditMass(e.target.value)} type='text'></Input>
                  <VStack>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={confirmEditMass}>
                    Edit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          <Flex marginTop='10px' flexWrap='wrap'>
            <Box mt='20px'>
            <HStack>
            <Text>Show per Page</Text>
            <Select border='solid 1px black' width='fit-content' value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
              <option value={1}>1</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option>All</option>
            </Select>
            </HStack>
            </Box>
            <Spacer />
            <Box mt='20px'>
            <Button borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' leftIcon={<IconChevronLeft />} isDisabled={page == 1 ? true : false} onClick={() => {setPage(page - 1); setSelectedPage(selectedPage -1);}} ></Button>
  {getPageNumbers().map((pageNumber, index) => (
          <Button
            key={index}
            ml='2px'
            mr='2px'
            borderRadius='full'
            backgroundColor={selectedPage === pageNumber ? '#286043' : 'white'}
            textColor={selectedPage === pageNumber ? 'white' : '#286043'}
            border={`solid 1px ${selectedPage === pageNumber ? 'white' : '#286043'}`}
            onClick={() => {
              // Handle the case where the button is "..." separately
              if (pageNumber !== "...") {
                setPage(pageNumber);
                setSelectedPage(pageNumber);
              }
            }}
          >
            {pageNumber}
          </Button>
        ))}
  <Button borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' rightIcon={<IconChevronRight />} isDisabled={page == dataMass?.totalPages ? true : false} onClick={() => {setSelectedPage(selectedPage +1); setPage(page+1);}}></Button>
            </Box>
  </Flex>
        </Box>
        </Box>
      </Box>
    </>
  );
};

export default MassLists ;
