export const makeLogin = (email) => {
    return {
      type: 'LOGIN',
      payload: {
        email: email,
      },
    };
  };
  
  export const makeLogout = () => {
    return {
      type: 'LOGOUT',
    };
  };
  