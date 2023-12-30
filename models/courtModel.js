const mongoose = require('mongoose')

// all the user-required fields
const courtSchema = new mongoose.Schema({
    section: {
        type: Number,
        required: [true, 'Please add a time']
    },
//     username: {
//         type: String,
//         required: [true, 'Who da hell posting this court'],
//         unique: true
//     },
    
    activesOnCourt:[
        {
            active:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref: "Active"
            }
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    },
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

const Court = mongoose.model('Court', courtSchema);
module.exports = Court;