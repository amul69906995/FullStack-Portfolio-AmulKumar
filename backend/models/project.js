const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
        trim: true
    },
    projectGithubLink: {
        type: String,
        required: true,
        trim: true
    },
    projectImageUrl: {
        url: {
            type: String,
            required: true,
            trim: true
        },
        public_id: {
            type: String,
            required: true,
            trim: true
        }
    },

    projectDescription: {
        type: String,
        required: true,
        trim: true
    },
    projectType: {
        type: String,
        required: true,
        enum: ['min', 'sde']
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project