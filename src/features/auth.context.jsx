import {createContext,useEffect,useState} from "react";
import { getMe } from "./api.auth";
export const AuthContext= createContext();

export const AuthProvider= ({children})=>{
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(null);
     useEffect(()=>{
        const getSetUser= async() =>{
            try{
              const data = await getMe();
              setUser(data.user);
            }
            catch(err){
              console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
        getSetUser();

    },[])
    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )

}
