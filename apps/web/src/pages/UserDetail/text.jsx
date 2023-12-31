import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormLabel, HStack, VStack, Flex, Text, Image, Button, Spacer } from "@chakra-ui/react";
import { IconArrowLeft, IconArrowRight, IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';
// import { SidebarWithHeader } from '../../components/SideBar/SideBar';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';

function capitalizeFirstLetter(str) {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str; // return the unchanged string if it's undefined
}

const UserDetail = ({size, handleWebSize}) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
      try {
          const response = await axios.get(
              `http://localhost:8000/api/user/user-detail/${id}`
          );

          setData(response?.data?.result);
      } catch (err) {
          console.log(err);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);


  return (
      <>
        {/* <SidebarWithHeader /> */}
        <Box w={size == '500px' ? '500px' : '98.7vw'} p='20px' height='fit-content' backgroundColor='#fbfaf9'>
          
                <Flex
        position={'relative'}
        // top={{ base: '20px', lg: '-30px' }}
        // px={'20px'}
        h={"10vh"}
        justify={"space-between"}
        align={"center"}
      >
        <Image src={LogoGroceria} h={'30px'} />
        <ResizeButton webSize={size} handleWebSize={handleWebSize} color={"black"}/>
      </Flex>
      
      <Box pl={size == '500px' ? '0px' : '150px' } pr='20px' pt='20px' pb='20px'>
      <HStack pl={size == '500px' ? '0px' : '150px' } mb='10px'>
            <Button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/user-lists')}>Back</Button>
            <Spacer />
            <Button rightIcon={<IconArrowRight />} borderRadius='full' backgroundColor='#1B4332FF' textColor='white' border='solid 1px #286043' onClick={() => navigate(`/edit-user/${id}`)}>Edit</Button>
          </HStack>
          <Box p='20px' borderRadius='10px'  backgroundColor='white' boxShadow='0px 1px 5px gray'>
             <FormLabel>User Information</FormLabel>
              <VStack height='max-content' mb='100px'>
                <Image
                  // src={`http://localhost:8080/uploads/products/${data.image}`}
                  src= 'https://scontent.fsoc1-1.fna.fbcdn.net/v/t39.30808-6/333593971_735170844988790_4322238393012892410_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGOknSlXDq8NutQI6sVbWArrupTC_2TPsuu6lML_ZM-yxashnAHMKytPfq4UN-nv7gIi4trZIbpt6w-DKvWXIqb&_nc_ohc=qHrp9PhhctQAX_YcWcd&_nc_zt=23&_nc_ht=scontent.fsoc1-1.fna&oh=00_AfAxZTkdhuYrcb0BDdeUannhFtkv4CjdYYWlA5xHrf3n1w&oe=658C812E'
                  alt={`${data.name}`}
                  boxSize="150px"
                  objectFit="cover"
                  borderRadius="10px"
                />
                <Box mt='-50px' mr='-90px'></Box>
              </VStack>
            {/* <Flex gap='10px' mb='20px '>
              <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Name</Text>
                <FormLabel>Full Name</FormLabel>
                <Text>{data.fullname}</Text>
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Username</FormLabel>
                <Text>{data.username}</Text>
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Email</FormLabel>
                <Text>{data?.email}</Text>
              </Box>
            </Flex> */}
            
              {/* <Box width='100%'>
                <Text fontSize='large' fontWeight='bold'>Name</Text>
                <FormLabel>Full Name</FormLabel>
                <Text>{data.fullname}</Text>
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Username</FormLabel>
                <Text>{data.username}</Text>
              </Box>
              <Box pt='27px' width='100%'>
                <FormLabel>Email</FormLabel>
                <Text>{data?.email}</Text>
              </Box> */}
            {/* <Flex gap='10px' mb='20px' >
          
              <Box width="100%">
                <Text fontSize='large' fontWeight='bold'>Role</Text>
                <FormLabel>Super Admin</FormLabel>
                <Text color={data?.role_idrole == 1 ? "green" : "red"}>{data?.role_idrole == 1 ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
              </Box>
              <Box pt='27px' width="100%">
                <FormLabel>Admin Store</FormLabel>
                <Text color={data?.role_idrole == 2 ? "green" : "red"}>{data?.role_idrole == 2 ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
              </Box>
              <Box pt='27px' width="100%">
                <FormLabel>User</FormLabel>
                <Text  color={data?.role_idrole == 3 ? "green" : "red"}>{data?.role_idrole == 3 ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
              </Box>
            </Flex> */}
            
          </Box>
          </Box>
        </Box> 
      </>
  );
};

export default UserDetail;
