import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../store/authContext";
import classes from "./ModalReview.module.css";
import { Carousel } from "react-bootstrap";
import ReactDOM from "react-dom";
import ReactStars from "react-rating-stars-component";

const ModalReview = (props) => {
  const [price, setPrice] = useState();
  const [rating, setRating] = useState(0);
  const content = useRef();

  const authCtx = useContext(AuthContext);

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

  const handleExitModal = (event) => {
    event.preventDefault();
    props.onExitModalReview();
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const hanldeReview = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        customerId: authCtx.id,
        propertyId: props.room.propertyId,
        rating: rating,
        content: content.current.value,
        createDate: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.onExitModalReview();
      });
  };

  return ReactDOM.createPortal(
    <div className={classes.modalReview}>
      <div className={classes.titleFilter}>
        <a href="#" className={classes.close} onClick={handleExitModal} />
        <h2>Review room</h2>
      </div>
      <div className={classes.content}>
        <div className={classes.images}>
          <Carousel className={classes.carousel} slide={false} controls={true}>
            {props.room.images?.map((image) => (
              <Carousel.Item>
                <img
                  className={classes.imageRoom}
                  src={`${image.url}`}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className={classes.rating}>
          <h3>{props.room.roomName}</h3>

          <p>
            <span>Price: </span>
            {price} VNĐ/Day
          </p>
          <p>
            <span>Description: </span>
            {props.room.description}
          </p>
          <form onSubmit={hanldeReview}>
            <div className={classes.containerRating}>
              <label>Rating: </label>
              <ReactStars
                classNames={classes.ratingStar}
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <span>Write your review:</span>
            <textarea className={classes.textReview} ref={content}></textarea>
            <div className={classes.btn}>
              <button>Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalReview;
