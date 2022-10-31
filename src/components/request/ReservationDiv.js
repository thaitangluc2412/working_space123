import classes from "./ReservationDiv.module.css";
import { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsDoorOpen,
  BsJoystick,
  BsPaypal,
} from "react-icons/bs";
import { Carousel } from "react-bootstrap";

const ReservationDiv = (props) => {
  const [room, setRoom] = useState({});
  const [property, setProperty] = useState({});
  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch("http://localhost:8080/api/rooms/" + props.reservation.roomId, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        fetch("http://localhost:8080/api/properties/" + data.data.propertyId, {
          method: "GET",
          headers: headers,
        })
          .then((res) => res.json())
          .then((rs1) => {
            setProperty(rs1.data);
          });
        setRoom(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.reservation}>
      <div className={classes.div1}>
        <div className={classes.label}>
          <label>{props.reservation.createDate}</label>
        </div>
        <Carousel slide={false} controls={true}>
          {room.images?.map((image) => (
            <Carousel.Item className={classes.item}>
              <img
                className={classes.image}
                src={`${image.url}`}
                alt="First slide"
                style={{
                  width: "100%",
                  height: "100px",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className={classes.div2}>
        <div
          className={classes.status}
          style={{
            backgroundColor: `${
              props.reservation.reservationStatusId === 4
                ? "#d75a64"
                : props.reservation.reservationStatusId === 2
                ? "#44ac44"
                : "#fece04"
            }`,
          }}
        >
          {" "}
          {props.reservation.reservationStatusId === 1
            ? "PENDING"
            : props.reservation.reservationStatusId === 2
            ? "APPROVED"
            : props.reservation.reservationStatusId === 3
            ? "PAYING"
            : "CANCELLED"}
        </div>
        <div className={classes.inforreser}>
          <span>
            <BsDoorOpen />
          </span>{" "}
          {room.roomName}
        </div>
        <div className={classes.inforreser}>
          <span>
            <BsJoystick />
          </span>{" "}
          {property.address}
        </div>
        <div className={classes.inforreser}>
          <span>
            <BsPaypal />
          </span>{" "}
          {props.reservation.total} $
        </div>
      </div>
      <div className={classes.div3}>
        <div className={classes.checkin}>
          <p>
            Check-in
            <br></br>
            <span>{props.reservation.startDate}</span>
          </p>
        </div>
        <div className={classes.checkin}>
          <p>
            Check-out
            <br></br>
            <span>{props.reservation.endDate}</span>
            <br></br>( <span>{props.reservation.quantity}</span> days )
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationDiv;
