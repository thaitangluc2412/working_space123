import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/authContext";

import classes from "./MyAccount.module.css";
import {
  IoIosSettings,
  IoIosSearch,
  IoIosCalendar,
  IoIosCall,
  IoIosHelpCircleOutline,
  IoIosContact,
  IoIosContacts,
} from "react-icons/io";

const MyAccount = (props) => {
  const [client, setClient] = useState({});
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  document.title = "Accout | Roomless";

  useEffect(() => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
    headers.append("Access-Control-Allow-Credentials", "true");
    fetch("http://localhost:8080/api/customer/" + authCtx.id, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((rs2) => {
        setClient(rs2.data);
      });
  }, []);

  const logoutHanlde = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.info}>
          <h2>Hello, {client.customerName}</h2>
          <span>Tenant</span> / <span>Landlord</span>
          <p>
            <b>Email:</b> <span>{client.email}</span>
          </p>
          <p>
            <b>Phone number:</b> <span>{client.phoneNumber}</span>
          </p>
          <NavLink to="/">
            <IoIosSettings /> Account settings
          </NavLink>
          <div className={classes.avatar}>
            <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"></img>
          </div>
        </div>
        <NavLink to="" className={classes.card}>
          <div>
            <h3>Find out how Roomless works</h3>
            <p>Find out why Roomless is worth it!</p>
            <img
              alt=""
              src="https://roomlessrent.com/assets/imgs/how_works/CARICA.png"
            ></img>
          </div>
        </NavLink>
        <NavLink to="/properties" className={classes.card}>
          <div>
            <h3>Properties for rent</h3>
            <p>Search for a house or room for rent in your city.</p>
            <img
              alt=""
              src="https://roomlessrent.com/assets/imgs/how_works/CERCA.png"
            ></img>
          </div>
        </NavLink>
      </div>
      <div className={classes.right}>
        <div className={classes.cardRight}>
          <p>SEARCH</p>
          <p>
            <NavLink to="/properties">
              <IoIosSearch /> Properties for rent
            </NavLink>
          </p>
        </div>
        <div className={classes.cardRight}>
          <p>MANAGEMENT</p>
          <p>
            <NavLink to="/properties">
              <IoIosCalendar /> Apointments
            </NavLink>
          </p>
          <p>
            <NavLink to="/properties">
              <IoIosCall /> Requests
            </NavLink>
          </p>
        </div>
        <div className={classes.cardRight}>
          <p>SUPPORT</p>
          <p>
            <NavLink to="/properties">
              <IoIosHelpCircleOutline /> How does it work?
            </NavLink>
          </p>
          <p>
            <NavLink to="/properties">
              <IoIosContact /> Contact us
            </NavLink>
          </p>
          <p>
            <NavLink to="/properties">
              <IoIosContacts /> About us
            </NavLink>
          </p>
        </div>
        <div className={classes.button}>
          <button onClick={logoutHanlde}>Exit</button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
