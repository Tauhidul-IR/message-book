import { createBrowserRouter } from "react-router-dom";
import About from "../components/Pages/About/About";
import Home from "../components/Pages/Home/Home";
import Login from "../components/Pages/Login/Login";
import SingUp from "../components/Pages/Login/SingUp";
import Posts from "../components/Pages/Posts/Posts";
import Main from "../layout/Main";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SingUp></SingUp>
            },
            {
                path: '/posts',
                element: <Posts></Posts>
            },
        ]
    }
])
export default router;