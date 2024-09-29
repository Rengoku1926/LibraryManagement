import React, { useState } from "react";
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const SearchBookByRent: React.FC = () => {
  const [minRent, setMinRent] = useState<number | "">("");
  const [maxRent, setMaxRent] = useState<number | "">("");
  const [books, setBooks] = useState<Array<any>>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/api/books/searchRent?minRent=${minRent}&maxRent=${maxRent}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching books by rent: ", error);
    }
  };

  return (
    <Box sx={{ padding: 2 ,display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <Typography  variant="h5" >Search Books by Rent Range</Typography>
      <TextField
        sx={{marginTop:"10px"}}
        label="Min Rent"
        type="number"
        value={minRent}
        variant="outlined"
        onChange={(e) => setMinRent(Number(e.target.value))}
      />
      <TextField
        sx={{marginTop:"10px"}}
        label="Max Rent"
        type="number"
        value={maxRent}
        variant="outlined"
        onChange={(e) => setMaxRent(Number(e.target.value))}
      />
        
      <Button sx={{marginTop:"10px"}} variant="contained"  onClick={handleSearch}>
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

export default SearchBookByRent;
