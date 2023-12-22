/* eslint-disable react/prop-types */
import {
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  // Button,
} from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';
import { PiMapPinLine } from 'react-icons/pi';
import { ResizeButton } from '../../components/ResizeButton';

export const Header = ({ size, handleWebSize }) => {
  return (
    <Flex
      bgColor={'colors.primary'}
      h={'150px'}
      direction={'column'}
      p={'20px'}
      gap={3}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Flex color="white" gap={2} align={'center'}>
          <PiMapPinLine size={'20px'} />
          <Text>Location</Text>
        </Flex>
        <ResizeButton webSize={size} handleWebSize={handleWebSize} color={"white"}/>
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
