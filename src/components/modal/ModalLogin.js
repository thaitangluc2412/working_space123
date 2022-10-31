import ReactDOM from "react-dom";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/authContext";
import classes from "./ModalLogin.module.css";

const ModalLogin = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const exitLogin = (event) => {
    event.preventDefault();
    props.onExitLogin();
  };

  const submitHandle = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log(enteredEmail + "cung voi" + enteredPassword);

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data.jwtToken);
        const expirationTime = new Date(new Date().getTime() + 36000000 * 1000);
        authCtx.login(
          data.data.customer.customerId,
          data.data.jwtToken,
          expirationTime.toISOString()
        );
        if (props.isPaying) {
          props.onActiveModalPayment();
        } else {
          props.onExitLogin();
        }
      });
  };
  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <header className={classes.modal__header}>
        <a href="#" onClick={exitLogin} className={classes.close} />
        <h1>Enter on Roomless</h1>
        <p>Rent a house or room for medium to long term directly online.</p>
        <div className={classes.container_signup}>
          <h3>Are you new to Roomless?</h3>
          <button onClick={props.onTranferFrom}>SIGN UP</button>
        </div>
      </header>
      <form onSubmit={submitHandle}>
        <div className={classes.modal__login}>
          <div className={classes.control}>
            <label htmlFor="username">Email or Username</label>
            <input
              type="text"
              id="username"
              placeholder="Email"
              required
              ref={emailInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button className="btn">Login</button>
          </div>
        </div>
      </form>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalLogin;
