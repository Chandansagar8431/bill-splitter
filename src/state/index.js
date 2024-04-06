import { createSlice } from "@reduxjs/toolkit";
const initialObject = {
  user: null,
  token: null,
  stage: null,
  products: [],
  orders: [],
  shareCount: null,
  nonSharedLists: null,
};

export const authAndProductSlice = createSlice({
  name: "authAndProducts",
  initialState: initialObject,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },
    setStage: (state, action) => {
      state.stage = action.payload.product;
    },
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
    },
    setShareCount: (state, action) => {
      state.shareCount = action.payload.count;
    },
    setNonSharedLists: (state, action) => {
      state.nonSharedLists = action.payload.lists;
    },
  },
});
export const {
  setAuth,
  setLogout,
  setProducts,
  setOrders,
  setStage,
  setShareCount,
  setNonSharedLists,
} = authAndProductSlice.actions;

export default authAndProductSlice.reducer;
