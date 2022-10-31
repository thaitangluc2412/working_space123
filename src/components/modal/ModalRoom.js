import classes from "./ModalRoom.module.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoDocumentTextOutline, IoLogoRss } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import {
  IoIosBookmark,
  IoIosDesktop,
  IoIosBed,
  IoIosCalendar,
} from "react-icons/io";
import Service from "./Service";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Carousel } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";

const ModalRoom = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [price, setPrice] = useState(0);

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

  const exitRegister = (event) => {
    event.preventDefault();
    props.onExitModalRoom();
  };

  const onActiveModalRent = () => {
    props.onActiveModalRent();
  };
  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitRegister} className={classes.close} />
        <h3>{props.room.name}</h3>
      </header>
      <div className={classes.container}>
        {/* <div
          className={classes.imageRoom}
          style={{
            backgroundImage: `url('${props.room.image}')`,
          }}
        ></div> */}
        <Carousel className={classes.carousel} slide={false} controls={true}>
          {props.room.images?.map((image) => (
            <Carousel.Item className={classes.item}>
              <img
                className={classes.imageRoom}
                src={`${image.url}`}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab style={{ color: "#1e8489" }}>
              <IoDocumentTextOutline /> Details
            </Tab>
            <Tab style={{ color: "#1e8489" }}>
              <IoLogoRss /> Utilities
            </Tab>
          </TabList>

          <TabPanel>
            <div className={classes.roomDescription}>
              <p>
                <BsPerson /> Up to {props.room.capacity} people
              </p>
              <p>
                <IoIosBookmark /> {props.room.size} m<sup>2</sup> Interior
                Surface
              </p>
              <p>
                <IoDocumentTextOutline /> {props.room.description}
              </p>
              <p>
                <RiMoneyDollarCircleFill /> {price} $/day
              </p>
              <p>
                <IoIosCalendar /> Available{" "}
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={classes.roomUtility}>
              {props.room?.services.map((service) => (
                <Service service={service} />
              ))}
            </div>
          </TabPanel>
        </Tabs>
        <div className={classes.btnContainer}>
          <button className={classes.btnRent} onClick={onActiveModalRent}>
            Rent now
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalRoom;
