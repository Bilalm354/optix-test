import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, MovieCompany } from "../../App";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4321" }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], string>({
      query: () => `movies`,
    }),
    getMovieCompanies: builder.query<MovieCompany[], string>({
      query: () => `movieCompanies`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieCompaniesQuery } = movieApi;
