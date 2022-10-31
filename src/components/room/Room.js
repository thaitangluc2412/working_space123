import classes from "./Room.module.css";
import { IoIosBookmark } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
// import Carousel from "react-elastic-carousel";
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";

const Room = (props) => {
  const [price, setPrice] = useState(0);

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

  const onActiveModal = () => {
    props.onActiveModalRoom(props.room);
  };

  return (
    <div className={classes.property}>
      <Carousel className={classes.carousel} slide={false} controls={true}>
        {props.room.images?.map((image) => (
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
        <h2>{props.room.roomName}</h2>
        <p>
          <IoIosBookmark className={classes.icon} /> {props.room.size} m
          <sup>2</sup> Interior Surface
        </p>
        <p>
          <BsPerson className={classes.icon} /> {props.room.capacity} people
        </p>
        <p className={classes.price}>
          <RiMoneyDollarCircleFill className={classes.icon} />
          {price} $/day
        </p>
        <div>
          <button onClick={onActiveModal}>Detail</button>
        </div>
      </div>
      {/*       
      <div className={classes.button}>
        <button className={classes.rentNow}>Rent now</button>
      </div> */}
    </div>
  );
};

export default Room;
