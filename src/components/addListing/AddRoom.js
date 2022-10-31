import classes from "./AddRoom.module.css";
import { useState, useEffect, useContext, useRef } from "react";
import {
  IoInformationCircleOutline,
  IoCameraOutline,
  IoLocationOutline,
  IoBusinessOutline,
} from "react-icons/io5";
import { VscSettingsGear } from "react-icons/vsc";
import { GiMoneyStack } from "react-icons/gi";
import AuthContext from "../../store/authContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import { icons } from "../../lib/icon";

var pickedServices = [];

function removeItemOnce(services, value) {
  const filteredServices = services.filter((service) => {
    return service.serviceId !== value.serviceId;
  });
  return filteredServices;
}

const AddRoom = (props) => {
  const [services, setService] = useState([]);
  // const [pickedService, setPickedService] = useState([]);
  const [properties, setProperty] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const nameInputRef = useRef();
  const sizeInputRef = useRef();
  const capacityInputRef = useRef();
  const descriptionInputRef = useRef();
  const propertyRef = useRef();
  const hourlyRef = useRef();
  const dailyRef = useRef();
  const weeklyRef = useRef();
  const monthRef = useRef();
  const depositRef = useRef();

  let formData = new FormData();
  // console.log(icons["faWifi"] === faWifi);

  useEffect(() => {
    fetch(
      "http://localhost:8080/api/properties/getByCustomerId/" + authCtx.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProperty(data.data);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/api/service", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setService(data.data);
      });
  }, []);

  const handlePickProperty = (event) => {
    //  console.log(event.target.value);
  };

  const hanldePickService = (event) => {
    if (event.target.checked) {
      pickedServices.push({
        serviceId: +event.target.id,
        serviceName: event.target.name,
        icon: event.target.value,
      });
    } else {
      pickedServices = removeItemOnce(pickedServices, {
        serviceId: +event.target.id,
        serviceName: event.target.name,
        icon: event.target.value,
      });
    }
  };

  const uploadJSONFiles = (event) => {
    event.preventDefault();
    formData.append("files", event.target.files[0]);
  };

  const submitHandle = (event) => {
    setLoading(true);
    event.preventDefault();
    const roomDto = {
      propertyId: +propertyRef.current.value,
      price: {
        hourPrice: +hourlyRef.current.value,
        dayPrice: +dailyRef.current.value,
        weekPrice: +weeklyRef.current.value,
        monthPrice: +monthRef.current.value,
      },
      roomStatusId: 2,
      roomName: nameInputRef.current.value,
      size: sizeInputRef.current.value,
      capacity: capacityInputRef.current.value,
      description: descriptionInputRef.current.value,
      bedrooms: 1,
      images: [],
      services: pickedServices,
    };
    console.log(roomDto);
    // formData.append('propertyDto', JSON.stringify(propertyDto));
    formData.append(
      "roomWithPriceDto",
      new Blob([JSON.stringify(roomDto)], {
        type: "application/json",
      })
    );
    const data = fetch("http://localhost:8080/api/rooms", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        props.handleNotification("room");
      })
      .catch((error) => console.log("error occurred!", error));
  };

  return (
    <div>
      <form onSubmit={submitHandle}>
        <div className={classes.content}>
          <div className={classes.personInfo}>
            <h3>
              <span>
                <IoInformationCircleOutline />
              </span>
              General room information
            </h3>
            <hr></hr>
            {/*  */}
            <div className={classes.control}>
              <label for="name">
                Enter the name <span>*</span>
              </label>
              <input
                ref={nameInputRef}
                type="text"
                name="name"
                className={classes.inputName}
                placeholder="Name"
              />
            </div>
            <div className={classes.control}>
              <label for="size">
                <i class="bi bi-archive"></i>
                How big is it? <span>*</span> (m<sup>2</sup>)
              </label>
              <input
                ref={sizeInputRef}
                type="text"
                name="size"
                placeholder="Enter size"
              />
            </div>
            <div className={classes.control}>
              <label for="capacity">
                How many people can live in the house in total? <span>*</span>
              </label>
              <input
                ref={capacityInputRef}
                type="text"
                name="capacity"
                placeholder="Enter capacity"
              />
            </div>
            <div className={classes.control}>
              <label for="firstname">
                Enter the description <span>*</span>
              </label>
              <textarea
                ref={descriptionInputRef}
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
                <GiMoneyStack />
              </span>
              Price
            </h3>
            <hr></hr>
            {/*  */}
            <div className={classes.control}>
              <label for="price">
                At what price do you want to rent it <span>*</span> ($)
              </label>
              <input
                ref={hourlyRef}
                type="text"
                name="price"
                placeholder="Hourly price"
              />
            </div>
            <div className={classes.control}>
              <input
                ref={dailyRef}
                type="text"
                name="price"
                placeholder="Daily price"
              />
            </div>
            <div className={classes.control}>
              <input
                ref={weeklyRef}
                type="text"
                name="price"
                placeholder="Weekly price"
              />
            </div>
            <div className={classes.control}>
              <input
                ref={monthRef}
                type="text"
                name="price"
                placeholder="Monthly price"
              />
            </div>
            <div className={classes.control}>
              <label for="price">Does the price include all utilities ?</label>
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

            <div className={classes.control}>
              <label for="deposit">
                How much is the deposit <span>*</span> (%)
              </label>
              <input
                ref={depositRef}
                type="text"
                name="deposit"
                placeholder="Enter deposit"
              />
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
              {services.map((service) => (
                <div>
                  <input
                    type="checkbox"
                    style={{
                      margin: "15px 15px",
                      // padding: "8px",
                    }}
                    onClick={hanldePickService}
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
                <IoBusinessOutline />
              </span>
              Belong to property
            </h3>
            <hr></hr>
            <div className={classes.control}>
              <label for="property">
                Choose the property of this room <span>*</span>
              </label>
              <select
                ref={propertyRef}
                onChange={handlePickProperty}
                name="property"
                id="property"
              >
                {properties.map((property) => (
                  <option value={property.propertyId}>
                    {property.propertyName}
                  </option>
                ))}
              </select>
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
        {isLoading && <LoadingSpinner />}
        <div className={classes.btnContainer}>
          <button type="submit" className={classes.btnRent}>
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
