/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Flex, Text, Avatar } from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useWebSize } from '../../provider.websize';

export const MyAccount = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const { size } = useWebSize();

  const { pathname } = useLocation();
  if (pathname != '/profile/detail/account/edit-profile')
    localStorage.removeItem('editProfileValues');

  const censorEmail = (email) => {
    if (typeof email !== 'string') return email;

    const atIndex = email.indexOf('@');

    if (atIndex > 0) {
      const prefix = email.slice(0, atIndex);
      const suffix = email.slice(atIndex);
      const censoredPrefix =
        prefix.charAt(0) +
        '*'.repeat(prefix.length - 2) +
        prefix.charAt(prefix.length - 1);
      return censoredPrefix + suffix;
    }

    return email;
  };
  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      align={'center'}
      gap={'50px'}
      bgColor={'white'}
    >
      <Flex
        align={'center'}
        w={'full'}
        h={'60px'}
        boxShadow={'base'}
        p={'10px 30px'}
      >
        <Flex position={'absolute'}>
          <Link to={'/profile/detail'}>
            <MdArrowBackIos />
          </Link>
        </Flex>
        <Flex justify={'end'} w={'full'}>
          <Link to={'/profile/detail/account/edit-profile'}>
            <Text>Edit</Text>
          </Link>
        </Flex>
      </Flex>

      {/* avatar */}
      <Flex align={'center'} justify={'center'} px={'30px'}>
        {user?.avatar ? (
          <Avatar
            size={'xl'}
            bgColor="#DAF1E8FF"
            color={'colors.primary'}
            src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${user?.avatar}`}
          />
        ) : (
          <Avatar
            size={'xl'}
            name={user.fullname}
            bgColor="#DAF1E8FF"
            color={'colors.primary'}
          />
        )}
      </Flex>
      {/* list menu */}
      <Flex
        w={'full'}
        direction={'column'}
        px={size == '500px' ? '30px' : { base: '40px', lg: '100px', xl: '200px' }}
        gap={size == '500px' ? 3 : '25px'}
        pt={size == '500px' ? '0' : '50px'}
      >
        <Flex
          w={'full'}
          justify={'space-between'}
          // borderBottom={'1px solid grey'}
          fontSize={{ base: '14px', md: '16px' }}
          p={'15px'}
        >
          <Text>Nama</Text>
          <Text color={'gray'}>{user.fullname}</Text>
        </Flex>
        <Flex
          w={'full'}
          justify={'space-between'}
          fontSize={{ base: '14px', md: '16px' }}
          p={'15px'}
        >
          <Text>Username</Text>
          <Text color={'gray'}>{user.username}</Text>
        </Flex>

        <Link
          to={
            user.googleLogin == 0
              ? `/profile/detail/account/email-verification?fromPage=${encodeURIComponent('/account')}`
              : '#'
          }
        >
          <Flex
            w={'full'}
            justify={'space-between'}
            fontSize={{ base: '14px', md: '16px' }}
            p={'15px'}
            cursor={'pointer'}
            align={'center'}
          >
            <Text>Email</Text>
            <Flex align={'center'} gap={2}>
              <Text color={'gray'}>{censorEmail(user.email)}</Text>
              {user.googleLogin == 1 ? <></> : <MdArrowForwardIos />}
            </Flex>
          </Flex>
        </Link>

        <Link
          to={'/profile/detail/account/change-password'}
          style={{ display: user.googleLogin == 1 ? 'none' : 'block' }}
        >
          <Flex
            w={'full'}
            justify={'space-between'}
            fontSize={{ base: '14px', md: '16px' }}
            p={'15px'}
            align={'center'}
            cursor={'pointer'}
          >
            <Text>Ganti Password</Text>
            <MdArrowForwardIos />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};
