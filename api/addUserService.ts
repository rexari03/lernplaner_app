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