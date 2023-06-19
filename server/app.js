const express = require("express");
const PORT = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

require('dotenv').config();

const db_url = `mongodb+srv://graphql-db:${process.env.DB_PASSWORD}@cluster0.h5lxkya.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(db_url);

mongoose.connection.once("open", () => {
    console.log("DB CONNECTED")
})


app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log("server running on PORT: " + PORT);
})
