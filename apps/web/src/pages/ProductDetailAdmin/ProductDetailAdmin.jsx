/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Spacer, VStack, Stack } from '@chakra-ui/react';
import { IconChevronLeft } from '@tabler/icons-react';
import star from './star-svgrepo-com.svg';
// import './Home.css';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useWebSize } from '../../provider.websize';

function ProductDetailAdmin() {
  const {size, handleWebSize } = useWebSize();
  const {id} = useParams();
    const navigate = useNavigate();
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [mainSlider, setMainSlider] = useState(null);
  const [thumbnailSlider, setThumbnailSlider] = useState(null);

  const mainSliderSettings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const thumbnailSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Adjust the number of slides for smaller screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Adjust the number of slides for even smaller screens
        },
      },
    ],
    centerPadding: '50px'
  };

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
            `${import.meta.env.VITE_API_URL}/products/product-detail-v2/${id}`
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

  console.log(size);
  return (
    <Box backgroundColor='#f5f5f5' p='0'
    pb='110px'
    w={{ base: '100vw', md: size }}
    h={'fit-content'}
    transition="width 0.3s ease">
      <Flex

        position={'sticky'}
        top={0}
        bgColor='white'
        zIndex={99}
        // top={{ base: '20px', lg: '-30px' }}
        px={'20px'}
        h={"10vh"}
        justify={"space-between"}
        align={"center"}
      >
        <Image src={LogoGroceria} h={'30px'} />
        <ResizeButton color={"black"}/>
      </Flex>
    <HStack mb='10px' p={4} pl={size == '500px' ? '0px' : '150px' }>
        {/* <IconChevronLeft />
        <Text textAlign='left' fontWeight='bold'>Product Name</Text> */}
        <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />} onClick={() => navigate('/product-lists')}>Kembali</Button>
    </HStack>
    <Flex alignItems="flex-start" pl={size == '500px' ? '0px' : '150px'} pr={size == '500px' ? '0px' : '20px'}  flexDirection={size == '500px' ? 'column' : 'row'} h={"full"}>
      <VStack mt='20px' width={size == '500px' ? '100%' : '30vw'} position={size == '500px' ? 'relative' : 'sticky'} top={size == '500px' ? '0px' : '110px'} >
    <Box width={size == '500px' ? '80%' : '30vw'} justifyContent='center'>
          <Slider {...mainSliderSettings} asNavFor={thumbnailSlider} ref={(slider) => setMainSlider(slider)}>
            {data?.ProductImages?.map((image, index) => (
              <Image
                key={index.toString()}
                backgroundColor='white'
                src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${image.imageUrl}`}
                objectFit='contain'
                height='35vh'
                borderRadius='10px'
              />
            ))}
          </Slider>
        </Box>
          <Box width={size == '500px' ? '80%' : '30vw'}>
  <Slider
    {...thumbnailSliderSettings}
    asNavFor={mainSlider}
    ref={(slider) => setThumbnailSlider(slider)}
  >
    {data?.ProductImages?.map((image, index) => (
      // <Box key={index} p='1px'> {/* Add margin to create gap between thumbnails */}
        <Box >
          <Image
          backgroundColor='white'
          boxSize='50px'
          objectFit='cover'
          borderRadius='10px'
          mr='2px'
          src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${image?.imageUrl}`}
          alt={`Thumbnail ${index + 1}`}
        />
        </Box>
    ))}
  </Slider>
  </Box>
  </VStack>
        <VStack width={size == '500px' ? '100%' : '50vw'}>
        <Box mt='20px' mb='20px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='x-large' fontWeight='bold' color='tomato'>{formatPriceToIDR(data?.price)}</Text>
            <Text fontWeight='bold'>{data?.name}</Text>
            <Text >{data?.massProduct} {data?.Mass?.name} / {data?.Packaging?.name} </Text>
        </Box>
        <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='larger' fontWeight='bold'>Deskripsi Produk</Text>
            <Text >{data?.description}</Text>
            <Text fontSize='larger' fontWeight='bold'>Kategori Produk</Text>
            <Flex flexWrap="wrap" columnGap='5px'>
        {data?.ProductCategories?.map((item) => (
          <Box key={item?.category?.id} borderRadius="full" mb='5px' pl="10px" pr='10px' pt='5px' pb='5px' border="solid #1B4332FF 1px" bgColor='#F3FBF8FF'>
              <Text color='green'>{item?.category}</Text>
          </Box>
        ))}
        </Flex>
        </Box>
        <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Flex flexWrap="wrap" columnGap='5px'>
            <Image width='30px' src={star} />
            <Text fontWeight='bold'>5/5</Text>
            <Text>1000 Ulasan</Text>
            </Flex>
        </Box>
        </VStack>
    </Flex>
    
     
    </Box>
  );
}

export default ProductDetailAdmin;

