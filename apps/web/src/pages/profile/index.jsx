/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useWebSize } from '../../provider.websize';

import { BottomBar } from '../../components/BottomBar';
import { ResizeButton } from '../../components/ResizeButton';

import {
  Center,
  Flex,
  Input,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { IoMdCopy } from 'react-icons/io';
import toast from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import { RedeemReferral } from '../RedeemReferral/RedeemReferral';

export const Profile = () => {
  const { size } = useWebSize();

  const user = useSelector((state) => state.AuthReducer?.user);
  const roleId = useSelector((state) => state.AuthReducer?.user?.role_idrole);

  const textRef = useRef(null);
  const location = useLocation();
  const fromPage = new URLSearchParams(location?.search).get('fromPage');

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Teks berhasil disalin ke papan klip');
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      w={{ base: '100vw', md: size }}
      minH={'100vh'}
      direction={'column'}
      bgColor={'white'}
    >
      <Flex
        bgColor={'colors.secondary'}
        w={'full'}
        direction={'column'}
        gap={5}
        p={
          size == '500px'
            ? '20px'
            : { base: '20px 40px', lg: '20px 100px', xl: '20px 200px' }
        }
      >
        <Flex w={'full'} justify={'end'}>
          <ResizeButton color={'colors.primary'} />
        </Flex>
        <Center w={'full'} flexDirection={'column'} gap={5}>
          {user?.avatar ? (
            <Avatar
              size={'xl'}
              bgColor="#DAF1E8FF"
              color={'colors.primary'}
              src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                user?.avatar
              }`}
            />
          ) : (
            <Avatar
              name={user.fullname}
              size={'xl'}
              bgColor="#DAF1E8FF"
              color={'colors.primary'}
            />
          )}
          <Flex
            direction={'column'}
            justify={'center'}
            align={'center'}
            gap={2}
          >
            <Text>{user.fullname}</Text>
            <Flex
              align={'center'}
              cursor={'pointer'}
              onClick={() => copyTextToClipboard(user.referralCode)}
            >
              <Input
                fontSize={'14px'}
                ref={textRef}
                readOnly
                variant={'unstyled'}
                size={'xs'}
                w={'80px'}
                textAlign={'center'}
                cursor={'pointer'}
                value={user.referralCode}
              />
              <IoMdCopy />
              {user?.referralBy_iduser ? null : <RedeemReferral />}
            </Flex>
          </Flex>
        </Center>
      </Flex>
      <Flex
        h={'full'}
        w={'full'}
        direction={'column'}
        gap={5}
        p={
          size == '500px'
            ? '35px'
            : { base: '35px 40px', lg: '35px 100px', xl: '35px 200px' }
        }
      >
        <Breadcrumb fontSize={'14px'} fontWeight={600}>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={fromPage ? fromPage : roleId == 3 ? '/' : '/dashboard'}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href={roleId == 3 ? '/profile' : '#'}>
              Profile
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
          </BreadcrumbItem> */}
        </Breadcrumb>
        <Outlet />
      </Flex>

      <Flex position={'fixed'} bottom={0} w={{ base: '100vw', md: size }}>
        <BottomBar />
      </Flex>
    </Flex>
  );
};
