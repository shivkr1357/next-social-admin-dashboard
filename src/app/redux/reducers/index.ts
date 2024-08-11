import { combineReducers } from "redux";
import { authReducer as auth } from "./auth";
import { themeReducer as theme } from "./theme";
import { usersReducer as users } from "./user";
import { postsReducer as posts } from "./post";
import { paginationReducer as pagination } from "./pagination";
import { commentsReducer as comments } from "./comments";
import { eventsReducer as events } from "./events";
import { suggestionsReducer as suggestions } from "./suggestions";
import { reportsReducer as reports } from "./report";

const tobePersisted = {
  auth,
  theme,
  users,
  pagination,
  posts,
  comments,
  events,
  suggestions,
  reports,
};

export const reducers = combineReducers({
  ...tobePersisted,
});

export const tobePersistedKeys = Object.keys(tobePersisted);
