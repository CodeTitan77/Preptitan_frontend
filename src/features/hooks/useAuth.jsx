import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register,logout, getMe } from "../api.auth";
import { useNavigate } from "react-router";


export const useAuth=()=>{
    const {user,setUser,loading,setLoading}= useContext(AuthContext);
    const navigate=useNavigate();

   const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user);
            navigate('/');
        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {
             console.log(err);

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {
             console.log(err);
        } finally {
            setLoading(false)
        }
    }
   

     return { user, loading, handleRegister, handleLogin, handleLogout }




}