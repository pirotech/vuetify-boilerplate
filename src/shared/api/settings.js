import axios from 'axios';
import store, { REMOVE_TOKEN } from '../../store';
import router from '../../router';

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

axios.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 401) {
    store.commit({
      type: REMOVE_TOKEN,
    });
    router.push('/login');
  }
  return Promise.reject(error);
});
