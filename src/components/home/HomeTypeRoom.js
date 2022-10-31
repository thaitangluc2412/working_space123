import { useState, useEffect } from "react";
import classes from "./HomeTypeRoom.module.css";
import Carousel from "react-elastic-carousel";
import Item from "../UI/Item";
import { NavLink } from "react-router-dom";

const HomeTypeRoom = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch("http://localhost:8080/api/property_type/property_types", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setItems(data.data))
      .catch((err) => console.log(err));
  }, []);

  // const items = [
  //   { id: 1, title: "item #1" },
  //   { id: 2, title: "item #2" },
  //   { id: 3, title: "item #3" },
  //   { id: 4, title: "item #4" },
  //   { id: 5, title: "item #5" },
  // ];
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <div className={classes.typeRoomeWrapper}>
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>
          Find the apartment that fits your lifestyle
        </h3>
        <h3 className={classes.underTitle}>
          We have a solution for every need
        </h3>
      </div>
      <Carousel breakPoints={breakPoints} enableAutoPlay pagination={false}>
        {items.map((item) => (
          <NavLink
            to={"/properties?typeId=" + item.propertyTypeId}
            target={"_blank"}
            className={classes.item}
            key={item.id}
          >
            <Item
              key={item.propertyTypeId}
              image={item.images}
              name={item.propertyTypeName}
            >
              {/* {item.title} */}
            </Item>{" "}
          </NavLink>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeTypeRoom;
