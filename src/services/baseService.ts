// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-dev.betblack.io/admin",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("betblack-admin-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["TOURNAMENTS", "USER", "GAMES"],
});
