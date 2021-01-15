import jwt_decode from 'jwt-decode';
const initialState = {
  isLogin: false,
  token: '',
  id: 0,
  pending: false,
  error: false,
  success: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      console.log('login pending');
      return {
        ...state,
        isLogin: false,
        pending: true,
        error: false,
        success: false,
        alertMsg: 'Logging in ...',
      };
    }
    case 'LOGIN_FULFILLED': {
      const {token} = action.payload.data;
      const {id} = jwt_decode(token);
      console.log('login fullfiled');
      return {
        ...state,
        isLogin: true,
        error: false,
        pending: false,
        success: true,
        token,
        id,
        alertMsg: 'Login succesful',
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLogin: false,
        error: true,
        pending: false,
        success: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
