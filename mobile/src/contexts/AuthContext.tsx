import { ReactNode, createContext } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return(
    <AuthContext.Provider value={{
      user: {
        id: "1",
        avatar: "jhonatan.png",
        name: "Jhonatan",
        email: "jhonatan@gmail.com",
        password: "1234567",
        phone: "6146565656"
      }
    }}>
      { children }
    </AuthContext.Provider>
  )
}