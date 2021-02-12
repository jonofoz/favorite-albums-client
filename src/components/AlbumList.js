import { useState } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumsQuery } from '../queries/queries';

import Album from './Album';

const AlbumList = (props) => {
    const [selected, setSelected] = useState('');

    const populateAlbums = () => {
        if (props.data.loading) {
            return(<li>Loading albums...</li>)
        }
        else {
            const albums = props.data.albums;
            return (
                albums.map(album => {
                    return (<Album key={album.id} albumName={album.name} showDetails={true}/>)
                })
            )
        }
    }
    return (
        <div id="album-list-container">
            <ul>
                {populateAlbums()}
            </ul>
        </div>
    )
}

export default graphql(getAlbumsQuery)(AlbumList);