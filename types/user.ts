import {StudentBrief} from "@/types/studentBrief";
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
    student?: StudentBrief;
    parent?: Parent;
    teacher?: Teacher;
}

export type Contact = {
    id: string;
    contactType: string;
    contact: string;
}