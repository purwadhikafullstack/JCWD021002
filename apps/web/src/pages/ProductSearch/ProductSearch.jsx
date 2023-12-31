import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer } from '@chakra-ui/react';
import { IconChevronLeft } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconArrowRight, IconArrowLeft, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags} from '@tabler/icons-react'
import star from '../ProductDetail/star-svgrepo-com.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MAX_VISIBLE_PAGES = 3; 

function Product({size, handleWebSize}) {
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState()
  const [categoryId, setCategoryId] = useState();
  const [productName, setProductName] = useState()
  const [dataCategory, setDataCategory] = useState([])
  const [cityId, setCityId] = useState("");
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    // variableWidth: true,
  });
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(page);
  const [searchParams, setSearchParams] = useSearchParams({ page, pageSize });

  console.log('ini categoryId',categoryId);
  const fetchData = async () => {
    try {
      if ((productName.trim() !== '') || (categoryId !== undefined && String(categoryId).trim() !== '')) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/product-lists?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&categoryId=${categoryId}&productName=${productName}&cityId=${cityId}`
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
    fetchData();
  }, [page, pageSize, sortField, sortOrder, categoryId, productName]);

  console.log(data);

  const handleSortOrder = (order) => {
    setSortOrder(order);
    // onClose();
  };

  const handleSortField = (order) => {
    setSortField(order);
    // onClose();
  };

  const handleProductName = (value) => {
    setProductName(value);
    setPage(1);
  };

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

console.log('ini category',dataCategory);


useEffect(() => {
    fetchCategory();
}, []);

console.log(data);
// console.log(data?.products[1]?.ProductStocks[0]?.id);
// console.log(data?.products[0]?.ProductImages[0]?.imageUrl);
//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products/product-detail/3`,
//       );
//       setSampleData(data);
//     })();
//   }, []);

//   console.log(sampleData);
function formatPriceToIDR(price) {
    // Use Intl.NumberFormat to format the number as IDR currency
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  }

  const getPageNumbers = () => {
    const totalPages = data?.totalPages || 0;
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
    <Box backgroundColor='#f5f5f5' w={{ base: '100vw', md: size }} p='6' height='1000px'>
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
    <HStack mb='10px' p={0}>
    </HStack>
    <Box p={size == '500px' ? 0 : 5}>
    <Flex dir='row' gap='10px' mb='20px'>
    <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />}></Button>

                <Box w={size == '500px' ? '60%' : '100%'}>
                <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <IconSearch color='black' />
            </InputLeftElement>
            <Input type='text' backgroundColor='white' placeholder='Search in Groceria' width='50vw' value={productName} borderRadius='10px' borderColor='solid grey 1px' onChange={(e) => handleProductName(e.target.value)} />
          </InputGroup>
                </Box>
                <Box>
    <Button leftIcon={<IconAdjustmentsHorizontal />} borderRadius='full' border='solid 1px black' onClick={onOpen}>Filter</Button>

                </Box>
                </Flex>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Sort Order</Text>
            <HStack><Button leftIcon={<IconSortAscending2 />} border='solid black 1px' borderRadius='full' onClick={() => handleSortOrder("asc")} isDisabled={sortOrder == "asc" ? true : false}>Ascending</Button><Button leftIcon={<IconSortDescending2 />} border='solid black 1px' borderRadius='full' onClick={() => handleSortOrder("desc")} isDisabled={sortOrder == "desc" ? true : false}>Descending</Button></HStack>
            <Text>Sort Field</Text>
            <HStack><Button leftIcon={<IconAbc />} border='solid black 1px' borderRadius='full' onClick={() => handleSortField("name")} isDisabled={sortField == "name" ? true : false}>Name</Button><Button leftIcon={<IconTags />} border='solid black 1px' borderRadius='full' onClick={() => handleSortField("price")} isDisabled={sortField == "price" ? true : false}>Price</Button></HStack>
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

      <Stack spacing='4' direction='row' flexWrap='wrap' justifyContent={size == '500px' ? 'center' : 'flex-start'}>
      {categoryId > 0 ? null : (
  <Flex gap='2' flexWrap='wrap'>
    {dataCategory?.categories?.map((item, index) => (
      <Button backgroundColor='white' border='solid 1px black' key={index} onClick={() => item?.id && setCategoryId(item?.id)}>
        {item?.category}
      </Button>
    ))}
  </Flex>
)}
            {data?.products &&
              data?.products.map((item, index) => (
                <>
                
                <Card key={item.id} maxW={size == '500px' ? '180px' : '216px'} onClick={() => handleItemClick(item.id)} bg={useColorModeValue('white', 'gray.800')}
            boxShadow='0px 1px 5px gray'>
              <Image
                      key={item?.ProductImages[0]?.imageUrl}
                      src={`http://localhost:8000/uploads/products/${item?.ProductImages[0]?.imageUrl}`}
                      alt={item.name}
                      objectFit='cover'
                      width='100%'
                      height='200px'
                      borderRadius='6px'
                      justifySelf='center'
                    />
                  <CardBody>
                    <Stack mt='-3' spacing='0'>
                    <Heading size='sm' width='200px' isTruncated>{item.name}</Heading>
                      {/* <Text isTruncated maxW='200px'>
                        {item.description}
                      </Text> */}
                        <Flex dir='row' gap='1'>
                        <Text fontSize='xs' mt='5px'>{item?.massProduct} {item?.Mass?.name}/{item.Packaging?.name} </Text>
                        <Text>|</Text>
                        <Flex dir='row' mt='5px'>
                        <Image boxSize='17px' src={star} />
                        <Text fontSize='xs' fontWeight='bold'>5/5</Text>
                        </Flex>
                        </Flex>
                   
                        <Text fontWeight='bold' color='orangered' mb='10px'>
                        {formatPriceToIDR(item.price)}
                      </Text>
                      
                      <Button width='100%' variant='solid' borderRadius='10px' bgColor='#286043' color='white' onClick={() => navigate(`/product-detail/${item?.ProductStocks[0]?.id}` )}>
                        Beli
                      </Button>
                    </Stack>
                  </CardBody>
                  {/* <CardFooter>
                      
                  </CardFooter> */}
                </Card>
                </>
              ))}
          </Stack>
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
  <Button borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' rightIcon={<IconChevronRight />} isDisabled={page == data?.totalPages ? true : false} onClick={() => {setSelectedPage(selectedPage +1); setPage(page+1);}}></Button>
            </Box>
  </Flex>
    
    </Box>
    </Box>
  );
}

export default Product;

