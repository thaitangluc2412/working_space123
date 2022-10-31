import { useState, useEffect } from "react";
import classes from "./PropertyCard.module.css";
import { Carousel } from "react-bootstrap";

const PropertyCard = (props) => {
  const [propertyType, setPropertyType] = useState("");
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
      .then((data) => setPropertyType(data.data.propertyTypeName))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.room}>
      <p className={classes.header}>Property</p>

      <Carousel slide={false} controls={true}>
        {props.property.images?.map((image) => (
          <Carousel.Item className={classes.item}>
            <img
              className={classes.image}
              src={`${image.url}`}
              alt="First slide"
              style={{
                width: "100%",
                height: "300px",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <p>{propertyType}</p>
      <label className={classes.name}>{props.property.propertyName}</label>
      <p className={classes.address}>{props.property.address}</p>
    </div>
  );
};

export default PropertyCard;
