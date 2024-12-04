import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://storytime-1.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "storytime",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => "/user/profile", // Example API endpoint to get user profile data
      providesTags: ["User"], // Useful for cache invalidation (e.g., after profile update)
    }),
    // Add other endpoints like login, register, etc.
  }),
});

export const { useGetUserDataQuery } = apiSlice;
