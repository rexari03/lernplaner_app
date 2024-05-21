import {Student} from "@/types/student";

export const fetchAllStudents = async () => {
    const headers = {
        'Authorization': '',
    };
    const response = await fetch('https://wndbi.philipptrashman.dev/api/students', {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as Student[]
    }
};