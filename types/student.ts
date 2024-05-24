import {Parent} from "@/types/parent";
import {Subject} from "@/types/subject";

export type Student = {
    id: number;
    school_class_id: number;
    parents: Parent[];
    school_subjects: Subject[];
    homework_status: string;
}