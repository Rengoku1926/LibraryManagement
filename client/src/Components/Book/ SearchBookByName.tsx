import React, { useState } from "react";
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const SearchBookByName: React.FC = () => {
  const [term, setTerm] = useState<string>("");
  const [books, setBooks] = useState<Array<any>>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/books/searchBooks?term=${term}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching books: ", error);
    }
  };

  return (
    <Box sx={{ padding: 5, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
      <Typography variant="h5">Search Books by Name</Typography>
      <TextField
        sx={{marginTop:"10px"}}
        label="Search Term"
        value={term}
        variant="outlined"
        onChange={(e) => setTerm(e.target.value)}
      />
        
        <Button sx={{marginTop:"10px"}} variant="contained"  onClick={handleSearch} >
        Search
      </Button>
      <List>
        {books.map((book) => (
          <ListItem key={book._id}>
            <ListItemText primary={`${book.name} - ${book.category} - $${book.rentPerDay}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchBookByName;
