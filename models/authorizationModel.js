const mongoose = require('mongoose');

const authorizationSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true, "Please add an email"],
    },
    _sessionID:{
        type: String,
        required: [true, "Please add a session ID"],
    },
});

const Authorization = mongoose.model('authorization', authorizationSchema);
module.exports = Authorization;
