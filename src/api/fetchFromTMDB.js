import axios from "axios";

export const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3${endpoint}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMBD_API_KEY}`,
        },
        params: {
          language: "en-US",
          ...params,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching data from TMDB endpoint ${endpoint}:`, error);
    throw error;
  }
};
