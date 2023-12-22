import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Box, Center, ChakraProvider, Flex } from '@chakra-ui/react';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { SetPassword } from './pages/setPassword';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Theme from './theme';

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
      <Provider store={store}>
        <ChakraProvider theme={Theme}>
          <Center backgroundColor="#F3FBF8FF" w={'100vw'}>
            <Box
              width={{
                base: '100vw',
                md: webSize === 'mobile' ? '500px' : '100vw',
              }}
              transition= 'width 0.3s ease'
              bgColor={'white'}
              minH={'100vh'}
            >
              <Flex>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home size={webSize === 'mobile' ? '500px' : '100vw'} handleWebSize={handleWebSize}/>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Login size={webSize === 'mobile' ? '500px' : '100vw'} handleWebSize={handleWebSize} />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <Register
                        size={webSize === 'mobile' ? '500px' : '100vw'} handleWebSize={handleWebSize}
                      />
                    }
                  />
                  <Route
                    path="/set-password"
                    element={
                      <SetPassword
                        size={webSize === 'mobile' ? '500px' : '100vw'} handleWebSize={handleWebSize}
                      />
                    }
                  />
                </Routes>
              </Flex>
            </Box>
          </Center>
          <Toaster position="center-bottom" />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
