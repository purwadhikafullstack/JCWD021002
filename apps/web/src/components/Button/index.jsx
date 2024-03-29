/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';

export const MyButton = ({ value, type }) => {
  return (
    <Button
      w={'full'}
      bgColor={'colors.primary'}
      color={'white'}
      p={'0 16px'}
      fontSize={'16px'}
      fontWeight={400}
      border={'none'}
      borderRadius={'7px'}
      type={type}
    >
			{value}
		</Button>
  );
};
