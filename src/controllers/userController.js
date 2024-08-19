const User = require('../models/userModel')

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user) return res.status(404).json({ message: 'User not found' })
		res.json(user)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const createUser = async (req, res) => {
	const { firstName, lastName, username } = req.body

	if (!firstName || firstName.length < 2) {
		return res
			.status(400)
			.json({ message: 'First name must be at least 2 characters long' })
	}
	if (!lastName || lastName.length < 2) {
		return res
			.status(400)
			.json({ message: 'Last name must be at least 2 characters long' })
	}
	if (!username || username.length < 5) {
		return res
			.status(400)
			.json({ message: 'Username must be at least 5 characters long' })
	}

	const user = new User({
		firstName,
		lastName,
		username,
	})

	try {
		const newUser = await user.save()
		res.status(201).json(newUser)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const updateUserById = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!user) return res.status(404).json({ message: 'User not found' })
		res.json(user)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

const deleteUserById = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user) return res.status(404).json({ message: 'User not found' })
		res.json({ message: 'User deleted successfully' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

module.exports = {
	getAllUsers,
	getUserById,
    createUser,
	updateUserById,
	deleteUserById,
}
