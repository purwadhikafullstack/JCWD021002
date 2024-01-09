/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

import { BottomBar } from '../../components/BottomBar';
import { ResizeButton } from '../../components/ResizeButton';
import { PersonalInformation } from './personalInformation';

import { Center, Flex, Input, Text } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { PiUserList, PiCreditCard } from 'react-icons/pi';
import { GrShield } from 'react-icons/gr';
import { MdOutlineHeadsetMic, MdKeyboardArrowRight } from 'react-icons/md';
import { IoMdCopy } from 'react-icons/io';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export const Profile = ({ size, handleWebSize }) => {
  const [activePage, setActivePage] = useState('profile');
  const navigate = useNavigate();

  const path = useLocation();
  useEffect(() => {
    const pathname = path.pathname;
    if (pathname == '/profile/personal-information') {
      setActivePage('personal-information');
    } else if (pathname == '/profile/support') {
      setActivePage('support');
    } else if (pathname == '/profile/privacy&security') {
      setActivePage('privacy&security');
    } else if (pathname == '/profile/cards-management') {
      setActivePage('cards-management');
    } else {
      setActivePage('profile');
    }
  }, [path]);

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

  const listMenu = [
    {
      icon: <PiUserList size={'26px'} />,
      text: 'Informasi Pribadi',
      link: 'personal-information',
    },
    {
      icon: <PiCreditCard size={'26px'} />,
      text: 'Kartu / Rekening Bank',
      link: 'cards-management',
    },
    {
      icon: <GrShield size={'26px'} />,
      text: 'Privacy & Security',
      link: 'privacy&security',
    },
    {
      icon: <MdOutlineHeadsetMic size={'26px'} />,
      text: 'Support',
      link: 'support',
    },
  ];

  return (
    <Flex w={size} minH={'100vh'} direction={'column'}>
      <Flex
        bgColor={'colors.secondary'}
        w={'full'}
        direction={'column'}
        p={'20px'}
        gap={5}
      >
        <Flex w={'full'} justify={'end'}>
          <ResizeButton
            webSize={size}
            handleWebSize={handleWebSize}
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
            </Flex>
          </Flex>
        </Center>
      </Flex>
      <Flex p={'35px'} h={'full'} w={'full'} direction={'column'} gap={5}>
        {activePage == 'profile' ? (
          <Flex direction={'column'} w={'full'} gap={3} h={'full'}>
            {listMenu?.map((item, index) => {
              return (
                <Flex
                  key={index}
                  w={'full'}
                  align={'center'}
                  p={'10px'}
                  justify={'space-between'}
                  cursor={'pointer'}
                  onClick={() => {
                    setActivePage(item.link);
                    navigate(`/profile/${item.link}`);
                  }}
                >
                  <Flex gap={4} align={'center'}>
                    {item.icon}
                    <Text>{item.text}</Text>
                  </Flex>
                  <MdKeyboardArrowRight size={'20px'} />
                </Flex>
              );
            })}
          </Flex>
        ) : activePage == 'personal-information' ? (
          <PersonalInformation setActivePage={setActivePage} />
        ) : activePage == 'cards-management' ? (
          <></>
        ) : activePage == 'privacy&security' ? (
          <></>
        ) : (
          <></>
        )}
      </Flex>

      <Flex position={'fixed'} bottom={0} w={{ base: '100vw', md: size }}>
        <BottomBar />
      </Flex>
    </Flex>
  );
};
