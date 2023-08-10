import React, { useContext, useEffect } from 'react';
import '../../../index.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from 'react-router-dom';
import Popover from '@mui/material/Popover';

// import { makeStyles } from '@mui/styles';

import SideBar from './sideBar';
import { CardActions, Tooltip } from '@mui/material';
import UserProfile from '../UserProfile';
import { UserContext } from '../../../contexts/userContext';
import { CartContext } from '../../../contexts/cartContext';

// const useStyles = makeStyles({
//     colorPrimary: {
//         '& .MuiAppBar-colorPrimary': {
//             color: '#ff3c3f'
//         }
//     }
    
// })

const TopBar = (props) => {
    // const classes = useStyles();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
//   const user = {
//     user: {
//         name: "Rahul Kannaujiya",
//         dob:"20/10/2010",
//         email: "rahul@gmail.com"
//     }
// }
  // const cart = props.cart;

  const [openSideBar, setOpenSideBar] = React.useState(false);



  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;




    // const handleSideBar = () => {
    //     console.log('-topBar--handleSideBar----called');
    // }

    // handle of sideBar
    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        setOpenSideBar(open);
    };

    useEffect(() => {
      console.log('topbar cart:', cart)
    }, [cart])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{backgroundImage: 'linear-gradient(147deg, rgb(1, 171, 170) 20%, rgb(238 127 239) 250%)'}}>
        <Toolbar style={{minHeight: '50px'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 1 }} 
              button="true"
              to={`/`}
              component={Link}
              style={{textDecoration: 'none', color: 'white'}}
            >
              Shimla Ice-Cream
          </Typography>

            <IconButton
              size="large"
              edge="start" 
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              to={`/cart`}
              component={Link}
              // onClick={toggleDrawer(true)}
            >
              <Badge color="secondary" badgeContent={cart.length} max={9}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

          {user == null ? (
            <Tooltip title="Login">
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Profile">
              <Button color="inherit" className="profile-icon"
                onClick={handleClick}
              > 
              {user.user.name.split(" ").length > 1 ? (user.user.name.split(" ")[0][0] + user.user.name.split(" ")[1][0]) : user.user.name.split(" ")[0][0]} 
              </Button>
            </Tooltip>
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <UserProfile setAnchorEl={setAnchorEl} />
          </Popover>

        </Toolbar>
      </AppBar>
        
        {/* sideBar start */}
        <SideBar
            openSideBar={openSideBar}
            toggleDrawer={toggleDrawer}
        />
        {/* sideBar end*/}
    </Box>
  );
}

export default TopBar;
