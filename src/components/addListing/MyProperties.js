import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/authContext";
import PropertyContainer from "./PropertyContainer";
import classes from "./MyProperties.module.css";

const MyProperties = (props) => {
  const [properties, setProperty] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetch(
      "http://localhost:8080/api/properties/getByCustomerId/" + authCtx.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProperty(data.data);
      });
  }, []);

  return (
    <div className={classes.content}>
      <h3>Manage your properties</h3>
      <div className={classes.propertyContainer}>
        {properties.map((property) => (
          <div className={classes.wrapper}>
            <PropertyContainer
              property={property}
              onActiveModalUpdateProperty={props.onActiveModalUpdateProperty}
              onActiveModalListRoom={props.onActiveModalListRoom}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
