import React from "react";
import ReactDOM from "react-dom";

import classes from "./ModalFilter.module.css";
import { IoMdSearch, IoMdHome } from "react-icons/io";


const ModalFilter = (props) => {
  const exitModalFilter = (event) => {
    event.preventDefault();
    props.onExitModalFilter();
  };

  return ReactDOM.createPortal(
    <div className={classes.modalFilter}>
      <div className={classes.titleFilter}>
        <a href="#" className={classes.close} onClick={exitModalFilter} />
        <h2>Filter listings</h2>
      </div>
      <div className={classes.contentFilter}>
        <div className={classes.control}>
          <label htmlFor="where" className={classes.titleChooseType}>
            Where?
          </label>
          <div className={classes.inputWhere}>
            <IoMdSearch className={classes.icon} />
            <input
              type="text"
              id="where"
              placeholder="Start typing a city..."
            />
          </div>
        </div>
        <div className={classes.control}>
          <label className={classes.titleChooseType}>Type of properties?</label>
          <label className={classes.containerType}>
            All
            <input type="radio" name="type" />
            <span className={classes.checkmark}></span>
          </label>

          <label className={classes.containerType}>
            Hotel
            <input type="radio" name="type" />
            <span className={classes.checkmark}></span>
          </label>

          <label className={classes.containerType}>
            Apartment
            <input type="radio" name="type" />
            <span className={classes.checkmark}></span>
          </label>

          <label className={classes.containerType}>
            Working Space
            <input type="radio" name="type" />
            <span className={classes.checkmark}></span>
          </label>

          <label className={classes.containerType}>
            Motel
            <input type="radio" name="type" />
            <span className={classes.checkmark}></span>
          </label>
        </div>

        {/* <div className={classes.control}>
          <label className={classes.titleChooseType}>Range price?</label>
        </div> */}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalFilter;
