import React, { Children, createContext, useState } from 'react'

export const StoreContext = createContext();

export default function StoreProvider({ children }) {

    const [isNavbarVisible, setIsNavbarVisible] = useState(false)
    

    return (
        <StoreContext.Provider value={{ isNavbarVisible, setIsNavbarVisible }}>
            {children}
        </StoreContext.Provider>
    )
}
