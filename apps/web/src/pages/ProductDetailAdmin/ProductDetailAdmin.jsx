/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Spacer, VStack, Stack, Textarea, IconButton } from '@chakra-ui/react';
import { IconChevronLeft, IconLink, IconStarFilled } from '@tabler/icons-react';
import star from './star-svgrepo-com.svg';
// import './Home.css';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import { ProductRating } from './ProductRating';
// import ImageSliderWithThumbnails from './ImageSliderWithThumbnails';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { useSelector } from 'react-redux';
import { calculateDiscountPrice } from '../../utils/calculateDiscountPrice';
import { useWebSize } from '../../provider.websize';
import toRupiah from '@develoka/angka-rupiah-js'


function truncateDescription(description, maxLength) {
  if (description?.length <= maxLength) {
    return description;
  }
  return `${description?.slice(0, maxLength)}...`;
}

const Product = () => {
  const {size, handleWebSize } = useWebSize();

    const {id} = useParams();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mainSlider, setMainSlider] = useState(null);
  const [thumbnailSlider, setThumbnailSlider] = useState(null);
  const [mainSliderIndex, setMainSliderIndex] = useState();

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


  

  console.log(size);
  console.log("ini data now", data);
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
    <HStack mb='10px' p={4} >
        {/* <IconChevronLeft />
        <Text textAlign='left' fontWeight='bold'>Product Name</Text> */}
        <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />}>Kembali</Button>
    </HStack>
    <Flex alignItems="flex-start" pl={size == '500px' ? '0px' : '20px'} pr={size == '500px' ? '0px' : '20px'}  flexDirection={size == '500px' ? 'column' : 'row'} h={"full"}>
      <VStack mt='20px' width={size == '500px' ? '100%' : '30vw'} position={size == '500px' ? 'relative' : 'sticky'} top={size == '500px' ? '0px' : '110px'} >
    <Box width={size == '500px' ? '80%' : '30vw'} justifyContent='center'>
    {data?.result?.ProductImages && (
  <>
    <link rel="preload" as="image" href={`${import.meta.env.VITE_API_IMAGE_URL}/products/${data?.result?.ProductImages[0]?.imageUrl}`} />
    <Slider {...mainSliderSettings} asNavFor={thumbnailSlider} ref={(slider) => setMainSlider(slider)}>
      {data?.result?.ProductImages?.map((image, index) => (
        <Image
          key={index?.toString()}
          backgroundColor='white'
          src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${image?.imageUrl}`}
          objectFit='contain'
          height='35vh'
          borderRadius='10px'
        />
      ))}
    </Slider>
  </>
)}
        </Box>
          <Box width={size == '500px' ? '80%' : '30vw'}>
  <Slider
    {...thumbnailSliderSettings}
    asNavFor={mainSlider}
    ref={(slider) => setThumbnailSlider(slider)}
  >
    {data?.result?.ProductImages?.map((image, index) => {
      return (
        <Box key={index} p='1px' borderRadius='10px'> {/* Add margin to create gap between thumbnails */}
          <Image
          border={`solid 3px ${index === mainSliderIndex ? 'blue' : 'transparent'}`}
          backgroundColor='white'
          boxSize='50px'
          objectFit='cover'
          borderRadius='10px'
          mr='2px'
          onClick={() => setMainSliderIndex(index)}
          src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${image?.imageUrl}`}
          alt={`Thumbnail ${index + 1}`}
          />
        </Box>
    );
    })}
  </Slider>
  </Box>
  </VStack>
        <VStack width={size == '500px' ? '100%' : '50vw'}>
        <Box mt='20px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='x-large' fontWeight='bold' color='tomato'>{data?.result?.price ? toRupiah(data?.result?.price) : null}</Text>
      <Text color='grey' fontSize='xs' fontWeight='bold'>
</Text>

            <Text fontWeight='bold'>{data?.result?.name}</Text>
            <Text >{data?.result?.massProduct} {data?.result?.Mass?.name} / {data?.result?.Packaging?.name} </Text>
        </Box>
        <Box justifyContent='center' mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='larger' fontWeight='bold'>Deskripsi</Text>
            <Box w='100%' pl='20px' pr='20px'>
            {showFullDescription ? (
    <div dangerouslySetInnerHTML={{ __html: data?.result?.description }} style={{ wordWrap: 'break-word' }} />
  ) : (
    <>
      <div dangerouslySetInnerHTML={{ __html: truncateDescription(data?.result?.description, 200) }} style={{ wordWrap: 'break-word' }} />
      {truncateDescription(data?.result?.description, 200) !== data?.result?.description &&
        <Text textColor="teal" cursor='pointer' onClick={() => setShowFullDescription(true)}>
          Baca Selengkapnya
        </Text>}
    </>
  )}
            </Box>
            <Text fontSize='larger' fontWeight='bold'>Kategori</Text>
            <Flex flexWrap="wrap" columnGap='5px'>
        {data?.result?.ProductCategories?.map((item) => (
          <Box key={item?.category?.id} borderRadius="full" mb='5px' pl="10px" pr='10px' pt='5px' pb='5px' border="solid #1B4332FF 1px" bgColor='#F3FBF8FF'>
              <Text color='green'>{item?.category}</Text>
          </Box>
        ))}
        </Flex>
        </Box>
        
        
    
    
    
    <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='larger' fontWeight='bold'>Penilaian & Ulasan</Text>
            <Flex mb='10px' flexDirection='row' gap='5px'>
            <Image boxSize='25px' src={star} />
            <Text fontWeight='bold'>{data?.subquery?.averageRating ? data?.subquery?.averageRating?.toFixed(1) : 0}/5.0</Text>
            <Text >({data?.subquery?.totalReviews})</Text>
            </Flex>
            {data?.subquery?.totalReviews > 1 ? 
            <Flex flexWrap="wrap" columnGap='5px'>
            <Image width='30px' src={star} />
            <Text fontWeight='bold'>{data?.subquery?.averageRating?.toFixed(1)}/5.0</Text>
            <Text>{data?.subquery?.totalReviews} Ulasan</Text>
            </Flex> : null}
            <ProductRating productId={data?.result?.id} />
        </Box>
        <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
          <Text>Bagikan</Text>
            <Flex  flexWrap='wrap' flexDirection='row' columnGap='5px'>
            <EmailShareButton url={window.location.href}>
        <EmailIcon size={32} round />
      </EmailShareButton>

      <FacebookShareButton url={window.location.href}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={window.location.href}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton url={window.location.href}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      {/* Add your custom copy link button */}
      <IconButton borderRadius='full' boxSize='32px' icon={<IconLink />} onClick={() => navigator.clipboard.writeText(window.location.href)} />
            </Flex>
        </Box>
        
        </VStack>
        
    </Flex>
    
    </Box>
    
  );
}

export default Product;