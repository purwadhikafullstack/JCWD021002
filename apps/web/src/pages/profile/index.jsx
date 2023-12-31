/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import { BottomBar } from '../../components/BottomBar';
import { useSelector } from 'react-redux';
import { ProfileNotLogin } from './profileNotLogin';

export const Profile = ({ size }) => {

  const isLogin = useSelector((state) => state.AuthReducer.isLogin)
  console.log(isLogin)

  return (
    <Flex>
      {isLogin ? (
        <Flex>Profile</Flex>
        ):(
          <ProfileNotLogin/>
      )}


      <Flex position={'fixed'} bottom={0} w={size}>
        <BottomBar />
      </Flex>
    </Flex>
  );
};
