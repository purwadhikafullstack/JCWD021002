import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Spacer } from '@chakra-ui/react';
import { IconChevronLeft } from '@tabler/icons-react';
import star from './star-svgrepo-com.svg';
// import './Home.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';

function Product(webSize) {
    const {id} = useParams();
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
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

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  console.log("ini id", id);
  const fetchData = async (id) => {
    try {
        console.log("ini id the fetchdata", id);
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/products/product-detail/${id}`
        );
        setData(response?.data);
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
    fetchData(id);
}, []);

console.log(data);
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

  console.log(webSize.webSize);
  return (
    <Box backgroundColor='#f5f5f5' p='0'
    w={{ base: '100vw', md: webSize.webSize }}
    h={{ base: '120vh', lg: '120vh' }}
    transition="width 0.3s ease">
    <HStack mb='10px' p={4}>
        {/* <IconChevronLeft />
        <Text textAlign='left' fontWeight='bold'>Product Name</Text> */}
        <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />}>Kembali</Button>
    </HStack>
    <Flex  flexDirection={webSize.webSize == '500px' ? 'column' : 'row'} h={"full"} alignItems='center'>
        <Box w={{ base: '80vw', md: webSize.webSize }} alignSelf='center' >
            <Slider {...sliderSettings} >
                {data?.Product?.ProductImages?.map((data, idx) => (
                  <Image
                    key={idx.toString()}
                    backgroundColor='white'
                    src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${data.imageUrl}`} // Assuming there's an imageUrl property in your data
                    objectFit='contain'
                    // width='100vw'
                    height='30vh'
                    borderRadius='10px'
                  />
                ))}
          </Slider>
        </Box>
        <Box mt='20px' mb='20px' width='97%' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='x-large' fontWeight='bold' color='tomato'>{formatPriceToIDR(data?.Product?.price)}</Text>
            <Text fontWeight='bold'>{data?.Product?.name}</Text>
            <Text>127 g</Text>
        </Box>
        <Box mt='10px' width='97%' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='larger' fontWeight='bold'>Deskripsi</Text>
            <Text >{data?.Product?.description}</Text>
            <Text fontSize='larger' fontWeight='bold'>Category</Text>
            <Flex flexWrap="wrap" columnGap='5px'>
        {data?.Product?.ProductCategories?.map((item) => (
          <Box key={item?.category?.id} borderRadius="full" mb='5px' pl="10px" pr='10px' pt='5px' pb='5px' border="solid blue 1px" bgColor='blue.100'>
            <HStack>
              <Text color='blue'>{item?.category}</Text>
            </HStack>
          </Box>
        ))}
        </Flex>
        </Box>
        <Box mt='10px' width='97%' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Flex flexWrap="wrap" columnGap='5px'>
            <Image width='30px' src={star} />
            <Text fontWeight='bold'>5/5</Text>
            <Text>1000 Ulasan</Text>
            </Flex>
        </Box>
    </Flex>
    <Flex dir='column' w={{ base: '100vw', md: webSize.webSize }}>
        <Box position='fixed' w={{ base: '100vw', md: webSize.webSize }}  p='20px 20px 20px 20px'  bottom={0} height='fit-content' p={2} backgroundColor='red'>
        <Flex dir='row' h='40px' ml='50px'>
        <Button h='30px' onClick={handleDecrement} variant='outline' color='white'>
          -
        </Button>
        <Text color='white' mx='10px' fontSize='lg'>
          {quantity}
        </Text>
        <Button h='30px' onClick={handleIncrement} variant='outline' color='white'>
          +
        </Button>
        <Spacer />
        <Button mr='50px'>+ Keranjang</Button>

        </Flex>
        <Text ml='40px' color='white'>Total: {formatPriceToIDR(quantity * data?.Product?.price)}</Text>

        </Box>
    </Flex>
     
    </Box>
  );
}

export default Product;

