import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Watch List</h1>
        <AddMovie />
        <MovieList />
      </div>
    </ApolloProvider>
  );
}

export default App;
