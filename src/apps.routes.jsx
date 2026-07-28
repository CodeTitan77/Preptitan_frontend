import { createBrowserRouter } from "react-router";
import Login from './pages/Login';
import Register from "./pages/Register";
import Protected from "./features/protected";
import Home from './features/interview/pages/Home';
import Interview from "./features/interview/pages/Interview";
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
        element:<Protected><Home/></Protected>
    },
     {
        path:"/interview",
        element:<Protected><Interview/></Protected>
    },



]);