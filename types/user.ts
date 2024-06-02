import {StudentBrief} from "@/types/studentBrief";
import {Teacher} from "@/types/teacher";
import {Parent} from "@/types/parent";
import {StudentInfo} from "@/types/studentInfo";

export type User = {
    id: string;
    name: string;
    last_name: string;
    birthday: string;
    username: string;
    email: string;
    contacts?: Contact[];
    student?: StudentInfo;
    parent?: Parent;
    teacher?: Teacher;
}

export type Contact = {
    id: string;
    contactType: string;
    contact: string;
}