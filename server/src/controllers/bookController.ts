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

export const getBooksByFilter = async(req:Request, res:Response) => {
    const {category, term, minRent, maxRent} = req.query;
    const searchedBooks = await Book.find({
        category: new RegExp(category as string, 'i'),
        name: new RegExp(term as string, 'i'),
        rentPerDay:  {$gte: Number(minRent), $lte:Number(maxRent)},
    })
    res.json(searchedBooks)
}