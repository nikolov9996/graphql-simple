import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import classes from "./add-movie.module.css";
import { GET_DIRECTORS, ADD_MOVIE_MUTATION, GET_MOVIES } from "../app/queries";

const AddMovie = () => {
  const { data, loading, error } = useQuery(GET_DIRECTORS);

  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [addMovie] = useMutation(ADD_MOVIE_MUTATION);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "movieName") {
      setMovieName(value);
    } else if (name === "genre") {
      setGenre(value);
    } else if (name === "director") {
      setDirector(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!director.length) return;

    addMovie({
      variables: {
        name: movieName,
        genre: genre,
        directorId: director,
      },
      refetchQueries: [
        {
          query: GET_MOVIES,
        },
      ],
    });

    setMovieName("");
    setGenre("");
    setDirector("");
  };

  const renderDirectors = () => {
    if (loading) return <option disabled>Loading ...</option>;
    if (error) return <option disabled>Error </option>;

    return data.directors.map((director, i) => {
      return (
        <option key={i} value={director?.id}>
          {director?.name}
        </option>
      );
    });
  };

  return (
    <div>
      <h1>Movie Form</h1>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="movieName">Movie Name:</label>
          <input
            type="text"
            id="movieName"
            name="movieName"
            value={movieName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="director">Director:</label>
          <select
            id="director"
            name="director"
            value={director}
            onChange={handleInputChange}
            required
          >
            <option>Select a Director</option>
            {renderDirectors()}
          </select>

          <button type="submit">Add a Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
