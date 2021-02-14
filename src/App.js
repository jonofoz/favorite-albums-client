import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import AlbumList from "./components/AlbumList";
import AddAlbumForm from "./components/AddAlbumForm";

const client = new ApolloClient({
  uri: 'https://jonofoz-favorite-albums-server.herokuapp.com/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>JonOfOz's Favorite Albums, Like Ever</h1>
        <AlbumList />
        <AddAlbumForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
