import * as actions from "../actiontypes";

//whenever we start the app the store will first call the state which is empty and pass undefined so we have to pass the initial state []in the argument
const reducer = (state = [], action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case actions.ADD_USER:
      return state.concat(action.data);

    case actions.DELETE_USER:
      return state.filter((val) => val.id != action.id);

    case actions.UPDATE_USER: {
      return {
        ...state,
        state: state.map((contact) =>
          contact.id == action.id ? action.data : contact
        ),
      };
    }
    default:
      return state;
  }
};
export default reducer;
