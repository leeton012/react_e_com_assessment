import './App.css';
import Header from './components/Header';
import { store } from './Store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ProductList from './Views/ProductList';
import ProductDetails from './Views/ProductDetails';
import ViewCart from './Views/ViewCart';
import Error from './components/Error';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      {
        path: '/productDetail/:id',
        element: <ProductDetails />,
      },
      {
        path: '/cart',
        element: <ViewCart />,
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
