const graphql = require("graphql");
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;


const movies = [
    {
        "name": "Inception",
        "genre": "Sci-Fi",
        "id": "1"
    },
    {
        "name": "The Dark Knight",
        "genre": "Action",
        "id": "2"
    },
    {
        "name": "Pulp Fiction",
        "genre": "Crime",
        "id": "3"
    },
    {
        "name": "The Shawshank Redemption",
        "genre": "Drama",
        "id": "4"
    },
    {
        "name": "The Godfather",
        "genre": "Crime",
        "id": "5"
    }
]

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })

});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) { // get data from database
                return _.find(movies, { id: args?.id })
            }

        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})