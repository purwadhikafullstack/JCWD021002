import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { SidebarWithHeader } from '../../components/SideBar/SideBar';
import { FiUpload } from "react-icons/fi";
import { useFormik } from "formik";

function formatPriceToIDR(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);
}

function capitalizeFirstLetter(str) {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str; // return the unchanged string if it's undefined
}

const UserDetail = (webSize) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
      try {
          const response = await axios.get(
              `http://localhost:8000/api/user/detail-user/${id}`
          );

          setData(response?.data);
      } catch (err) {
          console.log(err);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);

  return (
      <>
        <SidebarWithHeader />
        <div width='98.7vw' height='fit-content' backgroundColor='#fbfaf9' p='50px'>
          <div ml={{md: '150px', sm: '0px'}} mb='10px'>
            <button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/product-lists')}>Back</button>
            <div />
            <button rightIcon={<IconArrowRight />} borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => navigate(`/edit-product/${id}`)}>Edit Item</button>
          </div>
          <div ml={{md: '150px', sm: '0px'}} borderRadius='10px' p='20px' backgroundColor='white' boxShadow='0px 1px 5px gray'>
            <FormLabel>User Information</FormLabel>
            <div height='max-content' mb='100px'>
              <VStack>
                <Image
                  src={`http://localhost:8080/uploads/products/${data.image}`}
                  alt={`${data.name}`}
                  boxSize="150px"
                  objectFit="cover"
                  borderRadius="10px"
                />
                <div mt='-50px' mr='-90px'></div>
              </VStack>
            </div>
            <Flex columnGap='10px' mb='20px '>
              <div width='50%'>
                <Text fontSize='large' fontWeight='bold'>Name</Text>
                <FormLabel>Product Name</FormLabel>
                <Text>{data.name}</Text>
              </div>
              <div pt='27px' width='50%'>
                <FormLabel>Product SKU</FormLabel>
                <Text>{data.sku}</Text>
              </div>
              <div pt='27px' width='50%'>
                <FormLabel>Status Product</FormLabel>
                <Text>{capitalizeFirstLetter(data?.status)}</Text>
              </div>
            </Flex>
            <Flex columnGap='10px' mb='20px '>
              <div width='50%'>
                <Text fontSize='large' fontWeight='bold'>Main Price</Text>
                <FormLabel>Price (after markup)</FormLabel>
                <Text>{formatPriceToIDR(data.price)}</Text>
              </div>
              <div pt='27px' width='50%'>
                <FormLabel>MarkUp Percentage</FormLabel>
                <Text>{data.markup}%</Text>
              </div>
              <div pt='27px' width='50%'>
                <FormLabel>Stock</FormLabel>
                <Text>{data.quantity}</Text>
              </div>
            </Flex>
            <FormLabel>Description</FormLabel>
            <Text mb='20px'>{data.description}</Text>
            <Text fontSize='large' fontWeight='bold'>Category</Text>
            <Flex columnGap="10px" mb="20px ">
              {data?.categories?.map((item) => (
                <div key={item.category.id} borderRadius="full" pl="10px" pr='10px' pt='5px' pb='5px' border="solid blue 1px" bgColor='blue.100'>
                  <HStack>
                    <Text color='blue'>{item.category.category}</Text>
                  </HStack>
                </div>
              ))}
            </Flex>
          </div>
        </div>
      </>
  );
};

export { UserDetail };
