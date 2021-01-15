const initialState = {
  data: [],
  pending: false,
  error: false,
  success: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_CATEGORIES_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        alertMsg: 'Getting articles...',
      };
    }
    case 'GET_ALL_CATEGORIES_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        data: action.payload.data.results,
        alertMsg: 'Get categories success',
      };
    }
    case 'GET_ALL_CATEGORIES_REJECTED': {
      return {
        ...state,
        pending: false,
        error: true,
        success: false,
        alertMsg: action.payload.response.data.message,
      };
    }
    default: {
      return state;
    }
  }
};
