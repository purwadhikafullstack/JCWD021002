import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Home } from './pages/home/Home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { SetPassword } from './pages/setPassword';
import { Location } from './hooks/geolocation';
import { Auth } from './pages/auth';
import { Profile } from './pages/profile';
import { LoggedInUser, LoginRoute } from './pages/auth/loggedInUser';
import { VerifySentMail } from './pages/register/verifySentMail';
import EditUser from './pages/EditUser/EditUser';
import AddUser from './pages/AddUser/AddUser';
import ProductDetail from './pages/ProductDetail/Product';
import ProductSearch from './pages/ProductSearch/ProductSearch';
import CategoryLists from './pages/CategoryLists/CategoryLists';
import UserLists from './pages/UserLists/UserLists';
import UserDetail from './pages/UserDetail/UserDetail';

import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

import Theme from './theme';
import { store } from './redux/store';
import { MyAccount } from './pages/profile/myAccount';
import { EditProfile } from './pages/profile/editProfile';
import { ChangePassword } from './pages/profile/changePassword';
import { ChangeEmail } from './pages/profile/changeEmail';
import { ChangeEmailVerfy } from './pages/profile/changeEmailVerify';
import { MyAddress } from './pages/profile/myAddress';
import { AddAddress } from './pages/profile/addAddress';
import { Cart } from './pages/Cart';

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
                        path="/profile/personal-information"
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
                        path="/profile/personal-information/account"
                        element={
                          <LoggedInUser>
                            <MyAccount
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoggedInUser>
                        }
                      />
                      <Route
                        path="/profile/personal-information/address"
                        element={
                          <LoggedInUser>
                            <MyAddress
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoggedInUser>
                        }
                      />
                      <Route
                        path="/profile/personal-information/address/addAddress"
                        element={
                          <LoggedInUser>
                            <AddAddress
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoggedInUser>
                        }
                      />
                      <Route
                        path="/profile/personal-information/account/change-password"
                        element={
                          <LoggedInUser>
                            <ChangePassword
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoggedInUser>
                        }
                      />
                      <Route
                        path="/profile/personal-information/account/email-verification"
                        element={
                          <LoggedInUser>
                            <ChangeEmailVerfy
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoggedInUser>
                        }
                      />
                      <Route
                        path="/profile/personal-information/account/change-email"
                        element={
                          <LoggedInUser>
                            <ChangeEmail
                              size={webSize === 'mobile' ? '500px' : '100vw'}
                              handleWebSize={handleWebSize}
                            />
                          </LoggedInUser>
                        }
                      />
                      <Route
                        path="/profile/personal-information/account/edit-profile"
                        element={
                          <LoggedInUser>
                            <EditProfile
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
                      <Route
                        path="/product-detail/:id"
                        element={
                          <ProductDetail
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/product-search"
                        element={
                          <ProductSearch
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/category-lists"
                        element={
                          <CategoryLists
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/user-lists"
                        element={
                          <UserLists
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/detail-user/:id"
                        element={
                          <UserDetail
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/add-user"
                        element={
                          <AddUser
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/edit-user/:id"
                        element={
                          <EditUser
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
                        }
                      />
                      <Route
                        path="/cart"
                        element={
                          <Cart
                            size={webSize === 'mobile' ? '500px' : '100vw'}
                            handleWebSize={handleWebSize}
                          />
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
