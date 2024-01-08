/* eslint-disable react/prop-types */
import {
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  // Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IoIosSearch, IoIosArrowDown } from 'react-icons/io';
import { PiMapPinLine } from 'react-icons/pi';
import { ResizeButton } from '../../components/ResizeButton';

export const Header = ({ size, handleWebSize }) => {
  const location = useSelector((state) => state.AuthReducer.location);
  console.log('loc', location);
  return (
    <Flex
      bgColor={'colors.primary'}
      h={'150px'}
      direction={'column'}
      p={'20px'}
      gap={3}
    >
      <Flex justify={'space-between'} align={'center'} h={'fit-content'}>
        <Flex
          color="white"
          gap={2}
          align={'center'}
          cursor={'pointer'}
          fontSize={'14px'}
        >
          <PiMapPinLine size={'18px'} />
          <Flex gap={1.5}>
            <Text fontWeight={600}>
              {location?.city
                ? `${location.city}, ${location.Province?.province}`
                : location && location.length > 0
                  ? location.toString()
                  : '. . .'}
            </Text>
          </Flex>
          <IoIosArrowDown size={'16px'} />
        </Flex>
        <ResizeButton
          webSize={size}
          handleWebSize={handleWebSize}
          color={'white'}
        />
      </Flex>

      <InputGroup alignItems={'center'}>
        <InputLeftElement pointerEvents="none">
          <IoIosSearch size={'20px'} color="gray.300" />
        </InputLeftElement>
        <Input bgColor={'white'} borderRadius={'5px'} placeholder="Search" />
      </InputGroup>
    </Flex>
  );
};
