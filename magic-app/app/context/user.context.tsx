"use client";
import { useState, createContext } from 'react';

const userContext: any = createContext(null);

const UserProvider = (props: any) => {
    const [userState, setUserState] = useState(null)

    return <userContext.Provider value={{userState, setUserState}}>
        {props.children}
    </userContext.Provider>
}

export { userContext as userContext, UserProvider as UserProvider }
