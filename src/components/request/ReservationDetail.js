import { IoIosArrowRoundDown, IoIosArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import {
  BsCheckCircle,
  BsPaypal,
  BsFillCalendar2CheckFill,
  BsFillCalendarXFill,
} from "react-icons/bs";
import { useState, useEffect } from "react";
import {
  IoAlarmSharp,
  IoCheckmarkCircleSharp,
  IoWalletSharp,
  IoCloseCircleSharp,
} from "react-icons/io5";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom";
import classes from "./ReservationDetail.module.css";
import RoomCard from "./RoomCard";
// import PropertyCard from "./PropertyCard";
import Map from "../properties/Map";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const ReservationDetail = (props) => {
  const history = useHistory();
  const [reservation, setReservation] = useState({});
  const [room, setRoom] = useState({});
  const [property, setProperty] = useState({});
  const params = useParams();
  const { reservationId } = params;

  document.title = "Detail reservation | Roomless";

  const handleCancelRequest = () => {
    fetch(
      `http://localhost:8080/api/reservation/reservation_status/${reservation.reservationId}?reservationStatus=4`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newReservation = {
          ...reservation,
          reservationStatusId: 4,
        };
        setReservation(newReservation);
        // window.location.reload();
        NotificationManager.error("You cancelled the request");
      })
      .catch((err) => console.log(err));
  };

  const handleCompleteRequest = () => {
    fetch(
      `http://localhost:8080/api/reservation/reservation_status/${reservation.reservationId}?reservationStatus=2`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const newReservation = {
          ...reservation,
          reservationStatusId: 2,
        };
        setReservation(newReservation);
        // window.location.reload();
        NotificationManager.success(
          "You rent the room successfully!",
          "Completed"
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch("http://localhost:8080/api/reservation/" + reservationId, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        fetch("http://localhost:8080/api/rooms/" + data.data.roomId, {
          method: "GET",

          headers: headers,
        })
          .then((res) => res.json())
          .then((rs) => {
            fetch(
              "http://localhost:8080/api/properties/" + rs.data.propertyId,
              {
                method: "GET",
                headers: headers,
              }
            )
              .then((res) => res.json())
              .then((rs1) => {
                setProperty(rs1.data);
              });
            setRoom(rs.data);
          });
        setReservation(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      <div>
        <NotificationContainer />
      </div>
      <div className={classes.header}>
        <div className={classes.goBack}>
          <button onClick={() => history.goBack()}>
            <span>
              <IoIosArrowRoundBack />
            </span>
            ALL RESERVATIONS
          </button>
        </div>
        <div
          className={classes.status}
          style={{
            backgroundColor: `${
              reservation.reservationStatusId === 4
                ? "#d75a64"
                : reservation.reservationStatusId === 2
                ? "#44ac44"
                : "#fece04"
            }`,
          }}
        >
          {reservation.reservationStatusId === 1
            ? "Pending"
            : reservation.reservationStatusId === 2
            ? "Approved"
            : reservation.reservationStatusId === 3
            ? "Paying"
            : "Cancelled"}
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.space}>
          <RoomCard room={room} />
          <div className={classes.linked}>
            <span>
              <IoIosArrowRoundDown />
            </span>
          </div>
          <div className={classes.map}>
            <label className={classes.name}>Property Address</label>
            <p className={classes.address}>
              Via Torino, Milan, Città Metropolitana Di Milano
            </p>
            <Map
              lat="16.089616712151383"
              lng="108.14348783953365"
              height="300px"
            ></Map>
          </div>
        </div>
        <div className={classes.information}>
          <div className={classes.wrapper}>
            <div className={classes.inforReservation}>
              <span>Reservation Information</span>
              <div className={classes.rentInfo}>
                <p>
                  <span>
                    <BsCheckCircle />
                  </span>{" "}
                  Daily rent booked: <span>{reservation.quantity}</span>
                </p>
              </div>
              <div className={classes.rentInfo}>
                <p>
                  <span>
                    <BsPaypal />
                  </span>{" "}
                  Amount: <span>{reservation.total} VNĐ</span>
                </p>
              </div>
              <div className={classes.rentInfo}>
                <p>
                  <span>
                    <BsFillCalendar2CheckFill />
                  </span>{" "}
                  Check-in: <span>{reservation.startDate}</span>{" "}
                </p>
              </div>
              <div className={classes.rentInfo}>
                <p>
                  <span>
                    <BsFillCalendarXFill />
                  </span>{" "}
                  Check-out: <span>{reservation.endDate}</span>
                </p>
              </div>
              <span>Status Processing</span>
              {reservation.reservationStatusId === 1 && (
                <div
                  className={classes.status1}
                  style={{
                    border: "1px solid #fece04",
                  }}
                >
                  <div
                    className={classes.icon}
                    style={{
                      color: "#fece04",
                    }}
                  >
                    <IoAlarmSharp />
                  </div>
                  <div className={classes.text}>
                    <div
                      className={classes.notify}
                      style={{
                        color: "#fece04",
                      }}
                    >
                      The request must be confirmed.
                    </div>
                    <div className={classes.note}>
                      The request must be confirmed by the owner of the room.
                    </div>
                  </div>
                </div>
              )}
              {reservation.reservationStatusId === 2 && (
                <div
                  className={classes.status1}
                  style={{
                    border: "1px solid #44ac44",
                  }}
                >
                  <div
                    className={classes.icon}
                    style={{
                      color: "#44ac44",
                    }}
                  >
                    <IoCheckmarkCircleSharp />
                  </div>
                  <div className={classes.text}>
                    <div
                      className={classes.notify}
                      style={{
                        color: "#44ac44",
                      }}
                    >
                      The request is completed.
                    </div>
                    <div className={classes.note}>
                      The owner accepted and you paid the total.
                    </div>
                  </div>
                </div>
              )}
              {reservation.reservationStatusId === 3 && (
                <div
                  className={classes.status1}
                  style={{
                    border: "1px solid #fece04",
                  }}
                >
                  <div
                    className={classes.icon}
                    style={{
                      color: "#fece04",
                    }}
                  >
                    <IoWalletSharp />
                  </div>
                  <div className={classes.text}>
                    <div
                      className={classes.notify}
                      style={{
                        color: "#fece04",
                      }}
                    >
                      The request is waiting for your deposit.
                    </div>
                    <div className={classes.note}>
                      The request is confirmed by the owner and now you can
                      deposit.
                    </div>
                  </div>
                </div>
              )}
              {reservation.reservationStatusId === 4 && (
                <div
                  className={classes.status1}
                  style={{
                    border: "1px solid #d75a64",
                  }}
                >
                  <div
                    className={classes.icon}
                    style={{
                      color: "#d75a64",
                    }}
                  >
                    <IoCloseCircleSharp />
                  </div>
                  <div className={classes.text}>
                    <div
                      className={classes.notify}
                      style={{
                        color: "#d75a64",
                      }}
                    >
                      The request has been cancelled.
                    </div>
                    <div className={classes.note}>
                      The request is rejected by the owner or cancelled by you.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/*             
            <div className={classes.inforReservation}>
              
            </div> */}
            <div className={classes.paypal}>
              <label>Method payment:</label>
              <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalButtons
                  disabled={reservation.reservationStatusId !== 3 && true}
                  style={{
                    layout: "horizontal",
                    color: "black",
                    tagline: false,
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            // value: "" + props.reservation.total,
                            value: "" + reservation.total,
                            showSpinner: true,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handleCompleteRequest();
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
            <p>
              - You need the approvement of the owner to deposit the total rent.
            </p>
            <p>
              - If you don't want to rent it anymore, just cancel the request
              reservation.
            </p>
            <div className={classes.btnContainer}>
              <button className={classes.btnRent} onClick={handleCancelRequest}>
                XCancel request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
