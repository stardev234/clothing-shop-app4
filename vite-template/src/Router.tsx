import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import AddProdPage from './pages/addProdPage/addProdPage';
import CheckProdPage from './pages/checkProdPage/components/checkProdPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,

  },
  {
    path: '/add-prod-page',
    element: <AddProdPage />,

  },
  {
    path: '/check-prod-page',
    element: <CheckProdPage/>,

  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
