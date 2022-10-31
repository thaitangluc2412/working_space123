import { Carousel } from "react-bootstrap";
import classes from "./PropertyContainer.module.css";

const PropertyContainer = (props) => {
  const onActiveModalListRoom = () => {
    props.onActiveModalListRoom(props.property);
  }

  const onActiveModalUpdateProperty = () => {
    props.onActiveModalUpdateProperty(props.property);
  }

  return (
    <div>
      <div className={classes.container}>
        <Carousel slide={false} controls={true}>
          {props.property.images?.map((image) => (
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
          <h4>{props.property.propertyName}</h4>
          <p>{props.property.description}</p>
        </div>
      </div>
      <div className={classes.btn}>
        <button className={classes.rooms} onClick={onActiveModalListRoom}>Rooms</button>
        <button
          className={classes.update}
          onClick={onActiveModalUpdateProperty}
        >
          Update
        </button>
        <button className={classes.delete}>Delete</button>
      </div>
    </div>
  );
};

export default PropertyContainer;
