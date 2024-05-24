import {Subject} from "@/types/subject";

export type Teacher = {
    id: number;
    school_class: number | null;
    school_subjects: Subject[];
}