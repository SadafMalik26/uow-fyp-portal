import { ProfileDetails } from "../components/teacher/ProfileDetails"
import { useAuth } from "../hooks/authentication"
import { EditProfile } from "./EditProfile"

export const Profile = () =>{
    const {isSuccess,data:auth}=useAuth()
    return (
        <>
        
        {isSuccess ?  <EditProfile id={auth?.id}/> : ""}
        
        </>
    )
}