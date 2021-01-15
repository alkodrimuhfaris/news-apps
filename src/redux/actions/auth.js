import services from '../../helpers/services';
import qs from 'qs';

export default {
  login: (data = {}) => ({
    type: 'LOGIN',
    payload: services().post('auth/user/login', qs.stringify(data)),
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
  register: (data = {}) => ({
    type: 'SIGN_UP',
    payload: services().post('auth/user/signup', qs.stringify(data)),
  }),
  setToken: (payload) => ({
    type: 'SET_TOKEN',
    payload,
  }),
};
