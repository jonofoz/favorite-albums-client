import Album from './Album';

const AlbumList = (props) => {
    return (
        <div id="album-list-container">
            <ul>
                <Album albumTitle='Album 1' />
                <Album albumTitle='Album 2' />
                <Album albumTitle='Album 3' />
            </ul>
        </div>
    )
}

export default AlbumList;