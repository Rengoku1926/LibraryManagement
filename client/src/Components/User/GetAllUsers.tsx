// src/components/Users/GetAllUsers.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItemText, Divider, Card } from '@mui/material';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  contact: string;
}

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const GetAllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">All Users</Typography>
      <List >
        {users.map((user) => (
          <React.Fragment key={user._id}>
            
            <Card variant='outlined' sx={{border:'2px solid lightblue', marginTop:'10px'}} >
              <ListItemText primary={user.name} secondary={`Email: ${user.email} | Contact: ${user.contact} | UserId: ${user._id}`} />
            </Card>
          
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default GetAllUsers;
