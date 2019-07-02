import axios from 'axios';

import auth from './auth';

const TemplateAPI = () => {
  const r = (url, extra = {}) => {
    const headers = {
      // 'Content-Type': 'application/json',
      // 'Cache-Control': 'no-cache',
      // 'Pragma': 'no-cache',
      // 'Access-Control-Allow-Origin': '*'
    };
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    extra.headers = extra.headers || {};

    axios.defaults.baseURL = extra && extra.baseURL ? extra.baseURL : '/api/v1/control';
    return new Promise((resolve, reject) => {
      axios({
        url,
        ...extra,
        headers: {
          ...headers,
          ...extra.headers,
        },
        timeout: 60000,
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return {
    auth: auth(r),

    request: r,
  };
};

const api = TemplateAPI();

export default api;
export const { request } = api;
