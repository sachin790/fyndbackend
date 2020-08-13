

const mongoose = require('mongoose');
mongoose.set('debug', true);
const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    }
	
});

module.exports = mongoose.model('admin', adminSchema);