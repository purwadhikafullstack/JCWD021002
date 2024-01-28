/* eslint-disable react/prop-types */
import { Flex, Text, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import axios from 'axios';
import 'swiper/css';
import { useEffect, useState } from 'react';
import drinkImg from '../../assets/drink.png';
import bahanPokokImg from '../../assets/bahanPokok.png';
import healthyImg from '../../assets/healthy.png';
import snackImg from '../../assets/snack.png';
import foodImg from '../../assets/food.png';
import { Link } from 'react-router-dom';
import drinkImg from '../../assets/drink.png';
import bahanPokokImg from '../../assets/bahanPokok.png';
import healthyImg from '../../assets/healthy.png';
import snackImg from '../../assets/snack.png';
import foodImg from '../../assets/food.png';
import { Link } from 'react-router-dom';

export const SwiperCategory = ({ size }) => {
  const [categories, setCategories] = useState();
  const [categories, setCategories] = useState();

  const colors = [
    '#ACDEC9FF',
    '#DAF1E8FF',
    '#FFEFCBFF',
    '#F2F5E4FF',
    '#F5C4C6FF',
  ];
  const image = [healthyImg, bahanPokokImg, foodImg, snackImg, drinkImg];
  const colors = [
    '#ACDEC9FF',
    '#DAF1E8FF',
    '#FFEFCBFF',
    '#F2F5E4FF',
    '#F5C4C6FF',
  ];
  const image = [healthyImg, bahanPokokImg, foodImg, snackImg, drinkImg];

  const category = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/category/category-lists',
      );
      setCategories(res.data.categories);
      const res = await axios.get(
        'http://localhost:8000/api/category/category-lists',
      );
      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
      console.log(err);
    }
  };
  };

  useEffect(() => {
    category();
  }, []);
    category();
  }, []);

  return (
    <Flex h={'fit-content'} overflow={'hidden'} w={'full'} p={size == '500px' ? '0' : {base: '0 40px',lg: '30px 100px', xl: '30px 200px'}}>
      <Swiper
        slidesPerView={size == '500px' ? 4.4 : 7.4}
        spaceBetween={30}
        className="mySwiper"
        style={{ height: 'fit-content', width: size, padding: '0 20px' }}
      >
        {categories?.map((item, index) => {
          const colorIndex = index % colors.length;
          const imageIndex = index % colors.length;
          const colorIndex = index % colors.length;
          const imageIndex = index % colors.length;
          return (
            <SwiperSlide
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',
                height: 'fit-content',
                alignItems: 'center',
              }}
              
            >
              <Link to={`/product-search?page=1&pageSize=10&productName=&categoryId=${item.id}`}>
                <Flex
                  bgColor={colors[colorIndex]}
                  h={size == '500px' ? {base: '60px', md: '70px'} : {base: '70px', md: '100px'}}
                  w={size == '500px' ?  {base: '60px', md: '70px'} : {base: '70px', md: '100px'}}
                  borderRadius={'50%'}
                  justify={'center'}
                  align={'center'}
                  cursor={'pointer'}
                >
                  <Image src={image[imageIndex]} w={{base: '35px', md: '45px'}}/>
                </Flex>
              </Link>
              <Text
                fontSize={{ base: '10px', md: '12px' }}
                w={'70px'}
                fontWeight={400}
                textAlign={'center'}
                lineHeight={'14px'}
              >
                {item.category}
              </Text>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Flex>
  );
};
