const mongoose = require("mongoose");
const Movies = require("./../models/movies.js");
const Admin = require("./../models/admin.js");
const jwt = require('jsonwebtoken');



//------- get all movies
exports.get_movies = async (req, res) => {
    let filters = await getFilters(req.query);
    Movies.find(filters)
        .exec()
        .then(data => {
            res.json(jsonResponses.response(1, "Data Fetched Successfully", data));
        })
        .catch(err => {
            res.json(jsonResponses.response(0, "Error", err.message));
        })
}


//------- get a single movie
exports.get_movie = async (req, res) => {
    Movies.find({ _id: new mongoose.Types.ObjectId(req.query.id) })
        .exec()
        .then(data => {
            res.json(jsonResponses.response(1, "Data Fetched Successfully", data[0]));
        })
        .catch(err => {
            res.json(jsonResponses.response(0, "Error", err.message));
        })
}



//------- add a new Movie
exports.add_movie = async (req, res) => {
    if (!req.body.name && req.body.name == "" && !req.body.director && req.body.director == "" && !req.body.imdb_score && req.body.imdb_score == "") {
        res.json(jsonResponses.response(0, "Please check Parameters", null));
    }
    const movie = new Movies({
        ...req.body,
        _id: new mongoose.Types.ObjectId()
    })
    movie.save()
        .then(data => {

            res.json(jsonResponses.response(1, "Data Saved Successfully", null));
        })
        .catch(err => {
            res.json(jsonResponses.response(0, "Error", err.message));
        })
}

//------- edit a movie
exports.edit_movie = async (req, res) => {

    if (!req.body.name && req.body.name == "" && !req.body.director && req.body.director == "" && !req.body.imdb_score && req.body.imdb_score == "") {
        res.json(jsonResponses.response(0, "Please check Parameters", null));
    }

    Movies.updateOne({ _id: new mongoose.Types.ObjectId(req.body.id) }, { $set: { director: req.body.director, imdb_score: req.body.imdb_score, popularity: req.body.popularity, genre: req.body.genre } })
        .then(data => {
            res.json(jsonResponses.response(1, "Data Updated Successfully", null));
        })
        .catch(err => {
            res.json(jsonResponses.response(0, "Error", err.message));
        })
}



//------- delete a movie
exports.delete_movie = async (req, res) => {
    if (!req.query.id) {
        res.json(jsonResponses.response(0, "Please check Parameters", null));
    }
    Movies.deleteOne({ _id: new mongoose.Types.ObjectId(req.query.id) })
        .then(data => {
            res.json(jsonResponses.response(1, "Data Deleted Successfully", null));
        })
        .catch(err => {
            res.json(jsonResponses.response(0, "Error", err.message));
        })
}


//--admin login api 
exports.login = (req, res, next) => {
    Admin.find({ name: req.body.name })
        .exec()
        .then(user => {
            console.log(user);
            if (user.length < 1) {
                res.json(jsonResponses.response(0, "Username does not exist ", null));
            } else {
                if (user[0].password === req.body.password) {
                    const token = jwt.sign(
                        {
                            user_id: user[0]._id
                        },
                        "secret"
                    );

                    res.json(jsonResponses.response(1, "Login  Successfully", token));
                }
                else {
                    res.json(jsonResponses.response(0, "Password is Wrong ", null));
                }
            }
        })
        .catch(err => {

            res.json(jsonResponses.response(0, "Error", err.message));
        })



}

//------------- function to get Filters
function getFilters(data) {
    let filter = {};
    if (data.name && data.name != "") {
        filter.name = new RegExp(data.name, "i")
    }
    if (data.director) {
        filter.director = new RegExp(data.director, "i")
    }
    if (data.genre) {
        filter["genre.name"] = { $in: data.genre }
    }
    return filter;
}

