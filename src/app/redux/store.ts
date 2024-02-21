import { configureStore } from "@reduxjs/toolkit";
import { reducers, tobePersistedKeys } from "./reducers";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const loggerMiddleware = createLogger();

const persistConfig = {
   key: "root",
   storage: storage,
   whitelist: tobePersistedKeys,
};

const rootReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
   reducer: rootReducers,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
});

export const persistor = persistStore(store as any);
export type RootState = ReturnType<typeof rootReducers>;
