import { Router } from 'express';
import { getBookIssued,getBookRent,issueBook, returnBook, getBooksInDateRange, getBooksIssuedToPerson } from '../controllers/transactionController';

const router: Router = Router();

router.get('/bookIssued', getBookIssued);
router.get('/bookRent', getBookRent);
router.post('/issue', issueBook);
router.post('/return', returnBook);
router.get('/personBooks', getBooksIssuedToPerson);
router.get('/dateRange', getBooksInDateRange);

export default router;
