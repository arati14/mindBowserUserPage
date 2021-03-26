import * as actions from "../actiontypes";
let lastId = 0;
const initialstate = {
  name: "",
  address: "",
  date: "",
  gender: "",
};
//whenever we start the app the store will first call the state which is empty and pass undefined so we have to pass the initial state []in the argument
const reducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_USER:
      return state.concat([action.data]);
    case actions.STORE_USER:
      return {};
    default:
      return state;
  }
};
export default reducer;
