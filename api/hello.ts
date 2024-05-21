export const fetchHelloWorld = async () => {
    const headers = {
        'Authorization': '',
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