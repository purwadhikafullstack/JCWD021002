import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,

  Text,

  IconButton,

  Flex,

  Avatar,
  Icon,

} from '@chakra-ui/react';
import {

  IconEditCircle,
    IconFlagStar,
    IconProgressCheck,
  IconTrashX,
} from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { useWebSize } from '../../provider.websize';
import { FaStar } from 'react-icons/fa6';




export const GridLists = ({ dataUser, handleDeleteUser, navigate }) => {
  const {size, handleWebSize } = useWebSize();


    return (
        <>
        <Flex
              alignItems={size == '500px' ? 'center' : 'flex-start'}
              gap={'24px'}
              flexWrap={'wrap'}
              h="fit-content"
            >
              {dataUser?.allUsers?.map((item, index) => (
                <Flex
                  className="admin-container"
                  alignItems={'center'}
                  gap={'17px'}
                  flex={'1 0 calc(25% - 24px)'}
                  borderRadius={'16px'}
                  background={'#FFFFFF'}
                  boxShadow={'base'}
                  minWidth={size == '500px' ? '155px' : '200px'}
                  maxWidth={'246px'}
                  key={index}
                >
                  <Box
                    width={'10px'}
                    height={'80px'}
                    backgroundColor={'#9ED6A3'}
                    borderRadius={'0px 14px 14px 0px'}
                  ></Box>

                  <Flex
                    padding={'24px 0px'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                    width="100%"
                    gap={'24px'}
                  >
                    <Flex
                      justifyContent={'center'}
                      alignItems={'center'}
                      gap={'10px'}
                      width="100%"
                      flexDirection={size == '500px' ? 'column' : 'row'}
                    >
                      <Avatar
                        key={item?.avatar}
                        boxSize={'64px'}
                        name={item?.username}
                        borderRadius={'full'}
                        src={
                          item?.avatar
                            ? `${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                                item?.avatar
                              }`
                            : 'https://bit.ly/broken-link'
                        }
                        onClick={() => navigate(`/detail-user/${item?.id}`)}
                        cursor="pointer"
                        _hover={{
                          transform: 'scale(1.1)',
                        }}
                      />
                      <Flex
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'flex-start'}
                        gap={'8px'}
                      >
                        <Flex alignItems={'center'} gap={'8px'}>
                          <Text fontSize={'14px'} fontWeight={'400'}>
                            {item?.username}
                          </Text>
                        </Flex>
                        <Flex alignItems={'center'} gap={'2px'}>
                          <Text
                            fontSize={'14px'}
                            fontWeight={'400'}
                            color={'#949494'}
                          >
                            {item?.role_idrole == 1
                              ? 'Super Admin'
                              : item?.role_idrole == 2
                                ? 'Admin Store'
                                : 'User'}
                          </Text>
                          <Text
                            fontSize={'14px'}
                            fontWeight={'400'}
                            color={'#9ED6A3'}
                          >
                            | {item?.status}
                          </Text>
                        </Flex>
                        <Flex alignItems={'center'} gap={'8px'}>
                        <IconButton
                      icon={<IconEditCircle />}
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => navigate(`/edit-user/${item?.id}`)}
                      isDisabled={item?.status === 'Active' ? false : true}
                    />
                    {item?.status === 'Active' ? (
                      <IconButton
                        icon={<IconTrashX />}
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDeleteUser(item)}
                      />
                    ) : (
                      <IconButton
                        icon={<IconProgressCheck />}
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => handleDeleteUser(item)}
                      />
                    )}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>

        </>
    )
}