import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading } from '@chakra-ui/react';
import { IconChevronLeft } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconPlus, IconArrowRight, IconArrowLeft, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags} from '@tabler/icons-react'
import star from '../ProductDetail/star-svgrepo-com.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

function Product() {
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10)
  const [categoryId, setCategoryId] = useState([]);
  const [productName, setProductName] = useState("")
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

  
  const fetchData = async () => {
    try {
      const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/product-lists?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&categoryId=${categoryId}&productName=${productName}&cityId=${cityId}`
      );
      setData(response?.data);
      
      
  } catch (err) {
      console.log(err);
  }
  }

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

//   const fetchData = async () => {
//     try {
//         const response = await axios.get(
//             `${import.meta.env.VITE_API_URL}/products/product-detail/3`
//         );
//         setData(response?.data);
//     } catch (err) {
//         console.log(err);
//     }
// };

// useEffect(() => {
//     fetchData();
// }, []);

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
  return (
    <Box backgroundColor='#f5f5f5' p='6' height='1000px'>
    <HStack mb='10px' p={0}>
        {/* <IconChevronLeft />
        <Text textAlign='left' fontWeight='bold'>Product Name</Text> */}
        <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />}>Product Search</Button>
    </HStack>
    <Input border='solid 1px black' backgroundColor='white' onChange={(e) => handleProductName(e.target.value)} placeholder='Search'></Input>
    <Button mt='10px' mb='10px' leftIcon={<IconAdjustmentsHorizontal />} borderRadius='full' border='solid 1px black' onClick={onOpen}>Filter</Button>
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
            {dataCategory?.map((category) => ( 
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

      <Stack spacing='4' direction='row' flexWrap='wrap'>
            {data?.products &&
              data?.products.map((item, index) => (
                <>
                
                <Card key={item.id} maxW='180px' onClick={() => handleItemClick(item.id)} bg={useColorModeValue('white', 'gray.800')}
            boxShadow='0px 1px 5px gray'>
              <Image
                      src={`http://localhost:8000/uploads/products/${item?.ProductImages[0]?.imageUrl}`}
                      alt={item.name}
                      objectFit='cover'
                      width='100%'
                      height='150px'
                      borderRadius='6px'
                      justifySelf='center'
                    />
                  <CardBody>
                    
                      
                    <Stack mt='-3' spacing='0'>
                    <Heading size='md' width='200px' isTruncated>{item.name}</Heading>
                      {/* <Text isTruncated maxW='200px'>
                        {item.description}
                      </Text> */}
                    <HStack>
                    <Image width='20px' src={star} />
                    <Text fontWeight='bold'>5/5</Text>
                    </HStack>
                    <Text color='blue.600'>
                        {item?.ProductStocks[0]?.stock == 0 ? (
                          <Box backgroundColor='#fce8ed' fontSize='small' textColor='#dd1c49' p='2px' borderRadius='5px' border='solid 1px #dd1c49'>Out of Stock</Box>
                        ) : (<Text>Stock : {item?.ProductStocks[0]?.stock}</Text>)}
                      </Text>
                      <Text color='blue.600' mb='10px'>
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
    
    </Box>
  );
}

export default Product;

