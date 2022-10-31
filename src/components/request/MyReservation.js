import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/authContext";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import { BsFillArchiveFill } from "react-icons/bs";
import classes from "./MyReservation.module.css";

import ReservationCard from "./ReservationCard";

const MyReservation = (props) => {
  const authCtx = useContext(AuthContext);
  const [reservations, setReservation] = useState([]);

  document.title = "My reservation | Roomless";

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(
      "http://localhost:8080/api/reservation/reservation_by_customer/" +
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

  const handleNotification = () => {
    NotificationManager.info("Your reservation must be completed to review");
  };

  return (
    <div class={classes.container}>
      <NotificationContainer />
      <h2 className={classes.headerr}>
        <span>
          <BsFillArchiveFill />
        </span>
        MY RESERVATIONS
      </h2>
      {reservations.length === 0 && (
        <div>
          <h3>You don't have any reservation yet.</h3>
        </div>
      )}
      {reservations.length !== 0 && (
        <ul class={classes.responsiveTable}>
          <li className={classes.tableHeader}>
            <div className={classes.col1}>Room</div>
            <div className={classes.col2}>Landlord Information</div>
            <div className={classes.col3}>Check-in</div>
            <div className={classes.col4}>Check-out</div>
            <div className={classes.col5}>Status</div>
            <div className={classes.col6}>Review</div>
            <div className={classes.col7}>Detail</div>
          </li>
          {reservations?.map((reservation) => (
            <ReservationCard
              reservation={reservation}
              onActiveModalReview={props.onActiveModalReview}
              handleNotification={handleNotification}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReservation;
