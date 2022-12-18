import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import GallaryDetail from './components/GallaryDetail';
import GallaryList from './components/GallaryList';

declare global {
  interface Window {
    getHelloWorld: any;
    xhrGet: any;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <GallaryList />,
  },
  {
    path: "/g/:gid/:gtoken/",
    element: <GallaryDetail />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
