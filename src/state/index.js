import { createSlice } from "@reduxjs/toolkit";
const initialObject = {
  user: null,
  token: null,
  stage: null,
  products: [],
  orders: [],
  shareCount: [],
  nonSharedLists: null,
  total: null,
  filter: { price: { isApplied: false, priceRange: {} }, category:{ isApplied:false,selectedCategories:[]} },
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
      if (Array.isArray(action.payload)) {
        console.log(action.payload.length);
        state.shareCount = action.payload;
      } else {
        state.shareCount = [...state.shareCount, action.payload];
        console.log(state.shareCount);
      }
    },
    setNonSharedLists: (state, action) => {
      state.nonSharedLists = action.payload.lists;
    },
    setTotal: (state, action) => {
      state.total = action.payload.amount;
    },
    setFilter: (state, action) => {
      state.filter.category = action.payload.filter.category;
      state.filter.price = action.payload.filter.price;
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
  setTotal,
  setFilter,
} = authAndProductSlice.actions;

export default authAndProductSlice.reducer;
