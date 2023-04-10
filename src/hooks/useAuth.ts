import { useState } from "react";
import { authService, userType } from "../utils/authService";

const useAuth = () => {
    const {user : AuthUser} = authService();
    const [user,setUser]   = useState<userType | null>(AuthUser);
    return {user,setUser};
}
export default useAuth;