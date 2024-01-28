/* eslint-disable react/prop-types */
import {
  Flex,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  Image,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IoIosSearch, IoIosArrowDown } from 'react-icons/io';
import { PiMapPinLine } from 'react-icons/pi';
import { ResizeButton } from '../../components/ResizeButton';
import { Link } from 'react-router-dom';
import { useWebSize } from '../../provider.websize';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';

export const Header = () => {
  const location = useSelector((state) => state.AuthReducer.location.address);

  const { size } = useWebSize();

  return (
    <Flex
      bgColor={size == '500px' ? 'colors.primary' : 'transparent'}
      h={size == '500px' ? 'fit-content' : '90px'}
      direction={'column'}
      p={size == '500px' ? '20px' : '10px 30px'}
      gap={3}
      transition={'width 2s ease-in-out'}
      boxShadow={size == '500px' ? 'base' : 'none'}
    >
      <Flex
        justify={'space-between'}
        h={'full'}
        direction={size == '500px' ? 'row' : 'column'}
        gap={size == '500px' ? 0 : 2}
      >
        <Flex
          color={size == '500px' ? 'white' : 'colors.primary'}
          gap={2}
          align={'center'}
          cursor={'pointer'}
          fontSize={'14px'}
          minW={size == '500px' ? '90%' : 'fit-content'}
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

        <Flex
          gap={5}
          w={'full'}
          justify={size == '500px' ? 'end' : 'space-between'}
          align={'center'}
        >
          <Flex
            gap={3}
            align={'center'}
            display={size == '500px' ? 'none' : 'flex'}
          >
            <Link to={'/'}>
              <Image src={LogoGroceria} h={'30px'} />
            </Link>
            <Text>Home</Text>
            <Text>Home</Text>
            <Text>Home</Text>
            <Text>Home</Text>
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
              color={size == '500px' ? 'white' : 'colors.primary'}
            />
          </Flex>
        </Flex>
      </Flex>

      <Link style={{ width: '100%' }} to={'/product-search'}>
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
