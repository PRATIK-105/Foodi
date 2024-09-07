import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Signup from '../components/Signup';
import PrivateRouter from '../PrivateRouter/PrivateRouter';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import Menu from '../pages/shop/Menu';
import Cart from '../pages/shop/Cart';
import DashboardLayout from '../layout/DashboardLayout';
import AddMenu from '../pages/dashboard/admin/AddMenu';
import ManageItems from '../pages/dashboard/admin/ManageItems';
import Users from '../pages/dashboard/admin/Users';
import Dashboard from '../pages/dashboard/admin/Dashboard';
import UpdateMenu from '../pages/dashboard/admin/UpdateMenu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      {
        path: '/menu',
        element: (
          <PrivateRouter>
            <Menu />
          </PrivateRouter>
        ),
      },

      {
        path: '/cart',
        element: (
          <div className="min-h-screen">
            {' '}
            <PrivateRouter>
              <Cart />
            </PrivateRouter>
          </div>
        ),
      },

      {
        path: '/updateprofile',
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },

  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'add-menu',
        element: <AddMenu />,
      },
      {
        path: 'manage-items',
        element: <ManageItems />,
      },
      {
        path: 'update-menu/:id',
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`http://localhost:3001/api/v1/menus/${params.id}`),
      },
    ],
  },
]);

export default router;
