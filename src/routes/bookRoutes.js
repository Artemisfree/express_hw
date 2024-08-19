const express = require('express')
const {
	getAllBooks,
	getBookById,
	createBook,
	updateBookById,
	deleteBookById,
} = require('../controllers/bookController')

const router = express.Router()

router.get('/books', getAllBooks)
router.get('/books/:id', getBookById)
router.post('/books', createBook)
router.put('/books/:id', updateBookById)
router.delete('/books/:id', deleteBookById)

module.exports = router
