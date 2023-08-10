import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ManageCreateSalesmanBilling from './createSalesmanBilling/manageCreateSalesmanBilling';
import '../../../index.css'
import ManageReturnSalesmanBilling from './returnSalesmanBilling/manageReturnSalesmanBilling';
import ViewSalesmanBilling from './viewSalesmanBilling';
import ManageViewSalesmanBilling from './viewSalesmanBilling/manageViewSalesmanBilling';
import CheckPageAccess from '../../../contexts/checkPageAccess.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return ( 
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SalesmanBillingTabs() {
  const params = useParams();
  const history = useNavigate();
  CheckPageAccess();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    history(`/salesman-billing/` + newValue);
    setValue(newValue);
  };

  useEffect((item) => {
      if(params && params.type){
          setValue(parseInt(params.type))
      }
  })

  return (
    <Box className="tabs-section">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" indicatorColor="secondary">
          <Tab label="Create Billing" {...a11yProps(0)} />
          <Tab label="Return Billing" {...a11yProps(1)} />
          <Tab label="View Billing" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ManageCreateSalesmanBilling />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ManageReturnSalesmanBilling />
      </TabPanel>
       <TabPanel value={value} index={2}>
        <ManageViewSalesmanBilling />
      </TabPanel>
    </Box>
  );
}

export default SalesmanBillingTabs;
