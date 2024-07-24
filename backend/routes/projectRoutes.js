const express = require('express');
const router = express.Router();

const Project = require('../models/project.js');
const catchAsync = require('../error/catchAsync.js');
const validateUser = require('../middlewares/validateUser.js');
const validateProjectSchema = require('../utils/validateProjectSchema.js');
const appError = require('../error/appError.js');
const upload = require('../utils/multer.js');
const {uploadImgCloudinary,deleteImgCloudinary} = require('../utils/cloudinary.js');

router.post('/add', validateUser, upload.single('projectImage'), catchAsync(async (req, res, next) => {
    const { userId, projectTitle, projectType, projectGithubLink, projectDescription } = req.body;
    const { error } = await validateProjectSchema.validateAsync({ projectTitle, projectType, projectGithubLink, projectDescription })
    if (error) { throw new appError(error.details[0].message, 400) }
    const result = await uploadImgCloudinary(req.file.path)
    const newProject = new Project({ ownerId: userId, projectTitle, projectType, projectGithubLink, projectDescription, projectImageUrl:{url:result.secure_url,public_id:result.public_id} })
    await newProject.save();
    res.json({ newProject })
}))
router.put('/edit/:projectId', validateUser, upload.single('projectImage'), catchAsync(async (req, res, next) => {
    const { userId, projectTitle, projectType, projectGithubLink, projectDescription } = req.body;
    const { projectId } = req.params
    const { error } = await validateProjectSchema.validateAsync({ projectTitle, projectType, projectGithubLink, projectDescription })
    if (error) { throw new appError(error.details[0].message, 400) }
    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
        throw new appError('Project not found', 404);
    }
    const deleteImgFromCloudinary=await deleteImgCloudinary(existingProject.public_id)
    
    const result = await uploadImgCloudinary(req.file.path)
    const upadtedProject=await Project.findByIdAndUpdate(projectId,{projectTitle, projectType, projectGithubLink, projectDescription, projectImageUrl: result.secure_url },{new:true,runValidators:true})
}))
router.delete('/remove/:projectId', validateUser, upload.single('projectImage'), catchAsync(async (req, res, next) => {
    const { projectId } = req.params
    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
        throw new appError('Project not found', 404);
    }
    const deleteImgFromCloudinary=await deleteImgCloudinary(existingProject.public_id)
    const deletedProject = await Project.findByIdAndDelete(projectId)
    if (!deletedProject) throw new appError("project not found")

    res.json({ deletedProject })

}))
module.exports = router;
