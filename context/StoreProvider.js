import React, { Children, createContext, useState } from 'react'

export const StoreContext = createContext();

export default function StoreProvider({ children }) {

    const [isNavbarVisible, setIsNavbarVisible] = useState(false)
    const [isHeaderNotiVisible, setIsHeaderNotiVisible] = useState(false)
    const [isSettingVisible, setIsSettingVisible] = useState(false)

    return (
        <StoreContext.Provider value={{
            isNavbarVisible, setIsNavbarVisible,
            isHeaderNotiVisible, setIsHeaderNotiVisible,
            isSettingVisible, setIsSettingVisible
        }}>
            {children}
        </StoreContext.Provider>
    )
}
