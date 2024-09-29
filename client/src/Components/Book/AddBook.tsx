import React, { useState } from "react";
import {Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

// Base API URL
const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const AddBook: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [rentPerDay, setRentPerDay] = useState<number | "">("");
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null); // State for alert


  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URI}/api/books/addbook`, {
        name,
        category,
        rentPerDay,
      });
      setAlert({ message: "Book added successfully!", severity: "success" });
      console.log("Book Added Successfully", response);
      setName('');
      setCategory('');
      setRentPerDay('');
    } catch (error) {
      console.error("Error while adding book: ", error);
      setAlert({ message: "Error adding user!", severity: "error" });

    }
  };

      // Optional: Automatically hide the alert after 3 seconds
      React.useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);


  return (
    <div>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <Typography variant="h5">Add New Book</Typography>
      <TextField
        label="Book Name"
        value={name}
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Category"
        value={category}
        variant="outlined"
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        label="Rent per Day"
        value={rentPerDay}
        variant="outlined"
        onChange={(e) => setRentPerDay(Number(e.target.value))}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add Book
      </Button>
    </Box>
    {alert && (
        <Alert severity={alert.severity} sx={{ marginTop: 2 }}>
            {alert.message}
        </Alert>
    )}
    </div>

  );
};

export default AddBook;
