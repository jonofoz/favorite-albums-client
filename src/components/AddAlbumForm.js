import { useState } from 'react'

const AddAlbumForm = props => {
    const [album, setAlbum] = useState('');
    const [artist, setArtist] = useState('');
    const [ranking, setRanking] = useState('');
    const [genre, setGenre] = useState(['']);
    const [YOR, setYOR] = useState(''); // Year Of Release
    const [commentary, setCommentary] = useState('');

    const onFormSubmit = (e, props) => {
        e.preventDefault();
        console.log(album);
        console.log(artist);
        console.log(ranking);
        console.log(YOR);
        console.log(commentary);
        debugger;
    };

    return (
        <div className="container-add-album">
            <form id="form-add-album" onSubmit={(e) => onFormSubmit(e, props)}>
                <label className="label-add-album" htmlFor="add-album-name">Album</label>
                <input type="text" id="add-album-album" value={album} onChange={(e) => setAlbum(e.target.value)}></input>
                <label className="label-add-album" htmlFor="add-album-artist">Artist</label>
                <input type="text" id="add-album-artist" value={artist} onChange={(e) => setArtist(e.target.value)}></input>
                <label className="label-add-album" htmlFor="add-album-ranking">Ranking</label>
                <input type="text" id="add-album-ranking" value={ranking} onChange={(e) => setRanking(e.target.value)}></input>
                <label className="label-add-album" htmlFor="add-album-YOR">Year Of Release</label>
                <input type="text" id="add-album-YOR" value={YOR} onChange={(e) => setYOR(e.target.value)}></input>
                <label className="label-add-album" htmlFor="add-album-commentary">Commentary</label>
                <input type="text" id="add-album-commentary" value={commentary} onChange={(e) => setCommentary(e.target.value)}></input>
                <button>+</button>
            </form>
        </div>
    )
}

export default AddAlbumForm;