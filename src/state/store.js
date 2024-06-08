import { configureStore } from "@reduxjs/toolkit";
import authAndProduct from "./index";

export const store = configureStore({
  reducer: {
    authAndProducts: authAndProduct,
  },
});
