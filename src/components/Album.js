import { useState, useEffect } from 'react';

const Album = (props) => {
    const [cover, setCover] = useState('');

    const getAlbumCover = async (album) => {
        // Slugify text:
        function convertToSlug(Text) {
            return Text
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/\//g, '-')
                .replace(/[^\w-]+/g, '')
                ;
        }
        const artist = convertToSlug(album.artist.name);
        const name = convertToSlug(album.name);
        var result = await fetch(`http://localhost:5000/album-art/${artist}/${name}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => setCover(result))
            .catch((err) => console.log(err.message));
    }

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
            console.log(album.name)
            getAlbumCover(props.album);
        }
    }, [])


    const album = props.album;
    return (
        <div className="album-container">
            {/* <img id={`img-${album.id}`} src={!album.thumbnail ? album.thumbnail : getAlbumCover(album)} /> */}
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