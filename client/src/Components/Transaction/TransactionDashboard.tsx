import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import IssueBook from './IssueBook';
import BookIssued from './BookIssued';
import BookRent from './BookRent';
import ReturnBook from './ReturnBook';
import GetBooksIssuedToPerson from './GetBookIssuedbyUser';
import GetDate from './GetDate';


const TransactionDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    console.log(event);

  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="New Issue" />
        <Tab label="Books Issued" />
        <Tab label="Book Rent" />
        <Tab label="User Issued" />
        <Tab label="Date Issued" />
        <Tab label="Return Book" />

      </Tabs>

      <Box sx={{ padding: 2 }}>
        {selectedTab === 0 && <IssueBook/>}
        {selectedTab === 1 && <BookIssued/>}
        {selectedTab === 2 && <BookRent/>}
        {selectedTab === 3 && <GetBooksIssuedToPerson/>}
        {selectedTab === 4 && <GetDate/>}
        {selectedTab === 5 && <ReturnBook/>}


      </Box>
      <div className='bg-red-300'>Please Enter exact name of books because they are case sensitive</div>
      <div className='bg-red-300'>In case of userId you can copy it from GET ALL USERS</div>


    </Box>

  );
};

export default TransactionDashboard;
