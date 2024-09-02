import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import styles from "./App.module.css";

const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPages")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReview = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

export const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <div className={styles.app}>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="review" element={<MovieReview />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </Suspense>
);

export default App;
