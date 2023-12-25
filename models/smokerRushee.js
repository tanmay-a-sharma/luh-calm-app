const mongoose = require('mongoose')

// all the user-required fields
const smokerRusheeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    time: {
        type: String,
        required: [true, 'Please add a time']
    },
    // role: {
    //     type: String,
    //     required: [true, 'Please add a role']   // default role will be send using the customer controller
    // },
    // phoneNumber: {  // Test on fronted whether the input is in number or not.
    //     type: Number,
    //     required: [true, 'Please add a phone number']
    // }
    
    // I need to further add role, phone number here later
},
{
    timestamps: true
}
)

module.exports = mongoose.model('SmokerRushee', smokerRusheeSchema)