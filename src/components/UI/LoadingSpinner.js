import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.backdrop}>
      <div className={classes.containerSpinner}>
        <div className={classes.spinner}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
