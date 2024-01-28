import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Home } from './pages/home/Home';
import { Toaster } from 'react-hot-toast';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import Theme from './theme';
import { Location } from './utils/geolocation';
import { Auth } from './auth';

import { ChakraProvider, Flex } from '@chakra-ui/react';

import { WebSizeProvider } from './provider.websize';
import ScrollToTop from './scrollToTop';
import routesConfiq from './router';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Provider store={store}>
          <ChakraProvider theme={Theme}>
            <Auth>
              <Location>
                <WebSizeProvider>
                  <Flex
                    justify={'center'}
                    w={'100vw'}
                    minH={'100vh'}
                    bgColor={'#DAF1E8FF'}
                  >
                    <Routes>
                      {/* <Route path="/" element={<Home />} /> */}
                      {routesConfiq.map((route, index) => (
                        <Route key={index} {...route}>
                          {route.children && (
                            <Route>
                              {route.children.map((childRoute, index) => (
                                <Route key={index} {...childRoute} />
                              ))}
                            </Route>
                          )}
                        </Route>
                      ))}
                    </Routes>
                  </Flex>
                  <Toaster position="center-bottom" />
                </WebSizeProvider>
              </Location>
            </Auth>
          </ChakraProvider>
        </Provider>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
