import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'; 
import { UserContext } from '../../contexts/userContext';
import {Link} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { getLS, setLS } from '../../contexts/localStorageEncryption';
import { CartContext } from '../../contexts/cartContext';

const UserProfile = (props) => {
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const { enqueueSnackbar } = useSnackbar();
    const history = useNavigate();
    // const user = {
    //     user: {
    //         name: "Rahul Kannaujiya",
    //         dob:"20/10/2010",
    //         email: "rahul@gmail.com"
    //     }
    // }
    
    const handleLogout = () => {
        const token = getLS().token;
        console.log("--handleLogout clicked----:");
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/user/logout`, 
            {
                headers: {
                   'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                enqueueSnackbar('Successfully Logged out!', { variant: 'success'});
                window.localStorage.removeItem("user_session");
                window.localStorage.setItem("cart", JSON.stringify([]));
                setCart([]);
                setUser(null);
                history("../login")
                props.setAnchorEl(null)
            })
            .catch((error)=> {
                console.log('-handleSubmit--logout user--error--:', error);
                enqueueSnackbar('Oops!, Something went wrong. Please try again!', { variant: 'warning'})
            })
        
    }
    return (
        <Box sx={{padding: '0.5rem 1rem', textAlign: 'right'}}>
            <Button component={Link} to="/edit-user" sx={{marginBottom: '0.5rem', color: '#01abaa'}} onClick={() => {props.setAnchorEl(null)}}>
                <EditIcon sx={{paddingRight: '10px'}} /> Edit
            </Button>
            <Divider />
            <Typography variant="h4" component="h4" sx={{display: 'block', fontSize: '1.4rem', padding: '0.5rem 0rem 0.2rem 0.8rem'}}>{user != null ? user.user.name : ''}</Typography>
            <Typography variant="h4" component="h4" sx={{display: 'block', fontSize: '1rem', padding: '0.2rem 0rem 0.5rem 0.8rem'}}>{user != null ? user.user.email : ''}</Typography>
            <Divider />
            <Button onClick={handleLogout} sx={{marginTop: '0.5rem', color: '#01abaa'}}>
                <LogoutIcon sx={{paddingRight: '10px'}} /> Logout
            </Button>
        </Box>
    )
}

export default UserProfile;