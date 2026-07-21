import { createBrowserRouter } from "react-router";
import Login from './pages/Login';
import Register from "./pages/Register";
import Protected from "./features/protected";
export const router= createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
     {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><h>Home Page</h></Protected>

    }


]);