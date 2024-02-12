import { Stack,Flex, Card, CardBody, Button, Heading, Image, Text, useColorModeValue, Grid, FormLabel, Box, VStack } from "@chakra-ui/react"
import { useWebSize } from '../../provider.websize';
import toRupiah from '@develoka/angka-rupiah-js';
import star from '../ProductDetail/star-svgrepo-com.svg';
import { useNavigate } from "react-router-dom";
import Flashlight from '../../components/Flashlight404NotFound/Flashlight';

export const CardProductStock = ({data}) => {
  const navigate = useNavigate();
    const { size, handleWebSize } = useWebSize();

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
            <>
            <Card key={item.id} onClick={() => handleItemClick(item.id)} bg={useColorModeValue('white', 'gray.800')}
        boxShadow='0px 1px 5px gray'>
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
                <Heading size="sm" width="180px" flexWrap='wrap'>
                      {item.name}
                    </Heading>
                    <Flex dir="row" gap="1" flexWrap="wrap">
                      <Text fontSize="xs" mt="5px">
                        {item?.massProduct} {item?.Mass?.name}/
                        {item.Packaging?.name}{' '}
                      </Text>
                    </Flex>
                    <Flex dir='row' mt='5px'>
                    <Image boxSize='17px' src={star} />
                    <Text fontSize='xs' fontWeight='bold'>{item?.averageRating?.toFixed(1) || 0.0}/5.0 ({item?.totalReviews})</Text>
                    </Flex>

                    <Text fontWeight="bold" color="orangered" mb="10px">
                      {toRupiah(item.price)}
                    </Text>
                  
                  <Button width='100%' variant='solid' borderRadius='10px' bgColor='#286043' color='white' onClick={() => navigate(`/product-detail/${item?.ProductStocks[0]?.id}` )}>
                    Beli
                  </Button>
                </Stack>
              </CardBody>
            </Card>
            </>
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
