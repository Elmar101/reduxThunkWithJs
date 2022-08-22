import axios from "axios";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

const initialState = {
  loading: false,
  users: [],
  error: ""
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const usersRequestFn = () => ({
  type: FETCH_USERS_REQUEST
});

const usersSuccessFn = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
});

const usersFailedFn = (error) => ({
  type: FETCH_USERS_FAILED,
  payload: error
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        error: ""
      };

    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const fetchUsers = () => (dispatch) => {
  dispatch(usersRequestFn());
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      dispatch(usersSuccessFn(response.data));
    })
    .catch((error) => {
      dispatch(usersFailedFn(error.message));
    });
};
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
