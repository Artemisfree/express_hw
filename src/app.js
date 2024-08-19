const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const mongoURI =
	'mongodb://root:123456@localhost:27017/mydatabase?authSource=admin'

mongoose
	.connect(mongoURI)
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Error connecting to MongoDB:', err))

app.use(express.json())
app.use(cors())

app.use((request, response, next) => {
	console.log(`Request URL: ${request.originalUrl}`)
	next()
})

const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')

app.use('/api', userRoutes)
app.use('/api', bookRoutes)

app.use((request, response, next) => {
	response.status(404).json({ message: 'Route not found' })
})

app.use((error, request, response, next) => {
	console.error(error.stack)
	response.status(500).json({ message: 'Something went wrong', error: error.message })
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
