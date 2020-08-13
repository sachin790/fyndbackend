

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;


const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, required: true
    },
    imdb_score: {
        type: SchemaTypes.Double, required: true
    },
    popularity: {
        type: SchemaTypes.Double, required: true
    },
    director: {
        type: String, required: true
    },
    genre : [{id: {  type: Number, required: false   }, name :{ type: String, required: true}}]

    
	
});

module.exports = mongoose.model('movies', movieSchema);