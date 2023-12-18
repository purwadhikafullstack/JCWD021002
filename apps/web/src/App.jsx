import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { Box, Button, Center, ChakraProvider, Flex } from '@chakra-ui/react';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { SetPassword } from './pages/setPassword';
import { useState } from 'react';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IoIosLaptop } from 'react-icons/io';

function App() {
  const [webSize, setWebSize] = useState('mobile');

  const handleWebSize = () => {
    setWebSize((prevwebSize) =>
      prevwebSize === 'mobile' ? 'dekstop' : 'mobile',
    );
  };

  console.log(webSize);

  return (
    <BrowserRouter>
      <ChakraProvider>
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
            <Flex
              display={{ base: 'none', lg: 'flex' }}
              top={3}
              right={3}
              position={'relative'}
              justify={'end'}
              align={'end'}
            >
              <Button
                size={'xm'}
                variant={'ghost'}
                onClick={handleWebSize}
                color={'black'}
                fontSize={'32px'}
                _hover={{ transform: 'scale(1.2)' }}
                _active={{ transform: 'scale(1)' }}
                p={'10px 5px'}
                zIndex={10}
              >
                {webSize == 'mobile' ? (
                  <IoIosLaptop />
                ) : (
                  <IoPhonePortraitOutline />
                )}
              </Button>
            </Flex>
            <Flex>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home size={webSize === 'mobile' ? '500px' : '100vw'} />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Login size={webSize === 'mobile' ? '500px' : '100vw'} />
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Register size={webSize === 'mobile' ? '500px' : '100vw'} />
                  }
                />
                <Route
                  path="/set-password"
                  element={
                    <SetPassword size={webSize === 'mobile' ? '500px' : '100vw'} />
                  }
                />
              </Routes>
            </Flex>
          </Box>
        </Center>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
