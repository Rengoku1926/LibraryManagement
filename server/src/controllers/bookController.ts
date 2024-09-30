import { Request, Response } from "express";
import Book from '../models/bookModel';

export const postBooks = async(req:Request, res:Response) => {
    const {name, category, rentPerDay} = req.body;
    const newBook = new Book({name, category, rentPerDay});
    await newBook.save();
    res.status(201).json({message: "New book Added"})
}

export const getBooks = async(req:Request, res:Response) => {
    const books = await Book.find();
    if(books){
        res.json(books)
    }else{
        res.status(404).json({message:"No books found : "})
    }
}

export const searchBooks = async(req:Request, res:Response) => {
    const {term} = req.query;
    const searchedBooks = await Book.find({name: new RegExp(term as string, 'i')})
    res.json(searchedBooks);
}

export const getBooksByRentRange = async(req:Request, res:Response) => {
    const {minRent, maxRent} = req.query;
    const searchedBooks = await Book.find({
        rentPerDay: {$gte: Number(minRent), $lte:Number(maxRent)}
    });
    res.json(searchedBooks);
};

export const getBooksByFilter = async (req: Request, res: Response) => {
  const { category, term, minRent, maxRent } = req.query;

  // Build a dynamic filter object
  const filter: any = {};

  // If category is provided, add it to the filter
  if (category) {
    filter.category = new RegExp(category as string, 'i'); // Case-insensitive match
  }

  // If term is provided, search in the name field
  if (term) {
    filter.name = new RegExp(term as string, 'i'); // Case-insensitive match
  }

  // If minRent or maxRent are provided, add rent filter
  if (minRent || maxRent) {
    filter.rentPerDay = {
      ...(minRent ? { $gte: Number(minRent) } : {}), // Greater than or equal to minRent
      ...(maxRent ? { $lte: Number(maxRent) } : {}), // Less than or equal to maxRent
    };
  }

  try {
    // Fetch the books based on the dynamic filter
    const searchedBooks = await Book.find(filter);
    res.json(searchedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching books by filter' });
  }
};
