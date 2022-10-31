import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./ModalRent.module.css";
import DatePicker from "react-datetime";
// import moment from 'moment';
import "react-datetime/css/react-datetime.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "./ModalRent.module.css";
import { IoIosCalendar, IoIosArrowRoundForward } from "react-icons/io";
import { IoArrowForwardCircle } from "react-icons/io5";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import { Carousel } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../../store/authContext";

const convertDateToString = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const rs = year + "-" + month + "-" + day;
  return rs;
};

const ModalRent = (props) => {
  const authCtx = useContext(AuthContext);
  const iconArrow = "IoIosArrowRoundForward";
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [limitDate, setLimitDate] = useState(new Date());
  const [quantityDays, setQuantityDays] = useState(1);
  const [validDates, setValidDates] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(
      "http://localhost:8080/api/reservation/get_invalid_date/" +
        props.room.roomId
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setValidDates(data.data);
      });
  }, [validDates]);

  const disableCustomDt = (current) => {
    return (
      !validDates.includes(current.format("YYYY-MM-DD")) &&
      new Date(current) > new Date()
    );
  };
  useEffect(() => {
    const date = convertDateToString(startDate);

    console.log(date);
    fetch(
      `http://localhost:8080/api/reservation/furthest_valid_date/${props.room.roomId}?from=${date}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("Ngay limit ne" + data.data);
        setLimitDate(data.data);
        // setLimitDate("2022-05-29");
      });
  }, [startDate]);

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch("http://localhost:8080/api/price/" + props.room.priceId, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setPrice(data.data.dayPrice);
      })
      .catch((err) => console.log(err));
  }, []);

  const disableEndDate = (current) => {
    return (
      new Date(current) <= new Date(limitDate) &&
      new Date(current) >= new Date(startDate) &&
      new Date(current) >= new Date() &&
      startDate != null
    );
  };

  const onActiveModalPayment = () => {
    const reservation = {
      roomId: props.room.roomId,
      customerId: authCtx.id,
      createDate: convertDateToString(new Date()),
      startDate: convertDateToString(startDate),
      endDate: convertDateToString(endDate),
      quantity: quantityDays,
      reservationStatusId: 1,
      total: price * quantityDays,
      deposit: 0.2,
    };
    props.onActiveModalPayment(reservation);
  };

  const chooseStartDate = (date) => {
    setStartDate(date);
    if (new Date(date) > new Date(endDate)) {
      setEndDate(date);
      console.log(new Date(endDate));
      setQuantityDays(1);
    } else {
      setQuantityDays((new Date(endDate) - new Date(date)) / 86400000 + 1);
    }
  };

  const chooseEndDate = (date) => {
    setEndDate(date);
    setQuantityDays((new Date(date) - new Date(startDate)) / 86400000 + 1);
  };

  const exitRegister = (event) => {
    event.preventDefault();
    props.onExitModalRent();
  };

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitRegister} className={classes.close} />
        <h3>Rent request</h3>
      </header>
      <div className={classes.container}>
        <div className={classes.containerLeft}>
          <div className={classes.top}>
            <h4>Booking details</h4>
            <div className={classes.bookDetails}>
              <div className={classes.datePickerWrapper}>
                <p>Check-in</p>
                <div className={classes.date_picker_wrapper}>
                  <DatePicker
                    // selected={startDate}
                    // placeholderText="Pick day..."
                    onChange={(date) => chooseStartDate(date)}
                    wrapperClassName={classes.datePicker}
                    value={startDate}
                    minDate={new Date()}
                    dateFormat="YYYY-MM-DD"
                    isValidDate={disableCustomDt}
                    timeFormat={false}
                    // onNavigateBack={(amount, type) =>
                    //   console.log(amount + "  " + type)
                    // }
                    // onNavigateForward={(month, year) =>
                    //   console.log(month + "  " + year)
                    // }

                    // ref={startDateRef}
                  />
                  <span>
                    <IoIosCalendar className={classes.iconCarlendar} />
                  </span>
                </div>
              </div>
              <div className={classes.arrow}>
                <p>
                  <span>
                    <IoIosArrowRoundForward />
                  </span>
                </p>
              </div>
              <div className={classes.datePickerWrapper}>
                <p>Check-out</p>
                <div className={classes.date_picker_wrapper}>
                  <DatePicker
                    onChange={(date) => chooseEndDate(date)}
                    wrapperClassName={classes.datePicker}
                    value={endDate}
                    minDate={startDate}
                    dateFormat="YYYY-MM-DD"
                    isValidDate={disableEndDate}
                    timeFormat={false}
                  />
                  <span>
                    <IoIosCalendar className={classes.iconCarlendar} />
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.underInfo}>
              <p>
                Enter your <b>actual check-out date.</b>
              </p>
              <p>
                If you book for a shorter period you are not guaranteed to be
                able to renew!
              </p>
            </div>
            {/* <h4>Request amentities</h4>
            <div className={classes.amentity}>
                <p> <span><IoArrowForwardCircle /> </span>Desk 
                <input type="checkbox"></input></p>
               
            </div> */}
            <h4>{props.room.name}</h4>
            {/* <div
              className={classes.imageRoom}
              style={{
                backgroundImage: `url('${props.room.image}')`,
              }}
            ></div> */}
            <Carousel
              className={classes.carousel}
              slide={false}
              controls={true}
            >
              {props.room.images?.map((image) => (
                <Carousel.Item className={classes.item}>
                  <img
                    className={classes.imageRoom}
                    src={`${image.url}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
        <div className={classes.containerRight}>
          <div className={classes.top}>
            <h4>Total</h4>
            <div className={classes.pricePerMonth}>
              <p>
                Price/Day: <span>{price} $</span>
              </p>
              <p>
                Days rent: <span>X {quantityDays}</span>
              </p>
            </div>
            <hr />
            <div className={classes.pricePerMonth}>
              <p>
                Total to confirm: <span>{price * quantityDays} $</span>
              </p>
            </div>
          </div>
          <div className={classes.btnContainer}>
            <button className={classes.btnRent} onClick={onActiveModalPayment}>
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalRent;
