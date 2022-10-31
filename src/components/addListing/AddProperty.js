import classes from "./AddProperty.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../store/authContext";
import {
  IoInformationCircleOutline,
  IoCameraOutline,
  IoLocationOutline,
} from "react-icons/io5";

import LoadingSpinner from "../UI/LoadingSpinner";

const AddProperty = (props) => {
  const [types, setType] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedPropertyTypeId, setSelectedPropertyTypeId] = useState();
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
      roomQuantity: 0,
      createDate: "2000-07-01T00:00:00",
      description: propertyDescriptionRef.current.value,
      rating: null,
      lat: 127.0,
      lon: 182.0,
      images: [],
    };
    // formData.append('propertyDto', JSON.stringify(propertyDto));
    formData.append(
      "propertyDto",
      new Blob([JSON.stringify(propertyDto)], {
        type: "application/json",
      })
    );
    const data = fetch("http://localhost:8080/api/properties", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        props.handleNotification("property");
      })
      .catch((error) => console.log("error occurred!"));
  };

  return (
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
              General property information
            </h3>
            <hr></hr>
            {/*  */}
            <div className={classes.control}>
              <label for="name">
                Enter the name <span>*</span>
              </label>
              <input
                ref={propertyNameRef}
                type="text"
                name="name"
                className={classes.inputName}
                placeholder="Name"
              />
            </div>
            <div className={classes.control}>
              <label for="price">
                What kind of house is it ? <span>*</span>
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
                  />
                  {type.propertyTypeName}
                </>
              ))}
            </div>
            <div className={classes.control}>
              <label for="firstname">
                Enter the description <span>*</span>
              </label>
              <textarea
                ref={propertyDescriptionRef}
                name="description"
                rows={5}
                cols={100}
                placeholder="Enter the description"
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
              <label for="size">
                Enter at least one photo <span>*</span>
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
                Enter full address <span>*</span>
              </label>
              <input
                ref={propertyAddressRef}
                type="text"
                name="address"
                placeholder="Enter address"
                className={classes.inputName}
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
              />
            </div>
          </div>
        </div>
        {isLoading && <LoadingSpinner />}
        <div className={classes.btnContainer}>
          <button type="submit" className={classes.btnRent}>
            Create Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
