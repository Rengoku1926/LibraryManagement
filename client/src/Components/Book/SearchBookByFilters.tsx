import React, { useState } from "react";
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const SearchBookByFilters: React.FC = () => {
  const [term, setTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [minRent, setMinRent] = useState<number | "">("");
  const [maxRent, setMaxRent] = useState<number | "">("");
  const [books, setBooks] = useState<Array<any>>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/books/searchByAll?term=${term}&category=${category}&minRent=${minRent}&maxRent=${maxRent}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching books by filters: ", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Search Books by Filters</Typography>
      <TextField
        label="Search Name"
        value={term}
        variant="outlined"
        onChange={(e) => setTerm(e.target.value)}
      />
      <TextField
        label="Category"
        value={category}
        variant="outlined"
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        label="Min Rent"
        type="number"
        value={minRent}
        variant="outlined"
        onChange={(e) => setMinRent(Number(e.target.value))}
      />
      <TextField
        label="Max Rent"
        type="number"
        value={maxRent}
        variant="outlined"
        onChange={(e) => setMaxRent(Number(e.target.value))}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <List>
        {books.map((book) => (
          <ListItem key={book._id}>
            <ListItemText primary={`${book.name} - ${book.category} - $${book.rentPerDay}/day`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchBookByFilters;
