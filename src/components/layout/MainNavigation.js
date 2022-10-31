import { NavLink, Link } from "react-router-dom";
import { useRef } from "react";
import { VscAccount } from "react-icons/vsc";
import { useContext, useState } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/authContext";
import { useHistory, useLocation } from "react-router-dom";

const MainNavigation = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const login = useRef();
  const toggle = useRef();
  const [name, setName] = useState("");

  const search = useLocation();

  if (authCtx.isLoggedIn) {
    fetch(`http://localhost:8080/api/customer/${authCtx.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.customerName);
      })
      .catch((err) => console.log(err));
  }

  const loginHandler = (event) => {
    event.preventDefault();
    props.onHandleBackdrop();
  };

  const logoutHanlde = (event) => {
    event.preventDefault();
    authCtx.logout();
    history.replace("/");
  };

  const dropdownHandle = () => {
    if (toggle.current.style.display === "none") {
      toggle.current.style.display = "block";
    } else {
      toggle.current.style.display = "none";
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <img
            className={classes.logoImage}
            src="https://roomlessrent.com/assets/imgs/logo/LOGO_ROSSO.png"
            alt="Roomless"
          ></img>
        </Link>
      </div>
      <nav className={classes.nav}>
        <ul>
          {authCtx.isLoggedIn && (
            <li
              className={
                search.pathname.includes("request") ? classes.active : null
              }
            >
              <NavLink to="/request">Request</NavLink>
            </li>
          )}
          <li
            className={
              search.pathname.includes("properties") ? classes.active : null
            }
          >
            <NavLink to="/properties">Properties for rent</NavLink>
          </li>
          {authCtx.isLoggedIn && (
            <li
              className={
                search.pathname.includes("reservation") &&
                !search.pathname.includes("reservation")
                  ? classes.active
                  : null
              }
            >
              <NavLink to="/reservation" activeClassName={classes.active}>
                My reservation
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/">Help</NavLink>
          </li>
          {!authCtx.isLoggedIn && (
            <li className={classes.icon}>
              <div ref={login} onClick={loginHandler}>
                <VscAccount className={classes.iconHeader} />
              </div>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <div className={classes.dropdown} onClick={dropdownHandle}>
                <button className={classes.dropbtn}>Welcome, {name}</button>
                <div
                  ref={toggle}
                  id="myDropdown"
                  className={classes.dropdownContent}
                  style={{ display: "none" }}
                >
                  <NavLink to="/my_account">My Account</NavLink>
                  <NavLink to="/my_account/profile">Account settings</NavLink>
                  <NavLink to="/manage_property">Add listing</NavLink>
                  <a href="#" onClick={logoutHanlde}>
                    Logout
                  </a>
                </div>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
