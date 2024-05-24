import {Student} from "@/types/student";
import {Teacher} from "@/types/teacher";
import {Parent} from "@/types/parent";

export type User = {
    id: string;
    name: string;
    last_name: string;
    birthday: string;
    username: string;
    email: string;
    contacts?: Contact[];
    student?: Student;
    parent?: Parent;
    teacher?: Teacher;
}

type Contact = {
    id: string;
    contactType: string;
    contact: string;
}