import React, { useState, useEffect } from 'react';
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
  Image,
  Select,
  Avatar,
  Icon,
  Divider,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  IconPlus,
  IconArrowNarrowDown,
  IconEditCircle,
  IconTrashX,
  IconInfoCircle,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { FaStar } from 'react-icons/fa6';
// import  SidebarWithHeader  from '../../components/SideBar/SideBar'
import SideBar from '../../components/SideBar/SideBar';

const MAX_VISIBLE_PAGES = 3;

const UserLists = ({ size, handleWebSize }) => {
  const [data, setData] = useState([]);
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
  const [roleId, setRoleId] = useState('');
  const [username, setUsername] = useState();
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });

  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}user/update-user`,
        {
          id: selectedUser?.id,
          status: 'Deactive',
        },
      );

      if (result) {
        alert('User deactive successful');
        setDeleteModalOpen(false);
        fetchUser();
      }
    } catch (err) {
      alert('User used in another data');
    }
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
        `http://localhost:8000/api/user/user-lists?page=${page}&pageSize=${pageSize}&roleId=${roleId}&username=${username}`,
      );

      console.log('API Request URL:', response.config.url);
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
  }, []); // This useEffect runs only once when the component mounts

  useEffect(() => {
    fetchUser();
  }, [page, pageSize, username, roleId]);

  const getPageNumbers = () => {
    const totalPages = dataUser?.totalPages || 0;
    const currentPage = selectedPage;

    let startPage = Math.max(
      currentPage - Math.floor(MAX_VISIBLE_PAGES / 2),
      1,
    );
    let endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    if (totalPages - endPage < Math.floor(MAX_VISIBLE_PAGES / 2)) {
      startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
    }

    if (endPage < totalPages) {
      pages.push('...');
    }

    return pages;
  };

  return (
    <Box w={{ base: '100vw', md: size }} overflowX="hidden">
      <SideBar size={size} handleWebSize={handleWebSize} />
      <Box
        w={{ base: '100vw', md: size }}
        height="fit-content"
        backgroundColor="#fbfaf9"
      >
        {/* <SidebarWithHeader /> */}

        <Box p="20px">
          <Box pl={size == '500px' ? '0px' : '150px'}>
            <Flex dir="row" gap="10px">
              <Box w="60%">
                <InputGroup mb="20px">
                  <InputLeftElement pointerEvents="none">
                    <IconSearch color="black" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Search by username"
                    width="50vw"
                    value={username}
                    borderRadius="full"
                    borderColor="solid grey 1px"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </Box>
              <Box>
                <Select
                  border="solid 1px black"
                  width="fit-content"
                  placeholder="Select role"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                >
                  <option value="">All Roles</option>
                  <option value="1">Super Admin</option>
                  <option value="2">Admin Store</option>
                  <option value="3">User</option>
                </Select>
              </Box>
            </Flex>
            <HStack mb="10px">
              <Button
                leftIcon={<IconPlus />}
                backgroundColor="#286043"
                textColor="white"
                border="solid 1px #286043"
                onClick={() => navigate('/add-user')}
              >
                Add User
              </Button>

              <Spacer />
              <Button
                onClick={exportToPDF}
                borderRadius="full"
                border="solid 1px black"
                leftIcon={<IconArrowNarrowDown />}
              >
                Download
              </Button>
            </HStack>
            <Flex
              alignItems={size == '500px' ? 'center' : 'flex-start'}
              gap={'24px'}
              flexWrap={'wrap'}
              h="fit-content"
            >
              {dataUser?.allUsers?.map((item, index) => (
                <Flex
                  className="admin-container"
                  alignItems={'center'}
                  gap={'17px'}
                  flex={'1 0 calc(25% - 24px)'}
                  borderRadius={'16px'}
                  background={'#FFFFFF'}
                  boxShadow={'base'}
                  minWidth={size == '500px' ? '155px' : '200px'}
                  maxWidth={'246px'}
                  key={index}
                >
                  <Box
                    width={'10px'}
                    height={'80px'}
                    backgroundColor={'#9ED6A3'}
                    borderRadius={'0px 14px 14px 0px'}
                  ></Box>

                  <Flex
                    padding={'24px 0px'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                    width="100%"
                    gap={'24px'}
                  >
                    <Flex
                      justifyContent={'center'}
                      alignItems={'center'}
                      gap={'10px'}
                      width="100%"
                      flexDirection={size == '500px' ? 'column' : 'row'}
                    >
                      <Avatar
                        key={item?.avatar}
                        boxSize={'64px'}
                        name={item?.username}
                        borderRadius={'full'}
                        src={
                          item?.avatar
                            ? `${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                                item?.avatar
                              }`
                            : 'https://bit.ly/broken-link'
                        }
                        onClick={() => navigate(`/detail-user/${item?.id}`)}
                        cursor="pointer"
                        _hover={{
                          transform: 'scale(1.1)',
                        }}
                      />
                      <Flex
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'flex-start'}
                        gap={'8px'}
                      >
                        <Flex alignItems={'center'} gap={'8px'}>
                          <Icon
                            as={FaStar}
                            color={'#F2C139'}
                            fontSize={'24px'}
                          />
                          <Text fontSize={'14px'} fontWeight={'400'}>
                            {item?.username}
                          </Text>
                        </Flex>
                        <Flex alignItems={'center'} gap={'2px'}>
                          <Text
                            fontSize={'14px'}
                            fontWeight={'400'}
                            color={'#949494'}
                          >
                            {item?.role_idrole == 1
                              ? 'Super Admin'
                              : item?.role_idrole == 2
                                ? 'Admin Store'
                                : 'User'}
                          </Text>
                          <Text
                            fontSize={'14px'}
                            fontWeight={'400'}
                            color={'#9ED6A3'}
                          >
                            | {item?.status}
                          </Text>
                        </Flex>
                        <Flex alignItems={'center'} gap={'8px'}>
                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/detail-user/${item?.id}`)} /> */}
                          <IconButton
                            icon={<IconEditCircle />}
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => navigate(`/edit-user/${item?.id}`)}
                          />
                          <IconButton
                            icon={<IconTrashX />}
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDeleteUser(item)}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>

            {deleteModalOpen && (
              <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete User</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>
                      Are you sure you want to delete the User "
                      {selectedUser?.username}"?
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
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            )}
            <Flex marginTop="10px" flexWrap="wrap">
              <Box mt="20px">
                <HStack>
                  <Text>Show per Page</Text>
                  <Select
                    border="solid 1px black"
                    width="fit-content"
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                  >
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
              <Box mt="20px">
                <Button
                  borderRadius="full"
                  backgroundColor="#286043"
                  textColor="white"
                  border="solid 1px #286043"
                  leftIcon={<IconChevronLeft />}
                  isDisabled={page == 1 ? true : false}
                  onClick={() => {
                    setPage(page - 1);
                    setSelectedPage(selectedPage - 1);
                  }}
                ></Button>
                {getPageNumbers().map((pageNumber, index) => (
                  <Button
                    key={index}
                    ml="2px"
                    mr="2px"
                    borderRadius="full"
                    backgroundColor={
                      selectedPage === pageNumber ? '#286043' : 'white'
                    }
                    textColor={
                      selectedPage === pageNumber ? 'white' : '#286043'
                    }
                    border={`solid 1px ${
                      selectedPage === pageNumber ? 'white' : '#286043'
                    }`}
                    onClick={() => {
                      // Handle the case where the button is "..." separately
                      if (pageNumber !== '...') {
                        setPage(pageNumber);
                        setSelectedPage(pageNumber);
                      }
                    }}
                  >
                    {pageNumber}
                  </Button>
                ))}
                <Button
                  borderRadius="full"
                  backgroundColor="#286043"
                  textColor="white"
                  border="solid 1px #286043"
                  rightIcon={<IconChevronRight />}
                  isDisabled={page == dataUser?.totalPages ? true : false}
                  onClick={() => {
                    setSelectedPage(selectedPage + 1);
                    setPage(page + 1);
                  }}
                ></Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserLists;
