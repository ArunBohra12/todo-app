import { useEffect, createContext, useContext, useReducer } from 'react';
import {
  getAllLists,
  getAllTasksList,
  getCustomListDetails,
  getSearchListDetails,
  getSmartListDetails,
} from '../api/list';

const INITIAL_LIST_STATE = {
  hasError: false,
  isLoading: true,
  lists: [],
  selectedList: {
    type: 'smart-list',
    id: 'my-day',
  },
  selectedListData: {},
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
  SET_SELECTED_LIST_DATA: 'SET_SELECTED_LIST_DATA',
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
    case LIST_REDUCER_ACTION_TYPES.SET_SELECTED_LIST_DATA:
      return { ...state, selectedListData: payload };
    default:
      console.error(`Unexpected reducer action type: ${type} in listReducer`);
  }
};

export const ListProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(listReducer, INITIAL_LIST_STATE);

  const setSelectedList = async (type, id) => {
    dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: true });
    dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_SELECTED_LIST, payload: { type, id } });

    await setSelectedListData(type, id);

    dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: false });
  };

  const setSelectedListData = async (selectedListType, selectedListId) => {
    let listData = {};

    switch (selectedListType) {
      case 'all-tasks':
        listData = await getAllTasksList();
        break;

      case 'smart-list':
        listData = await getSmartListDetails(selectedListId);
        break;

      case 'search':
        listData = await getSearchListDetails(selectedListId);
        break;

      default:
        listData = await getCustomListDetails(selectedListId);
        break;
    }

    dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_SELECTED_LIST_DATA, payload: listData });
  };

  // GETTING ALL THE LISTS AND SELECTED LIST DATA
  useEffect(() => {
    (async () => {
      dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: true });

      const [lists] = await Promise.all([
        getListsData(),
        setSelectedListData(state.selectedList.type, state.selectedList.id),
      ]);

      if (lists) {
        dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_LISTS_DATA, payload: lists });
      }

      dispatch({ type: LIST_REDUCER_ACTION_TYPES.SET_IS_LOADING, payload: false });
    })();
  }, []);

  const value = {
    ...state,
    setSelectedList,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const ListContext = () => useContext(Context);

export default ListContext;
