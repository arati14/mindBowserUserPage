import * as actions from "../actiontypes";
export const addUser = (name, address, date, gender) => {
  return {
    type: actions.ADD_USER,

    payload: { name: name, address: address, date: date, gender: gender },
  };
};
