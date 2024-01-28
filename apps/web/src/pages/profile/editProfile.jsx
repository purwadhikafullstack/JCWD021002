/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';

import {
  Avatar,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { keepLogin } from '../../redux/reducer/authReducer';
import toast from 'react-hot-toast';

import { useWebSize } from '../../provider.websize';

const editProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .matches(/^\S{5,}$/, 'username is invalid'),
});

export const EditProfile = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const {size } = useWebSize()

  const editProfile = async (username, fullname) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('fullname', fullname);
      formData.append('avatar', selectedImage)

      await axios.patch(`${import.meta.env.VITE_API_URL}/auth/update-profile/${user?.id}`, formData)

      dispatch(keepLogin())
      toast.success('Update data success');
    } catch (err) {
      toast.error(err.response?.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
      fullname: user?.fullname || '',
      avatar: user?.avatar || '',
    },
    validationSchema: editProfileSchema,
    onSubmit: (values) => {
      editProfile(values.username, values.fullname);
    },
  });

  useEffect(() => {
    const storedValues = localStorage.getItem('editProfileValues');

    if (storedValues) {
      const parsedValues = JSON.parse(storedValues);
      formik.setValues(parsedValues);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('editProfileValues', JSON.stringify(formik.values));
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit} style={{ height: '100vh',  backgroundColor: "white" }}>
      <Flex
        direction={'column'}
        w={{base: "100vw",md: size}}
        h={'full'}
        align={'center'}
        gap={'50px'}
      >
        <Flex
          align={'center'}
          w={'full'}
          justify={'space-between'}
          h={'60px'}
          boxShadow={'base'}
          p={'10px 30px'}
        >
          <Flex>
            <Link to={'/profile/detail/account'}>
              <MdArrowBackIos />
            </Link>
          </Flex>
          <Flex>
            <Text fontSize={'16px'} fontWeight={600}>
              My Profile
            </Text>
          </Flex>
          <Flex>
            <Button type="submit" value={"submit"} variant={'unstyled'}>
              Save
            </Button>
          </Flex>
        </Flex>

        <Flex
          direction={'column'}
          w={'full'}
          align={'center'}
          h={'60%'}
          gap={'50px'}
          justify={'center'}
          px={'30px'}
        >
          <Flex
            align={'center'}
            justify={'center'}
            direction={'column'}
            borderRadius={'50%'}
            h={'fit-content'}
            overflow={'hidden'}
            position={'relative'}
          >
            <Avatar
              size={'xl'}
              name={user?.fullname}
              bgColor="#DAF1E8FF"
              color={'colors.primary'}
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : `${import.meta.env.VITE_API_IMAGE_URL}/avatar/${user?.avatar}`
              }
            />
            <Input
              type="file"
              height={'100%'}
              width={'100%'}
              position={'absolute'}
              top={0}
              left={0}
              opacity={0}
              aria-hidden="true"
              accept="image/*"
              zIndex={5}
              onChange={(event) => {
                setSelectedImage(event?.currentTarget?.files[0]);
              }}
              cursor={'pointer'}
            />
            <Flex
              position={'absolute'}
              mt={'72px'}
              h={'23px'}
              w={'90px'}
              bgColor={'rgba(0, 0, 0, .2)'}
              justify={'center'}
              color={'colors.secondary'}
              textAlign={'center'}
              align={'center'}
              fontSize={'14px'}
            >
              ubah
            </Flex>
          </Flex>

          <Flex direction={'column'} w={'full'} gap={5}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input
                type="fullname"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};
