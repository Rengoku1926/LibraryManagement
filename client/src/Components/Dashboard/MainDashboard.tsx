// src/components/Dashboard/MainDashboard.tsx
import React, { useState } from 'react';
import { Box, Tabs, Tab, AppBar, Toolbar, Typography } from '@mui/material';
import UserDashboard from '../User/UserDashboard';
import BookDashboard from '../Book/BookDashboard';
import TransactionDashboard from '../Transaction/TransactionDashboard';

const MainDashboard: React.FC = () => {
  const [selectedNav, setSelectedNav] = useState<number>(0);

  const handleNavChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedNav(newValue);
    console.log(event)

  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Library Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Tabs value={selectedNav} onChange={handleNavChange} centered>
        <Tab label="Users" />
        <Tab label="Books" />
        <Tab label="Transactions" />
      </Tabs>

      <Box sx={{ padding: 3 }}>
        {selectedNav === 0 && <UserDashboard/>}
        {/* You can create and add `BooksDashboard` and `TransactionsDashboard` similarly */}
        {selectedNav === 1 && <BookDashboard/>}
        {selectedNav === 2 && <TransactionDashboard/>}
      </Box>
    </Box>
  );
};

export default MainDashboard;
