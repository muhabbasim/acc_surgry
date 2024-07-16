import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "./apiRequest";

interface Props {
  children: React.ReactNode;
}

interface User {
  name: string;
  email: string;
  role?: string;
  type?: string;
}

interface AuthContextProps {
  // register: (formData: any) => void;
  login: (formData: any) => void;
  logout: () => void;
  currentUser: User | null;
}

const defaultContext: AuthContextProps = {
  // register: () => {},
  login: () => {},
  logout: () => {},
  currentUser: null,
};

export const AuthContext = createContext<AuthContextProps>(defaultContext)

export const AuthContextProvider = ({ children }: Props ) => {
  const route = useNavigate();
  
  // save user to the localStorage
  const [ currentUser, setCurrentUser ] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('ACC_USER');
    return storedUser ? JSON.parse(storedUser) : null;
  })


  // save token to localStorage
  const [token, setToken] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storeToken = localStorage.getItem('ACC_USER_TOKEN');
  
      if (storeToken) {
        try {
          // Attempt to parse the storeToken, and set it to null if parsing fails
          return JSON.parse(storeToken) || null;
        } catch (error) {
          console.error('Error parsing user data:', error);
          return null;
        }

      } else {
        return null;
      }
    }
    return null;
  });

  const login = async (formData: any) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/auth/login`, formData)

    setCurrentUser(res.data.user);
    setToken(res.data.access_token)

    route('/dashboards')
  }

  const logout = async () => {

    try {
      await api().post(`${import.meta.env.VITE_SERVER_API}/auth/logout`)
      
      setCurrentUser(null)
      setToken(null)
      route('/')

    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    localStorage.setItem('ACC_USER', JSON.stringify(currentUser))
    localStorage.setItem('ACC_USER_TOKEN', JSON.stringify(token))
  }, [currentUser, token])

  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      { children }
    </AuthContext.Provider>
  )
}