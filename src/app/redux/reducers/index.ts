import { combineReducers } from "redux";
import { authReducer as auth } from "./user";
import { themeReducer as theme } from "./theme";

const tobePersisted = {
   auth,
   theme,
};

export const reducers = combineReducers({
   ...tobePersisted,
});

export const tobePersistedKeys = Object.keys(tobePersisted);
