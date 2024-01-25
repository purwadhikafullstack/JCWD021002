import { Stack,Flex, Card, CardBody, Button, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react"
import { useWebSize } from '../../provider.websize';
import toRupiah from '@develoka/angka-rupiah-js';
import star from '../ProductDetail/star-svgrepo-com.svg';
import { useNavigate } from "react-router-dom";

export const CardProductStock = ({data}) => {
  const navigate = useNavigate();
    const { size, handleWebSize } = useWebSize
    console.log("ini di card", data);

    return (
        <>
        
        <Stack direction='row' flexWrap='wrap' justifyContent={size == '500px' ? 'center' : 'flex-start'}>
        <Flex flexWrap='wrap' pl='5px' pr='5px' gap='2' justifyContent='center'>
        {data?.products &&
          data?.products?.map((item, index) => (
            <>
            <Card key={item.id} w='160px' maxW={'216px'}  onClick={() => handleItemClick(item.id)} bg={useColorModeValue('white', 'gray.800')}
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
          </Flex>
      </Stack>
    
        </>
    )
}