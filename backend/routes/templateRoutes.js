const express = require('express')
const router = express.Router();
const validateUser = require('../middlewares/validateUser')
const catchAsync = require('../error/catchAsync')
const appError = require('../error/appError');
const Template = require('../models/template');


router.get('/',validateUser,catchAsync(async(req,res)=>{
    const {userId}=req.body;
    const templates = await Template.find({ownerId:userId})
    res.status(200).json({templates})
}))

router.post('/add', validateUser, catchAsync(async (req, res, next) => {
    const { userId, templateName, ...paragraphs } = req.body;
    if (!templateName) throw new appError("templateName is required")
    console.log(paragraphs)
    const isTemplateNamePresent = await Template.findOne({ templateName })
    if (isTemplateNamePresent) throw new appError('template with this name is already present', 400)
    const templatePara = Object.values(paragraphs);
    const newtemplate = new Template({ templateName, ownerId: userId, templatePara })
    await newtemplate.save();
    console.log(paragraphs)
    res.json({ newtemplate,message:"template added successfully" })
}))

router.put('/edit/:templateId', validateUser, catchAsync(async (req, res, next) => {
    const { templateId } = req.params;
    const { userId, ...paragraphs } = req.body;

    if (!templateId) throw new appError('templateId not found', 400)
    const requiredTemplate = await Template.findById(templateId);
    if (!requiredTemplate) throw new appError('template not found', 400)
    const newTemplatePara = Object.values(paragraphs);
    requiredTemplate.templatePara = newTemplatePara;
    await requiredTemplate.save()
    res.json({ requiredTemplate })
}))
router.delete('/remove/:templateId',catchAsync(async(req,res,next)=>{
    const { templateId } = req.params;
    if (!templateId) throw new appError('templateId not found', 400)
        const deletedTemplate = await Template.findByIdAndDelete(templateId);
    if (!deletedTemplate) throw new appError('template not found', 400)
        res.json({deletedTemplate,"message":"deleted successfully"})
}))




















module.exports = router;