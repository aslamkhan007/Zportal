import { programsConstants } from "../ActionType";

const initstate = {
  programs: {},
  error: null,
  programsError: "",
  programsDataStatus: false
};

const programsReducer = (state = initstate, action) => {
   console.log("action.payload===",action.payload);
   console.log("action.type===",action.type);
  switch (action.type) {
    case programsConstants.LIST_PROGRAMS_SECCESS:
      state = {
        ...state,
        programs: action.payload,
        error: null,
        programsError: "",
        programsDataStatus: true
      };
      break;
    case programsConstants.LIST_PROGRAMS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        programsError: action.payload.programsError,
      };
      break;
  }
  return state;
};

export default programsReducer;
