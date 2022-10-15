import {
  createBrowserRouter,
} from 'react-router-dom';
import AddPet from './pages/AddPet/AddPet';
import AddLostPet from './pages/AddPet/AddLostPet';
import AddPhoto from './pages/AddPet/AddPhoto';
import DetailPet from './pages/detailPet/DetailPet';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import VerTodos from './pages/verTodos/VerTodos';

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
    path: '/form-add-lost-pet',
    element: <AddLostPet/>,
  },
  {
    path: '/add-photo',
    element: <AddPhoto/>,
  },
  {
    path: '/detail-pet',
    element: <DetailPet/>,
  },
  {
    path: '/see-all-lost',
    element: <VerTodos/>,
  },
]);

export default Router;
