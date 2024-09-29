import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AddBook from './AddBook';
import GetAllBooks from './GetAllBooks';
import SearchBookByName from './ SearchBookByName';
import SearchBookByRent from './SearchBookByRent';
import SearchBookByFilters from './SearchBookByFilters';

const BookDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Add Book" />
        <Tab label="Get All Books" />
        <Tab label="Search Book" />
        <Tab label="Search By Rent" />
        <Tab label="Search By Filter" />

      </Tabs>

      <Box sx={{ padding: 2 }}>
        {selectedTab === 0 && <AddBook/>}
        {selectedTab === 1 && <GetAllBooks/>}
        {selectedTab === 2 && <SearchBookByName/>}
        {selectedTab === 3 && <SearchBookByRent/>}
        {selectedTab === 4 && <SearchBookByFilters/>}

      </Box>
    </Box>
  );
};

export default BookDashboard;
