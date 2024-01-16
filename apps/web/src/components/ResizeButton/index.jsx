/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IoIosLaptop } from 'react-icons/io';

export const ResizeButton = ({ color, handleWebSize, webSize }) => {
  return (
    <Button
      size={'xm'}
      variant={'ghost'}
      onClick={handleWebSize}
      color={color}
      fontSize={'26px'}
      _hover={{ transform: 'scale(1.2)' }}
      _active={{ transform: 'scale(1)' }}
      p={'10px 5px'}
      zIndex={10}
      display={{ base: 'none', md: 'block' }}
    >
      {webSize == '500px' ? <IoIosLaptop /> : <IoPhonePortraitOutline />}
    </Button>
  );
};
