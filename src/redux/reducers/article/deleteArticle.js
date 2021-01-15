const initialState = {
  success: false,
  error: false,
  pending: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'DELETE_ARTICLE_PENDING': {
      return {
        ...state,
        success: false,
        error: false,
        pending: true,
        message: 'Deleting article...',
      };
    }
    case 'DELETE_ARTICLE_REJECTED': {
      return {
        ...state,
        success: false,
        error: true,
        pending: false,
        message: action.payload.response.data.message,
      };
    }
    case 'DELETE_ARTICLE_FULFILLED': {
      return {
        ...state,
        success: false,
        error: false,
        pending: false,
        message: 'Success deleting article',
      };
    }
    case 'CLEAR_MESSAGE_DELETE': {
      return {
        ...state,
        ...initialState,
      };
    }
  }
};
