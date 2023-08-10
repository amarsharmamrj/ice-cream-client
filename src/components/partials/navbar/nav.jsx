import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List'; 
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CakeIcon from '@mui/icons-material/Cake';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ContactsIcon from '@mui/icons-material/Contacts';
import {Link} from 'react-router-dom';
import '../../../index.css';
import { UserContext } from '../../../contexts/userContext';

const Nav = (props) => {
  const { user } = useContext(UserContext);
  console.log("@@--userContext--:", user) 

  const list = () => { 
    let items = [];
    if(user == null){
        items = [
            {
                title: 'Home',
                to: '/',
                icon: <HomeIcon className='color-white' />
            },
            {
                title: 'All Products',
                to: '/all-products',
                icon: <DehazeIcon className='color-white' />
            }
        ]
    }else if(user.user.role === 'user'){
        items = [
            {
                title: 'Home',
                to: '/',
                icon: <HomeIcon className='color-white' />
            },
            {
                title: 'All Products',
                to: '/all-products',
                icon: <DehazeIcon className='color-white' />
            }
        ]
    }else if(user.user.role === 'admin'){
        items = [
            {
                title: 'Home',
                to: '/',
                icon: <HomeIcon className='color-white' />
            },
            {
                title: 'All Products',
                to: '/all-products',
                icon: <DehazeIcon className='color-white' />
            },
            {
                title: 'Dashboard',
                to: '/dashboard',
                icon: <DashboardIcon className='color-white' />
            },
            {
                title: 'Salesman Report',
                to: '/salesman-report',
                icon: <BarChartIcon className='color-white' />
            },
            {
                title: 'Category',
                to: '/manage-category',
                icon:  <CategoryIcon className='color-white' />
            },
            {
                title: 'Product',
                to: '/manage-product',
                icon: <ProductionQuantityLimitsIcon className='color-white' />
            },
            {
                title: 'Salesman',
                to: '/manage-salesman',
                icon: <PersonAddIcon className='color-white' />
            },
            {
                title: 'Salesman Billing',
                to: '/salesman-billing/0',
                icon: <AssignmentIcon className='color-white' />
            },
            {
                title: 'Party Booking',
                to: '/manage-party-booking',
                icon: <CakeIcon className='color-white' />
            },
            {
                title: 'Contact Forms',
                to: '/contact-forms',
                icon: <ContactsIcon className='color-white' />
            },
        ]
    }else {
        items = [
            {
                title: 'Home',
                to: '/', 
                icon: <HomeIcon className='color-white' />
            },
            {
                title: 'All Products',
                to: '/all-products',
                icon: <DehazeIcon className='color-white' />
            }
        ]
    }
    return items;
  }

    return (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={props.toggleDrawer(false)}
          onKeyDown={props.toggleDrawer(false)}
        >

          <List>

        {console.log("@@ items:", list())}
            {
                list().length > 0 ? (
                   list().map((item) => {
                       return (
                        <ListItem button to={item.to} component={Link} style={{color: 'white'}}> 
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                       )
                   })
                ) : ''
            }
            
            
            
          </List>

    </Box>
    )
}

export default Nav;