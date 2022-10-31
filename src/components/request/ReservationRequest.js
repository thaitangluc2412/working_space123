// import {
//   BsFillArchiveFill,
//   BsDoorOpen,
//   BsJoystick,
//   BsPaypal,
// } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./ReservationRequest.module.css";
import { useHistory } from "react-router-dom";
import {
  IoIosArrowRoundBack,
  IoIosPerson,
  IoMdPhonePortrait,
} from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { Carousel } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  IoAlarmSharp,
  IoWalletSharp,
  IoCloseCircleSharp,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";

import {
  BsCheckCircle,
  BsPaypal,
  BsFillCalendar2CheckFill,
  BsFillCalendarXFill,
} from "react-icons/bs";

const ReservationRequest = (props) => {
  const history = useHistory();
  const params = useParams();
  const { reservationId } = params;
  // NotificationManager.success('You approved for renting the room', 'Success')
  const [reservation, setReservation] = useState({});
  const [room, setRoom] = useState({});
  const [property, setProperty] = useState({});
  const [customer, setCustomer] = useState({});
  const [propertyType, setPropertyType] = useState("");

  document.title = "Rental Request | Roomless";

  const handleApproveRequest = () => {
    fetch(
      `http://localhost:8080/api/reservation/reservation_status/${reservation.reservationId}?reservationStatus=3`,
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
          reservationStatusId: 3,
        };
        setReservation(newReservation);
        // window.location.reload();
        NotificationManager.success(
          "You approved for renting the room",
          "Success"
        );
      })
      .catch((err) => console.log(err));
  };

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
        NotificationManager.error("You rejected for renting the room");
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
                fetch(
                  "http://localhost:8080/api/property_type/property_type/" +
                    rs1.data.propertyTypeId,
                  {
                    method: "GET",
                    headers: headers,
                  }
                )
                  .then((res) => res.json())
                  .then((data) => setPropertyType(data.data.propertyTypeName));
                setProperty(rs1.data);
              });
            setRoom(rs.data);
          });
        fetch("http://localhost:8080/api/customer/" + data.data.customerId, {
          method: "GET",
          headers: headers,
        })
          .then((res) => res.json())
          .then((rs2) => {
            setCustomer(rs2.data);
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
            ALL REQUESTS
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
          {" "}
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
        <div>
          <div className={classes.detail}>
            <label>Rental request information:</label>
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
                Amount: <span>{reservation.total} $</span>
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
            <label>Customer Information:</label>
            <div className={classes.rentInfo}>
              <p>
                <span>
                  <IoIosPerson />
                </span>{" "}
                Name: <span>{customer.customerName}</span>
              </p>
            </div>
            <div className={classes.rentInfo}>
              <p>
                <span>
                  <HiOutlineMail />
                </span>{" "}
                Email: <span>{customer.email}</span>
              </p>
            </div>
            <div className={classes.rentInfo}>
              <p>
                <span>
                  <IoMdPhonePortrait />
                </span>{" "}
                Phone: <span>{customer.phoneNumber}</span>
              </p>
            </div>
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
                    The request is rejected by the customer or cancelled by you.
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={classes.btnContainer}>
            <button
              className={classes.approvedBtn}
              onClick={handleApproveRequest}
            >
              <span>
                <IoCheckmarkCircleSharp />
              </span>
              Approve
            </button>
            <button className={classes.cancelBtn} onClick={handleCancelRequest}>
              <span>
                <IoCloseCircleSharp />
              </span>
              Cancel
            </button>
          </div>
        </div>
        <div className={classes.roomAndMap}>
          <div className={classes.room}>
            <p className={classes.header}>Room</p>
            <Carousel slide={false} controls={true}>
              {room.images?.map((image) => (
                <Carousel.Item className={classes.item}>
                  <img
                    className={classes.image}
                    src={`${image.url}`}
                    alt="First slide"
                    style={{
                      width: "100%",
                      height: "250px",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <label className={classes.name}>{room.roomName}</label>
          </div>
          <div className={classes.room}>
            <p className={classes.header}>Property</p>

            <Carousel slide={false} controls={true}>
              {property.images?.map((image) => (
                <Carousel.Item className={classes.item}>
                  <img
                    className={classes.image}
                    src={`${image.url}`}
                    alt="First slide"
                    style={{
                      width: "100%",
                      height: "250px",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <p className={classes.type}>{propertyType}</p>
            <label className={classes.name}>{property.propertyName}</label>
            <p className={classes.address}>{property.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationRequest;
