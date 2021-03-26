import * as actions from "../actiontypes";
let lastId = 0;
const initialstate = {
  name: "",
  address: "",
  date: "",
  gender: "",
};
//whenever we start the app the store will first call the state which is empty and pass undefined so we have to pass the initial state []in the argument
const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actions.ADD_USER:
      return {
        ...state,

        id: ++lastId,
        name: action.payload.name,
        address: action.payload.address,
        date: action.payload.date,
        gender: action.payload.gender,
      };
    case actions.STORE_USER:
      return {};
    default:
      return state;
  }
};
export default reducer;
