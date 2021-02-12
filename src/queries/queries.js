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
        artist {
            id
            name
        }
    }
}
`

export {
    getAlbumsQuery,
    getArtistsQuery,
    getAlbumQuery
}