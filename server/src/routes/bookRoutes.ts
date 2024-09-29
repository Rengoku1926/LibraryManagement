import express from "express";
import { getBooks, getBooksByFilter, getBooksByRentRange, postBooks, searchBooks } from "../controllers/bookController";

const router = express.Router();

router.post('/addbook', postBooks)
router.get('/', getBooks)
router.get('/searchBooks', searchBooks)
router.get('/searchRent', getBooksByRentRange)
router.get('/searchByAll', getBooksByFilter)

export default router;