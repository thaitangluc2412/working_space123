import classes from "./HeaderHome.module.css";
import { NavLink} from 'react-router-dom';

const HeaderHome = (props) => {
  return (
    <div className={classes.homeImage}>
      <div className={classes.homeImage_text}>
        <h1 className={classes.welcomeText}>The Best Home Everywhere</h1>
        <h3 className={classes.underWelcomeText}>
          Appartment reservable online directly
        </h3>
        <div className={classes.button}>
            <NavLink to='/'>
            Find your properties
            </NavLink>
          </div>
      </div>
    </div>
  );
};

export default HeaderHome;
