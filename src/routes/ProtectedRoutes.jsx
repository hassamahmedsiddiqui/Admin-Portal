import { useEffect, useContext } from "react";
import UserContext from "../Context/User/userContext";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
    const { user } = useContext(UserContext);
    console.log(user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user,navigate])
    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected;