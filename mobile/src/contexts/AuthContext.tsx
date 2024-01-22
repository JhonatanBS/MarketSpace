import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState(
    {
      id: "1",
      avatar: "jhonatan.png",
      name: "Jhonatan",
      email: "jhonatan@gmail.com",
      password: "1234567",
      phone: "6146565656"
    }
  );

  function signIn(email: string, password: string) {
    setUser({
      avatar: "",
      id: "",
      email,
      name: "",
      password,
      phone: ""
    });
  }

  return(
    <AuthContext.Provider value={{ user, signIn }}>
      { children }
    </AuthContext.Provider>
  )
}