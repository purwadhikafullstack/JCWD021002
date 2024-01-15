import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Home } from './pages/home/Home';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Theme from './theme';
import { Location } from './hooks/geolocation';
import { Auth } from './pages/auth';

import { ChakraProvider, Flex } from '@chakra-ui/react';

import { WebSizeProvider } from './provider.websize';
import ScrollToTop from './scrollToTop';
import routesConfiq from './router/route.index';

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
                      {routesConfiq.map((route) => (
                        <Route key={route.path} {...route}>
                          {route.children && (
                            <Route>
                              {route.children.map((childRoute) => (
                                <Route key={childRoute.path} {...childRoute} />
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
