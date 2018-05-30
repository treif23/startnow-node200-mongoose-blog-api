const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    console.log(req.params)
    User
        .findById(req.params.id)
        .then(
            users => (users ? res.status(200).json(users) : res.status(404).send())
        )
        .catch(err => res.status(500).send("An internal server error has occured"));

});

router.post('/', (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then(user => {
            res.status(201).json(user);
            console.log('Saved user to database');
        })
        .catch(err => res.send(err.message));
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then(users => {
            if (!users) res.status(404).send();
            console.log("Saved updated User");
            res.status(204).json(users);
        })
        .catch(err => res.send(err.message));
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id, (err, deletedUser) => {
            if (deletedUser) {
                res.status(200).json(deletedUser);
            } else {
                console.log(err);
                res.status(404).send(`404 Error: User ${req.params.id} not found`);
            }
        })
        .then(users => {
            res.status(200).json(users);
        });
});


module.exports = router;