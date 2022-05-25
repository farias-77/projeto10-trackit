import UserContext from "./contexts/UserContext";
import { useContext } from "react";

export default function Today(){
    
    const { userInfo, setUserInfo} = useContext(UserContext);
    
    return (
        <></>
    )
}