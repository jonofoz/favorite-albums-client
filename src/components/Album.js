import { Fragment } from 'react';

const Album = (props) => {
    const checkDetailsShown = (showDetails) => {
        if (!showDetails) {
            return null;
        }
        else {
            return (
                <div>details to come...</div>
            );
        }
    }

    return (
        <Fragment>
            <li>{props.albumName}</li>
            {checkDetailsShown(props.showDetails)}
        </Fragment>
    )
}

export default Album;