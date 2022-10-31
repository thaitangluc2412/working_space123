import classes from "./Warranty.module.css";
import Carousel from "react-elastic-carousel";
import Card from "../UI/Card";
import Rating from '@mui/material/Rating';

const Warranty = (props) => {
  const items = [
    { id: 1, title: "item #1" },
    { id: 2, title: "item #2" },
    { id: 3, title: "item #3" },
    { id: 4, title: "item #4" },
    { id: 5, title: "item #5" },
  ];
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <div className={classes.warrantyWrapper}>
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>Roomless Warranty</h3>
        <h3 className={classes.underTitle}>
          {" "}
          The perfect place to live, work or study is only a click away. <br />{" "}
          Our team is ready to give you all the support you need.{" "}
        </h3>
      </div>
      <div className={classes.warrantyContent}>
        <div className={classes.content}>
          <img src="https://roomlessrent.com/assets/imgs/home/contract.svg"></img>
          <h4 className={classes.nameWarranty}> Smart contracts </h4>
          <p>
            {" "}
            The best properties for your working stays. Spaces designed to make
            smart working as easy as possible with personal workspaces isolated
            from the rest of the house.{" "}
          </p>
        </div>
        <div className={classes.content} id={classes.middle}>
          <img src="https://roomlessrent.com/assets/imgs/home/verificati.svg"></img>
          <h4 className={classes.nameWarranty}> Verified apartments </h4>
          <p>
            {" "}
            Roomless guarantees secure payments and protection against fraud.
            Let us know of any problems within the first 24 hours of your
            arrival.{" "}
          </p>
        </div>
        <div className={classes.content}>
          <img src="https://roomlessrent.com/assets/imgs/home/CustomerSupportIcon.svg"></img>
          <h4 className={classes.nameWarranty}> 24-hour assistance </h4>
          <p>
            {" "}
            The Roomless team is always at your disposal. Just ask and we'll
            help you find your next home or solve your problems.{" "}
          </p>
        </div>
      </div>
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>Guaranteed by our reviews</h3>
        <h3 className={classes.underTitle}>
          {" "}
          Our customers are 100% satisfied and our reviews are speaking for us!{" "}
        </h3>
      </div>
      <Carousel breakPoints={breakPoints} enableAutoPlay pagination={false}>
        {items.map((item) => (
          <Card key={item.id}>
            <p>
              I booked a flat in Milan without a single visit. The Roomless team
              supported me at every stage. I would definitely recommend their
              service{" "}
            </p>
            <div className={classes.name}>
                <h4>Tang Luc</h4>
                <Rating className={classes.rating} name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
            </div>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default Warranty;
