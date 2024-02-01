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
  InputLeftAddon,
  InputLeftElement,
  Spacer,
  Text,
  Image,
  IconButton,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Flex,
  FormLabel,
  Checkbox,
  Textarea,
  InputRightElement,
  Select,
  Tooltip,
  Avatar,
} from '@chakra-ui/react';
import {
  IconPlus,
  IconArrowLeft,
  IconPhotoUp,
  IconX,
  IconArrowRight,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react';
import AvatarSVG from './icon-default-avatar.svg';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { useWebSize } from '../../provider.websize';
import SideBar from '../../components/SideBar/SideBar';

const EditUser = () => {
  const { size, handleWebSize } = useWebSize();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [fieldImage, setFieldImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedC, setSelectedC] = useState([]);
  const navigate = useNavigate();
  const [dataStore, setDataStore] = useState([]);

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [storeId, setStoreId] = useState();
  const [status, setStatus] = useState('');

  const fetchStore = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}user/store-lists`,
      );

      setDataStore(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/user-detail/${id}`,
      );

      setData(response?.data?.result);
    } catch (err) {
      console.log(err);
    }
  };

  console.log('ini data store', dataStore);

  useEffect(() => {
    fetchStore();
    fetchData();
  }, []);

  const addProduct = async () => {
    try {
      // const fields = [
      //     { value: fullname.trim(), message: 'full name' },
      //     { value: username.trim(), message: 'username' },
      //     { value: email.trim(), message: 'email address' },
      //     { value: password.trim(), message: 'password' },
      //     { value: storeId, message: 'store' },
      //   ];

      //   for (const field of fields) {
      //     if (!field.value) {
      //       toast.warn(`Please enter ${field.message}`);
      //       return;
      //     }
      //   }

      let formData = new FormData();
      formData.append("id", id);
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("store_idstore", storeId);
      formData.append("status", status);
      formData.append("avatar", fieldImage);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}user/update-user`,
        formData,
      );

      navigate('/user-lists');
      toast.success('Success');
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.currentTarget.files[0];

    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024); // Convert size to megabytes

      if (fileSizeInMB > 1) {
        // Display toast message for image size greater than 1 MB
        toast.warning('Selected image size should be less than 1 MB');
        return; // Don't proceed with further handling
      }

      setFieldImage(selectedFile);
      const objectURL = URL.createObjectURL(selectedFile);
      setSelectedImage(objectURL);
    }
  };

  return (
    <>
      <Box w={{ base: '100vw', md: size }}>
          <SideBar size={size} handleWebSize={handleWebSize}/>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Box w={{ base: '98.7vw', md: size }} overflowX='hidden' height='100vh' backgroundColor='#fbfaf9' p='20px'>
      <Box pl={size == '500px' ? '0px' : '150px' } pr={size == '500px' ? '0px' : '20px'} pt='20px' pb='20px' mt='70px' >
        <HStack mb='10px'>
          <Button leftIcon={<IconArrowLeft />} borderRadius='full' backgroundColor='white' textColor='black' border='solid 1px black' onClick={() => navigate('/user-lists')}>Back</Button>
          <Spacer />
          <Button rightIcon={<IconArrowRight />} borderRadius='full' backgroundColor='#286043' textColor='white' border='solid 1px #286043' onClick={() => addProduct()}>Edit User</Button>
        </HStack>
        <Box borderRadius='10px' p='20px' backgroundColor='white' boxShadow='0px 1px 5px gray'>
          <form>
            <FormLabel>User Information (Fill in only the parts that need to be replaced/edited)</FormLabel>
            <Flex justifyContent='center' gap='20px' flexDirection={size == '500px' ? 'column' : 'row'}>
            <Box>
              <VStack>
             <Image
            src={selectedImage ? selectedImage : `${
              import.meta.env.VITE_API_IMAGE_URL
            }/avatar/${data?.avatar}`}
            alt="Selected Image"
            boxSize="150px"
            objectFit="cover"
            _hover={{
              transform: "scale(1.1)", // Set the scale factor for the hover effect
            }}
            borderRadius="50%"/>
            <Box mt='-50px' mr='-90px'>
      <Input display="none" id="fileInput" 
              type="file"
              name="image"
              size="md"
              onChange={(event) => {
                setFieldImage(event.currentTarget.files[0]);
              }, handleImageChange}
            />
      <IconButton
        onClick={() => document.getElementById('fileInput').click()}
        icon={<FiUpload color='white' />}
        variant='outline'
        background='blue'
        borderRadius='50%'
        colorScheme="white"
        border='solid white 2px'
      >
      </IconButton>
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
                  <Flex dir="column">
                    <FormLabel>Full Name ➜</FormLabel>
                    <Tooltip
                      label={`Full Name: ${data?.fullname}`}
                      hasArrow
                      placement="top"
                    >
                      <FormLabel isTruncated>{data?.fullname}</FormLabel>
                    </Tooltip>
                  </Flex>
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
                  <Flex dir="column">
                    <FormLabel>Username ➜</FormLabel>
                    <Tooltip
                      label={`Username: ${data?.username}`}
                      hasArrow
                      placement="top"
                    >
                      <FormLabel isTruncated>{data?.username}</FormLabel>
                    </Tooltip>
                  </Flex>
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
                  <Flex dir="column">
                    <FormLabel>Email ➜</FormLabel>
                    <Tooltip
                      label={`Email: ${data?.email}`}
                      hasArrow
                      placement="top"
                    >
                      <FormLabel isTruncated>{data?.email}</FormLabel>
                    </Tooltip>
                  </Flex>
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
                  <Flex dir="column">
                    <FormLabel>Store ➜</FormLabel>
                    <Tooltip
                      label={`Store Location: ${data?.Store?.name}`}
                      hasArrow
                      placement="top"
                    >
                      <FormLabel isTruncated>{data?.Store?.name}</FormLabel>
                    </Tooltip>
                  </Flex>
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
                  <Flex dir="column">
                    <FormLabel>Status ➜</FormLabel>
                    <Tooltip
                      label={`Status: ${data?.status}`}
                      hasArrow
                      placement="top"
                    >
                      <FormLabel isTruncated>{data?.status}</FormLabel>
                    </Tooltip>
                  </Flex>
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

export default EditUser;
