import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  {
    movies {
      name
      genre
      id
    }
  }
`;

export const GET_MOVIE = gql`
  query ($id: ID!) {
    movie(id: $id) {
      id
      name
      genre
      director {
        name
        age
        id
        movies {
          name
          id
        }
      }
    }
  }
`;

export const GET_DIRECTORS = gql`
  {
    directors {
      name
      id
    }
  }
`;

export const ADD_MOVIE_MUTATION = gql`
  mutation ($name: String!, $genre: String!, $directorId: ID!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      name
      id
    }
  }
`;

export const ADD_DIRECTOR_MUTATION = gql`
  mutation ($name: String!, $age: Number) {
    addDirector(name: $name, age: $age) {
      name
      age
    }
  }
`;
