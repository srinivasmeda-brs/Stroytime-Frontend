import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer from "./user/authSlice";
import {spotifyRootApiSlice} from "./spotify/spotifyRootApiSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer path
    [spotifyRootApiSlice.reducerPath]: spotifyRootApiSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,spotifyRootApiSlice.middleware), // Add RTK Query middleware here
   
  devTools: true,
});

export default store;
