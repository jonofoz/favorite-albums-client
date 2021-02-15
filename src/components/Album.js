import { useState, useEffect } from 'react';
import { getAlbumCover } from '../utils/utils'

const Album = (props) => {
    const [cover, setCover] = useState('');

    const {
        id,
        name,
        ranking,
        yearOfRelease,
        thumbnail,
        artist: {name: artistName}
    } = props.album;

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
        if (!thumbnail) {
            getAlbumCover(name, artistName)
                .then(res => setCover(res))
        }
    }, [])


    var medal = '';
    switch (ranking) {
        case 1:
            medal = ' gold';
            break;
        case 2:
            medal = ' silver';
            break;
        case 3:
            medal = ' bronze';
            break;
    }

    return (
        <div className="album-container">
            <div className="container-album-img">
                <img id={`album-img-${id}`} src={thumbnail || cover} />
                <div className={`ranking-sticker${medal}`}>{ranking}</div>
            </div>
            <div className="album-header">
                <h3><em>{name}</em> <span className="details-yor">({yearOfRelease})</span></h3>
                <h3>- {artistName}</h3>
                {checkDetailsShown(props)}
            </div>
        </div>
    )
}

export default Album;