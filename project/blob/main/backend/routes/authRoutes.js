const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const newUser = {
            email,
            password,
            firstName,
            lastName,
            createdAt: new Date()
        };

        await usersCollection.insertOne(newUser);

        const authtoken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ authtoken, email, user: { firstName, lastName, email } });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email, password });
        if (!user) return res.status(404).json({ error: 'Invalid credentials' });

        const authtoken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ authtoken, email, user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/profile', async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection('users');
        const updateFields = {};

        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (password) updateFields.password = password;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No update fields provided' });
        }

        await usersCollection.updateOne({ email }, { $set: updateFields });
        const updatedUser = await usersCollection.findOne({ email });

        res.json({
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            message: 'Profile updated successfully'
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;