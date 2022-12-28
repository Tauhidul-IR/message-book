import { createBrowserRouter } from "react-router-dom";
import About from "../components/Pages/About/About";
import Home from "../components/Pages/Home/Home";
import Login from "../components/Pages/Login/Login";
import SingUp from "../components/Pages/Login/SingUp";
import PostDetails from "../components/Pages/Posts/PostDetails";
import Posts from "../components/Pages/Posts/Posts";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

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
            {
                path: '/posts/:id',
                element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:4000/posts/${params.id}`)
            }
        ]
    }
])
export default router;