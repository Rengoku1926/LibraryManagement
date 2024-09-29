import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AddUser from './AddUser';
import GetAllUsers from './GetAllUsers';

const UserDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log(event)

  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Add User" />
        <Tab label="Get All Users" />
      </Tabs>

      <Box sx={{ padding: 2 }}>
        {selectedTab === 0 && <AddUser />}
        {selectedTab === 1 && <GetAllUsers />}
      </Box>
    </Box>
  );
};

export default UserDashboard;
