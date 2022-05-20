import { createContext,useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setuser] = useState({})
    const [token, settoken] = useState("")
    const [isFetching, setisFetching] = useState(false)
    return (
        <AuthContext.Provider value={{ user,setuser,isFetching,setisFetching ,token,settoken}}>
            {children}
        </AuthContext.Provider>
    )
}