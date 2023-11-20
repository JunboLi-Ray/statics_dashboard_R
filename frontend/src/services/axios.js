import axios from 'axios';
import querystring from 'query-string';

const request = axios.create({});

request.interceptors.request.use((config) => ({
  ...config,
  paramsSerializer: (params) => querystring.stringify(params),
}));

request.interceptors.response.use(
  (response) => {
    if (response.headers && response.headers.user) {
      window.localStorage.setItem('user', response.headers.user);
    }
    return response;
  },
  (error) => {
    const newError = error;
    if (error.response && error.response.data && error.response.data.error) {
      newError.message = error.response.data.error;
    }

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(newError);
        case 401:
          return Promise.reject(newError);

        case 403:
          return Promise.reject(newError);

        case 404:
          return Promise.reject(newError);

        case 408:
          return Promise.reject(newError);

        case 500:
          return Promise.reject(newError);

        case 501:
          return Promise.reject(newError);

        case 502:
          return Promise.reject(newError);

        case 503:
          return Promise.reject(newError);

        case 504:
          return Promise.reject(newError);

        case 505:
          return Promise.reject(newError);
      }
    }

    if (error.response && error.response.headers && error.response.headers.user) {
      window.localStorage.setItem('user', error.response.headers.user);
    }

    return Promise.reject(newError);
  },
);

export default request;
