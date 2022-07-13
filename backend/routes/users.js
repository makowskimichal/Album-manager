const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const express = require('express')
const router = express.Router()

// register a user

router.post('/register', async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).send('User already registered')
    user = new User(_.pick(req.body, ['username', 'mail', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    res.send(_.pick(user, ['_id', 'username', 'mail']))
})

// login a user

router.post('/login', async (req, res) => {
    let user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send('No such user')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    res.send(_.pick(user, ['_id', 'username', 'mail']))
})

// search for users

router.get('/search', async (req, res) => {
    let name = req.query.name

    const users = await User.find({ $username: { $search: `${name}` } })
    console.log(users)
    res.send(true)
})

module.exports = router
