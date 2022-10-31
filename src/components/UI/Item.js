import classes from "./Item.module.css";

import Card from "./Card";

const Item = (props) => {
  return (
    <Card>
      <div className={classes.container}>
        <div
          className={classes.imageItem}
          style={{
            width: "100%",
            height: "300px",
            backgroundImage: `url(${props.image[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}
        ></div>
        <div>
          <h3>{props.name}</h3>
          <p>
            {" "}
            The best properties for your working stays. Spaces designed to make
            smart working as easy as possible with personal workspaces isolated
            from the rest of the house.{" "}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Item;
