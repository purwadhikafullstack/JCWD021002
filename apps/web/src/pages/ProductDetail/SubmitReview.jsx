import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, Avatar, VStack, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, } from '@chakra-ui/react';
import { IconChevronLeft, IconList, IconShoppingCartFilled, IconListTree } from '@tabler/icons-react';
import { IconStarFilled } from '@tabler/icons-react'
import star from '../ProductDetail/star-svgrepo-com.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import Logo from '../../assets/Logo-Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiWindows } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const MAX_VISIBLE_PAGES = 3; 

export const SubmitReview = ({userId, productId}) => {
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [orderId, setOrderId] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedRating, setEditedRating] = useState();
  const [editedReviewText, setEditedReviewText] = useState();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
        const response = await axios.get(
      
      `${import.meta.env.VITE_API_URL}rating/rating-detail/?userId=${userId}&productId=${productId}`
        );
        setData(response?.data?.result);
      
  } catch (err) {
      console.log(err);
  }
  }

  useEffect(() => {
    fetchData();
  }, [ productId, userId]);

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
  const handleSubmitReview = async () => {
    try {
      // Send a request to your server to save the review
      await axios.post(`${import.meta.env.VITE_API_URL}/rating/add-rating`, {
        productId,
        rating,
        reviewText,
      },
      {headers: {
        Authorization: `Bearer ${token}`,
      }}
      );

      // Reset the form after successful submission
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  console.log("ini data di submit review", data);

  function formatWIBDate(utcTimestamp) {
    const orderDate = new Date(utcTimestamp);
  
    // Convert numeric month to word
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthWord = monthNames[orderDate.getMonth()];
  
    // Convert to Jakarta time (WIB)
    orderDate.setHours(orderDate.getHours() + 7);
  
    // Format the date
    const formattedDate = `${orderDate.getDate()} ${monthWord} ${orderDate.getFullYear()} ${orderDate.getHours()}:${(orderDate.getMinutes() < 10 ? '0' : '') + orderDate.getMinutes()}`;

    return formattedDate;
  }

  return (
            <>
                        {
                          isLogin ? (
                            data?.result?.id ? (
                              <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left' p={4} rounded='lg' boxShadow="0px 1px 5px gray">
                                <Text fontSize="lg" mb="2" fontWeight='bold'>Ulasan Anda</Text>
                                <Flex flexDirection='row'>
                                  {[1, 2, 3, 4, 5].map((value) => (
                                    value <= data?.result?.rating ? (
                                      <Image cursor='pointer' src={star} width='30px' key={value} onClick={() => setRating(value)} color='yellow' />
                                    ) : (
                                      <Text color='grey'><IconStarFilled cursor='pointer' size='30px' key={value} onClick={() => setRating(value)} /></Text>
                                    )
                                  ))}
                                </Flex>
                                <Text fontSize='xs'>Tanggal ulasan {formatWIBDate(data?.result?.reviewDate)} WIB</Text>
                                <Text fontSize='xs'>Tanggal order {formatWIBDate(data?.result?.Order?.orderDate)} WIB</Text>
                                <Text fontSize='xs' fontWeight='bold'>Kode Transaksi {data?.result?.Order?.codeTransaction}</Text>
                                <Text>{data?.result?.reviewText}</Text>
                                <Button mt="2" colorScheme="teal" onClick={() => setIsEditModalOpen(true)}>
                                    Ganti Ulasan
                                </Button>
                                </Box>
                            ) : data?.orderResults?.length > 0 ? (
                              <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left' p={4} rounded='lg' boxShadow="0px 1px 5px gray">
                                <Text fontSize="lg" mb="2"></Text>
                                <Flex flexDirection='row'>
                                  {[1, 2, 3, 4, 5].map((value) => (
                                    value <= rating ? (
                                      <Image cursor='pointer' src={star} width='30px' key={value} onClick={() => setRating(value)} color='yellow' />
                                    ) : (
                                      <Text color='grey'><IconStarFilled cursor='pointer' size='30px' key={value} onClick={() => setRating(value)} /></Text>
                                    )
                                  ))}
                                </Flex>
                                <Select border='solid gray 1px' borderRadius='full' placeholder="Select option" value={orderId} onChange={(e) => setOrderId(e.target.value)}>
                                  {data?.orderResults?.map((item) => (
                                    <option key={item?.Order?.id} value={item?.Order?.id}>{item?.Order?.codeTransaction} - {formatWIBDate(item?.Order?.orderDate)}</option>
                                  ))}
                                </Select>
                                <Textarea
                                  mt="2"
                                  value={reviewText}
                                  onChange={(e) => setReviewText(e.target.value)}
                                  placeholder="Tulis ulasan kamu..."
                                  resize='none'
                                />
                                <Button mt="2" colorScheme="teal" onClick={handleSubmitReview}>
                                  Submit Review
                                </Button>
                              </Box>
                            ) : null
                          ) : null
                        }

                 <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Edit review form */}
            <Flex flexDirection="row">
              {[1, 2, 3, 4, 5].map((value) => (
                value <= rating ? (
                  <Image cursor="pointer" src={star} width="30px" key={value} onClick={() => setRating(value)} color="yellow" />
                ) : (
                  <Text color="grey">
                    <IconStarFilled cursor="pointer" size="30px" key={value} onClick={() => setRating(value)} />
                  </Text>
                )
              ))}
            </Flex>
            <Text mt='10px'>Select your transaction :</Text>
            <Select border='solid gray 1px' borderRadius='full' placeholder="Select option" value={orderId} onChange={(e) => setOrderId(e.target.value)}>
                            {data?.orderResults?.map((item) => ( 
                            <option key={item?.Order?.id} value={item?.Order?.id}>{item?.Order?.codeTransaction} - {formatWIBDate(item?.Order?.orderDate)}</option>
                            ))}
                        </Select>
            <Textarea mt="10px" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Edit your review..." resize="none" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmitReview}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            </>
  
    
  );
}


