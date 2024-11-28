import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/apiServices/" }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (doviz) => `orders?doviz=${doviz}`,
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
