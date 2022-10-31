import classes from "./Service.module.css";
import { useState, useEffect } from "react";
import { icons } from "../../lib/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Service = (props) => {
  // const [icon, setIcon] = useState({});
  // useEffect(() => {
  //     let headers = new Headers();

  //     headers.append("Content-Type", "application/json");
  //     headers.append("Accept", "application/json");

  //     headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
  //     headers.append("Access-Control-Allow-Credentials", "true");

  //     fetch("http://localhost:8080/api/service/" + props.serviceId, {
  //       method: "GET",
  //       headers: headers,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setIcon(data.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  return (
    <div className={classes.utility}>
      <p>
        <span>
          <FontAwesomeIcon icon={icons[`${props.service.icon}`]} />
        </span>{" "}
        {props.service.serviceName}{" "}
      </p>
    </div>
  );
};

export default Service;
