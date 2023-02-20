import ApiManager from "../ApiManager";

export const userLogin = async data => {
    try {
        const result = await ApiManager('public/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error;
    }
}