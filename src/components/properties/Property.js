import { useState, useEffect } from "react";
import classes from "./Property.module.css";
import Rating from "@mui/material/Rating";
import { Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Property = (props) => {
  const [propertyTypeId, setPropertyTypeId] = useState("");

  const onSeeInMap = (event) => {
    event.stopPropagation();
    props.handleSeeInMap(props.property.lat, props.property.lon);
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      "http://localhost:8080/api/property_type/property_type/" +
        props.property.propertyTypeId,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => setPropertyTypeId(data.data.propertyTypeName))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.property}>
      {/* <div
        className={classes.propertyImage}
        style={{
          width: "100%",
          height: "200px",
          backgroundImage: `url(${props.property.images[0].url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "10px",
        }}
      ></div> */}

      <Carousel className={classes.carousel} slide={false} controls={true}>
        {props.property.images?.map((image) => (
          <Carousel.Item className={classes.item}>
            <img
              className={classes.image}
              src={`${image.url}`}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className={classes.propertyContent}>
        <p className={classes.propertyType}>
          <span>{propertyTypeId}</span>
        </p>
        <h2>{props.property.propertyName}</h2>
        <p className={classes.propertyAddress}>{props.property.address}</p>
      </div>
      <div className={classes.priceContainer}>
        <Rating
          className={classes.rating}
          name="half-rating-read"
          defaultValue={props.property.rating ? props.property.rating : 4}
          precision={0.5}
          readOnly
        />
      </div>
      <div className={classes.button}>
        <button className={classes.btnMap} onClick={onSeeInMap}>
          See in map
        </button>
      </div>
    </div>
  );
};

export default Property;
