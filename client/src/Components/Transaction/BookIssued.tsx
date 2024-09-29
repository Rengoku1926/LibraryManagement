import React, { useState, useEffect } from 'react';
import { Alert, TextField, Button, Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const BookIssued: React.FC = () => {
  const [bookName, setBookName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  
  // New state variables to track issued book info
  const [people, setPeople] = useState<any[]>([]);
  const [currentlyIssued, setCurrentlyIssued] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle date input correctly
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value ? new Date(e.target.value) : null;
    setIssueDate(selectedDate);
  };

  // Function to handle the book issuance submission
  const handleSubmit = async () => {
    try {
      // Format date before sending to the server
      const formattedDate = issueDate ? issueDate.toISOString().split('T')[0] : null;

      const response = await axios.post(`${BASE_URI}/api/transactions/bookIssued`, {
        bookName,
        userId,
        issueDate: formattedDate,
      });
      console.log(response)

      setAlert({ message: "Book issued successfully!", severity: "success" });
      setBookName('');
      setUserId('');
      setIssueDate(null);

      // Fetch issued book info again to refresh data
      fetchIssuedBookInfo(bookName);
    } catch (error) {
      console.error("Error while issuing book: ", error);
      setAlert({ message: "Error issuing book!", severity: "error" });
    }
  };

  // Function to fetch the list of people who have issued the book and currently issued user
  const fetchIssuedBookInfo = async (name: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URI}/transactions/bookIssued`, { params: { bookName: name } });
      setPeople(response.data.people);
      setCurrentlyIssued(response.data.currentlyIssued);
    } catch (error) {
      console.error("Error while fetching book issued info: ", error);
      setAlert({ message: "Error fetching book issued info!", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch issued book info whenever the bookName changes
  useEffect(() => {
    if (bookName) {
      fetchIssuedBookInfo(bookName);
    }
  }, [bookName]);

  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      padding: 2,
    }}>
      <Typography variant="h5">Books issued </Typography>

      {/* Book Name Input */}
      <TextField
        label="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />

      

      {/* Submit Button */}
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>

      {/* Alert */}
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {/* Currently Issued Info */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {currentlyIssued ? (
            <Typography variant="h6">Currently issued by: {currentlyIssued.name}</Typography>
          ) : (
            <Typography variant="h6">This book is not currently issued by anyone.</Typography>
          )}

          {/* List of People who have issued the book */}
          {people.length > 0 && (
            <List>
              <Typography variant="h6">People who have issued this book:</Typography>
              {people.map((person, index) => (
                <ListItem key={index}>
                  <ListItemText primary={person.name} />
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </Container>
  );
};

export default BookIssued;
