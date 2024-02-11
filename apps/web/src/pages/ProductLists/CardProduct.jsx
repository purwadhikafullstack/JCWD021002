import { Text, VStack, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, Grid, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, IconButton, } from '@chakra-ui/react';
import { IconChevronLeft, IconCircleXFilled, IconCirclePlus, IconTrashXFilled, IconSquareRoundedPlusFilled, IconPlus, IconProgressCheck } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconEditCircle, IconTrashX, IconInfoCircle, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags, IconCircleCheckFilled} from '@tabler/icons-react';
import { useWebSize } from '../../provider.websize';
import toRupiah from '@develoka/angka-rupiah-js';
import star from '../ProductDetail/star-svgrepo-com.svg';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export const CardProduct = ({ data, setSelectedProduct, setAddToStockModalIsOpen, setDeleteModalOpen, setActivateModalOpen}) => {
  const navigate = useNavigate();
    const { size, handleWebSize } = useWebSize();
    const { user, isLogin } = useSelector((state) => state.AuthReducer);
    function formatPriceToIDR(price) {
        // Use Intl.NumberFormat to format the number as IDR currency
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(price);
      }

    return (
        <>
        {data?.products && data?.products.length > 0 ? (
        <Stack direction='row' flexWrap='wrap' p='10px' justifyContent={size == '500px' ? 'center' : 'flex-start'}>
        <Grid
        templateColumns={size == '500px' ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)'}
        w={'fit-content'}
        gap={5}
      >
        {data?.products &&
          data?.products?.map((item, index) => (
            <Card key={item.id} bg={useColorModeValue('white', 'gray.800')}
              boxShadow='0px 1px 5px gray' border={item?.status == 1 ? 'solid 2px green' : 'solid 2px red'} onClick={() => navigate(`/product-detail-admin/${item?.id}`)} _hover={{ cursor: 'pointer' }}>
          <Image
            key={item?.ProductImages[0]?.imageUrl}
            src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${item?.ProductImages[0]?.imageUrl}`}
            alt={item.name}
            objectFit='cover'
            width='100%'
            height='200px'
            borderRadius='3px 3px 10px 10px'
            justifySelf='center'
          />
          <CardBody>
            <Stack mt='-3' spacing='0'>
              <Heading size='sm' width='180px' flexWrap='wrap' >{item.name}</Heading>
              <Flex dir='row' gap='1' flexWrap='wrap'>
                <Text fontSize='xs' mt='5px'>{item?.massProduct} {item?.Mass?.name}/{item.Packaging?.name} </Text>
              </Flex>
              <Flex dir='row' mt='5px'>
                <Image boxSize='17px' src={star} />
                <Text fontSize='xs' fontWeight='bold'>{item?.averageRating?.toFixed(1) || 0.0}/5.0 ({item?.totalReviews})</Text>
              </Flex>
              <Text fontWeight='bold' color='orangered' mb='10px'>
                {formatPriceToIDR(item.price)}
              </Text>
              <Flex flexWrap='wrap' column='row' justifyContent='center'>
                <IconButton icon={<IconSquareRoundedPlusFilled />} isDisabled={item?.status == 0 ? true : false} variant='ghost' colorScheme='green' onClick={(event) => { setSelectedProduct(item); setAddToStockModalIsOpen(true); event.stopPropagation(); }} />
                {user?.role_idrole == 1 ? <IconButton icon={<IconEditCircle />} variant='ghost' colorScheme='blue' onClick={(event) => { navigate(`/edit-product/${item?.id}`); event.stopPropagation(); }} /> : (null)}
                {user?.role_idrole == 1 ? (item?.status == 1 ?
                  <IconButton icon={<IconTrashXFilled />} variant='ghost' colorScheme='red' onClick={(event) => { setSelectedProduct(item); setDeleteModalOpen(true); event.stopPropagation(); }} /> :
                  <IconButton
                    icon={<IconProgressCheck />}
                    variant="ghost"
                    colorScheme="blue"
                    onClick={(event) => {
                      setSelectedProduct(item);
                      setActivateModalOpen(true);
                      event.stopPropagation();
                    }} />) : (null)}
              </Flex>
              <Flex justifyContent='center' flexDirection='row' flexWrap='wrap'>
                <Text color={item?.status == 1 ? "green" : "red"}>{item?.status == 1 ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
                <Text color={item?.status == 1 ? 'green' : 'red'} fontWeight='bold'>
                  {item?.status == 1 ? 'Active' : 'Deactive'}
                </Text>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
          ))}
          </Grid>
      </Stack>
      ) : (
      <VStack>
        <Text fontSize='6xl'>404</Text>
        <Text>Product Not Found</Text>
      </VStack>
    )}
    
        </>
    )
}
