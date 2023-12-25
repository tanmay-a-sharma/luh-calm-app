const mongoose = require('mongoose')

// all the user-required fields
const activeSmokerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'No name received, please login']
    },
    time: {
        type: String,
        required: [true, 'Please add a time']
    },
    // role: {
    //     type: String,
    //     required: [true, 'Please add a role']   // default role will be send using the customer controller
    // },
    // phoneNumber: {  // Test on frontend whether the input is in number or not.
    //     type: Number,
    //     required: [true, 'Please add a phone number']
    // }
    
    // I need to further add role, phone number here later
},
{
    timestamps: true
}
)

module.exports = mongoose.model('SmokerActive', activeSmokerSchema)