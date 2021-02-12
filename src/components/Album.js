const Album = (props) => {
    const checkDetailsShown = (props) => {
        if (!props.showDetails) {
            return null;
        }
        else {
            const album = props.album;
            return (
                <div class="album-details">
                    <ul class="details-genre">{
                        album.genre.map(g => {
                            return (<li key={g}>{g}</li>)
                        })
                    }
                    </ul>
                    <blockquote>"{album.commentary}"</blockquote>
                </div>
            );
        }
    }
    const album = props.album;
    return (
        <div class="album-container">
            <div class="album-header">
                <h3><em>{album.name}</em> <span class="details-yor">({album.yearOfRelease})</span></h3>
                <h3>- {album.artist.name}</h3>
            </div>
            {checkDetailsShown(props)}
        </div>
    )
}

export default Album;