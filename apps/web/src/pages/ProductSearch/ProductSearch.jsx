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

function ProductSearch() {
  const {size, handleWebSize } = useWebSize();
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState()
  const [categoryId, setCategoryId] = useState();
  const [productName, setProductName] = useState()
  const [selectedPage, setSelectedPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });
  const [storeId, setStoreId] = useState();
  const cityId = useSelector((state) => state.AuthReducer.location?.id);

  const getStoreList = async (cityId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/store-lists?cityId=${cityId}`,
      );
      setStoreId(res?.data[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      if ((productName.trim() !== '') || (categoryId !== undefined && String(categoryId).trim() !== '')) {
        const response = await axios.get(
      
      `${import.meta.env.VITE_API_URL}/products/product-lists?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&categoryId=${categoryId}&productName=${productName}&storeId=${storeId}&statusProduct=1&statusStock=1`
        );
        setData(response?.data);
      }
      
  } catch (err) {
      console.log(err);
  }
  }


  useEffect(() => {
    setSearchParams({ page, pageSize, productName, categoryId });
  }, [page, pageSize, productName, categoryId]);
  

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
    getStoreList(cityId);
    fetchData();
  }, [page, pageSize, sortField, sortOrder, categoryId, productName, storeId, cityId, ]);

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
    <Box overflowX='hidden' backgroundColor='#f5f5f5' w={{ base: '100vw', md: size }} height='fit-content'>
                <Flex
                    position={'relative'}
                    px={'20px'}
                    h={"10vh"}
                    justify={"space-between"}
                    align={"center"}
                    bgGradient='linear(to-r, #f2ffed, #fcfdde)'
                >
                    <Image src={LogoGroceria} h={'30px'} />
                    <ResizeButton webSize={size} handleWebSize={handleWebSize} color={"black"}/>
                </Flex>
                    <Box>
                <Flex bgGradient='linear(to-r, #f2ffed, #fcfdde)' dir='row' gap='10px' pb='10px'>
                <Button height='30px' bgGradient='linear(to-r, #f2ffed, #fcfdde)' leftIcon={<IconChevronLeft />}></Button>
                            <Box w='fit-content'>
                            <InputGroup >
                        <InputLeftElement height='30px' pointerEvents='none'>
                        <IconSearch width='30px' color='black' />
                        </InputLeftElement>
                        <Input size='sm' type='text' backgroundColor='white' placeholder='Cari beragam kebutuhan harian' width={size == '500px' ? '290px' : '70vw'} value={productName} borderRadius='full' onChange={(e) => {setProductName(e.target.value); setPage(1);}} />
                    </InputGroup>
                            </Box>
                            <Box>
                                <IconButton height='30px' icon={<IconShoppingCartFilled />} backgroundColor='#fcfdde' />
                            </Box>
                            <Box>
    <Button leftIcon={<IconAdjustmentsHorizontal size='20px' />} fontSize='sm' borderRadius='full' border='solid 1px black' onClick={onOpen}>Filter</Button>

                </Box>
                            </Flex>
                
            </Box>
            <Box  p={size == '500px' ? 0 : 5} pt='5'>
            {categoryId > 0  ? null : (
  <Flex gap='2' flexWrap='wrap' pl={10} pr={10}>
    {dataCategory?.categories?.slice(0, 5)?.map((item, index) => (
      <Button backgroundColor='white' border='solid 1px black' key={index} onClick={() => item?.id && setCategoryId(item?.id)}>
        {item?.category}
      </Button>
    ))}
  </Flex>
)}
              <CardProductStock data={data} />
          <Box m='5'><PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data}
            /></Box>
  <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Sort Order</Text>
            <HStack><Button leftIcon={<IconSortAscending2 />} border='solid black 1px' borderRadius='full' onClick={() => setSortOrder("asc")} isDisabled={sortOrder == "asc" ? true : false}>Ascending</Button><Button leftIcon={<IconSortDescending2 />} border='solid black 1px' borderRadius='full' onClick={() => setSortOrder("desc")} isDisabled={sortOrder == "desc" ? true : false}>Descending</Button></HStack>
            <Text>Sort Field</Text>
            <HStack><Button leftIcon={<IconAbc />} border='solid black 1px' borderRadius='full' onClick={() => setSortField("name")} isDisabled={sortField == "name" ? true : false}>Name</Button><Button leftIcon={<IconTags />} border='solid black 1px' borderRadius='full' onClick={() => setSortField("price")} isDisabled={sortField == "price" ? true : false}>Price</Button></HStack>
            <Text>Category</Text>
            <Select placeholder="Select option" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {dataCategory?.categories?.map((category) => ( 
              <option key={category.id} value={category.id}>{category.category}</option>
            ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </Box>
    </Box>
  );
}

export default ProductSearch;

