import classes from './MarkerMap.module.css';
import {IoLocationSharp} from "react-icons/io5";

const MarkerMap = (props) => {
     return (
         <>
         <IoLocationSharp className={classes.iconMarker}></IoLocationSharp>
         </>
     ); 
}

export default MarkerMap;