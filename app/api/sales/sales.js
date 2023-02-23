import ApiManager from '../ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const salesList = async data => {
    try {
        const dataToken = await AsyncStorage.getItem('AccessToken');
        const result = await ApiManager('public/api/user?page=&item=0', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + dataToken,
                'content-type': 'application/json',
            },
            data: data,
        });
        return result;
    } catch (error) {
        return error;
    }
};
