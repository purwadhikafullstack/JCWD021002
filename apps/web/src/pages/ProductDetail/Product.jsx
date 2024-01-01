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
import { useParams } from 'react-router-dom';
// import ImageSliderWithThumbnails from './ImageSliderWithThumbnails';

function Product({size, handleWebSize}) {
    const {id} = useParams();
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
        <ResizeButton webSize={size} handleWebSize={handleWebSize} color={"black"}/>
      </Flex>
    <HStack mb='10px' p={4} position={size == '500px' ? 'relative' : 'sticky'} top={size == '500px' ? '0px' : '0px'}>
        {/* <IconChevronLeft />
        <Text textAlign='left' fontWeight='bold'>Product Name</Text> */}
        <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />}>Kembali</Button>
    </HStack>
    <Flex justifyContent='center' pl={size == '500px' ? '0px' : '20px'} pr={size == '500px' ? '0px' : '20px'}  flexDirection={size == '500px' ? 'column' : 'row'} h={"full"} alignItems={size == '500px' ? 'flex-start' : 'center'}>
      <VStack width={size == '500px' ? '100%' : '30vw'} position={size == '500px' ? 'relative' : 'sticky'} top={size == '500px' ? '0px' : '110px'} mt={size == '500px' ? '0px' : '-485px'} >
    <Box width={size == '500px' ? '80%' : '30vw'} justifyContent='center'>
          <Slider {...mainSliderSettings} asNavFor={thumbnailSlider} ref={(slider) => setMainSlider(slider)}>
            {data?.Product?.ProductImages?.map((image, index) => (
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
    {data?.Product?.ProductImages?.map((image, index) => (
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
            <Text fontSize='x-large' fontWeight='bold' color='tomato'>{formatPriceToIDR(data?.Product?.price)}</Text>
            <Text fontWeight='bold'>{data?.Product?.name}</Text>
            <Text >{data?.Product?.massProduct} {data?.Product?.Mass?.name} / {data?.Product?.Packaging?.name} </Text>
        </Box>
        <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='larger' fontWeight='bold'>Deskripsi</Text>
            <Text >{data?.Product?.description}</Text>
            <Text fontSize='larger' fontWeight='bold'>Category</Text>
            <Flex flexWrap="wrap" columnGap='5px'>
        {data?.Product?.ProductCategories?.map((item) => (
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
        <Box mt='20px' mb='20px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='x-large' fontWeight='bold' color='tomato'>{formatPriceToIDR(data?.Product?.price)}</Text>
            <Text fontWeight='bold'>{data?.Product?.name}</Text>
            <Text >{data?.Product?.massProduct} {data?.Product?.Mass?.name} / {data?.Product?.Packaging?.name} </Text>
        </Box>
        <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='larger' fontWeight='bold'>Deskripsi</Text>
            <Text >{data?.Product?.description}</Text>
            <Text fontSize='larger' fontWeight='bold'>Category</Text>
            <Flex flexWrap="wrap" columnGap='5px'>
        {data?.Product?.ProductCategories?.map((item) => (
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
        {size == '500px' ? (<></>) : (
      <Box top={size == '500px' ? '0px' : '110px'} mt={size == '500px' ? '0px' : '-900px'} position='sticky'  p='20px 20px 20px 20px' height='fit-content' p={2}>
        <Box mt='10px' width='20vw' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Flex flexWrap="wrap" gap='20px'>
            <HStack p='5px'>
              <Text fontSize='xs' textAlign='center'>Jumlah Pembelian</Text>
            <Button h='30px' onClick={handleDecrement} textColor='white' bgColor='#286043' >
          -
        </Button>
        <Text mx='10px' fontSize='lg'>
          {quantity}
        </Text>
        <Button h='30px' onClick={handleIncrement} textColor='white' bgColor='#286043'>
          +
        </Button>
            </HStack>
        <Text ml='40px' fontWeight='bold' >Total : {formatPriceToIDR(quantity * data?.Product?.price)}</Text>

        <Button width='100%' bgColor='#286043' textColor='white'>+ Keranjang</Button>
            
            </Flex>
        </Box>
      </Box>
    )}
    </Flex>
    {size == '500px' ? (<Flex dir='column' w={{ base: '100vw', md: size }}>
        <Box position='fixed' w={{ base: '100vw', md: size }}  p='20px 20px 20px 20px'  bottom={0} height='fit-content' backgroundColor='#286043'>
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
    </Flex>) : (<></>)}
     
    </Box>
  );
}

export default Product;
