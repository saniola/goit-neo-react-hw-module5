import { fetchFromTMDB } from "./fetchFromTMDB";

export const getMovieDetailsById = async (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}`);
};
