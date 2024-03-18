import { AddSlot } from "../components/teacher/AddSlot";
import { SlotList } from "../components/teacher/SlotList";
import { TeacherSlots } from "../components/teacher/TeacherSlots";
import { useAuth } from "../hooks/authentication";
import { useMySlots } from "../hooks/teacher";
import { MyProject } from "./MyProject";

export function MySlots() {

    const { data: slots } = useMySlots()
    const { isSuccess, data: auth } = useAuth()

    return (
        <>
            {isSuccess && auth.type == "Teacher" ? <> <AddSlot /> </>: ""}

            <SlotList slots={slots} />

            {isSuccess && auth.type == "Student" ? <> <MyProject /> </>: ""}


        </>
    )
}