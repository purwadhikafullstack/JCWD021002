import { Transaction } from '../pages/Transaction';
import { ProtectLoggedInUser, ProtectUserRoute } from './protection.route';

const routeTransaction = [
  {
    path: '/transaction',
    element: (
      <ProtectLoggedInUser>
        <ProtectUserRoute>
          <Transaction />
        </ProtectUserRoute>
      </ProtectLoggedInUser>
    ),
  },
];

export default routeTransaction;
