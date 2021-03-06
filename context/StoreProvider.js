import React, { Children, createContext, useState } from 'react'

export const StoreContext = createContext();

export default function StoreProvider({ children }) {

    const [isNavbarVisible, setIsNavbarVisible] = useState(false)
    const [isHeaderNotiVisible, setIsHeaderNotiVisible] = useState(false)
    const [isSettingVisible, setIsSettingVisible] = useState(false)
    const [searchResultVisible, setSearchResultVisible] = useState(false);
    const [isStoryVisible, setIsStoryVisible] = useState(false);
    const [isUpdateByCreate, setIsUpdateByCreate] = useState(false)
    const [isChatBoxVisible, setIsChatBoxVisible] = useState(false)
    const [searchMessVisible, setSearchMessVisible] = useState(false);
    const [messSearchValue, setMessSearchValue] = useState('')

    return (
        <StoreContext.Provider value={{
            isNavbarVisible, setIsNavbarVisible,
            isHeaderNotiVisible, setIsHeaderNotiVisible,
            isSettingVisible, setIsSettingVisible,
            searchResultVisible, setSearchResultVisible,
            isStoryVisible, setIsStoryVisible,
            isUpdateByCreate, setIsUpdateByCreate,
            isChatBoxVisible, setIsChatBoxVisible,
            searchMessVisible, setSearchMessVisible,
            messSearchValue, setMessSearchValue
        }}>
            {children}
        </StoreContext.Provider>
    )
}
