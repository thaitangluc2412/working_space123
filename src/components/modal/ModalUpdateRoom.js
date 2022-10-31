import classes from "./ModalUpdateProperty.module.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../../store/authContext";
import {
  IoInformationCircleOutline,
  IoCameraOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import { VscSettingsGear } from "react-icons/vsc";

const ModalUpdateRoom = (props) => {
  let formData = new FormData();
  const [isLoading, setLoading] = useState(false);
  const [price, setPrice] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/api/price/" + props.room.priceId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPrice(data.data);
      });
  }, []);

  const uploadJSONFiles = (event) => {
    event.preventDefault();
    formData.append("files", event.target.files[0]);
  };

  const handleExitModal = () => {
    props.onExitModalUpdateRoom();
  };

  const submitHandle = () => {};

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={handleExitModal} className={classes.close} />
        <h3>{props.room?.roomName}</h3>
      </header>
      <div>
        <form onSubmit={submitHandle}>
          <div className={classes.content}>
            <div className={classes.personInfo}>
              <h3>
                <span>
                  {/* <FontAwesomeIcon icon={icons["faWifi"]} /> */}
                  <IoInformationCircleOutline />
                </span>
                Room information
              </h3>
              <hr></hr>
              {/*  */}
              <div className={classes.control}>
                <label for="name">
                  Name <span>*</span>
                </label>
                <input
                  // ref={nameInputRef}
                  type="text"
                  name="name"
                  className={classes.inputName}
                  placeholder="Name"
                  defaultValue={props.room.roomName}
                />
              </div>
              <div className={classes.control}>
                <label for="size">
                  <i class="bi bi-archive"></i>
                  How big is it? <span>*</span> (m<sup>2</sup>)
                </label>
                <input
                  // ref={sizeInputRef}
                  type="text"
                  name="size"
                  placeholder="Enter size"
                  defaultValue={props.room.size}
                />
              </div>
              <div className={classes.control}>
                <label for="capacity">
                  How many people can live in the house in total? <span>*</span>
                </label>
                <input
                  // ref={capacityInputRef}
                  type="text"
                  name="capacity"
                  placeholder="Enter capacity"
                  defaultValue={props.room.capacity}
                />
              </div>
              <div className={classes.control}>
                <label for="firstname">
                  Enter the description <span>*</span>
                </label>
                <textarea
                  // ref={descriptionInputRef}
                  name="description"
                  rows={5}
                  cols={100}
                  placeholder="Enter the description"
                  defaultValue={props.room.description}
                ></textarea>
              </div>
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.personInfo}>
              <h3>
                <span>
                  <GiMoneyStack />
                </span>
                Price
              </h3>
              <hr></hr>
              {/*  */}
              <div className={classes.control}>
                <label for="price">
                  At what price do you want to rent it <span>*</span> (VNĐ)
                </label>
                <input
                  // ref={hourlyRef}
                  type="text"
                  name="price"
                  placeholder="Hourly price"
                  defaultValue={price.hourPrice}
                />
              </div>
              <div className={classes.control}>
                <input
                  // ref={dailyRef}
                  type="text"
                  name="price"
                  placeholder="Daily price"
                  defaultValue={price.dayPrice}
                />
              </div>
              <div className={classes.control}>
                <input
                  // ref={weeklyRef}
                  type="text"
                  name="price"
                  placeholder="Weekly price"
                  defaultValue={price.weekPrice}
                />
              </div>
              <div className={classes.control}>
                <input
                  // ref={monthRef}
                  type="text"
                  name="price"
                  placeholder="Monthly price"
                  defaultValue={price.monthPrice}
                />
              </div>
              <div className={classes.control}>
                <label for="price">
                  Does the price include all utilities ?
                </label>
                <input
                  type="radio"
                  name="include"
                  className={classes.radio}
                  checked
                  style={{
                    margin: "0px 15px",
                  }}
                />{" "}
                Yes
                <input
                  type="radio"
                  name="include"
                  className={classes.radio}
                  style={{
                    margin: "0px 15px",
                  }}
                />{" "}
                No
              </div>
            </div>
          </div>

          <div className={classes.content}>
            <div className={classes.personInfo}>
              <h3>
                <span>
                  <VscSettingsGear />
                </span>
                Service
              </h3>
              <hr></hr>
              <div className={classes.control}>
                <label for="service">
                  What services does the room offer? <span>*</span>
                </label>
                {props.room.services.map((service) => (
                  <div>
                    <input
                      type="checkbox"
                      style={{
                        margin: "15px 15px",
                        // padding: "8px",
                      }}
                      // onClick={hanldePickService}
                      id={service.serviceId}
                      name={service.serviceName}
                      value={service.icon}
                    />{" "}
                    {service.serviceName}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={classes.content}>
            <div className={classes.personInfo}>
              <h3>
                <span>
                  <IoCameraOutline />
                </span>
                Images *
              </h3>
              <hr></hr>
              {/*  */}
              <div className={classes.control}>
                <label for="name">
                  Images: <span>*</span>
                </label>
                {props.room?.images.map((image) => (
                  <input
                    type="text"
                    name="image"
                    className={classes.inputName}
                    placeholder="Image"
                    defaultValue={image.url}
                  />
                ))}
              </div>
              <div className={classes.control}>
                <label for="size">
                  Add more images <span>*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className={classes.image}
                  onChange={(event) => uploadJSONFiles(event)}
                  multiple
                />
              </div>
              <div className={classes.control}>
                <p>
                  The inclusion of quality images increases the chances of
                  renting.
                </p>
              </div>
            </div>
          </div>
          {isLoading && <LoadingSpinner />}
          <div className={classes.btnContainer}>
            <button type="submit" className={classes.btnRent}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalUpdateRoom;
