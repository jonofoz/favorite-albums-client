import { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumsQuery } from '../queries/queries';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Album from './Album';

const AlbumList = (props) => {
    const [selected, setSelected] = useState('');
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        if (!props.data.loading && props.data.albums) {
            setAlbums(props.data.albums);
        }
    })

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
        if (props.data.loading || !albums.length) {
            return (<li>Loading albums...</li>)
        }
        else {
            // Sort the albums by ranking before displaying
            albums.sort((a, b) => (a.ranking > b.ranking) ? 1 : -1);
            return (
                albums.map((album, index)=> {
                    return (
                        <Draggable key={album.id} draggableId={album.id} index={index}>
                            {(provided) => (
                                <li id={`album-${album.id}`}onClick={() => checkSelected(album.id)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Album
                                        album={album}
                                        showDetails={selected === album.id ? true : false}
                                    />
                                </li>
                            )}
                        </Draggable>
                    )
                })
            )

        }
    }

    const onDragEnd = result => {
        var {
            draggableId,
            source: { index: srcIndex },
            destination: { index: destIndex }
        } = result;
        if (srcIndex != destIndex) {
            const draggedAlbum = albums.filter(a => a.id === draggableId)[0];
            const updatedAlbums = Array.from(albums);
            updatedAlbums.splice(srcIndex, 1)
            updatedAlbums.splice(destIndex, 0, draggedAlbum)
            updatedAlbums.forEach((a, index) => {
                a.ranking = index + 1;
            })
            setAlbums(updatedAlbums);
        }
    }
    return (
        <div id="album-list-container">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="albums">
                    {(provided) => (
                        <div className="container">
                        <ol {...provided.droppableProps} ref={provided.innerRef}>
                            {populateAlbums()}
                            {provided.placeholder}
                        </ol>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default graphql(getAlbumsQuery)(AlbumList);