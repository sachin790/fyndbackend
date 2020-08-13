var express = require('express');
var router = express.Router();
const checkAuth = require("./../middleware/check-auth");
var api= require("./../controller/api");

//DIRECTING TO API FUNCTIONS
router.post("/api/admin/login", api.login);
router.get("/api/movies" ,api.get_movies );
router.get("/api/admin/movies" ,checkAuth,api.get_movies );
router.post("/api/movie/add" , checkAuth , api.add_movie );
router.post("/api/movie/edit" , checkAuth , api.edit_movie );
router.get("/api/movie" , checkAuth , api.get_movie );
router.get("/api/movie/delete" , checkAuth , api.delete_movie );



//export app
module.exports=router;