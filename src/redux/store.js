import { configureStore } from "@reduxjs/toolkit";

const persistedReducer = combineReducers({
    ...rootReducer
  });

export const store = configureStore({
    reducer: persistedReducer,
});
