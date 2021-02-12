import { Fragment } from 'react';

const Album = (props) => {
    return (
        <Fragment>
            <li>{props.albumTitle}</li>
        </Fragment>
    )
}

export default Album;