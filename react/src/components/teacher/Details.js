import { useParams } from "react-router-dom";

import '../../teacher.css'
import { TeacherSlots } from "./TeacherSlots";
import {ProfileDetails} from './ProfileDetails'

export function Details() {

  const { id } = useParams()


  return (
    <>
   
     <ProfileDetails id={id} />

     <TeacherSlots id={id}  />
     
    </>
  )
}