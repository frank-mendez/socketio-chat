import axios, {CreateAxiosDefaults} from 'axios';

export const createBaseAxiosInstance = (
    configOverrides: CreateAxiosDefaults = {}
) => {
    return axios.create({
        baseURL: 'http://localhost:3000',
        ...configOverrides,
    });
};
