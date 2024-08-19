const Book = require('../models/bookModel')

const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find()
		res.json(books)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const getBookById = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id)
		if (!book) return res.status(404).json({ message: 'Book not found' })
		res.json(book)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const createBook = async (req, res) => {
	const { title, author, year } = req.body

	if (!title || title.length < 2) {
		return res
			.status(400)
			.json({ message: 'Title must be at least 2 characters long' })
	}
	if (!author || author.length < 2) {
		return res
			.status(400)
			.json({ message: 'Author name must be at least 2 characters long' })
	}
	if (!year || typeof year !== 'number') {
		return res.status(400).json({ message: 'Year must be a valid number' })
	}

	const book = new Book({
		title,
		author,
		year,
	})

	try {
		const newBook = await book.save()
		res.status(201).json(newBook)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const updateBookById = async (req, res) => {
	try {
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!book) return res.status(404).json({ message: 'Book not found' })
		res.json(book)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const deleteBookById = async (req, res) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id)
		if (!book) return res.status(404).json({ message: 'Book not found' })
		res.json({ message: 'Book deleted successfully' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

module.exports = {
	getAllBooks,
	getBookById,
    createBook,
	updateBookById,
	deleteBookById,
}
