import { Flex, Text, Image, Grid, Card } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toRupiah from '@develoka/angka-rupiah-js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ProductList = () => {
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const coordinat = useSelector((state) => state.AuthReducer.location);

  const getProductList = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
<<<<<<< Updated upstream:apps/web/src/pages/home/productList.jsx
        }/store?&page=1&pageSize=&latitude=${latitude}&longitude=${longitude}&statusStock=1`,
=======
        }/store?&page=1&pageSize=&latitude=${latitude}&longitude=${longitude}&statusStock=1&statusProduct=1`,
>>>>>>> Stashed changes:apps/web/src/pages/home/home.productList.jsx
      );
      setProduct(res?.data?.data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
<<<<<<< Updated upstream:apps/web/src/pages/home/productList.jsx
    getProductList(coordinat.latitude, coordinat.longitude);
=======
    getProductList(coordinat?.latitude, coordinat?.longitude);
    console.log(coordinat)
>>>>>>> Stashed changes:apps/web/src/pages/home/home.productList.jsx
  }, [coordinat]);

  return (
    <Flex direction={'column'} mt={'10px'}>
      <Flex w={'full'} bgColor={'white'} p={'10px 20px'}>
        <Text fontSize={'18px'} fontWeight={600} textAlign={'center'}>
          REKOMENDASI
        </Text>
      </Flex>
      <Grid
        templateColumns={'repeat(2, 1fr)'}
        w={'fit-content'}
        gap={5}
        m={'5px 20px 20px 20px'}
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
              onClick={() => navigate(`/product-detail/${item?.ProductStocks[0]?.id}`)}
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
