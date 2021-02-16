import { useState, useEffect, useRef } from 'react'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getArtistsQuery, getAlbumsQuery, addAlbumMutation, addArtistMutation } from '../queries/queries'

import { getAlbumCover, authenticateUser } from '../utils/utils';
import useOutsideClick from './useOutsideClick';

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const AddAlbumForm = props => {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [ranking, setRanking] = useState('');
    const [YOR, setYOR] = useState(''); // Year Of Release
    const [commentary, setCommentary] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    // TODO: Actually implement genre adding
    const [genre, setGenre] = useState(['']);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [showAlbumBeingAdded, setShowAlbumBeingAdded] = useState(false);

    const modalContainer = useRef(null);
    const modalContent = useRef(null);

    // Get the ID of an artist based on the name. If the artist doesn't exist, create them and return their ID.
    const getArtistId = async (props) => {
        const knownArtists = props.getArtistsQuery.artists;
        const knownArtistNames = knownArtists.map(a => { return a.name })
        // If the artist already exists, return their ID.
        if (knownArtistNames.includes(artist) ||
            knownArtistNames.includes(toTitleCase(artist)) ||
            knownArtistNames.includes(artist.toUpperCase()) ||
            knownArtistNames.includes(artist.toLowerCase())) {
            console.log("FOUND!")
            return knownArtists.filter(a =>
                (a.name == artist) ||
                (a.name == toTitleCase(artist)) ||
                (a.name == artist.toUpperCase()) ||
                (a.name == artist.toLowerCase())
            )[0].id
        }
        else {
            return props.addArtistMutation({
                variables: {
                    name: artist
                },
                refetchQueries: [{ query: getArtistsQuery }]
            }).then(res => {
                console.log(`NEW ARTIST: (${res.data.addArtist.name},${res.data.addArtist.id})`);
                return res.data.addArtist.id;
            })
                .catch((err) => console.log(err.message));
        }
    }

    const onFormSubmit = async (e, props) => {
        e.preventDefault();

        if (isNaN(parseInt(ranking))) {
            // Todo: Raise error
            console.log("Ranking must be an integer.");
        }
        else if (isNaN(parseInt(YOR))) {
            // Todo: Raise error
            console.log("Year Of Release must be an integer.")
        }
        else {
            await authenticateUser(adminPassword)
                .then(async res => {
                    if (res.status == 200) {
                        await Promise.all([getArtistId(props), getAlbumCover(name, artist)])
                            .then(res => {
                                setShowAlbumBeingAdded(true)
                                return props.addAlbumMutation({
                                    variables: {
                                        name: name,
                                        artistId: res[0],
                                        ranking: parseInt(ranking),
                                        yearOfRelease: parseInt(YOR),
                                        genre: genre,
                                        thumbnail: res[1],
                                        commentary: commentary
                                    },
                                    refetchQueries: [{ query: getAlbumsQuery }]
                                })
                            }).then(album => {
                                setShowAlbumBeingAdded(false);
                                setModalVisibility(false);
                                var delay = setTimeout(() => {
                                    document.querySelector(`#album-${album.data.addAlbum.id}`).scrollIntoView({ behavior: 'smooth' })
                                    clearTimeout(delay);
                                }, 250);
                            })
                            .catch((err) => { })
                    }
                })
        }
    }

    const showModal = () => {
        setModalVisibility(true);
    };
    const hideModal = () => {
        setModalVisibility(false);
    };
    useOutsideClick(modalContent, () => {
        if (modalVisibility == true) {
            setModalVisibility(false);
        }
    });

    useEffect(() => {
        if (modalVisibility) {
            modalContainer.current.style.display = "block";
        }
        else {
            modalContainer.current.style.display = "none";
        }
    })

    return (
        <div className="container container-add-album">

            <br />
            <button id="myBtn" className="btn btn-primary btn-block" onClick={() => showModal()}>Add Album</button>
            <br />
            <div ref={modalContainer} id="myModal" className="modal">
                <div ref={modalContent} className="modal-content">
                    <span className="close" onClick={() => hideModal()}>&times;</span>
                    <form id="form-add-album" onSubmit={(e) => onFormSubmit(e, props)}>
                        <div className="form-group">
                            <label className="label-add-album" htmlFor="add-album-name">Name</label>
                            <input className="form-control" type="text" id="add-album-name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="label-add-album" htmlFor="add-album-artist">Artist</label>
                            <input className="form-control" type="text" id="add-album-artist" value={artist} onChange={(e) => setArtist(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="label-add-album" htmlFor="add-album-ranking">Ranking</label>
                            <input className="form-control" type="text" id="add-album-ranking" value={ranking} onChange={(e) => setRanking(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="label-add-album" htmlFor="add-album-YOR">Year Of Release</label>
                            <input className="form-control" type="text" id="add-album-YOR" value={YOR} onChange={(e) => setYOR(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="label-add-album" htmlFor="add-album-commentary">Commentary</label>
                            <input className="form-control" type="text" id="add-album-commentary" value={commentary} onChange={(e) => setCommentary(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label className="label-add-album" htmlFor="add-album-admin-password">Admin Password</label>
                            <input className="form-control" type="password" id="add-album-admin-password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}></input>
                        </div>
                        <button className="btn btn-primary btn-block">+</button>
                    </form>
                    <br />
                    <div className="p-3">
                        <div className="d-flex justify-content-center">
                            <div className="p-2 spinner-border d-flex flex-column" role="status" style={{ "visibility": showAlbumBeingAdded ? "visible" : "hidden" }}>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex flex-column">
                                <h4 style={{ "visibility": showAlbumBeingAdded ? "visible" : "hidden" }}>Adding album...</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default compose(
    graphql(getArtistsQuery, { name: "getArtistsQuery" }),
    graphql(getAlbumsQuery, { name: "getAlbumsQuery" }),
    graphql(addAlbumMutation, { name: "addAlbumMutation" }),
    graphql(addArtistMutation, { name: "addArtistMutation" })
)(AddAlbumForm);
