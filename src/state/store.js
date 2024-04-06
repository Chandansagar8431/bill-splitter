import { configureStore } from "@reduxjs/toolkit";
import authAndProductSlice from "./index";

export const store = configureStore({
  reducer: {
    authAndProducts: authAndProductSlice,
  },
});
