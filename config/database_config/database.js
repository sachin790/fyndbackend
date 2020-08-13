var mongoose = require('mongoose');

function connect(){
    return mongoose.connect("mongodb+srv://sachin:sachin123@cluster0.5i11a.mongodb.net/fynd?retryWrites=true&w=majority",{ useNewUrlParser: true });
}

exports.connect  = connect;