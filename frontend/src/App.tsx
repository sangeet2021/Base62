import './App.css';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './Router';

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
