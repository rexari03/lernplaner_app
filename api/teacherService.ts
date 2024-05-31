import { Teacher } from "@/types/teacher";
import {addNewUser} from "@/api/userService";

export const getAllTeachers = async () => {
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
        return await response.json() as Teacher[]
    }
};

export const addNewTeacher = async (
    username: string,
    email: string,
    password: string,
    name: string,
    last_name: string,
    birthday: string,
    abbreviation: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };

    await addNewUser(username, email, password, name, last_name, birthday);

    const response = await fetch(`https://wndbi.philipptrashman.dev/api/users/${username}/teacher`, {
        method: 'POST',
        headers,
        mode: 'cors',
        body: JSON.stringify({"abbreviation": abbreviation}),
    })

    return response.status;
}
