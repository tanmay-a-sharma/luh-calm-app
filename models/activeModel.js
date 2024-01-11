const mongoose = require("mongoose");

// all the user-required fields
const activeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    pledgeClass: String,
    status: {
      type: String,
      required: [true, "Please indicate AKPsi status"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    profileImage: String,
    userDescription: {
      type: String,
      default: null,
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "activeSchema",
      },
    ],
    connectionRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        res: "activeSchema",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      required: [true, "Please add a role"], // default role will be send using the customer controller
    },
    // phoneNumber: {  // Test on fronted whether the input is in number or not.
    //     type: Number,
    //     required: [true, 'Please add a phone number']
    // }

    // I need to further add role, phone number here later
  },
  {
    timestamps: true,
  }
);

const Active = mongoose.model("Active", activeSchema);
module.exports = Active;
