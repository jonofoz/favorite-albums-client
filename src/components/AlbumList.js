import { useState } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumsQuery } from '../queries/queries';

import Album from './Album';

const AlbumList = (props) => {
    const [selected, setSelected] = useState('');

    // Changes which details to show, or hides if user clicks on album with details already shown
    const checkSelected = (id) => {
        if (selected !== id) {
            setSelected(id)
        }
        else {
            setSelected('')
        }
    }

    const populateAlbums = () => {
        if (props.data.loading) {
            return (<li>Loading albums...</li>)
        }
        else {
            const albums = props.data.albums;
            // Sort the albums by ranking before displaying
            albums.sort((a, b) => (a.ranking > b.ranking) ? 1 : -1);
            return (
                albums.map(album => {
                    return (
                        <li key={album.id} onClick={() => checkSelected(album.id)}>
                            <Album
                                album={album}
                                showDetails={selected === album.id ? true : false}
                            />
                        </li>
                    )
                })
            )
        }
    }
    return (
        <div id="album-list-container">
            <ol>
                {populateAlbums()}
            </ol>
        </div>
    )
}

export default graphql(getAlbumsQuery)(AlbumList);