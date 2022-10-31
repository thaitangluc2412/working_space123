import { useState } from 'react';
import AddProperty from './AddProperty';
import AddRoom from './AddRoom';
import LandingPage from './LandPage';
import MyProperties from './MyProperties';
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import classes from './ManageProperty.module.css';

const ManageProperty = (props) => {
  // console.log("Index ne", props.index);
    const [index, setIndex] = useState(props.index ? props.index : 1);
    
    const handleNotification = (name) => {
      NotificationManager.success(`You successfully created your ${name}`, "Completed");
    }

    document.title = "Management property | Roomless";

    return (
      <div className={classes.container}>
        <NotificationContainer />
        <div className={classes.nav}>
          <div className={index !== 1 ? classes.nav_item : classes.active}>
            <p onClick={() => setIndex(1)}> Add Property </p>
          </div>
          <div className={index !== 2 ? classes.nav_item : classes.active}>
            <p onClick={() => setIndex(2)}> Add Room In Property </p>
          </div>
          <div className={index !== 3 ? classes.nav_item : classes.active}>
            <p onClick={() => setIndex(3)}> Manage Your Property </p>
          </div>
        </div>
         {index === 1 && <AddProperty handleNotification={handleNotification}/>}
        {index === 2 && <AddRoom handleNotification={handleNotification}/>}
        {index === 3 && <MyProperties  onActiveModalUpdateProperty={props.onActiveModalUpdateProperty} onActiveModalListRoom={props.onActiveModalListRoom}/>} 
      </div>
    );
}

export default ManageProperty;