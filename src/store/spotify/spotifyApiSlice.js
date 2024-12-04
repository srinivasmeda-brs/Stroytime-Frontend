import { spotifyRootApiSlice } from "./spotifyRootApiSlice";

const SPOTIFY_ENDPOINT = '/search';

const createQueryParams = (queryParams) => {
  const searchParams = new URLSearchParams(queryParams);

  if (!searchParams.has('type')) {
    searchParams.set('type', 'show'); // Default to 'show' if not provided
  }
  if (!searchParams.has('q')) {
    throw new Error('Search query (q) is required');
  }

  return searchParams.toString();
};

export const spotifyAPISlice = spotifyRootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularShows: builder.query({
      query: (queryParams) => ({
        url: `${SPOTIFY_ENDPOINT}?${createQueryParams(queryParams)}`,
        method: "GET",
      }),
    }),
    getTopStories: builder.query({
      query: (queryParams) => ({
        url: `${SPOTIFY_ENDPOINT}?${createQueryParams(queryParams)}`,
        method: "GET",
      }),
    }),
    getShowsOfTheWeek: builder.query({
      query: (queryParams) => ({
        url: `${SPOTIFY_ENDPOINT}?${createQueryParams(queryParams)}`,
        method: "GET",
      }),
    }),
    getCategoryStories: builder.query({
      query: (queryParams) => ({
        url: `${SPOTIFY_ENDPOINT}?${createQueryParams(queryParams)}`,
        method: "GET",
      }),
    }),
    getAuthorsStories: builder.query({
      query: (queryParams) => ({
        url: `${SPOTIFY_ENDPOINT}?${createQueryParams(queryParams)}`,
        method: "GET",
      }),
    }),
    getStoriesByPublisher: builder.query({
      query: (queryParams) => ({
        url: `${SPOTIFY_ENDPOINT}?${createQueryParams(queryParams)}`,
        method: "GET",
      }),
    }),
    getEpisodesByShowId: builder.query({
     query: (id) => ({
    url: `/shows/${id}/episodes`,
    method: "GET",
  }),
    }),
    getSeveralShows: builder.query({
      query: ({ ids }) => {
        return {
          url: `/shows?ids=${ids}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetPopularShowsQuery,
  useGetTopStoriesQuery,
  useGetShowsOfTheWeekQuery,
  useGetCategoryStoriesQuery,
  useGetAuthorsStoriesQuery,
  useGetStoriesByPublisherQuery,
  useGetEpisodesByShowIdQuery,
  useGetSeveralShowsQuery
} = spotifyAPISlice;