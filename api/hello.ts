export const fetchHelloWorld = async () => {
    const headers = {
        'Authorization': 'Bearer ywPjSh5r4Q2kgKOdzxaSvTu1RM4VU3o7',
    };
    const response = await fetch('https://wndbi.philipptrashman.dev/api/hello', { headers, mode: 'cors' })

    if (response.status != 200) {
        console.log(response.statusText);
    } else {
        response.text().then(content => {
            console.log(content);
        });
        return response;
    }
};