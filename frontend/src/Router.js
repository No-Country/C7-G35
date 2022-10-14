import {
  createBrowserRouter,
} from 'react-router-dom';
import AddPet from './pages/AddPet/AddPet';
import AddPhoto from './pages/AddPet/AddPhoto';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';

const Router = createBrowserRouter([
  {
    path: '/home',
    element: <Landing/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/form-add-pet',
    element: <AddPet/>,
  },
  {
    path: '/add-photo',
    element: <AddPhoto/>,
  },
]);

export default Router;
