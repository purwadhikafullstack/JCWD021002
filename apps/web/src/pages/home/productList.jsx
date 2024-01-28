import { Flex, Text, Image, Grid, Card } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toRupiah from '@develoka/angka-rupiah-js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWebSize } from '../../provider.websize';

export const ProductList = () => {
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const {size} = useWebSize()

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const coordinat = useSelector((state) => state.AuthReducer.location);

  const getProductList = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/store?&page=1&pageSize=&latitude=${latitude}&longitude=${longitude}&statusStock=1`,
      );
      setProduct(res?.data?.data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductList(coordinat.latitude, coordinat.longitude);
  }, [coordinat]);

  return (
    <Flex direction={'column'} mt={'10px'} p={size == '500px' ? '0 20px' : '30px 200px'}>
      <Flex w={'full'} bgColor={'white'} py={'10px'}>
        <Text fontSize={'18px'} fontWeight={600} textAlign={'center'}>
          REKOMENDASI
        </Text>
      </Flex>
      <Grid
        templateColumns={size == '500px' ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'}
        w={'fit-content'}
        gap={5}
      >
        {product?.map((item, index) => {
          return (
            <Card
              display={'flex'}
              key={index}
              direction={'column'}
              bgColor={'white'}
              overflow={'hidden'}
              cursor={'pointer'}
              onClick={() => navigate(`/product-detail/${item.id}`)}
            >
              <Flex w={'full'} h={'full'}>
                <Image
                  h={'full'}
                  aspectRatio={1 / 1}
                  objectFit={'cover'}
                  src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${
                    item?.ProductImages[0]?.imageUrl ||
                    'Logo-Groceria-no-Bg.png'
                  }`}
                />
              </Flex>
              <Flex p={'10px 20px'} direction={'column'} fontWeight={600}>
                <Text fontSize={'14px'}>
                  {capitalizeFirstLetter(item.name)}
                </Text>
                <Text fontSize={'12px'} color={'gray'}>
                  {item.massProduct} gram / pack
                </Text>
                <Text color={'colors.quaternary'}>{toRupiah(item.price)}</Text>
              </Flex>
            </Card>
          );
        })}
      </Grid>
    </Flex>
  );
};
