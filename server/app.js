const express = require("express");
const PORT = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log("server running on PORT: " + PORT);
})
