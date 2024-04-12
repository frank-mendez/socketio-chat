import {QueryClient, QueryClientConfig} from '@tanstack/react-query';

export const createQueryClient = (configOverrides: QueryClientConfig = {}) => {
    return new QueryClient(configOverrides);
};
