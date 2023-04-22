import { useEffect, createContext, useReducer, useContext } from 'react';
import { getUserProfile } from '../api/user';
import { AUTH_TOKEN_STORAGE_KEY } from '../config/constants';

const INITIAL_AUTH_STATE = {
  isLoading: true,
  hasError: null,
  isAuthenticated: false,
  user: {},
  setUser: () => {},
};

const Context = createContext(INITIAL_AUTH_STATE);

const AUTH_REDUCER_ACTION_TYPES = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_HAS_ERROR: 'SET_HAS_ERROR',
  SET_USER_DATA: 'SET_USER_DATA',
  REMOVE_USER_DATA: 'REMOVE_USER_DATA',
  SET_IS_AUTHENTICATED: 'SET_IS_AUTHENTICATED',
};

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_REDUCER_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: Boolean(payload) };

    case AUTH_REDUCER_ACTION_TYPES.SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: Boolean(payload) };

    case AUTH_REDUCER_ACTION_TYPES.SET_USER_DATA:
      return { ...state, user: payload };

    default:
      console.error(`Unexpected reducer action type: ${type} in authReducer`);
  }
};

export const AuthProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  const setUser = userData => {
    // This function is only to set user data and not remove user data
    // Thus, if no userData return
    if (!userData) return;

    dispatch({ type: AUTH_REDUCER_ACTION_TYPES.SET_USER_DATA, payload: userData });
    dispatch({ type: AUTH_REDUCER_ACTION_TYPES.SET_IS_AUTHENTICATED, payload: true });
  };

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (!token) {
      dispatch({ type: AUTH_REDUCER_ACTION_TYPES.SET_IS_AUTHENTICATED, payload: false });
      dispatch({ type: AUTH_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: false });
      return;
    }

    // Get user data and store it in context if there is a token
    (async () => {
      const response = await getUserProfile();

      if (!response) {
        dispatch({ type: AUTH_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: false });
        return;
      }

      const [status, data] = response;

      if (status && data) {
        setUser(data);
      }

      dispatch({ type: AUTH_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: false });
    })();
  }, []);

  const value = {
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    setUser,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const AuthContext = () => useContext(Context);

export default AuthContext;
