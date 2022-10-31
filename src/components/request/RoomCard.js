import classes from "./RoomCard.module.css";
import { Carousel } from "react-bootstrap";

const RoomCard = (props) => {
  return (
    <div className={classes.room}>
      <p className={classes.header}>Room</p>
      <Carousel slide={false} controls={true}>
        {props.room.images?.map((image) => (
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
      <label className={classes.name}>{props.room.roomName}</label>
    </div>
  );
};

export default RoomCard;
