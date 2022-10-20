import { createBrowserRouter } from 'react-router-dom';
import AddPet from './pages/AddPet/AddPet';
import AddLostPet from './pages/AddPet/AddLostPet';
import AddPhoto from './pages/AddPet/AddPhoto';
import DetailPet from './pages/detailPet/DetailPet';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import VerTodos from './pages/verTodos/VerTodos';
import UserProfile from './pages/userProfile/UserProfile';
import AddFoundPet from './pages/AddPet/AddFoundPet';
import Layout from './componentes/layout/Layout';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/form-add-pet',
        element: <AddPet />,
      },
      {
        path: '/form-add-lost-pet',
        element: <AddLostPet />,
      },
      {
        path: '/form-add-found-pet',
        element: <AddFoundPet />,
      },
      {
        path: '/add-photo',
        element: <AddPhoto />,
      },
      {
        path: '/see-all-lost',
        element: <VerTodos/>,
      },
      {
        path: '/detail-pet/:state/:id',
        element: <DetailPet />,
      },
      {
        path: '/user',
        element: <UserProfile />,
      },
    ],
  },
]);

export default Router;
