import { useNavigate } from 'react-router-dom';

import { PiUserList, PiCreditCard } from 'react-icons/pi';
import { GrShield } from 'react-icons/gr';
import { MdOutlineHeadsetMic, MdKeyboardArrowRight } from 'react-icons/md';
import { Flex, Text } from '@chakra-ui/react';

export const ProfileMenu = () => {
  const navigate = useNavigate();
  const listMenu = [
    {
      icon: <PiUserList size={'26px'} />,
      text: 'Informasi Pribadi',
      link: 'detail',
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
  );
};
