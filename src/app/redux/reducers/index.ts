import { combineReducers } from "redux";
import { authReducer as auth } from "./themeReducer";

const tobePersisted = {
   auth,
};

export const reducers = combineReducers({
   ...tobePersisted,
});

export const tobePersistedKeys = Object.keys(tobePersisted);
