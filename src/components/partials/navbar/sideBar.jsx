import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { makeStyles } from '@mui/styles';

// custom components
import Nav from './nav';


const useStyles = makeStyles({
    colorPrimary: {
        '& .MuiDrawer-paper': {
          backgroundImage: 'linear-gradient(210deg, rgb(1, 171, 170) 20%, rgb(238 127 239) 250%)',
            color: 'white'
        }
    }
    
})


const SideBar = (props) => { 
    const classes = useStyles();
  return (
    <div>
        <React.Fragment>
          <SwipeableDrawer
            open={props.openSideBar}
            onClose={props.toggleDrawer(false)}
            onOpen={props.toggleDrawer(true)}
            className={classes.colorPrimary}
          >
              <Nav 
                toggleDrawer={props.toggleDrawer}
              />
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}

export default SideBar;