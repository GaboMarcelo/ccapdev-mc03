const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        db.findMany(User, null, null, function(result) {
            console.log(result);
            res.render('home', {contact: result.map(result => result.toJSON())});
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        var number = req.query.number;

        db.findOne(User, {number: number}, 'number', function(result) {
            res.send(result);
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        var newName = req.query.name;
        var newNum = req.query.number;

        var docu = {
            name: newName,
            number: newNum
        }

        db.insertOne(User, docu, function(result){});
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        var delNum = req.query.number;
        condition = {number: delNum};
        
        db.deleteOne(User, condition, function(result){});
    }

}

module.exports = controller;
