import { Fragment} from 'react';
import classes from './Home.module.css';

import HeaderHome from './HeaderHome';
import HomeTypeRoom from './HomeTypeRoom';
import Warranty from './Warranty';
import City from './City';

const Home = (props) => {
    document.title = "Roomless: houses and rooms for medium - long term rental";

    return (
        <Fragment>
        <HeaderHome />
        <HomeTypeRoom />
        <City />
        <Warranty />
        </Fragment>
    );
  };
  
  export default Home;