import {
  createBrowserRouter,
  Route,
} from 'react-router-dom';
import Landing from './pages/landing/Landing';

const Router = createBrowserRouter([
  {
    path: '/home',
    element: <Landing/>,
  },
  {
    path: '/form-add-pet',
    element: 'add pet',
  },
]);

export default Router;
