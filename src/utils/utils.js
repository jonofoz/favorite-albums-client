let server;
switch (process.env.NODE_ENV) {
    case 'development':
        server = 'http://localhost:5000';
        break
    case 'test':
        server = 'http://localhost:5000';
        break
    case 'production':
        server = 'https://jonofoz-favorite-albums-server.herokuapp.com';
        break
    case 'production':
};

// Slugify texts from query compatability
function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/\//g, '-')
        .replace(/[^\w-]+/g, '')
        ;
}

const getAlbumCover = async (name, artist) => {
    artist = convertToSlug(artist);
    name = convertToSlug(name);
    return await fetch(`${server}/album-art/${artist}/${name}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => { return res })
        .catch((err) => console.log(err.message));
}

const authenticateUser = async (password) => {
    return await fetch(`${server}/auth/${password}`)
}
export {
    convertToSlug,
    getAlbumCover,
    authenticateUser
}