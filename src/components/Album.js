import { useState, useEffect } from 'react';
import { getAlbumCover } from '../utils/utils'

const Album = (props) => {
    const [cover, setCover] = useState('');

    const checkDetailsShown = (props) => {
        if (!props.showDetails) {
            return null;
        }
        else {
            const album = props.album;
            return (
                <div className="album-details">
                    <ul className="details-genre">{
                        album.genre.map(g => {
                            return (<li key={g}>{g}</li>)
                        })
                    }
                    </ul>
                    <h5><em>JonOfOz says:</em></h5>
                    <blockquote>"{album.commentary}"</blockquote>
                </div>
            );
        }
    }

    useEffect(() => {
        if (!props.album.thumbnail) {
            getAlbumCover(album.name, album.artist.name)
                .then(res => setCover(res))
        }
    }, [])


    const album = props.album;
    return (
        <div className="album-container">
            <div className="container-album-img">
                <img id={`album-img-${album.id}`} src={album.thumbnail || cover} />
                <div className="bottom-right">{album.ranking}</div>
            </div>
            <div className="album-header">
                <h3><em>{album.name}</em> <span className="details-yor">({album.yearOfRelease})</span></h3>
                <h3>- {album.artist.name}</h3>
                {checkDetailsShown(props)}
            </div>
        </div>
    )
}

export default Album;