import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, Avatar, VStack, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton, } from '@chakra-ui/react';
import { IconChevronLeft, IconList, IconShoppingCartFilled, IconListTree } from '@tabler/icons-react';
import { IconStarFilled } from '@tabler/icons-react'
import star from '../ProductDetail/star-svgrepo-com.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import Logo from '../../assets/Logo-Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { useWebSize } from '../../provider.websize';


const MAX_VISIBLE_PAGES = 3; 

export const ProductRating = ({productId}) => {
  const {size, handleWebSize } = useWebSize();

  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState('');
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1)
  const [selectedPage, setSelectedPage] = useState(page);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  console.log('ini productId', productId);
  const fetchData = async (productId) => {
    try {
        const response = await axios.get(
      
      `${import.meta.env.VITE_API_URL}/rating/rating-lists?page=${page}&pageSize=${pageSize}&rating=${rating}&sortOrder=${sortOrder}&productId=${productId}`
        );
        setData(response?.data);
      
  } catch (err) {
      console.log(err);
  }
  }

  console.log("ini rating", data);
  console.log("ini rating", data?.totalPages);





  useEffect(() => {
    fetchData(productId);
  }, [page, pageSize, rating, sortOrder, productId]);


  return (
               

            <>
            <Flex pl='5px' pr='5px' gap='2' w='100%' flexDir='column' justifyContent='flex-start'>
            { data?.ratings?.length != 0 ? 
            (
                data?.ratings &&
              data?.ratings.map((item, index) => (
                <>
                    <Flex flexDirection='column'>
                    <Flex flexDirection='row' key={item?.rating}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            value <= item?.rating ? (
                                <Image src={star} width='20px' key={value}  color='yellow' />
                            ) : (
                                <Text color='grey'><IconStarFilled size='20px' key={value} /></Text>
                            )
                            ))}
                        </Flex>
                        <Flex flexDirection='row' gap='10px'>
                        <Avatar boxSize='30px' />
                        <Text>{item?.User?.username}</Text>
                        </Flex>
                        <Text>{item?.reviewText}</Text>
                    </Flex>
                
                </>
            ))) : <Text alignSelf='center'>Belum ada ulasan</Text> }
              </Flex>
              <VStack width='100%' justifyItems='center'>
              <Button hidden={data?.ratings?.length != 0 ? false : true} onClick={() => {setIsDrawerOpen(true)}}>Lihat Selengkapnya </Button>
              </VStack>
              <Drawer  placement="bottom" onClose={() => {setPageSize(1); setIsDrawerOpen(false);}} size='xs' isOpen={isDrawerOpen}>
    <DrawerOverlay />
    <DrawerContent justifySelf='center' alignSelf='center' margin='auto' w='500px' sx={size == '500px' ? {w : size} : {maxW : '35vw'}} maxH={size == '500px' ? '90vh' : 'full'}>
      <DrawerCloseButton />
      <DrawerHeader>Ulasan</DrawerHeader>
      <DrawerBody width='500px' alignSelf='center'>
        {/* Add your detailed content here */}
        {/* For example, you can render additional information or controls */}
        <Flex flexDir='row' gap='2px' width='fit-content' flexWrap='wrap'>
        <Button width='fit-content' onClick={() => setSortOrder('desc')} leftIcon={<IconListTree />}>Terbaru</Button>
        <Button width='fit-content' onClick={() => setSortOrder('asc')} leftIcon={<IconListTree />}>Terlama</Button>
        <Button leftIcon={<IconStarFilled style={{ color: rating == '' ? '#fdd835' : 'black' }} />} onClick={() => setRating('') } >All</Button>
        <Button leftIcon={<IconStarFilled style={{ color: rating == 5 ? '#fdd835' : 'black' }} />} onClick={() => setRating(5) } >5</Button>
        <Button leftIcon={<IconStarFilled style={{ color: rating == 4 ? '#fdd835' : 'black' }} />} onClick={() => setRating(4) } >4</Button>
        <Button leftIcon={<IconStarFilled style={{ color: rating == 3 ? '#fdd835' : 'black' }} />} onClick={() => setRating(3) } >3</Button>
        <Button leftIcon={<IconStarFilled style={{ color: rating == 2 ? '#fdd835' : 'black' }} />} onClick={() => setRating(2) } >2</Button>
        <Button leftIcon={<IconStarFilled style={{ color: rating == 1 ? '#fdd835' : 'black' }} />} onClick={() => setRating(1) } >1</Button>
        
        </Flex>
        <Box mt='10px' width='97%' bg='#FFFEF7' textAlign='left'p={4} rounded='lg' boxShadow="0px 1px 5px gray">
        <Flex pl='5px' pr='5px' gap='2' w='fit-content' width='100%' flexDir='column' justifyContent='flex-start'>
            {data?.ratings &&
              data?.ratings.map((item, index) => (
                <>
                    <Flex width='100%' flexDirection='column'>
                    <Flex flexDirection='row' key={item?.rating}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            value <= item?.rating ? (
                                <Image src={star} width='20px' key={value}  color='yellow' />
                            ) : (
                                <Text color='grey'><IconStarFilled size='20px' key={value} /></Text>
                            )
                            ))}
                        </Flex>
                        <Flex flexDirection='row' gap='10px'>
                        <Avatar boxSize='30px' />
                        <Text>{item?.User?.username}</Text>
                        </Flex>
                        <Text>{item?.reviewText}</Text>
                    </Flex>
                    <Box width='100%' borderTop='solid 1px gray'></Box>
                </>
              ))}
              <PaginationControls 
              page= {page}
              pageSize={pageSize}
              selectedPage={selectedPage}
              setPage={setPage}
              setPageSize={setPageSize}
              setSelectedPage={setSelectedPage}
              data={data}
            />
              </Flex>
              </Box>
      </DrawerBody>
      <DrawerFooter>
        {/* You can add buttons or controls in the footer if needed */}
        <Button colorScheme="blue" onClick={() => {setPageSize(1); setIsDrawerOpen(false);}}>
          Tutup
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
              </>
  
    
  );
}


