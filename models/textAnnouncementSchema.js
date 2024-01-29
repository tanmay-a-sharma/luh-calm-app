const mongoose = require('mongoose');

const textAnnouncementSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    author: {
        type: String,
        required: [true, 'Please add an author']
    },
    likes: [{
        type: Number,
        default: 0
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Active'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('TextAnnouncement', textAnnouncementSchema);