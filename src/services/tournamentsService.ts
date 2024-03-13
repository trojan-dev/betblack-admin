import { baseApi } from "./baseService";

const tournamentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchAllTournaments: build.query({
      query: () => ({
        url: "/tournaments/all",
      }),
      providesTags: ["TOURNAMENTS"],
    }),
    fetchAllGames: build.query({
      query: () => ({
        url: "/games/all",
      }),
      providesTags: ["GAMES"],
    }),
    createTournament: build.mutation({
      query: (body) => ({
        url: `/tournaments/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TOURNAMENTS"],
    }),
    updateTournament: build.mutation({
      query: ({ id, body }) => ({
        url: `/tournaments/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TOURNAMENTS"],
    }),
    deleteTournament: build.mutation({
      query: (id) => ({
        url: `/tournaments/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOURNAMENTS"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchAllGamesQuery,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,
  useFetchAllTournamentsQuery,
} = tournamentsApi;
