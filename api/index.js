require("dotenv").config({path: "../.env"});

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const TextAnnouncement = require('../models/textAnnouncementSchema.js');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// console.log(process.env.MONGO_URI);
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // serverSelectionTimeoutMS: 500, // Increase the timeout to 20 seconds for debugging purposes

    })
    .then(() => {
        console.log("Connected to MongoDB");

    })
    .catch((err) => {
        console.log("Error connected to MongoDB", err);
    });

app.listen(port, () => {
    console.log("Server is running on port 8000");
});

const User = require('../models/ActiveModel.js');
// now we boutta connect to the backend to register the user
app.post("/register", async (req, res) => {
    let verificationToken;
    try {
        const {name, pledgeClass, email, password, confirmedPassword, activeSemesters} = req.body;

        // checking for user of email log
        console.log(`Checking for existing user with email: ${email}`);

        // mongoose.model('Users', activeSchema);
        // const User = require('../models/ActiveModel.js');

        const db = mongoose.connection;

        // const existingUser = await db.collection('test').find({});

        // existingUser.returnKey
        // if (existingUser) {
        //   console.log("Email already registered");
        //   console.log(existingUser); // This will log the properties of the existing user
        //   return res.status(400).json({ message: "Email is already registered" });
        // }
        // see if the user is already registering with an email that already exists
        // if (existingUser) {
        //   console.log("Email already registered");
        //   return res.status(400).json({ message: "Email is already registered" });
        // }


        const existingUser = await db.collection('active').findOne({email: email});

        if (existingUser) {
            return res.status(400).json({message: "You already have an account!"});
        }

        if (password !== confirmedPassword) {
            console.log("Your passwords are not the same");
            return res.status(400).json({message: "Your passwords are not the same"});
        }


        verificationToken = crypto.randomBytes(20).toString("hex");

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name: name,
            pledgeClass: pledgeClass,
            email: email,
            password: hashedPassword,
            verificationToken: verificationToken,
            activeSemesters: activeSemesters,
        });

        // if (bcrypt.compare(password, newUser.password)) {
        //   console.log("our encryption is danking");

        //   // Passwords match
        //   // Proceed with login
        // }


        //await db.createCollection("active");
        db.collection("active").insertOne(newUser);
        //await newUser.save();

        // we are going to send a verification email to the assigned user
        sendVerificationEmail(newUser.email, newUser.verificationToken);


        res.status(200).json({
            message: "Registration successful. Check your email for verification",
        });
    } catch (error) {
        console.log("error registering users", error);
        res.status(500).json({message: "Registration Failed when posting"});
    }
});

const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
    };

    // send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification Email sent succsessfully");
        // setEmailStatus('success');
        return {status: 'success', message: 'Verification email sent successfully'}
    } catch (error) {
        console.log(error);
        console.log("Error sending the verification email");
        // setEmailStatus('error');
        return {status: 'error', message: 'Error sending the verification email'};
    }
};

// endpoint to verify the emai

app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const db = mongoose.connection;
        const user = await db.collection("active").findOne({verificationToken: token});
        // const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({message: "Invalid verification token"});
        }

        // mark the user as verified
        user.verified = true;
        db.collection("active").updateOne(
            {
                _id: user._id,
            },
            [
                {$set: {verified: true, verificationToken: null}}

            ]
        );


        // remove token from backend
        user.verificationToken = undefined;


        // this is going to allow us to also recognize that that user
        //  no longer has to login once they have logged in and will
        //  be taken to the landing page

        res.status(200).json({message: "Email verified successfully"});
    } catch (error) {
        res.status(500).json({message: "Email verification failed"});
        console.log(error);
    }
});


app.post("/login", async (req, res) => {
    try {
        const db = mongoose.connection;
        const {email, password} = req.body;
        const user = await db.collection("active").findOne({email});

        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        if (!user.verified) {
            return res.status(401).json({message: "Please verify your account first"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Incorrect password"});
        }

        // If the password is correct and the user is verified, proceed with the login process.
        // You might want to create a session or generate a token here.


        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

        await db.collection("active").updateOne(
            {_id: user._id},
            {$push: {sessions: token}}
        );

        res.status(200).json({message: "Login successful", token: token});
    } catch (error) {
        console.log("Error logging in", error);
        res.status(500).json({message: "Login failed"});
    }
});

app.get('/announcements', async (req, res) => {
    try {
        const db = mongoose.connection;
        const announcements = await db.collection('announcements').find({}).toArray();
        res.status(200).json(announcements);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching announcements'});
    }
});

app.post('/announcements', async (req, res) => {
    try {
        const db = mongoose.connection;
        const {title, content, author} = req.body;

        const newAnnouncement = new TextAnnouncement({
            title,
            content,
            author
        });

        await db.collection('announcements').insertOne(newAnnouncement);

        res.status(201).json({message: 'Announcement created successfully', announcement: newAnnouncement});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error creating announcement'});
    }
});
