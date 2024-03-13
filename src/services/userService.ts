import { baseApi } from "./baseService";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TOURNAMENTS"],
      transformResponse: (apiResponse, meta) => {
        return {
          data: apiResponse,
          token: meta?.response?.headers.get("X-Auth-Token"),
        };
      },
      transformErrorResponse: (apiResponse) => apiResponse.data,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation } = usersApi;
