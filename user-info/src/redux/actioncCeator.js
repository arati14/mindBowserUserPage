import * as actions from "../actiontypes";
export const addUser = (data) => {
  return {
    type: actions.ADD_USER,

    data,
  };
};
