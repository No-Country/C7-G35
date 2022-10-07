import {
  createBrowserRouter,
} from 'react-router-dom';
import AddPet from './pages/AddPet/AddPet';
import Landing from './pages/landing/Landing';

const Router = createBrowserRouter([
  {
    path: '/home',
    element: <Landing/>,
  },
  {
    path: '/form-add-pet',
    element: <AddPet/>,
  },
]);

export default Router;
