import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, Avatar, VStack, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, } from '@chakra-ui/react';
import { IconChevronLeft, IconShoppingCartFilled } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconArrowRight, IconArrowLeft, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags} from '@tabler/icons-react'
import star from '../ProductDetail/star-svgrepo-com.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import Logo from '../../assets/Logo-Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiWindows } from 'react-icons/bi';

const MAX_VISIBLE_PAGES = 3; 

export const ProductRelated = ({category}) => {
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState()
  const [categoryId, setCategoryId] = useState();
  const [productName, setProductName] = useState()
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
  const fetchData = async (category) => {
    try {
        const response = await axios.get(
      
      `${import.meta.env.VITE_API_URL}/products/product-lists?page=1&pageSize=10&categoryId=2&storeId=1&statusProduct=1&statusStock=1`
        );
        setData(response?.data);
      
  } catch (err) {
      console.log(err);
  }
  }

  console.log("ini di product related", data);




  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortField, sortOrder, categoryId, category, productName]);

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

function formatPriceToIDR(price) {
    // Use Intl.NumberFormat to format the number as IDR currency
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  }

  return (
               

            
            <Flex pl='5px' pr='5px' gap='2' w='fit-content' flexDir='row' justifyContent='flex-start'>
            {data?.products &&
              data?.products.map((item, index) => (
                <>
                
                <Card key={item.id} w='160px'  onClick={() => handleItemClick(item.id)} bg={useColorModeValue('white', 'gray.800')}
            boxShadow='0px 1px 5px gray'>
              <Image
                      key={item?.ProductImages[0]?.imageUrl}
                      src={`http://localhost:8000/uploads/products/${item?.ProductImages[0]?.imageUrl}`}
                      alt={item.name}
                      objectFit='cover'
                      width='100%'
                      height='200px'
                      borderRadius='3px 3px 10px 10px'
                      justifySelf='center'
                    />
                  <CardBody>
                    <Stack mt='-3' spacing='0'>
                    <Heading size='sm' width='160px' flexWrap='wrap' >{item.name}</Heading>
                        <Flex dir='row' gap='1'>
                        <Text fontSize='xs' mt='5px'>{item?.massProduct} {item?.Mass?.name}/{item.Packaging?.name} </Text>
                        </Flex>
                        <Flex dir='row' mt='5px'>
                        <Image boxSize='17px' src={star} />
                        <Text fontSize='xs' fontWeight='bold'>{item?.averageRating?.toFixed(1) || 0.0}/5.0 ({item?.totalReviews})</Text>
                        </Flex>
                   
                        <Text fontWeight='bold' color='#df6207' mb='10px'>
                        {formatPriceToIDR(item.price)}
                      </Text>
                      
                      <Button width='100%' variant='solid' borderRadius='10px' bgColor='#286043' color='white' onClick={() => {navigate(`/product-detail/${item?.ProductStocks[0]?.id}` ); window.location.reload() }}>
                        Beli
                      </Button>
                    </Stack>
                  </CardBody>
                </Card>
                </>
              ))}
              </Flex>
          
  
    
  );
}


