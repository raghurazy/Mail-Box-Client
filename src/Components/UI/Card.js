import React, { Fragment } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

import classes from './Card.module.css';

const Card = (props) => {
    return(
        <div className={classes.card}>{props.children}</div>
    );
}

export default Card;