import React, { createContext, useState } from "react";
import { account } from "../lib/appwrite";
import { ID, type Models } from "appwrite";
import { useEffect, useContext } from "react";
import { verify } from "../Store/Services/editFunctions";

const useUser = () => verify(
    useContext(userContext)
);

type userContextState = {
    user: Models.User | null
    register: Function,
    login: Function,
    logout: Function
} | null

const userContext = createContext<userContextState>(null);

type UserContextProviderType = {
    children: React.ReactNode
}

const UserContextProvider: React.FC<UserContextProviderType> = ({ children }) => {
    const [user, setUser] = useState<Models.User | null>(null);

    const login = async (email: string, password: string) => {
        await account.createEmailPasswordSession({
            email,
            password
        });

        setUser(await account.get());
        window.location.replace("/");                   //redirect на главную
    }

    const logout = async () => {
        await account.deleteSession({
            sessionId: "current"
        });

        setUser(null);
    }

    const register = async (email: string, password: string) => {
        await account.create(
            {
                userId: ID.unique(),
                email,
                password
            }
        );

        await login(email, password);
    }

    const init = async() => {
        try {
            const user = await account.get();
            setUser(user);
        } catch (error) {
            setUser(null);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <userContext.Provider value={{ user, register, login, logout }}>
            { children }
        </userContext.Provider>
    )
}

export { 
    useUser,
    UserContextProvider
}