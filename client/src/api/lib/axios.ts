import { createBaseAxiosInstance } from './createBaseAxiosInstance';
import Qs from 'query-string';

// Extends the base axios instance with any custom config options you may need in your apps (e.g. mobile, admin)
export const axios = createBaseAxiosInstance({
  // `paramsSerializer` is an optional function responsible for serializing `params`.
  // For instance, if `populate` is an array ['stores', 'locations'], it will be transformed into
  // a query string like populate=stores&populate=locations using the Qs library.
  paramsSerializer: function (params) {
    return Qs.stringify(params);
  },
});
