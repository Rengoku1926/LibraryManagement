import React, { useState } from 'react';
import { Alert, TextField, Button, Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const BookRent: React.FC = () => {
  const [bookName, setBookName] = useState<string>("");
  const [totalRent, setTotalRent] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  // Function to handle fetching total rent for a book
  const handleFetchRent = async () => {
    setLoading(true);
    setAlert(null);  // Reset alert

    try {
      const response = await axios.get(`${BASE_URI}/api/transactions/bookRent`, { params: { bookName } });
      const { totalRent } = response.data;

      if (totalRent !== undefined) {
        setTotalRent(totalRent);
        setAlert({ message: "Rent fetched successfully!", severity: 'success' });
      } else {
        setAlert({ message: "No rent data found for this book.", severity: 'error' });
      }

    } catch (error) {
      console.error("Error fetching rent: ", error);
      setAlert({ message: "Error fetching rent for the book.", severity: 'error' });
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
      <Typography variant="h5">Get Total Rent for a Book</Typography>

      {/* Book Name Input */}
      <TextField
        label="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />

      {/* Fetch Rent Button */}
      <Button variant="contained" onClick={handleFetchRent} disabled={!bookName || loading}>
        {loading ? <CircularProgress size={24} /> : "Fetch Rent"}
      </Button>

      {/* Total Rent Display */}
      {totalRent !== null && (
        <Typography variant="h6">Total Rent Generated: ${totalRent}</Typography>
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

export default BookRent;
