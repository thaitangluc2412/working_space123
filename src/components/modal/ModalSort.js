import React from "react";
import ReactDOM from "react-dom";

import classes from "./ModalSort.module.css";

const ModalSort = (props) => {
  const exitModalSort = (event) => {
    event.preventDefault();
    props.onExitModalSort();
  }

  return ReactDOM.createPortal(
    <div className={classes.modalSort}>
      <div className={classes.titleSort}>
          <a href="#"  className={classes.close} onClick={exitModalSort}/>
          <h2>Choose type sort</h2>
      </div>
      <div className={classes.container}>
        <button>Ordine</button>
        <button>Sort by name</button>
        <button>Newest first</button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalSort;
