const Album = (props) => {

    const getAlbumCover = async (album) => {
        const imgElement = document.getElementById(`img-${album.id}`)

        if (imgElement) {
            if (imgElement.src.endsWith('.jpg') || imgElement.src.endsWith('.png')) {
                return;
            }
            else {
                // Slugify text:
                async function convertToSlug(Text) {
                    return Text
                    .toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/\//g, '-')
                    .replace(/[^\w-]+/g, '')
                    ;
                }
                const artist = await convertToSlug(album.artist.name);
                const name = await convertToSlug(album.name);
                var result = await fetch(`http://localhost:5000/album-art/${artist}/${name}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                result = await result.json();
                imgElement.src = result;
            }
        }
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
                    <blockquote>"{album.commentary}"</blockquote>
                </div>
            );
        }
    }
    const album = props.album;
    getAlbumCover(album)
    return (
        <div className="album-container">
            <img id={`img-${album.id}`} src="" />
            <div className="album-header">
                <h3><em>{album.name}</em> <span className="details-yor">({album.yearOfRelease})</span></h3>
                <h3>- {album.artist.name}</h3>
            </div>
            {checkDetailsShown(props)}
        </div>
    )
}

export default Album;