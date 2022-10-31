import { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import AccessAndSecurity from "./AccessAndSecurity";
import BillingInformation from "./BillingInformation";
import classes from "./AccountSetting.module.css";

const AccountSetting = (props) => {
  const [index, setIndex] = useState(1);

  document.title = "Management account | Roomless";

  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <div className={index !== 1 ? classes.nav_item : classes.active}>
          <p onClick={() => setIndex(1)}> Personal Information </p>
        </div>
        <div className={index !== 2 ? classes.nav_item : classes.active}>
          <p onClick={() => setIndex(2)}> Billing Information </p>
        </div>
        <div className={index !== 3 ? classes.nav_item : classes.active}>
          <p onClick={() => setIndex(3)}> Access and Security </p>
        </div>
        <div className={index !== 4 ? classes.nav_item : classes.active}>
          <p onClick={() => setIndex(4)}> Transactions </p>
        </div>
      </div>
      {index === 1 && <PersonalInformation />}
      {index === 2 && <BillingInformation />}
      {index === 3 && <AccessAndSecurity />}
    </div>
  );
};

export default AccountSetting;
