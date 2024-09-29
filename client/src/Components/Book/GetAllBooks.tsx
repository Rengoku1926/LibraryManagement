import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_API_URL;

const GetAllBooks: React.FC = () => {
  const [books, setBooks] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/api/books/`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">All Books</Typography>
      <List>
        {books.map((book) => (
          <ListItem className="border-solid border-2 border-sky-500 mt-3" key={book._id}>
            <ListItemText primary={`Book Name -${book.name}`} secondary={`Genre - ${book.category} | Rent - $${book.rentPerDay}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GetAllBooks;
