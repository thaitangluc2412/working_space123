import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Backdrop.module.css';

const backdrop = (props) =>
  ReactDOM.createPortal(
    <div
      className={classes.backdrop}
      onClick={props.onBackdrop}
    />,
    document.getElementById('backdrop-root')
  );

export default backdrop;
