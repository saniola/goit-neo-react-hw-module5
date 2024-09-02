import { fetchFromTMDB } from "./fetchFromTMDB";

export const fetchMovieByName = async (searchStr) => {
  return fetchFromTMDB("/search/movie", {
    query: searchStr,
    include_adult: false,
    page: 1,
  });
};
