const graphql = require("graphql");
const _ = require("lodash");
const Movie = require("../models/movie");
const Director = require("../models/director");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
} = graphql;

const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return _.filter(movies, { directorId: parent.id })
            }
        }

    })
})

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // return _.find(directors, { id: parent?.directorId })
            }
        }
    })

});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) { // get data from database
                // return _.find(movies, { id: args?.id })
            }

        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {// get data from database
                // return _.find(directors, { id: args?.id })
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: {},
            resolve(parent, args) {
                // return movies
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            args: {},
            resolve(parent, args) {
                // return directors
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let director = new Director({
                    name: args?.name,
                    age: args?.age
                });

                return director.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                directorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                    let movie = new Movie({
                        name: args?.name,
                        genre: args?.genre,
                        directorId: args?.directorId
                    });

                    return movie.save();
                }
            }
        }
    })

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})