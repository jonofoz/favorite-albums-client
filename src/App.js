import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import AlbumList from "./components/AlbumList";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <apolloProvider client={client}>
      <div id="main">
        <h1>JonOfOz's Favorite Albums, Like Ever</h1>
        <AlbumList />
      </div>
    </apolloProvider>
  );
}

export default App;
