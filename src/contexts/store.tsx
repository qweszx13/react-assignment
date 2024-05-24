import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./infoSlice";
import apiParameterReducer from "./apiParameterSlice";

const store = configureStore({
  reducer: {
    info:infoReducer,
    apiParameter:apiParameterReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;