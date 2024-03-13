import { useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
    const userData = localStorage.getItem('user');
    const [user, setUser] = useState(userData)
    console.log(user)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;