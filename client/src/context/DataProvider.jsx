import { createContext , useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {

    const [userAccount , setUserAccount] = useState({ username : ''})

    return (
        <DataContext.Provider value={{userAccount , setUserAccount}}>
            {props.children}
        </DataContext.Provider>
    )
}