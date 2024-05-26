import {Class} from "@/types/class";

export const getAllClasses = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch('https://wndbi.philipptrashman.dev/api/school_classes', {
        method: 'GET',
        headers,
    })

    if (response.status != 200) {
        throw new Error(response.statusText);
    } else {
        return await response.json() as Class[]
    }
};