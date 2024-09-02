import { lazy, Suspense, useEffect, useState, useRef } from "react";
import {
  NavLink,
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getMovieDetailsById } from "../../api/getMovieDetailsById";
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReview = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);
import styles from "./MovieDetailsPages.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const btnRef = useRef();

  const previousLocation = location.state || "/movies";
  let vote, imgPath;

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

  if (movieDetails) {
    imgPath = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;

    vote = Math.round(movieDetails.vote_average * 10);
  } else {
    return <p>Loading movie details...</p>;
  }

  return (
    <Suspense>
      <button
        ref={btnRef}
        onClick={() => navigate(previousLocation)}
        className={styles.back}
      >
        Return back
      </button>

      <div className={styles.info}>
        <img src={imgPath} className={styles.image}></img>
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
        </div>
      </div>
    </Suspense>
  );
};

export default MovieDetailsPage;
