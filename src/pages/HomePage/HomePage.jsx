import { useEffect, useState } from "react";
import { getToday } from "../../api/getToday";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getToday();
        setMovies(moviesData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
