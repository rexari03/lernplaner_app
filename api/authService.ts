export const loginUser = async (email: string, pass: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };

    const response = await fetch('https://wndbi.philipptrashman.dev/api/login', {
        method: 'POST',
        headers,
        mode: 'cors',
        body: JSON.stringify({
            "username": email,
            "password": pass
        } )
    })

    if (response.status != 200) {
        return 401
    } else {
        return await response.json();
    }
};