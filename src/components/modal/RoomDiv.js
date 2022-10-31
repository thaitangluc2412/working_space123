import classes from "./RoomDiv.module.css";
import { Carousel } from "react-bootstrap";

const RoomDiv = (props) => {
  const onActiveModalUpdateRoom = () => {
    props.onActiveModalUpdateRoom(props.room);
  }

  return (
    <div className={classes.container} onClick={onActiveModalUpdateRoom}>
      <Carousel slide={false} controls={true}>
        {props.room.images?.map((image) => (
          <Carousel.Item className={classes.item}>
            <img
              className={classes.image}
              src={`${image.url}`}
              alt="First slide"
              style={{
                width: "120px",
                height: "100px",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className={classes.content}>
        <h4>{props.room.roomName}</h4>
        <p>{props.room.description}</p>
      </div>
    </div>
  );
};

export default RoomDiv;
