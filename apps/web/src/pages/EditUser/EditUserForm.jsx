import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { SidebarWithHeader } from '../../components/SideBar/SideBar';
import { FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  Spacer,
  Text,
  Image,
  IconButton,
  VStack,
  Flex,
  FormLabel,
  InputRightElement,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import {
  IconPlus,
  IconArrowLeft,
  IconEye,
  IconEyeOff,
  IconDeviceFloppy,
} from '@tabler/icons-react';
import AvatarSVG from './icon-default-avatar.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { useWebSize } from '../../provider.websize';
import SideBar from '../../components/SideBar/SideBar';

const EditUserForm = ({
  addProduct,
  selectedImage,
  handleImageChange,
  fullname,
  setFullname,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  data,
  dataStore,
  storeId,
  setStoreId,
  status,
  setStatus,
}) => {
  const { size, handleWebSize } = useWebSize();
  const navigate = useNavigate();

  return (
    <>
      <Box w={{ base: '100vw', md: size }}>
        <SideBar size={size} handleWebSize={handleWebSize} />
        <ToastContainer
          position="top-center"
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Box
          w={{ base: '98.7vw', md: size }}
          overflowX="hidden"
          height="100vh"
          backgroundColor="#fbfaf9"
          p="20px"
        >
          <Box
            pl={size == '500px' ? '0px' : '150px'}
            pr={size == '500px' ? '0px' : '20px'}
            pt="20px"
            pb="20px"
            mt="70px"
          >
            <HStack mb="10px">
              <Button
                leftIcon={<IconArrowLeft />}
                borderRadius="full"
                backgroundColor="white"
                textColor="black"
                border="solid 1px black"
                onClick={() => navigate('/user-lists')}
              >
                Back
              </Button>
              <Spacer />
              <Button
                rightIcon={<IconDeviceFloppy />}
                borderRadius="full"
                backgroundColor="#286043"
                textColor="white"
                border="solid 1px #286043"
                onClick={() => addProduct()}
              >
                Save
              </Button>
            </HStack>
            <Box
              borderRadius="10px"
              p="20px"
              backgroundColor="white"
              boxShadow="0px 1px 5px gray"
            >
              <form>
                <FormLabel>
                  User Information (Fill in only the parts that need to be
                  replaced/edited)
                </FormLabel>
                <Flex
                  justifyContent="center"
                  gap="20px"
                  flexDirection={size == '500px' ? 'column' : 'row'}
                >
                  <Box>
                    <VStack>
                      <Image
                        src={
                          selectedImage
                            ? selectedImage
                            : `${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                                data?.avatar
                              }`
                        }
                        alt="Selected Image"
                        boxSize="150px"
                        objectFit="cover"
                        _hover={{
                          transform: 'scale(1.1)', // Set the scale factor for the hover effect
                        }}
                        borderRadius="50%"
                      />
                      <Box mt="-50px" mr="-90px">
                        <Input
                          display="none"
                          id="fileInput"
                          type="file"
                          name="image"
                          size="md"
                          onChange={
                            ((event) => {
                              setFieldImage(event.currentTarget.files[0]);
                            },
                            handleImageChange)
                          }
                        />
                        <IconButton
                          onClick={() =>
                            document.getElementById('fileInput').click()
                          }
                          icon={<FiUpload color="white" />}
                          variant="outline"
                          background="blue"
                          borderRadius="50%"
                          colorScheme="white"
                          border="solid white 2px"
                        ></IconButton>
                      </Box>
                    </VStack>
                  </Box>
                </Flex>
                <Flex
                  columnGap="10px"
                  mb="20px "
                  flexDir={size == '500px' ? 'column' : 'row'}
                >
                  <Box width="100%">
                    <Text fontSize="large" fontWeight="bold">
                      Name
                    </Text>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      placeholder="Full Name"
                      name="fullname"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      type="text"
                      border="solid gray 1px"
                      borderRadius="full"
                    />
                  </Box>
                  <Box pt="27px" width="100%">
                    <FormLabel>Username</FormLabel>
                    <Input
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      border="solid gray 1px"
                      borderRadius="full"
                    />
                  </Box>
                  <Box pt="27px" width="100%">
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      border="solid gray 1px"
                      borderRadius="full"
                    />
                  </Box>
                </Flex>
                <Flex
                  columnGap="10px"
                  mb="20px "
                  flexDir={size == '500px' ? 'column' : 'row'}
                >
                  <Box width="100%">
                    <Text fontSize="large" fontWeight="bold">
                      Others
                    </Text>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        name="password"
                        border="solid gray 1px"
                        borderRadius="full"
                      />
                      <InputRightElement h={'full'}>
                        <IconButton
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                          borderRightRadius="full"
                          icon={showPassword ? <IconEyeOff /> : <IconEye />}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                  <Box
                    pt="27px"
                    width="100%"
                    display={data?.role_idrole == 2 ? 'block' : 'none'}
                  >
                    <FormLabel>Store</FormLabel>
                    <Select
                      border="solid gray 1px"
                      borderRadius="full"
                      placeholder="Select option"
                      value={storeId}
                      onChange={(e) => setStoreId(e.target.value)}
                    >
                      {dataStore?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </Box>
                  <Box pt="27px" width="100%">
                    <FormLabel>Status</FormLabel>
                    <Select
                      border="solid gray 1px"
                      borderRadius="full"
                      placeholder="Select option"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value={'Active'}>Active</option>
                      <option value={'Inactive'}>Inactive</option>
                    </Select>
                  </Box>
                </Flex>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditUserForm;
