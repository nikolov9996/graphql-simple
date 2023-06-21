import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../app/queries";
import MovieDetails from "./MovieDetails";
import classes from "./movie-list.module.css";

const MovieList = () => {
  const { data, loading, error } = useQuery(GET_MOVIES);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error loading movies</p>;
  }

  const renderMovies = (data) => {
    return data.movies.map((movie, i) => {
      return (
        <li
          className={classes.listItem}
          onClick={() => setSelectedMovie(movie?.id)}
          key={i}
        >
          {movie.name}
        </li>
      );
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftBox}>
        <ul>{renderMovies(data)}</ul>
      </div>
      <div className={classes.rightBox}>
        {selectedMovie ? (
          <MovieDetails id={selectedMovie} />
        ) : (
          <p>Select movie to see Details</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
