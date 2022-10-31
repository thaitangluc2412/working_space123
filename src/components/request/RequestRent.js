import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../store/authContext";
import classes from "./RequestRent.module.css";
import {
  BsFillArchiveFill,
  BsDoorOpen,
  BsJoystick,
  BsPaypal,
} from "react-icons/bs";
import ReservationDiv from "./ReservationDiv";

const RequestRent = (props) => {
  const authCtx = useContext(AuthContext);
  const [reservations, setReservation] = useState([]);

  document.title = "Requests | Roomless";

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      "http://localhost:8080/api/reservation/reservation_by_seller/" +
        authCtx.id +
        "?reservationStatusId=1",
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setReservation(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p>
          <span>
            <BsFillArchiveFill />
          </span>
          RENT REQUESTS
        </p>
      </div>
      <div className={classes.requests}>
        <div className={classes.filter}>
          <div className={classes.status}>
            <label>Status:</label>
            <select>
              <option value="ALL" selected>
                ALL
              </option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="PENDING">PENDING</option>
              <option value="PAYING">PAYING</option>
              <option value="APPROVED">APPROVED</option>
            </select>
          </div>
          <div className={classes.status}>
            <label>Sort by:</label>
            <select placeholder="select">
              <option value="" selected>
                None
              </option>
              <option value="Creation">Creation at</option>
              <option value="Lastupdate">Last update date</option>
              <option value="Checkin">Check-in date</option>
              <option value="Checkout">Check-out date</option>
            </select>
          </div>
          <div className={classes.btnContainer}>
            <button className={classes.btnRent}>Filter</button>
          </div>
        </div>
        <div className={classes.containerRequests}>
          {reservations.length == 0 && (
            <div>
              <h3>You don't have any request information.</h3>
            </div>
          )}
          {reservations.map((reservation) => (
            <NavLink
              className={classes.linkReservation}
              to={{
                pathname: `/request/${reservation.reservationId}/reservation`,
              }}
              key={reservation.reservationId}
            >
              <ReservationDiv reservation={reservation} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestRent;
