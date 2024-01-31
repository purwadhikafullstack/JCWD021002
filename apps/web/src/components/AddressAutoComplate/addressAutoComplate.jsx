/* eslint-disable react/prop-types */
import { List, ListItem, Box } from '@chakra-ui/react';

export const AddressAutoComplate = ({
  inputValue,
  visible,
  suggestedAddresses,
  handleInputChange,
  setAddress,
  setVisible,
}) => {
  return (
    <List
      display={inputValue ? (visible ? 'flex' : 'none') : 'none'}
      flexDirection={'column'}
      bgColor={'#E8EAEF'}
      gap={2}
      borderRadius={'20px'}
      p={'10px 20px'}
      position={'absolute'}
      w={'full'}
      zIndex={10}
      mt={'50px'}
    >
      {suggestedAddresses?.map((address, index) => (
        <ListItem key={index}>
          <Box
            onClick={() => {
              handleInputChange(address);
              setAddress(address);
              setVisible(false);
            }}
            cursor="pointer"
          >
            {address}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
