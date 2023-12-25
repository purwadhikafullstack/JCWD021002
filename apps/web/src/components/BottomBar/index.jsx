import { Flex, useColorModeValue } from '@chakra-ui/react';
import { HiHome, HiShoppingCart } from 'react-icons/hi2';
import { MdFavorite } from 'react-icons/md';
import { IoPersonCircleOutline } from 'react-icons/io5';

export const BottomBar = () => {
  const bar = [
    { text: 'Home', icon: <HiHome size={'26px'} /> },
    { text: 'Home', icon: <HiShoppingCart size={'26px'} /> },
    { text: 'Home', icon: <MdFavorite size={'26px'} /> },
    { text: 'Home', icon: <IoPersonCircleOutline size={'26px'} /> },
  ];

  return (
    <Flex
      justify={'space-between'}
      w={'full'}
      bgColor={'white'}
      p={'20px'}
      fontSize={'10px'}
      boxShadow={"0px -8px 8px -14px rgba(0,0,0,1)"}
    >
      {bar?.map((item, index) => {
        return (
          <Flex key={index} direction={'column'} align={"center"} justify={"center"}>
            {item.icon}
            {item.text}
          </Flex>
        );
      })}
    </Flex>
  );
};
