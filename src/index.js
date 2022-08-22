import redux, {
  bindActionCreators,
  applyMiddleware,
  combineReducers,
  createStore
} from "redux";
import { createLogger } from "redux-logger";
//Action Type Name
const CAKE_ORDER = "CAKE_ORDER";
const REST_ORDER = "REST_ORDER";
const ICE_ORDER = "ICE_ORDER";
const REST_ICE_ORDER = "REST_ICE_ORDER";

//Action Creater
function cakeOrderFn() {
  return {
    type: CAKE_ORDER,
    quantity: 1
  };
}

function restCakeOrderFn(qty = 1) {
  return {
    type: REST_ORDER,
    payload: qty
  };
}

function iceCakeOrderFn() {
  return {
    type: ICE_ORDER,
    quantity: 1
  };
}

function iceRestCakeOrderFn(qty = 1) {
  return {
    type: REST_ICE_ORDER,
    payload: qty
  };
}

//Reducer
const initialState = {
  numOfCakes: 10
};

const initialCakeState = {
  numOfCakes: 90
};

function cakeReducer(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case CAKE_ORDER:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      };
    case REST_ORDER:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      };

    default:
      return state;
  }
}

function iceReducer(state = initialCakeState, action) {
  console.log(action);

  switch (action.type) {
    case ICE_ORDER:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      };
    case REST_ICE_ORDER:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      };

    default:
      return state;
  }
}

const RootReducer = combineReducers({
  ice: iceReducer,
  cake: cakeReducer
});

//store
const store = createStore(RootReducer, applyMiddleware(createLogger()));
console.log("initialState:", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Update State: ", store.getState())
);

/*/store.dispatch(cakeOrderFn());

store.dispatch(cakeOrderFn());

store.dispatch(cakeOrderFn());
store.dispatch(restCakeOrderFn(3));/*/
const actions = bindActionCreators(
  { cakeOrderFn, restCakeOrderFn, iceRestCakeOrderFn, iceCakeOrderFn },
  store.dispatch
);
actions.cakeOrderFn();
actions.cakeOrderFn();
actions.cakeOrderFn();
actions.iceRestCakeOrderFn(3);

actions.iceCakeOrderFn();
actions.iceCakeOrderFn();
actions.iceCakeOrderFn();
actions.iceRestCakeOrderFn(3);
unsubscribe();
