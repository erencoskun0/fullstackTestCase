import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const safeApi = createApi({
  reducerPath: "safeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/apiServices/" }),
  endpoints: (builder) => ({
    getSafe: builder.query({
      query: () => `safe`,
    }),
  }),
});

export const { useGetSafeQuery } = safeApi;
