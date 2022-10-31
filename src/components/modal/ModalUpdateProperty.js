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

const ModalUpdateProperty = (props) => {
  const history = useHistory();
  const [types, setType] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [quantityRoom, setQuantityRoom] = useState(0);
  const [selectedPropertyTypeId, setSelectedPropertyTypeId] = useState(
    props.property.propertyTypeId
  );
  const propertyNameRef = useRef();
  const propertyDescriptionRef = useRef();
  const propertyAddressRef = useRef();
  const propertyCityRef = useRef();
  // const propertyTypeIdRef = useRef();

  let formData = new FormData();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");

    fetch("http://localhost:8080/api/property_type/property_types", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setType(data.data);
      })
      .catch((err) => console.log(err));

    fetch(
      `http://localhost:8080/api/properties/${props.property.propertyId}/rooms`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setQuantityRoom(data.data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  const uploadJSONFiles = (event) => {
    event.preventDefault();
    formData.append("files", event.target.files[0]);
  };

  const radioHandler = (event) => {
    setSelectedPropertyTypeId(event.target.value);
  };

  const submitHandle = (event) => {
    setLoading(true);

    event.preventDefault();
    const propertyDto = {
      customerId: authCtx.id,
      propertyTypeId: selectedPropertyTypeId,
      propertyName: propertyNameRef.current.value,
      address: propertyAddressRef.current.value,
      city: propertyCityRef.current.value,
      roomQuantity: quantityRoom,
      createDate: "2000-07-01T00:00:00",
      description: propertyDescriptionRef.current.value,
      rating: null,
      lat: 127.0,
      lon: 182.0,
      images: [],
    };
    // formData.append('propertyDto', JSON.stringify(propertyDto));
    console.log(propertyDto);
    formData.append(
      "propertyDto",
      new Blob([JSON.stringify(propertyDto)], {
        type: "application/json",
      })
    );
    const data = fetch(
      `http://localhost:8080/api/properties/${props.property.propertyId}`,
      {
        method: "PUT",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setLoading(false);
        props.updateSuccess();
        props.onExitModalUpdateProperty();
      })
      .catch((error) => console.log("error occurred!", error));
  };

  const handleExitModal = (event) => {
    event.preventDefault();
    props.onExitModalUpdateProperty();
  };

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={handleExitModal} className={classes.close} />
        <h3>{props.property?.propertyName}</h3>
      </header>
      <div>
        {/* <LoadingSpinner /> */}
        {/* <NotificationContainer /> */}
        <form onSubmit={submitHandle}>
          <div className={classes.content}>
            <div className={classes.personInfo}>
              <h3>
                <span>
                  <IoInformationCircleOutline />
                </span>
                Property information
              </h3>
              <hr></hr>
              {/*  */}
              <div className={classes.control}>
                <label for="name">
                  Name: <span>*</span>
                </label>
                <input
                  ref={propertyNameRef}
                  type="text"
                  name="name"
                  className={classes.inputName}
                  placeholder="Name"
                  defaultValue={props.property.propertyName}
                />
              </div>
              <div className={classes.control}>
                <label for="price">
                  Kind of the house: <span>*</span>
                </label>
                {types.map((type) => (
                  <>
                    <input
                      // ref={propertyTypeIdRef}
                      value={type.propertyTypeId}
                      type="radio"
                      name="include"
                      className={classes.radio}
                      style={{
                        margin: "0px 15px",
                      }}
                      onChange={radioHandler}
                      checked={
                        type.propertyTypeId === props.property.propertyTypeId
                          ? true
                          : false
                      }
                    />
                    {type.propertyTypeName}
                  </>
                ))}
              </div>
              <div className={classes.control}>
                <label for="firstname">
                  The description <span>*</span>
                </label>
                <textarea
                  ref={propertyDescriptionRef}
                  name="description"
                  rows={5}
                  cols={100}
                  placeholder="Enter the description"
                  defaultValue={props.property.description}
                ></textarea>
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
                {props.property?.images.map((image) => (
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

          <div className={classes.content}>
            <div className={classes.personInfo}>
              <h3>
                <span>
                  <IoLocationOutline />
                </span>
                Address *
              </h3>
              <hr></hr>
              {/*  */}

              <div className={classes.control}>
                <label for="address">
                  Full address <span>*</span>
                </label>
                <input
                  ref={propertyAddressRef}
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  className={classes.inputName}
                  defaultValue={props.property.address}
                />
              </div>
              <div className={classes.control}>
                <label for="address">
                  Enter city <span>*</span>
                </label>
                <input
                  ref={propertyCityRef}
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  // className={classes.inputName}
                  defaultValue={props.property.city}
                />
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

export default ModalUpdateProperty;
