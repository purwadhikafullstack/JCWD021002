import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ProductDetail from './pages/ProductDetail/Product'
import ProductSearch from './pages/ProductSearch/ProductSearch'
import CategoryLists from './pages/CategoryLists/CategoryLists'
import UserLists from './pages/UserLists/UserLists'
import { useState } from 'react';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IoIosLaptop } from 'react-icons/io';
import { Box, Button, Center, ChakraProvider, Flex } from '@chakra-ui/react';
import Theme from './theme';

function App() {
  const [webSize, setWebSize] = useState('mobile');

  const handleWebSize = () => {
    setWebSize((prevwebSize) =>
      prevwebSize === 'mobile' ? 'dekstop' : 'mobile',
    );
  };

  return (
    <BrowserRouter>
        <ChakraProvider theme={Theme}>
          <Center backgroundColor="#F3FBF8FF" w={'100vw'}>
          <Box
            width={{
              base: '100vw',
              md: webSize === 'mobile' ? '500px' : '100vw',
              transition: 'width 0.3s ease',
            }}
            bgColor={"white"}
            minH={"100vh"}
          >
            <Button onClick={handleWebSize}>Klik</Button>
           
            <Flex>
              <Routes>
                {/* <Route
                  path="/"
                  element={
                    <Home size={webSize === 'mobile' ? '500px' : '100vw'} />
                  }
                /> */}
                <Route path="/product-detail/:id" element={<ProductDetail size={webSize === 'mobile' ? '500px' : '100vw'} handleWebSize={handleWebSize} />} />
                <Route path="/product-search" element={<ProductSearch size={webSize === 'mobile' ? '500px' : '100vw'} />} handleWebSize={handleWebSize} />
                <Route path="/category-lists" element={<CategoryLists size={webSize === 'mobile' ? '500px' : '100vw'} />} handleWebSize={handleWebSize} />
                <Route path="/user-lists" element={<UserLists size={webSize === 'mobile' ? '500px' : '100vw'} />} handleWebSize={handleWebSize} />
                <Route path="/detail-user/:id" element={<UserLists size={webSize === 'mobile' ? '500px' : '100vw'} />} handleWebSize={handleWebSize} />
              </Routes>
            </Flex>
          </Box>
        </Center>
        </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/product-search" element={<ProductSearch />} />
      </Routes> */}