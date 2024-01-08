/* eslint-disable react/prop-types */
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Flex, Text, Button } from '@chakra-ui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdArrowBackIos } from 'react-icons/md';

import { logoutSuccess } from '../../redux/reducer/authReducer';
import { logout } from '../../config/firebase-config';

export const PersonalInformation = ({ setActivePage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listMenu = [
    {
      text: 'Akun Saya',
      link: '/profile/personal-information/account',
    },
    {
      text: 'Alamat Saya',
      link: '/profile/personal-information/address',
    },
  ];

  const onLogout = () => {
    const result = logout();
    dispatch(logoutSuccess());
    if (result === 'logout success') {
      navigate('/login');
    }
  };

  return (
    <Flex direction={'column'} w={'full'} h={'85%'} align={'center'} gap={2}>
      <Flex
        w={'full'}
        onClick={() => {
          setActivePage('profile');
          navigate('/profile');
        }}
        cursor={'pointer'}
        p={'10px'}
        align={'center'}
        gap={2}
      >
        <MdArrowBackIos />
        <Text fontWeight={700}>Informasi Pribadi</Text>
      </Flex>
      <Flex
        direction={'column'}
        w={'full'}
        h={'full'}
        justify={'space-between'}
      >
        <Flex direction={'column'} w={'full'} gap={3}>
          {listMenu?.map((item, index) => {
            return (
              <Link to={item.link} style={{ width: '100%' }} key={index}>
                <Flex
                  w={'full'}
                  align={'center'}
                  p={'10px'}
                  justify={'space-between'}
                  cursor={'pointer'}
                >
                  <Flex gap={4} align={'center'}>
                    <Text>{item.text}</Text>
                  </Flex>
                  <MdKeyboardArrowRight size={'20px'} />
                </Flex>
              </Link>
            );
          })}
        </Flex>
        <Flex direction={'column'} gap={2} w={'full'}>
          <Button
            onClick={onLogout}
            w={'full'}
            bgColor={'transparent'}
            color={'red'}
            border={'1px solid red'}
          >
            Log out
          </Button>
          <Button
            onClick={onLogout}
            w={'full'}
            bgColor={'transparent'}
            color={'black'}
          >
            Hapus akun
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
