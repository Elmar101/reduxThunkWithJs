import produce from "immer";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

//Reducer
const initialState = {
  name: "Azerbaijan",
  adress: {
    street: "Elimler",
    city: "Baku",
    state: "AZE"
  }
};

const STREET_UPDATE = "STREET_UPDATE";

const updateStreetFn = (street) => {
  return {
    type: STREET_UPDATE,
    payload: street
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATE:
      console.log(action.payload);

      /*return {
        ...state,
        adress: {
          ...state.adress,
          street: action.payload
        }
      }*/
      return produce(state, (draft) => {
        //state.adress.street = action.payload;
        draft.adress.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(createLogger()));
console.warn("initial State: ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("UPDATE STREET: ", store.getState())
);
store.dispatch(updateStreetFn("28 MAY"));
unsubscribe();
