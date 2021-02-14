import { useState } from 'react'

const AddAlbumForm = props => {
    const [name, setName] = useState('');
    const [artistId, setArtistId] = useState('');
    const [ranking, setRanking] = useState('');
    const [genre, setGenre] = useState(['']);
    const [YOR, setYOR] = useState(''); // Year Of Release
    const [commentary, setCommentary] = useState('');

    const onFormSubmit = e => {
        // e.preventDefault;
        // console.log(e);
    };

    return (
        <div className="container-add-album">
            <form onSumbit={(e) => onFormSubmit(e)}>
                <label for="add-album-name">Name</label>
                <input id="add-album-name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <label for="add-album-artistId">Artist ID</label>
                <input id="add-album-artistId" value={artistId} onChange={(e) => setArtistId(e.target.value)}></input>
                <label for="add-album-ranking">Ranking</label>
                <input id="add-album-ranking" value={ranking} onChange={(e) => setRanking(e.target.value)}></input>
                {/* TODO: Handle adding genres. */}
                {/* <input value={genre}></input> */}
                <label for="add-album-YOR">Year Of Release</label>
                <input id="add-album-YOR" value={YOR} onChange={(e) => setYOR(e.target.value)} placeholder="Year of Release"></input>
                <label for="add-album-commentary">Commentary</label>
                <input id="add-album-commentary" value={commentary} onChange={(e) => setCommentary(e.target.value)}></input>
            </form>
        </div>
    )
}

export default AddAlbumForm;