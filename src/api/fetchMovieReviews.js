import { fetchFromTMDB } from "./fetchFromTMDB";

export const fetchMovieReviews = async (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}/reviews`);
};
