import { combineReducers } from "redux";
import { authReducer as auth } from "./auth";
import { themeReducer as theme } from "./theme";
import { usersReducer as users } from "./user";

const tobePersisted = {
  auth,
  theme,
  users,
};

export const reducers = combineReducers({
  ...tobePersisted,
});

export const tobePersistedKeys = Object.keys(tobePersisted);
