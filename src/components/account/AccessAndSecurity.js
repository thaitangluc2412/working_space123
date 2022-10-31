import classes from './AccessAndSecurity.module.css';

const AccessAndSecurity = () => {
    return (
        <div className={classes.content}>
        <div className={classes.personInfo}>
          <h3>Access and Security</h3>
          <div className={classes.control}>
            <label for="curPass">Current Password</label>
            <input type="password" placeholder='Password' name="curPass"/>
          </div>
          <div className={classes.control}>
            <label for="newPass">New Password</label>
            <input type="password" placeholder='Password' name="newPass" />
          </div>
          <div className={classes.control}>
            <label for="confirmPass">Confirm Password</label>
            <input type="password" placeholder='Password' name="confirmPass" />
          </div>
          <div className={classes.btnContainer}>
            <button className={classes.btnRent}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
}

export default AccessAndSecurity;