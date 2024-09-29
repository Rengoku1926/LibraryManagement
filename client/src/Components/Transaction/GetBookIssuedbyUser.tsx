import React, { useState } from 'react';
import { Alert, TextField, Button, Container, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const GetBooksIssuedToPerson: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [books, setBooks] = useState<Array<{ _id: string, name: string }> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  // Function to handle fetching books issued to the user
  const handleFetchBooks = async () => {
    setLoading(true);
    setAlert(null);  // Reset alert

    try {
      const response = await axios.get(`${BASE_URI}/api/transactions/personBooks`, { params: { userId } });
      const booksData = response.data;

      if (booksData && booksData.length > 0) {
        setBooks(booksData);
        setAlert({ message: "Books fetched successfully!", severity: 'success' });
      } else {
        setBooks(null);
        setAlert({ message: "No books found for this user.", severity: 'error' });
      }
    } catch (error) {
      console.error("Error fetching books: ", error);
      setAlert({ message: "Error fetching books for the user.", severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      padding: 2,
    }}>
      <Typography variant="h5">Get Books Issued to a Person</Typography>

      {/* User ID Input */}
      <TextField
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      {/* Fetch Books Button */}
      <Button variant="contained" onClick={handleFetchBooks} disabled={!userId || loading}>
        {loading ? <CircularProgress size={24} /> : "Fetch Books"}
      </Button>

      {/* List of Books */}
      {books && books.length > 0 && (
        <List>
          {books.map((book) => (
            <ListItem key={book._id}>
              <ListItemText primary={book.name} />
            </ListItem>
          ))}
        </List>
      )}

      {/* Alert for success/error */}
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
    </Container>
  );
};

export default GetBooksIssuedToPerson;
