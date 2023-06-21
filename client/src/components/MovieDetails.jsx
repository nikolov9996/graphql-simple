import React from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIE } from "../app/queries";
import classes from "./movie-detail.module.css";

const MovieDetails = ({ id }) => {
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { id: id },
  });

  const { movie } = data || {};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error loading movie {id}</p>;
  }

  if (!movie) {
    return <p>error loading movie {id}</p>;
  }

  const renderMovies = (movies) => {
    return movies.map((movie) => <li key={movie.id}>{movie.name}</li>);
  };

  return (
    <div className={classes["movie-container"]}>
      <h2 className={classes["movie-title"]}>{movie.name}</h2>
      <p className={classes["movie-info"]}>Genre: {movie.genre}</p>
      <p className={classes["movie-info"]}>Director: {movie.director.name}</p>
      <p className={classes["movie-info"]}>Age: {movie.director.age}</p>
      <h5>Director Movies</h5>
      <ul className={classes["movie-list"]}>
        {renderMovies(movie.director.movies)}
      </ul>
    </div>
  );
};

export default MovieDetails;
