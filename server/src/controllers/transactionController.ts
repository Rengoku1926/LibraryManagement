import { Request, Response } from 'express';
import Transaction from '../models/transactionModel';
import Book from '../models/bookModel';
import User from '../models/userModel';

// Get people who have issued a book
export const getBookIssued = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookName } = req.query;
    const book = await Book.findOne({ name: bookName });
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    const transactions = await Transaction.find({ bookId: book._id }).populate('userId');
    const currentlyIssued = transactions.find((t) => !t.returnDate);
    const people = transactions.map((t) => t.userId);

    res.json({
      people,
      currentlyIssued: currentlyIssued ? currentlyIssued.userId : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Some error while getting names of users" });
  }
};

// Get total rent generated by a book
export const getBookRent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookName } = req.query;

    // Find the book by name
    const book = await Book.findOne({ name: bookName });
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    // Find all transactions for the book with rent information
    const transactions = await Transaction.find({ bookId: book._id });

    // Calculate total rent from transactions
    const totalRent = transactions.reduce((acc, transaction) => {
      if (transaction.returnDate) {
        const issueDate = new Date(transaction.issueDate);
        const returnDate = new Date(transaction.returnDate);
        
        // Calculate number of days rented
        const daysRented = Math.ceil((returnDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24));

        // Calculate rent for this transaction
        const rentForTransaction = daysRented * book.rentPerDay;

        // Add to the accumulator
        return acc + rentForTransaction;
      }
      return acc;
    }, 0);

    res.json({ totalRent });
  } catch (error) {
    res.status(500).json({ message: "Some error occurred while getting rent for the book." });
  }
};


// Issue a book
export const issueBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookName, userId, issueDate } = req.body;
    const book = await Book.findOne({ name: bookName });
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const transaction = new Transaction({
      bookId: book._id,
      userId: user._id,
      issueDate,
    });
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error while issuing a book" });
    console.log(error);
  }
};

// Return a book
export const returnBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookName, userId, returnDate } = req.body;
    const book = await Book.findOne({ name: bookName });
    const transaction = await Transaction.findOne({ bookId: book?._id, userId, returnDate: null });

    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    const daysRented = Math.ceil(
      (new Date(returnDate).getTime() - new Date(transaction.issueDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    transaction.returnDate = new Date(returnDate);
    transaction.rent = daysRented * (book!.rentPerDay);

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error while returning a book" });
  }
};

// Get books issued to a person
export const getBooksIssuedToPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;
    const transactions = await Transaction.find({ userId }).populate('bookId');
    const books = transactions.map((t) => t.bookId);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error while getting books issued to a person" });
  }
};

// Get books issued in a date range
export const getBooksInDateRange = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate as string), $lte: new Date(endDate as string) },
    }).populate('bookId userId');

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error while getting books in date range" });
  }
};
