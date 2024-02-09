import { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, Avatar, VStack, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, } from '@chakra-ui/react';
import { IconChevronLeft, IconShoppingCartFilled } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconArrowRight, IconArrowLeft, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags} from '@tabler/icons-react'
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import Logo from '../../assets/Logo-Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWebSize } from '../../provider.websize';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { CardProductStock } from './CardProductStock';
import { useSelector } from 'react-redux';
import CartLoading from '../../components/Loaders/CartLoading';
import { AiFillHome } from "react-icons/ai";

function ProductCatalogue() {
  const {size, handleWebSize } = useWebSize();
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState()
  const [categoryId, setCategoryId] = useState(dataCategory?.categories?.id);
  const [productName, setProductName] = useState()
  const [selectedPage, setSelectedPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const coordinat = useSelector((state) => state.addressReducer?.address);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try { setLoading(true);
      if ((productName.trim() !== '') || (categoryId !== undefined && String(categoryId).trim() !== '')) {
        const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/store?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&categoryId=${categoryId}&productName=${productName}&statusProduct=1&statusStock=1&latitude=${coordinat?.latitude}&longitude=${coordinat?.longitude}`
        );
        setData(response?.data?.data);
      }
  } catch (err) {
      console.log(err);
  } finally { setLoading(false); }
  }


  useEffect(() => {
    setSearchParams({ page, pageSize, productName, categoryId });
  }, [page, pageSize, productName, categoryId,]);
  

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize')) || 10;
    const productNameFromUrl = searchParams.get('productName') || '';
    const categoryIdFromUrl = searchParams.get('categoryId') || '';
    setPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
    setProductName(productNameFromUrl);
    setCategoryId(categoryIdFromUrl);
    setSelectedPage(pageFromUrl);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortField, sortOrder, categoryId, productName, coordinat]);

  const fetchCategory = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/category/category-lists`
        );
        console.log(response?.data);
        setDataCategory(response?.data);
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
    fetchCategory();
}, []);
  
  return (
    <Box overflowX='hidden' backgroundColor='#f5f5f5' w={{ base: '100vw', md: size }} height='100vh' maxHeight='fit-content'>
                <Flex
                    position={'relative'}
                    px={'20px'}
                    h={"10vh"}
                    justify={"space-between"}
                    align={"center"}
                    bgGradient='linear(to-r, #f2ffed, #fcfdde)'
                >
                    <Image src={LogoGroceria} h={'30px'} />
                    <ResizeButton color={"black"}/>
                </Flex>
                    <Box>
                <Flex bgGradient='linear(to-r, #f2ffed, #fcfdde)' dir='row' gap='10px' pb='10px'>
                <IconButton height='30px' bgGradient='linear(to-r, #f2ffed, #fcfdde)' icon={<AiFillHome />} />
                            <Box w='fit-content'>
                            <InputGroup >
                        <InputLeftElement height='30px' pointerEvents='none'>
                        <IconSearch width='30px' color='black' />
                        </InputLeftElement>
                        <Input size='sm' type='text' backgroundColor='white' placeholder='Cari beragam kebutuhan harian' width={size == '500px' ? '290px' : '90vw'} value={productName} borderRadius='full' onChange={(e) => {setProductName(e.target.value); setPage(1);}} />
                    </InputGroup>
                            </Box>
                            <Box>
                                <IconButton height='30px' icon={<IconShoppingCartFilled />} backgroundColor='#fcfdde' onClick={() => navigate('/cart')} />
                            </Box>
                            </Flex>
                <Flex width='100%' bgGradient='linear(to-r, #f2ffed, #fcfdde)'>
                <Flex style={{ msOverflowStyle: 'none' }} css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }} bgGradient='linear(to-r, #f2ffed, #fcfdde)' gap='2' pl='6' pr='6' mb='2' flexDirection='row' width='80%' overflowX='scroll' >
                {dataCategory?.categories?.map((item, index) => (
                <VStack cursor="pointer" onClick={() => item?.id && setCategoryId(item?.id)} width='60px'>
                    <Avatar border={categoryId == item?.id ? 'solid 3px green' : null} src={item?.imageUrl ? `${import.meta.env.VITE_API_IMAGE_URL}/categories/${item?.imageUrl}` : Logo} />
                    <Text backgroundColor={categoryId == item?.id ? 'green' : null} pl='3px' pr='3px' borderRadius='10px' textColor={categoryId == item?.id ? 'white' : 'black'} textAlign='center' flexWrap='wrap' fontSize='xs'>{item?.category}</Text>
                </VStack>
                ))}
            </Flex>
                <Button
                leftIcon={<IconLayoutGrid />}
                borderRadius="full"
                width='20%'
                onClick={() => setIsDrawerOpen(true)}
                flexWrap='wrap'
                bgColor='#fcfdde'
                whiteSpace='normal'
                >
                Lihat semua
                </Button>
            </Flex>
            </Box>
            <Box  p={size == '500px' ? 0 : 5} pt='5'>
            {loading == true ? <VStack><CartLoading /></VStack> : <CardProductStock data={data} />}
          <Box m='5'><PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data}
            /></Box>
  <Drawer size='xs' placement='top' width='50vw' onClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent margin='auto' width={size == "500px" ? "500px" : "100vw"}>
          <DrawerCloseButton />
          <DrawerHeader>All Categories</DrawerHeader>
          <DrawerBody>
            <Flex flexWrap='wrap' flexDirection='row' spacing={2}>
              {dataCategory?.categories?.map((item, index) => (
                <VStack cursor="pointer" onClick={() => item?.id && setCategoryId(item?.id)} width="60px" key={index}>
                  <Avatar border={categoryId == item?.id ? 'solid 3px green' : null} src={item?.imageUrl ? `${import.meta.env.VITE_API_IMAGE_URL}/categories/${item?.imageUrl}` : Logo} />
                  <Text
                    backgroundColor={categoryId == item?.id ? 'green' : null}
                    pl="3px"
                    pr="3px"
                    borderRadius="10px"
                    textColor={categoryId == item?.id ? 'white' : 'black'}
                    textAlign="center"
                    flexWrap="wrap"
                    fontSize="xs"
                  >
                    {item?.category}
                  </Text>
                </VStack>
              ))}
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue" onClick={() => setIsDrawerOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    
    </Box>
    </Box>
  );
}

export default ProductCatalogue;