import {
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import DetailPet from './pages/detailPet/DetailPet';
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
  {
    path: '/detail-pet',
    element: <DetailPet/>,
  },
]);

export default Router;
