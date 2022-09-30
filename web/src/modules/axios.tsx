import axios from 'axios';

export const getApiClient = (baseURL: string = 'http://localhost:4000') => {
  return axios.create({
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
    baseURL,
  });
};
