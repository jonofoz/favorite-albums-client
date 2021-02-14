import { useState } from 'react'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getArtistsQuery, addAlbumMutation, addArtistMutation } from '../queries/queries'

import { getAlbumCover } from '../utils/utils';

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
    const [genre, setGenre] = useState(['']);
    const [YOR, setYOR] = useState(''); // Year Of Release
    const [commentary, setCommentary] = useState('');

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
            // TODO: let user know album is being added and when it's added
            await Promise.all([getArtistId(props), getAlbumCover(name, artist)])
                .then(res => {
                    props.addAlbumMutation({
                        variables: {
                            name: name,
                            artistId: res[0],
                            ranking: parseInt(ranking),
                            yearOfRelease: parseInt(YOR),
                            genre: genre,
                            thumbnail: res[1],
                            commentary: commentary
                        }
                    })

                })
                .catch((err) => { })
        }
    };

    return (
        <div className="container-add-album">
            <form id="form-add-album" onSubmit={(e) => onFormSubmit(e, props)}>
                <label className="label-add-album" htmlFor="add-album-name">Name</label>
                <input type="text" id="add-album-name" value={name} onChange={(e) => setName(e.target.value)}></input>
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

export default compose(
    graphql(getArtistsQuery, { name: "getArtistsQuery" }),
    graphql(addAlbumMutation, { name: "addAlbumMutation" }),
    graphql(addArtistMutation, { name: "addArtistMutation" })
)(AddAlbumForm);
