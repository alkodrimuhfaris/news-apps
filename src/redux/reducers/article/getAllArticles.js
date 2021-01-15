const initialState = {
  data: [],
  pending: false,
  error: false,
  success: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ARTICLES_PENDING': {
      return {
        ...state,
        pending: true,
        error: false,
        success: false,
        alertMsg: 'Getting articles...',
      };
    }
    case 'GET_ALL_ARTICLES_FULFILLED': {
      return {
        ...state,
        pending: false,
        error: false,
        success: true,
        data: action.payload.data.results,
        alertMsg: 'get data succeed',
      };
    }
    case 'GET_ALL_ARTICLES_REJECTED': {
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
