import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import AddProdPage from './pages/addProdPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,

  },
  {
    path: '/add-prod-page',
    element: <AddProdPage />,

  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
