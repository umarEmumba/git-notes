import { Dispatch, SetStateAction, createContext } from "react";
import { userType } from "../utils/authService";

interface userContextInterface {
    user:  userType | null;
    setUser: Dispatch<SetStateAction<userType | null>>;
  }
  
const userContext = createContext<userContextInterface>({user : null, setUser : ()=>{}});
export default userContext;