import ApiManager from '../ApiManager';

export const banner = async data => {
  try {
    const result = await ApiManager('pub/slider', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      //   data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const cluster = async data => {
  try {
    const result = await ApiManager('pub/cluster', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      //   data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const fasilitas = async data => {
  try {
    const result = await ApiManager('pub/fasilitas', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      //   data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
