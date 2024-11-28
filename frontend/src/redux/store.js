import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { orderApi } from "../services/orders";
import { safeApi } from "../services/safe";

export const store = configureStore({
  reducer: {
    [orderApi.reducerPath]: orderApi.reducer,
    [safeApi.reducerPath]: safeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderApi.middleware, safeApi.middleware),
});

setupListeners(store.dispatch);
