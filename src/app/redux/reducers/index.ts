import { combineReducers } from "redux";
import { authReducer as auth } from "./auth";
import { themeReducer as theme } from "./theme";
import { usersReducer as users } from "./user";
import { postsReducer as posts } from "./post";
import { paginationReducer as pagination } from "./pagination";
import { commentsReducer as comments } from "./comments";
import { eventsReducer as events } from "./events";

const tobePersisted = {
   auth,
   theme,
   users,
   pagination,
   posts,
   comments,
   events,
};

export const reducers = combineReducers({
   ...tobePersisted,
});

export const tobePersistedKeys = Object.keys(tobePersisted);
