export const loginUser = async (username: string, password: string) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ywPjSh5r4Q2kgKOdzxaSvTu1RM4VU3o7',
    };

    const body = JSON.stringify({
        "username": username,
        "password": password
    });

    const response = await fetch('https://wndbi.philipptrashman.dev/api/login', {
        method: 'POST',
        headers,
        body,
        mode: 'cors'
    });

    if (response.status != 200) {
        response.text().then(content => {
            console.log(content);
        });
    } else {
        const content = await response.json();
        console.log(content);
        return content;
    }
};