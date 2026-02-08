require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const City = require('./models/Cities.js'); 
const cors = require('cors'); 
const path = require('path');
const turfRoutes=require('./routes/turf.js')
const sendEmail = require('./utils/resend.js');
// const otpGenerator = require('otp-generator');
const bcrypt=require('bcryptjs')

const app = express();
app.use(cors())
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cities', async (req, res) => {
    const nameQuery = req.query.name || '';
    try {
        const cities = await City.find({ name: { $regex: nameQuery, $options: 'i' } }).select('name -_id');
        res.json(cities);
    } catch (error) {
        console.error('Error retrieving cities:', error);
        res.status(500).json({ message: 'Failed to retrieve cities' });
    }
});


app.use('/api', turfRoutes);

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true },
    turfName: { type: String, required: true },
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    location: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, required: true, enum: ['Confirmed', 'Completed', 'Cancelled'] },
    turfImageUrl: { type: String } 
});

const userSchema = new mongoose.Schema({
    username:{type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, default: '' },
    otpExpiry: { type: Date, default: null },
    bookings: [bookingSchema]
});



const User = mongoose.model('User', userSchema);

function generateNumericOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const otp = generateNumericOtp();
        newUser.otp = otp;
        newUser.otpExpiry = Date.now() + 10 * 60000;
        await newUser.save();

        await sendEmail({
            to: email,
            subject: "VTurfZone Signup OTP",
            html: `
                <h2>VTurfZone Signup</h2>
                <h1>${otp}</h1>
                <p>Expires in 10 minutes.</p>
            `
        });

        res.json({ success: true });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: "Signup failed" });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ success: false, message: 'Incorrect password' });
        }

        const otp = generateNumericOtp();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60000;
        await user.save();

        await sendEmail({
            to: email,
            subject: "VTurfZone Login OTP",
            html: `
                <h2>VTurfZone Login</h2>
                <p>Your OTP:</p>
                <h1>${otp}</h1>
                <p>Expires in 10 minutes.</p>
            `
        });

        res.json({ success: true });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
});


app.post('/api/forgot-password', async (req, res) => { 
    try{
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User does not exist' });

    const otp = generateNumericOtp();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60000;
    await user.save();

    
         await sendEmail({
            to: email,
            subject: "VTurfZone Login OTP",
            html: `
                <h2>VTurfZone Login</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP expires in 10 minutes.</p>
            `
        });
        console.log("OTP email sent successfully");
    

    res.json({ success: true, message: 'OTP sent to email' });
    }catch (error) {
        console.error("Email send error:", error);
        return res.json({ success: false, message: "Failed to send OTP email" });
    }
});

app.post('/api/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.otp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (Date.now() > user.otpExpiry) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        res.json({ success: true });

    } catch (error) {
        console.error("VERIFY OTP ERROR:", error);
        res.status(500).json({ success: false });
    }
});

app.post('/api/reset-password', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        res.status(500).json({ success: false });
    }
});


const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
