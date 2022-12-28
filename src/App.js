import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="container mx-auto px-2">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
