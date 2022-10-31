import { useState, useEffect } from "react";
import { IoLocationSharp, IoMap } from "react-icons/io5";
import { MdMeetingRoom, MdOutlineRateReview } from "react-icons/md";
import Map from "../properties/Map";
import ListRoom from "./ListRoom";
import Rating from "@mui/material/Rating";
import classes from "./RoomPage.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ListReview from "./ListReview";
import Carousel from "react-elastic-carousel";
import { useParams } from "react-router-dom";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const RoomPage = (props) => {
  // NotificationManager.success('Success message', 'Title here');
  // NotificationManager.info('Info message');
  const [landlord, setLandlord] = useState({});
  const [property, setProperty] = useState({});
  const [propertyTypeId, setPropertyTypeId] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [rooms, setRooms] = useState();
  // const []

  const params = useParams();

  const { propertyId } = params;

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch("http://localhost:8080/api/properties/" + propertyId, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(
          "http://localhost:8080/api/property_type/property_type/" +
            data.data.propertyTypeId,
          {
            method: "GET",
            headers: headers,
          }
        )
          .then((res) => res.json())
          .then((data) => setPropertyTypeId(data.data.propertyTypeName));
        fetch("http://localhost:8080/api/customer/" + data.data.customerId, {
          method: "GET",
          headers: headers,
        })
          .then((res) => res.json())
          .then((data) => setLandlord(data.data));
        setProperty(data.data);
        document.title = `${data.data.propertyName} | Roomless`;
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(property.rating);

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch(`http://localhost:8080/api/properties/${propertyId}/rooms`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setRooms(data.data))
      .catch((err) => console.log(err));
  }, []);

  const breakPoints = [{ width: 1, itemsToShow: 1 }];

  return (
    <div className={classes.container}>
      <div className={classes.container_infor}>
        <div className={classes.container_left}>
          <Carousel
            className={classes.carousel}
            breakPoints={breakPoints}
            // pagination={false}
            showArrows={false}
            // enableAutoPlay
          >
            {property.images?.map((image) => (
              <div
                className={classes.image}
                style={{
                  width: "100%",
                  height: "500px",
                  backgroundImage: `url('${image.url}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                }}
              >
                <div className={classes.ratingProperty}>
                  <Rating
                    className={classes.stars}
                    name="half-rating-read"
                    value={+property.rating}
                    precision={0.5}
                    readOnly
                  />
                  <div className={classes.rentTotal}>
                    <p>(20) people rent</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
          <div className={classes.listRoom}>
            <div className={classes.contentRooms}>
              <Tabs
                selectedIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
              >
                <TabList>
                  <Tab style={{ color: "#1e8489" }}>
                    <MdMeetingRoom /> Rooms
                  </Tab>
                  <Tab style={{ color: "#1e8489" }}>
                    <MdOutlineRateReview /> Reviews
                  </Tab>
                </TabList>

                <TabPanel>
                  {rooms && (
                    <ListRoom
                      rooms={rooms}
                      onActiveModalRoom={props.onActiveModalRoom}
                    />
                  )}
                </TabPanel>
                <TabPanel>
                  <ListReview />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
        <div className={classes.container_right}>
          <div className={classes.content}>
            <h1 className={classes.titleContent}>Property</h1>
            <hr style={{ borderColor: "#dae0e6" }}></hr>
            <h1>{property.propertyName}</h1>
            <p>
              {" "}
              <IoLocationSharp className={classes.icon} />
              {property.address + ", " + property.city}
            </p>
            <h4>{propertyTypeId}</h4>

            <p>
              Quantity room: <span>{property.roomQuantity}</span>
            </p>
            <p>
              Decription: <span>{property.description}</span>
            </p>
            {/* <button className={classes.btnMap}>
              <IoMap /> See in map
            </button> */}
          </div>
          <div className={classes.content}>
            <h1 className={classes.titleContent}>Landlord</h1>
            <hr style={{ borderColor: "#dae0e6" }}></hr>
            <div className={classes.avatar_name}>
              <div
                className={classes.avatar}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundImage: `url('https://banner2.cleanpng.com/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                }}
              ></div>
              <h4>{landlord.customerName}</h4>
            </div>
            <p>
              Phone number: <span>{landlord.phoneNumber}</span>
            </p>
            <p>
              Email: <span>{landlord.email}</span>
            </p>
          </div>
          <div className={classes.contentMap}>
            <Map
              lat="16.089616712151383"
              lng="108.14348783953365"
              height="300px"
            ></Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
