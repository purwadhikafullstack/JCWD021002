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
import { Link } from 'react-router-dom';

export const Header = ({ size, handleWebSize }) => {
  const location = useSelector((state) => state.AuthReducer.location);

  return (
    <Flex
      bgColor={size == '500px' ? 'colors.primary' : 'transparent'}
      h={'fit-content'}
      direction={'column'}
      p={'20px'}
      gap={3}
      transition={'width 2s ease-in-out'}
      boxShadow={'base'}
    >
      <Flex justify={'space-between'} align={'center'} h={'fit-content'}>
        <Flex>
          <Flex
            color={size == '500px' ? 'white' : 'colors.primary'}
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
          <Flex>
            <Text></Text>
          </Flex>
        </Flex>

        <Flex gap={5}>
          <Flex display={size == '500px' ? 'none' : 'flex'} align={'center'}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IoIosSearch size={'20px'} color="black" />
              </InputLeftElement>
              <Input
                bgColor={'white'}
                borderRadius={'5px'}
                placeholder="Search"
                h={'35px'}
                w={'318px'}
              />
            </InputGroup>
          </Flex>
          <ResizeButton
            webSize={size}
            handleWebSize={handleWebSize}
            color={size == '500px' ? 'white' : 'colors.primary'}
          />
        </Flex>
      </Flex>

      <Link style={{ width: '100%' }} to={"/product-search"}>
        <InputGroup
          alignItems={'center'}
          display={size == '500px' ? 'flex' : 'none'}
        >
          <InputLeftElement pointerEvents="none">
            <IoIosSearch size={'20px'} color="black" />
          </InputLeftElement>
          <Input
            bgColor={'white'}
            borderRadius={'5px'}
            placeholder="Search"
            readOnly
            // cursor={'pointer'}
            // onClick={}
          />
        </InputGroup>
      </Link>
    </Flex>
  );
};
