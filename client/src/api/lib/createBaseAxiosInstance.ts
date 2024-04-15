import axios, {CreateAxiosDefaults} from 'axios';

export const createBaseAxiosInstance = (
    configOverrides: CreateAxiosDefaults = {}
) => {
    return axios.create({
        baseURL: process.env.VITE_HOST_API,
        ...configOverrides,
    });
};
