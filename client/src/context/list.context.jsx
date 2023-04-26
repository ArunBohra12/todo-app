import { useEffect, createContext, useContext, useReducer } from 'react';
import { getAllLists } from '../api/list';

const INITIAL_LIST_STATE = {
  hasError: false,
  isLoading: true,
  lists: [],
  selectedList: {
    type: 'smart-list',
    id: 'my-day',
  },
};

const Context = createContext();

// Functions to get data for the context provider
const getListsData = async () => {
  const listsData = await getAllLists();

  if (!listsData || listsData[0] !== true) {
    return;
  }

  // Index 1 in listsData consists the actual data needed
  return listsData[1];
};

const LIST_REDUCER_ACTION_TYPES = {
  SET_HAS_ERROR: 'SET_HAS_ERROR',
  SET_LISTS_DATA: 'SET_LISTS_DATA',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_SELECTED_LIST: 'SET_SELECTED_LIST',
};

const listReducer = (state = INITIAL_LIST_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LIST_REDUCER_ACTION_TYPES.SET_HAS_ERROR:
      return { ...state, hasError: payload };
    case LIST_REDUCER_ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: Boolean(payload) };
    case LIST_REDUCER_ACTION_TYPES.SET_LISTS_DATA:
      return { ...state, lists: payload };
    case LIST_REDUCER_ACTION_TYPES.SET_SELECTED_LIST:
      return { ...state, selectedList: payload };
    default:
      console.error(`Unexpected reducer action type: ${type} in listReducer`);
  }
};

export const ListProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(listReducer, INITIAL_LIST_STATE);

  useEffect(() => {
    (async () => {
      dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: true });

      const lists = await getListsData();

      if (lists) {
        dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_LISTS_DATA, payload: lists });
      }

      dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: false });
    })();
  }, []);

  const setSelectedList = (type, id) => {
    dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_SELECTED_LIST, payload: { type, id } });
  };

  const value = {
    ...state,
    setSelectedList,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const ListContext = () => useContext(Context);

export default ListContext;
