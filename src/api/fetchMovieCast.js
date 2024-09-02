import { fetchFromTMDB } from "./fetchFromTMDB";

export const fetchMovieCast = async (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
};
