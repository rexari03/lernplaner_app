import {User} from "@/types/user";

export const getAllUsers = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch('https://wndbi.philipptrashman.dev/api/users', {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as User[]
    }
};

export const getUserByUsername = async (username: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://wndbi.philipptrashman.dev/api/users/${username}`, {
        method: 'GET',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as User
    }
};

export const addNewUser = async (
    username: string,
    email: string,
    password: string,
    name: string,
    last_name: string,
    birthday: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
        "username": username,
        "email": email,
        "password": password,
        "name": name,
        "last_name": last_name,
        "birthday": birthday
    });
    const response = await fetch('https://wndbi.philipptrashman.dev/api/users', {
        method: 'POST',
        headers,
        body,
    })

    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return await response.json();
    }
};

export const deleteUserByUsername = async (username: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://wndbi.philipptrashman.dev/api/users/${username}`, {
        method: 'DELETE',
        headers,
        mode: 'cors'
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as User
    }
}
