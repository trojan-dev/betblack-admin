// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
const token = localStorage.getItem("betblack-admin-token");
console.log(token);
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-dev.betblack.io/admin",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["TOURNAMENTS", "USER", "GAMES"],
});
