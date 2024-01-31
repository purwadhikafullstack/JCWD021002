import ErrorPage from '../error.page';
import { Home } from '../pages/home/Home';
import { ProtectUserRoute } from './protection.route';

const routeHome = [

  {
    path: '/',
    element: (
      <ProtectUserRoute>
        <Home />
      </ProtectUserRoute>
    ),
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default routeHome;
