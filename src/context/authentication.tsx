import React, {createContext} from 'react'

interface authContextI {
    login: (username: string, password: string) => Promise<void>,
    logout: () => void,
    logged: boolean,
}

export const Context = createContext<authContextI | null>(null)
