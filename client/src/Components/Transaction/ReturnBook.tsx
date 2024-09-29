import React, { useState } from 'react';
import { Alert, TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const ReturnBook: React.FC = () => {
  const [bookName, setBookName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  // Function to handle date input correctly
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value ? new Date(e.target.value) : null;
    setReturnDate(selectedDate);
  };

  const handleSubmit = async () => {
    try {
      // Format date before sending to the server
      const formattedDate = returnDate ? returnDate.toISOString().split('T')[0] : null;

      const response = await axios.post(`${BASE_URI}/transactions/return`, {
        bookName,
        userId,
        returnDate: formattedDate, // Use formatted date string
      });

      setAlert({ message: "Book returned successfully!", severity: "success" });
      setBookName('');
      setUserId('');
      setReturnDate(null);
    } catch (error) {
      console.error("Error while issuing book: ", error);
      setAlert({ message: "Error returning book!", severity: "error" });
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
      <Typography variant="h5">Return a Book</Typography>

      {/* Book Name Input */}
      <TextField
        label="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />

      {/* User ID Input */}
      <TextField
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      {/* Date Input */}
      <TextField
        label="Issue Date"
        value={returnDate ? returnDate.toISOString().split('T')[0] : ''}
        onChange={handleDateChange}
        type="date"
        InputLabelProps={{ shrink: true }}
      />

      {/* Submit Button */}
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>

      {/* Alert */}
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
    </Container>
  );
};

export default ReturnBook;
