/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import './Loader.css';

const Loader = () => {
  return (
    <Flex
      bgColor={'rgba(0, 0, 0, .2)'}
      width={'100vw'}
      height={'100vh'}
      zIndex={10}
      filter='grayscale(80%)'
    >
      <Flex display={"flex"} className="loader-container">
        <div className="loader"></div>
      </Flex>
    </Flex>
  );
};

export default Loader;
