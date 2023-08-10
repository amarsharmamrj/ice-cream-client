import { useContext } from "react"
import { UserContext } from "./userContext"
import { useNavigate } from 'react-router-dom';

const CheckPageAccess = ()=> {
    const { user } = useContext(UserContext);
    console.log("@user:", user)
    const history = useNavigate();

    if(user !== null){
        if(user.user.role === 'admin'){
            console.log("--user has access of the page !----")
        }else {
            console.log("--user has no access of the page !----")
            history('../unauthorized')
            setTimeout(() => {
                history('../')
            }, 4000)
        }
    }else {
        console.log("--user has not logged in !----")
        history('../')
    }
}

export default CheckPageAccess;