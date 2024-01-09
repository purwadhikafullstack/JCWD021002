import { Flex, Text, Image, Grid, Card } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toRupiah from '@develoka/angka-rupiah-js';
import { useSelector } from 'react-redux';

export const ProductList = () => {
  const [product, setProduct] = useState();

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const cityId = useSelector((state) => state.AuthReducer.location?.id);

  console.log(cityId)
  
  const getproductList = async (cityId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/product-lists?page=1&pageSize=8&cityId=${cityId}`,
      );
      setProduct(res?.data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getproductList(cityId);
  }, [cityId]);

  return (
    <Flex direction={'column'}>
      <Grid templateColumns={'repeat(2, 1fr)'} w={'fit-content'} gap={5}>
        {product?.map((item, index) => {
          return (
            <Card
              display={'flex'}
              key={index}
              direction={'column'}
              bgColor={'white'}
              overflow={'hidden'}
              cursor={'pointer'}
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
