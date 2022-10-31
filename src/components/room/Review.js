import Rating from "@mui/material/Rating";
import classes from "./Review.module.css";
import { useState, useEffect } from "react";

const Review = (props) => {
  const [personReview, setPersonReview] = useState({});

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch("http://localhost:8080/api/customer/" + props.review.customerId, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setPersonReview(data.data));
  }, []);

  return (
    <div className={classes.review}>
      <div className={classes.imageReview}>
        <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"></img>
      </div>
      <div className={classes.inforReview}>
        <h2 className={classes.nameUser}>{personReview.customerName}</h2>
        <div>
          <Rating
            className={classes.stars}
            name="half-rating-read"
            defaultValue={props.review.rating}
            precision={0.5}
            readOnly
          />
          <span className={classes.timeReview}>{props.review.createDate}</span>
        </div>
        <div className={classes.comment}>
          <p>{props.review.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
