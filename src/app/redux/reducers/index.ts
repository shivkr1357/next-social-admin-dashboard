import { combineReducers } from "redux";
import { authReducer as auth } from "./auth";
import { themeReducer as theme } from "./theme";
import { usersReducer as users } from "./user";
import { postsReducer as posts } from "./post";
import { paginationReducer as paginationn } from "./pagination";
import { commentsReducer as comments } from "./comments";

const tobePersisted = {
   auth,
   theme,
   users,
   paginationn,
   posts,
   comments,
};

export const reducers = combineReducers({
   ...tobePersisted,
});

export const tobePersistedKeys = Object.keys(tobePersisted);
