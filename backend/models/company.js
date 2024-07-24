
const mongoose = require('mongoose');

const appError = require('../error/appError.js');
const companySchema = new mongoose.Schema({
    companyHrContact: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    companyType: {
        type: String,
        required: true,
        trim: true,
        enum: ['min', 'sde']
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    hiringManagerName: {
        type: String,
        required: true,
        trim: true,
        default: 'Hiring Manager'
    },
    positionRole: {
        type: String,
        required: true,
        trim: true,
    }
})


const Company = mongoose.model('Company', companySchema);
module.exports = Company;