import { lazy, Suspense, useEffect, useState, useRef } from "react";
import {
  NavLink,
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { getMovieDetailsById } from "../../api/getMovieDetailsById";
import styles from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReview = lazy(() =>
  import("../../components/MovieReview/MovieReview")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = useRef(location.state || "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetailsById(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <p>Loading movie details...</p>;
  }

  const imgPath = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
  const vote = Math.round(movieDetails.vote_average * 10);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <button
        onClick={() => navigate(previousLocation.current)}
        className={styles.back}
      >
        Return back
      </button>

      <div className={styles.info}>
        <img src={imgPath} className={styles.image} alt={movieDetails.title} />

        <div className={styles.desc}>
          <h1 className={styles.title}>{movieDetails.title}</h1>

          <p>User rate: {vote}%</p>

          <h2>Overview</h2>

          <p>{movieDetails.overview}</p>

          <h2>Genres</h2>

          {movieDetails.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}

          <div className={styles.extra}>
            <nav className={styles.subNav}>
              <h3>Additional information:</h3>

              <NavLink
                to={`/movies/${movieId}/cast`}
                className={styles.subLink}
                state={location}
              >
                Cast
              </NavLink>

              <NavLink
                to={`/movies/${movieId}/review`}
                className={styles.subLink}
                state={location}
              >
                Reviews
              </NavLink>
            </nav>
          </div>

          <Routes>
            <Route path="cast" element={<MovieCast />} />

            <Route path="review" element={<MovieReview />} />
          </Routes>

          <Outlet />
        </div>
      </div>
    </Suspense>
  );
};

export default MovieDetailsPage;
