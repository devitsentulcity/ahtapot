import ApiManager from "../ApiManager";

export const userRegister = async data => {
    try {
        const result = await ApiManager('msales/public/register', {
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