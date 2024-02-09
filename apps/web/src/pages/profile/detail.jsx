/* eslint-disable react/prop-types */
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Flex, Text } from '@chakra-ui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdArrowBackIos } from 'react-icons/md';

import { logoutSuccess } from '../../redux/reducer/authReducer';
import { logout } from '../../config/firebase-config';
import DeleteAlert from '../../components/DeleteAlert';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listMenu = [
    {
      text: 'Akun Saya',
      link: '/profile/detail/account',
    },
    {
      text: 'Alamat Saya',
      link: '/profile/detail/address',
    },
  ];

  const onLogout = () => {
    const result = logout();
    dispatch(logoutSuccess());
    toast.success('Log out Success');
    if (result === 'logout success') {
      navigate('/');
    }
  };

  const location = useLocation();
  const fromPage = new URLSearchParams(location.search).get('fromPage');
  const roleId = useSelector((state) => state.AuthReducer?.user?.role_idrole);

  return (
    <Flex direction={'column'} w={'full'} h={'77%'} align={'center'} gap={2}>
      <Flex
        w={'full'}
        onClick={() => {
          navigate(
            fromPage ? fromPage : roleId == 3 ? '/profile' : '/dashboard',
          );
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
          <DeleteAlert
            btnValue={'Log out'}
            style={{
              color: 'red',
              bgColor: 'transparent',
              // border: '1px solid red',
              size: 'md',
            }}
            deleteAction={onLogout}
            titleValue={'Log out?'}
            mainValue={
              'Anda akan keluar dari akun anda. Yakin ingin melanjutkan?'
            }
            buttonActionValue={'lanjutkan'}
            navigateTo={'/login'}
          />
          <DeleteAlert
            btnValue={'Hapus akun'}
            style={
              {
                // color: 'red',
                // bgColor: 'transparent',
                // border: '1px solid red',
                // size: 'md',
              }
            }
            // deleteAction={deleteAccount}
            titleValue={'Hapus akun?'}
            mainValue={
              'Anda akan kehilangan akun anda. Yakin ingin melanjutkan?'
            }
            buttonActionValue={'lanjutkan'}
            navigateTo={`/profile/detail/account/email-verification?fromPage=${encodeURIComponent('/detail')}`}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
