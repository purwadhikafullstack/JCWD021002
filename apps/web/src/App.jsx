import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { SetPassword } from './pages/setPassword';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Theme from './theme';
import { Location } from './hooks/geolocation';
import { Auth } from './pages/auth';
import { Profile } from './pages/profile';
import { LoggedInUser, LoginRoute } from './pages/auth/loggedInUser';
import { VerifySentMail } from './pages/register/verifySentMail';

function App() {
  const [webSize, setWebSize] = useState('mobile');
  const handleWebSize = () => {
    setWebSize((prevwebSize) =>
      prevwebSize === 'mobile' ? 'dekstop' : 'mobile',
    );
  };

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={Theme}>
          <Auth>
            <Location>
              <Flex justify={'center'} w={'100vw'} bgColor={'#DAF1E8FF'}>
                <Box
                  width={{
                    base: '100vw',
                    md: webSize === 'mobile' ? '500px' : '100vw',
                  }}
                  transition="width 0.3s ease"
                  bgColor={'white'}
                  minH={'100vh'}
                >
                  <Flex>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <Home
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          <LoginRoute>
                            <Login
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoginRoute>
                        }
                      />
                      <Route
                        path="/register"
                        element={
                          <Register
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/set-password"
                        element={
                          <SetPassword
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <LoggedInUser>
                            <Profile
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoggedInUser>
                        }
                      />
                      <Route
                        path="/verifysentmail"
                        element={
                          <LoginRoute>
                            <VerifySentMail
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoginRoute>
                        }
                      />
                    </Routes>
                  </Flex>
                </Box>
              </Flex>
              <Toaster position="center-bottom" />
            </Location>
          </Auth>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
