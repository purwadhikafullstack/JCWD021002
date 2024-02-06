/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useWebSize } from '../../provider.websize';

import { BottomBar } from '../../components/BottomBar';
import { ResizeButton } from '../../components/ResizeButton';

import { Center, Flex, Input, Text } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { IoMdCopy } from 'react-icons/io';
import toast from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { RedeemReferral } from '../RedeemReferral/RedeemReferral';

export const Profile = () => {
  const {size } = useWebSize()

  const user = useSelector((state) => state.AuthReducer.user);

  const textRef = useRef(null);

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
    <Flex w={{base: "100vw", md: size}} minH={'100vh'} direction={'column'} bgColor={"white"}>
      <Flex
        bgColor={'colors.secondary'}
        w={'full'}
        direction={'column'}
        p={'20px'}
        gap={5}
      >
        <Flex w={'full'} justify={'end'}>
          <ResizeButton
            color={'colors.primary'}
          />
        </Flex>
        <Center w={'full'} flexDirection={'column'} gap={5}>
          {user?.avatar ? (
            <Avatar
              size={'xl'}
              bgColor="#DAF1E8FF"
              color={'colors.primary'}
              src={`${import.meta.env.VITE_API_IMAGE_URL}/avatar/${user?.avatar}`}
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
              { user?.referralBy_iduser ? null : <RedeemReferral /> }
            </Flex>
          </Flex>
        </Center>
      </Flex>
      <Flex p={'35px'} h={'full'} w={'full'} direction={'column'} gap={5}>
        <Outlet />
      </Flex>

      <Flex position={'fixed'} bottom={0} w={{ base: '100vw', md: size }}>
        <BottomBar />
      </Flex>
    </Flex>
  );
};
