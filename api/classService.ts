import {Class} from "@/types/class";

export const getAllClasses = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch('https://wndbi.philipptrashman.dev/api/school_classes', {
        method: 'GET',
        headers,
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as Class[]
    }
};

export const addNewClass = async (
    name: string,
    grade_id: string,
    head_teacher_id: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const body = JSON.stringify({
        "name": name,
        "grade_id": grade_id,
        "head_teacher_id": head_teacher_id
    });

    const response = await fetch('https://wndbi.philipptrashman.dev/api/school_classes', {
        method: 'POST',
        headers,
        mode: 'cors',
        body
    });
    return response.status;
}