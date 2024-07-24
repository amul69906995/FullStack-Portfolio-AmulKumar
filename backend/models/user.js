const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    cpi: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    contactEmail: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: String,
        trim: true
    },
    carrierRole: {
        type: String,
        trim: true
    },
    carrierDescription: {
        type: String,
        trim: true
    },
    carrierType: {
        type: String,
        trim: true,
        enum: ['min', 'sde']
    },
    twitterLink: {
        type: String,
        trim: true
    },
    githubLink: {
        type: String,
        trim: true
    },
    linkedinLink: {
        type: String,
        trim: true,
    },
    skills: [{
        type: String,
        trim: true
    }],
    cvUrl:{
        type: String,
        trim:true,
    },
    companyDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }]
})
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model('User', userSchema)
module.exports = User;