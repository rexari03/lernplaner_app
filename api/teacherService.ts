import {StudentBrief} from "@/types/studentBrief";

export const fetchAllStudents = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch('https://wndbi.philipptrashman.dev/api/teachers', {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as StudentBrief[]
    }
};