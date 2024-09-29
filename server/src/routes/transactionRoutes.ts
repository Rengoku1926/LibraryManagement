import { Router } from 'express';
import { getBookIssued,getBookRent,issueBook, returnBook, getBooksInDateRange, getBooksIssuedToPerson } from '../controllers/transactionController';

const router: Router = Router();

// Route to get people who have issued a specific book
router.get('/bookIssued', getBookIssued);

// Route to get total rent generated by a book
router.get('/bookRent', getBookRent);

// Route to issue a book
router.post('/issue', issueBook);

// Route to return a book and calculate rent
router.post('/return', returnBook);

// Route to get books issued to a specific person
router.get('/personBooks', getBooksIssuedToPerson);

// Route to get books issued within a date range
router.get('/dateRange', getBooksInDateRange);

export default router;
