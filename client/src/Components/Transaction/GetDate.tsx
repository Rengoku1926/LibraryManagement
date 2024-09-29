import React, { useState } from 'react';
import { Alert, TextField, Button, Container, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const GetDate: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [transactions, setTransactions] = useState<Array<{ _id: string, bookId: { name: string }, userId: { name: string }, issueDate: string }> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  // Function to fetch books issued in the date range
  const handleFetchBooks = async () => {
    setLoading(true);
    setAlert(null);  // Reset alert

    try {
      const response = await axios.get(`${BASE_URI}/transactions/dateRange`, {
        params: { startDate, endDate }
      });

      const transactionsData = response.data;

      if (transactionsData && transactionsData.length > 0) {
        setTransactions(transactionsData);
        setAlert({ message: "Books fetched successfully!", severity: 'success' });
      } else {
        setTransactions(null);
        setAlert({ message: "No books found in this date range.", severity: 'error' });
      }
    } catch (error) {
      console.error("Error fetching books in date range: ", error);
      setAlert({ message: "Error fetching books in date range.", severity: 'error' });
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
      <Typography variant="h5">Get Books Issued in a Date Range</Typography>

      {/* Start Date Input */}
      <TextField
        label="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        type="date"
        InputLabelProps={{ shrink: true }}
      />

      {/* End Date Input */}
      <TextField
        label="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        type="date"
        InputLabelProps={{ shrink: true }}
      />

      {/* Fetch Books Button */}
      <Button variant="contained" onClick={handleFetchBooks} disabled={!startDate || !endDate || loading}>
        {loading ? <CircularProgress size={24} /> : "Fetch Books"}
      </Button>

      {/* List of Books Issued in Date Range */}
      {transactions && transactions.length > 0 && (
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction._id}>
              <ListItemText
                primary={`Book: ${transaction.bookId.name}`}
                secondary={`User: ${transaction.userId.name} | Issued on: ${new Date(transaction.issueDate).toLocaleDateString()}`}
              />
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

export default GetDate;
