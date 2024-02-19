/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Text, Box, HStack, Image, Flex, Button, Spacer, VStack, Stack, Textarea, IconButton,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { IconChevronRight, IconLink, IconSearch, IconShoppingCartFilled, IconStarFilled } from '@tabler/icons-react';
import { CiShoppingCart } from 'react-icons/ci';
import { BsCartPlus } from 'react-icons/bs';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { HiMinusSmall } from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
import star from './star-svgrepo-com.svg';
// import './Home.css';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductRelated } from './ProductRelated';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import { ProductRating } from './ProductRating';
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
import { SubmitReview } from './SubmitReview';
import { useSelector } from 'react-redux';
import { calculateDiscountPrice } from '../../utils/calculateDiscountPrice';
import { useWebSize } from '../../provider.websize';
import { BottomBar } from '../../components/BottomBar';
import { Footer } from '../home/home.footer';
import { CartIcon } from '../../components/Cart/Cart.CartIcon';


function truncateDescription(description, maxLength) {
  if (description?.length <= maxLength) {
    return description;
  }
  return `${description?.slice(0, maxLength)}...`;
}

const Product = () => {
  const {size, handleWebSize } = useWebSize();
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const {id} = useParams();
  const location = useSelector((state) => state?.addressReducer?.address);
  const userCityId =  location?.City?.id;
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [mainSlider, setMainSlider] = useState(null);
  const [thumbnailSlider, setThumbnailSlider] = useState(null);
  const [mainSliderIndex, setMainSliderIndex] = useState();
  const pageLocation = useLocation().pathname

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
    centerPadding: '50px',
  };

  const handleIncrement = () => {
    if (quantity < data?.result?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/product-detail/${id}`,
      );
      setData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [carts, setCarts] = useState([]);

  const fetchCarts = async (token) => {
    try {
      console.log('cekk', userCityId);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/${userCityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCarts(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  function formatPriceToIDR(price) {return new Intl.NumberFormat('id-ID', {style: 'currency',currency: 'IDR',}).format(price);}

  const toast = useToast();

  const handleAddToCart = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          // userId: user?.id,
          cartDetails: [{ productStockId: id, quantity }],
        },
        {headers: {
          Authorization: `Bearer ${token}`,
        }},
      );

        showToast('success', 'Item added to cart successfully!');

        await fetchCarts(token)
    } catch (err) {
      console.error('Insufficient product stock. Please choose another product available in stock', err);
      showToast('error', 'Insufficient product stock. Please choose another product available in stock');
    }
  };

  const handleBeliSekarang = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, {
          userId: user.id,
          selectedItems: id,
        });

        navigate('/beli-sekarang');
      } catch (error) {
        console.error('Checkout failed:', error);
        toast({
          title: 'Checkout failed',
          description: 'An error occurred during the checkout process.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
  };

  const showToast = (status, description) => {
    toast({
      title: status === 'success' ? 'Success' : 'Error',
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log('ceek', carts);

  useEffect(() => {
    if (isLogin) {
      onClose;
    }
    fetchCarts(token);
    fetchData(id);
  }, [isLogin, onClose, user, id, cartTotalQuantity]);

  return (
    <Box backgroundColor='#f5f5f5' p='0'
    pb={size == '500px' ? '70px' : '0px'}
    w={{ base: '100vw', md: size }}
    h={'fit-content'}
    transition="width 0.3s ease">
      <Flex
        position={'sticky'}
        top={0}
        bgGradient='linear(to-r, #f2ffed, #fcfdde)'
        zIndex={99}
        px={'20px'}
        h={"10vh"}
        justify={"space-between"}
        align={"center"}
      >
        <Image src={LogoGroceria} h={'30px'} />
        <Flex bgGradient='linear(to-r, #f2ffed, #fcfdde)' dir='row' gap='10px'>
                {/* <Button height='30px' bgGradient='linear(to-r, #f2ffed, #fcfdde)' leftIcon={<IconChevronLeft />}></Button> */}
                            <Box w='fit-content'>
                            <InputGroup >
                        <InputLeftElement height='30px' pointerEvents='none'>
                        <IconSearch width='30px' color='black' />
                        </InputLeftElement>
                        <Input onClick={() => window.open("/product-search", "_blank")} size='sm' type='text' backgroundColor='white' placeholder='Cari beragam kebutuhan harian' width={size == '500px' ? '170px' : '70vw'} borderRadius='full' />
                    </InputGroup>
                            </Box>
                            <Box>
                                {/* <IconButton height='30px' icon={<IconShoppingCartFilled />} backgroundColor='#fcfdde' onClick={() => {isLogin ? navigate('/cart') : navigate('/login')}} /> */}
                                <Box mt='3px' cursor='pointer' onClick={() => {isLogin ? navigate('/cart') : navigate('/login')}}><CartIcon /></Box>

                            </Box>

                            </Flex>
        <ResizeButton color={"black"}/>
      </Flex>
    <Flex flexDirection='row' overflowX='auto' ml='20px' mr='20px' mt='20px' mb='10px' p={4} borderRadius='full' fontSize='small' boxShadow="0px 0px 2px gray" bgColor='white' >
        {/* <Button backgroundColor='#f5f5f5' leftIcon={<IconChevronLeft />}>Kembali</Button> */}
        <Link to="/">
    <Text color='#00c689' fontWeight='bold' >Home</Text>
  </Link>
  {size == '500px' ? null : (
  <>
    <IconChevronRight />
    {data?.result?.Product?.ProductCategories?.map((item, index) => (
      <React.Fragment key={index}>
        <Link to={`/product-catalogue?categoryId=${item?.id}`}><Text color='#00c689' fontWeight='bold'>{item?.category}</Text></Link>
        {index < data.result.Product.ProductCategories.length - 1 && ','}
      </React.Fragment>
    ))}
  </>
)}
  <IconChevronRight />
  <Text color='#00c689' fontWeight='bold' >{data?.result?.Product?.name}</Text>
    </Flex>
    <Flex alignItems="flex-start" pl={size == '500px' ? '0px' : '20px'} pr={size == '500px' ? '0px' : '20px'}  flexDirection={size == '500px' ? 'column' : 'row'} h={"full"}>
      <VStack mt='20px' width={size == '500px' ? '100%' : '30vw'} position={size == '500px' ? 'relative' : 'sticky'} top={size == '500px' ? '0px' : '110px'} >
    <Box width={size == '500px' ? '80%' : '30vw'} justifyContent='center'>
    {data?.result?.Product?.ProductImages && (
  <>
    <link rel="preload" as="image" href={`${import.meta.env.VITE_API_IMAGE_URL}/products/${data?.result.Product?.ProductImages[0]?.imageUrl}`} />
    <Slider {...mainSliderSettings} asNavFor={thumbnailSlider} ref={(slider) => setMainSlider(slider)}>
      {data?.result.Product.ProductImages.map((image, index) => (
        <Image
          key={index.toString()}
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
    {data?.result?.Product?.ProductImages?.map((image, index) => {
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
        <VStack width={size == '500px' ? '100%' : '50vw'} pl={size == '500px' ? '0px' : '20px'}>
        <Box mt='20px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='x-large' fontWeight='bold' color='tomato'>{formatPriceToIDR(calculateDiscountPrice(data?.result?.Product?.price, data?.result?.Discounts))}</Text>
            {data?.result?.Discounts && data?.result?.Discounts.length > 0 && (
    <>
      <Text color='grey' fontSize='xs' fontWeight='bold'>
  <s>{ calculateDiscountPrice(data?.result?.Product?.price, data?.result?.Discounts) == data?.result?.Product?.price ? null : formatPriceToIDR(data?.result?.Product?.price)}</s>
  {data?.result?.Discounts.map((discount, index) => (
    <React.Fragment key={index}>
      {discount.distributionId === 1 && (
      <>
        {discount.DiscountType?.id === 4 && discount.discountValue && ` (${discount.discountValue}% Off)`}
        {discount.DiscountType?.id === 4 && discount.discountNom && ` (${formatPriceToIDR(discount.discountNom)} Off)`}
        {discount.DiscountType?.id === 5 && ` (Minimum Purchase) - ${discount.discountValue}% Off`}
        {discount.DiscountType?.id === 6 && ` (Beli ${discount.buy_quantity} Gratis ${discount.get_quantity})`}
        {index < data.result.Discounts.length - 1 && ', '}
      </>
    )}
    </React.Fragment>
  ))}
</Text>

    </>
  )}
            <Text fontWeight='bold'>{data?.result?.Product?.name}</Text>
            <Text >{data?.result?.Product?.massProduct} {data?.result?.Product?.Mass?.name} / {data?.result?.Product?.Packaging?.name} </Text>
        </Box>
        <Box justifyContent='center' mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='larger' fontWeight='bold'>Deskripsi</Text>
            <Box w='100%' pl='20px' pr='20px'>
            {showFullDescription ? (
    <div dangerouslySetInnerHTML={{ __html: data?.result?.Product?.description }} style={{ wordWrap: 'break-word' }} />
  ) : (
    <>
      <div dangerouslySetInnerHTML={{ __html: truncateDescription(data?.result?.Product?.description, 200) }} style={{ wordWrap: 'break-word' }} />
      {truncateDescription(data?.result?.Product?.description, 200) !== data?.result?.Product?.description &&
        <Text textColor="teal" cursor='pointer' onClick={() => setShowFullDescription(true)}>
          Baca Selengkapnya
        </Text>}
    </>
  )}
            </Box>
            <Text fontSize='larger' fontWeight='bold'>Kategori</Text>
            <Flex flexWrap="wrap" columnGap='5px'>
        {data?.result?.Product?.ProductCategories?.map((item) => (
          <Box key={item?.category?.id} borderRadius="full" mb='5px' pl="10px" pr='10px' pt='5px' pb='5px' border="solid #1B4332FF 1px" bgColor='#F3FBF8FF'>
              <Text color='green'>{item?.category}</Text>
          </Box>
        ))}
        </Flex>
        </Box>
    <SubmitReview userId={user?.id} productId={data?.result?.Product?.id} />
    <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
            <Text fontSize='larger' fontWeight='bold'>Penilaian & Ulasan</Text>
            <Flex mb='10px' flexDirection='row' gap='5px'>
            <Image boxSize='25px' src={star} />
            <Text fontWeight='bold'>{data?.subquery?.averageRating?.toFixed(1)}/5.0</Text>
            <Text >({data?.subquery?.totalReviews})</Text>
            </Flex>
            <ProductRating productId={data?.result?.Product?.id} />
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
      <IconButton borderRadius='full' boxSize='32px' icon={<IconLink />} onClick={() => {navigator.clipboard.writeText(window.location.href); toast({ title: 'Link Copied', status: 'success', duration: 3000, isClosable: true, });}} />
            </Flex>
        </Box>
        
        </VStack>
        {size == '500px' ? (
          <></>
        ) : (
          <Box
          top={size == '500px' ? '0px' : '110px'} mt='20px' position='sticky'  p='0px 20px 0px 20px' height='fit-content'
          >
            <Box
              width="20vw"
              bg="#FFFEF7"
              textAlign="left"
              p={4}
              rounded="lg"
              boxShadow="0px 1px 5px gray"
            >
              <Flex flexWrap="wrap" gap="20px">
                <HStack p="5px">
                  <Text fontSize="xs" textAlign="center">
                    Jumlah Pembelian
                  </Text>
                  <IconButton
                    isDisabled={quantity === 1}
                    onClick={handleDecrement}
                    h="30px"
                    background="green.700"
                    color="white"
                    icon={<HiMinusSmall />}
                  />
                  <Text mx="10px" fontSize="lg">
                    {quantity}
                  </Text>
                  <IconButton
                    onClick={handleIncrement}
                    h="30px"
                    background="green.700"
                    color="white"
                    icon={<FiPlus />}
                    isDisabled={quantity > data?.result?.stock}
                  />
                </HStack>
                <Text ml="40px" fontWeight="bold">
                  Total : {formatPriceToIDR(quantity * calculateDiscountPrice(data?.result?.Product?.price, data?.result?.Discounts))}
                </Text>
                <Button
                  onClick={isLogin ? handleAddToCart : onOpen}
                  leftIcon={<BsCartPlus />}
                  w="full"
                  background="green.700"
                  color="white"
                >
                  Keranjang
                </Button>
              </Flex>
            </Box>
          </Box>
        )}
    </Flex>
    {size == '500px' ? (
        <Flex dir="column" w={{ base: '100vw', md: size }}>
          <Flex
          zIndex={99}
            position="fixed"
            justifyContent="space-between"
            boxShadow={'0px -8px 8px -14px rgba(0,0,0,1)'}
            w={{ base: '100vw', md: size }}
            h="5em"
            p={5}
            gap={5}
            bottom={0}
            backgroundColor="#FFFFFF"
          >
            <Button
              onClick={isLogin ? handleAddToCart : onOpen}
              leftIcon={<BsCartPlus />}
              w="full"
              h="full"
              backgroundColor="blackAlpha.300"
            >
              Keranjang
            </Button>
            <Button
              onClick={onOpen}
              w="full"
              h="full"
              background="green.700"
              color="white"
              _hover={{ background: 'green.900', opacity: 0.9 }}
              transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
            >
              Beli Sekarang
            </Button>
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
      {isLogin ? (
        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="md">
          <DrawerOverlay />
          <DrawerContent width="500px" mx="auto">
            <DrawerHeader>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap={2}
            >
              <Flex alignItems="center" gap={2}>
                {data?.Product?.ProductImages?.[0] && (
                  <Image
                    backgroundColor="white"
                    src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${
                      data.Product.ProductImages[0].imageUrl
                    }`}
                    objectFit="contain"
                    height="20vh"
                    borderRadius="10px"
                  />
                )}
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="tomato">
                  {formatPriceToIDR(quantity * calculateDiscountPrice(data?.result?.Product?.price, data?.result?.Discounts))}
                  </Text>
                  <Text fontSize="sm">Stock: {data?.result?.stock}</Text>
                </Box>
              </Flex>
              <Divider />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                w="full"
                gap="20px"
              >
                <Text>Jumlah</Text>
                <Flex gap={1} border="1px" borderColor="gray.200">
                  <IconButton
                    isDisabled={quantity === 1}
                    onClick={handleDecrement}
                    h="30px"
                    borderRadius={0}
                    variant="outline"
                    color="black"
                    icon={<HiMinusSmall />}
                  />
                  <Text mx="10px" fontSize="lg">
                    {quantity}
                  </Text>
                  <IconButton
                    onClick={handleIncrement}
                    h="30px"
                    borderRadius={0}
                    variant="outline"
                    color="black"
                    fontSize="18px"
                    icon={<FiPlus />}
                  />
                </Flex>
              </Flex>
            </DrawerBody>
            <DrawerFooter>
              <Button
                onClick={handleBeliSekarang}
                variant="ghost"
                bgColor="colors.primary"
                color={'white'}
                w="full"
                px={'30px'}
                borderRadius={'10px'}
                _hover={{ background: 'green.900', opacity: 0.9 }}
                transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
              >
                Beli Sekarang
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent alignItems={'center'} w={'80%'}>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={5}
            >
              <Text textAlign={'center'}>
                Hanya satu langkah lagi! Silakan login untuk melanjutkan.
              </Text>
              <Link to={`/login?fromPage=${pageLocation}`}>
                <Button
                  variant="ghost"
                  bgColor="colors.primary"
                  color={'white'}
                  _hover={{
                    transform: 'scale(1.1)',
                  }}
                  _active={{
                    transform: 'scale(1)',
                  }}
                  borderRadius={'10px'}
                  px={'30px'}
                >
                  Login
                </Button>
              </Link>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    <Box mt='10px'>
    <Text pl='20px' pb='10px' fontWeight='bold' >Produk kategori serupa</Text>
    <Box w='100%' pt='5px' pb='5px' mb='20px' style={{ msOverflowStyle: 'none' }} css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none', }, }} overflowX='auto'>
     <ProductRelated productId={Number(id)} category={data?.result?.Product?.ProductCategories[0]?.id} />
        </Box>
        </Box>
        <Flex w={{base: '100vw', md: size}}
      p={'20px'}
      direction={'column'}
      bgColor={'#F2F5E4FF'}
      gap={5}
      justify={'center'}
      align={'center'} >
        <Text fontSize="12px">© 2024 Groceria. All rights reserved.</Text>
        </Flex>
    </Box>
  );
}

export default Product;
