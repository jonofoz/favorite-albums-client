import { gql } from 'apollo-boost';

const getAlbumsQuery = gql`
{
    albums{
        id
        ranking
        yearOfRelease
        name
        genre
        commentary
        thumbnail
        artist {
            id
            name
        }
    }
}
`

const getArtistsQuery = gql`
{
    artists{
        id
        name
    }
}
`
const getAlbumQuery = gql`
query($id: ID!){
    album(id: $id){
        id
        ranking
        yearOfRelease
        name
        genre
        commentary
        thumbnail
        artist {
            id
            name
        }
    }
}
`
const addAlbumMutation = gql`
mutation(
        $name: String!,
        $artistId: ID!
        $ranking: Int!,
        $genre: [String],
        $yearOfRelease: Int,
        $commentary: String,
        $thumbnail: String
    ){
    addAlbum(
        name: $name,
        artistId: $artistId
        ranking: $ranking,
        genre: $genre,
        yearOfRelease: $yearOfRelease,
        commentary: $commentary,
        thumbnail: $thumbnail
    ){
        id
        ranking
        yearOfRelease
        name
        genre
        commentary
        thumbnail
        artist {
            id
            name
        }
    }
}
`

const addArtistMutation = gql`
mutation(
        $name: String!,
    ){
    addArtist(
        name: $name,
    ){
        id
        name
    }
}
`

export {
    getAlbumsQuery,
    getArtistsQuery,
    getAlbumQuery,
    addAlbumMutation,
    addArtistMutation
}