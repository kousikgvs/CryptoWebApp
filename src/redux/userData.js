const initialState = {
  isLoggedIn: false,
  email: null,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        email: action.payload.email,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        email: null,
      };
    default:
      return state;
  }
};

export default userDataReducer;
