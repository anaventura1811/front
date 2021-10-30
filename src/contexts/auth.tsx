import { createContext, ReactNode, useMemo, useContext, useEffect, useState } from "react";
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => {};
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

const CLIENT_ID = import.meta.env.VITE_APP_GITHUB_CLIENT_ID;

export function AuthProvider(props: AuthProvider) {

  const { children } = props;

  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/`;

  const signIn = async (code: string) => {
    const response = await api.post<AuthResponse>('authenticate', {
      code,
    });

    const { token, user } = response.data;

    localStorage.setItem('@doWhile:token', token);
    
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  const userData = useMemo(() => {
   return user;
  }, [user]);

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('@doWhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@doWhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(async (res) => {
        await setUser(res.data);
      }).catch((e) => console.log(e.message));
    }
    
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);
  
      signIn(githubCode);
    }
    return () => {
     
    }
  }, []);

  const contextValue = {
    signInUrl,
    user,
    userData,
    signOut
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const value = useContext(AuthContext);
  return value;
}
