import {StudentBrief} from "@/types/studentBrief";
import {addNewUser} from "@/api/userService";

export const fetchAllStudents = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch('https://wndbi.philipptrashman.dev/api/students', {
        method: 'GET',
        headers,
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as StudentBrief[]
    }
};

export const addNewStudent = async (
    username: string,
    email: string,
    password: string,
    name: string,
    last_name: string,
    birthday: string,
    school_class_id: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
    };
    await addNewUser(username, email, password, name, last_name, birthday);

    const body = JSON.stringify({
            "school_class_id": school_class_id
        }
    )

    const response = await fetch(`https://wndbi.philipptrashman.dev/api/users/${username}/student`, {
        method: 'POST',
        headers,
        body
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return await response.json();
    }
}

export const updateStudentByUsername = async (username: string, payload: {school_class_id: string}) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
    };
    const response = await fetch(`https://wndbi.philipptrashman.dev/api/users/${username}/student`, {
        method: 'PUT',
        headers,
        mode: 'cors',
        body: JSON.stringify(payload)
    })

    return response.status;
};