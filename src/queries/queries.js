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

//{id: '1', ranking: 1, artistId: '1', yearOfRelease: 2005, name: 'Illinois', genre: ['folk', 'baroque pop', 'indie rock', 'experimental'], commentary: 'i love it'},