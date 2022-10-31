import classes from "./Footer.module.css";
import { IoLogoLinkedin, IoLogoFacebook, IoLogoYoutube } from "react-icons/io";

const Footer = (props) => {
  return (
    <div className={classes.footer}>
      <div className={classes.innerFooter}>
        <p className={classes.textFooter}>Roomless S.R.L, P.IVA 02547910469</p>
        <span>
          <IoLogoLinkedin className={classes.icon} />
          <IoLogoFacebook className={classes.icon} />
          <IoLogoYoutube className={classes.icon} />
        </span>
      </div>
    </div>
  );
};

export default Footer;
