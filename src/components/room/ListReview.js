import { useState, useEffect } from "react";
import Review from "./Review";
import classes from "./ListReview.module.css";
import { useParams } from "react-router-dom";

const ListReview = (props) => {
  const [totalReview, setTotalReview] = useState(3);

  const [reviews, setReviews] = useState([]);

  const params = useParams();

  const { propertyId } = params;

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://localhost:8080/api/properties/${propertyId}/reviews`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
        console.log("alo alo", data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getMoreReview = () => {
    setTotalReview((prev) => prev + 3);
  };
  return (
    <div className={classes.listReviews}>
      <div className={classes.container_review}>
        {reviews.slice(0, totalReview).map((review) => {
          return <Review review={review} />;
        })}

        <div className={classes.moreReview}>
          <button onClick={getMoreReview}>See more...</button>
        </div>
      </div>
    </div>
  );
};

export default ListReview;
