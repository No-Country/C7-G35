import {
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';

const Router = createBrowserRouter([
  {
    path: '/home',
    element: <Landing/>,
  },
  {
    path: '/form-add-pet',
    element: 'add pet',
  },
  {
    path: '/login',
    element: <Login/>,
  },
]);

export default Router;
