import { fetchFromTMDB } from "./fetchFromTMDB";

export const getToday = async () => {
  return fetchFromTMDB("/trending/movie/day", { page: 1 });
};
