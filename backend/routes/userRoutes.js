const express = require('express')
const router = express.Router()
const catchAsync = require('../error/catchAsync')
const appError = require('../error/appError')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const validateUserSchema = require('../utils/validateUserSchema.js')
const User = require('../models/user.js')
const validateUser = require('../middlewares/validateUser.js')
const sendVerificationEmail = require('../utils/sendVerifyMail.js')
const Company = require('../models/company.js')
const Template = require('../models/template.js')
const sendCvEmail=require('../utils/sendCvEmail.js')
const {uploadImgCloudinary}=require('../utils/cloudinary.js')
const upload=require('../utils/multer.js')

router.post('/sign-up', catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    console.log(email, password, "reached here")
    const { error } = await validateUserSchema.validateAsync(req.body)
    if (error) throw new appError(error.details[0].message, 400)
    const emailExists = await User.findOne({ email })
    if (emailExists) throw new appError("email already exist", 400)
    const user = new User({ email, password })


    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    const verifyUrl = `${process.env.FRONTEND_URL}/emailverification/?token=${jwtToken}`
    await sendVerificationEmail(verifyUrl)
    await user.save()
    // res.json({ jwtToken, verifyUrl })
    res.json({ "message": "please verify you email then login" })
}))
router.post('/log-in', catchAsync(async (req, res, next) => {
    const { jwtToken } = req.cookies;
    // if (jwtToken) {
    //     const data = jwt.verify(jwtToken, process.env.JWT_SECRET);
    //     if (data) throw new appError('you already have token no need to login again', 400)

    // }
    const { email, password } = req.body;
    const { error } = await validateUserSchema.validateAsync({ email, password })
    if (error) throw new appError(error.details[0].message, 400);
    const user = await User.findOne({ email })
    if (!user) throw new appError("email doenot exist", 400)
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) throw new appError("password is incorrect", 400)
    if (!user.isVerified) throw new appError("user is not verified", 400)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie('jwtToken', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
    res.json({ "message": "login successfully", jwtToken: token, user })

}))
router.post('/verify-user', catchAsync(async (req, res, next) => {
    const { token } = req.body;
    if (!token) throw new appError("jwt is required", 400)
    const data = jwt.verify(token, process.env.JWT_SECRET)
    if (!data) throw new appError("token is invalid", 400)
    const user = await User.findById(data.id)
    if (!user) throw new appError('token is expired/invalid token', 400)
    if (user.isVerified) throw new appError('user already verified', 400)
    user.isVerified = true;
    await user.save()
    res.json({ message: "user is verified", user })
}))
router.put('/edit-profile',upload.single('cv'), validateUser,catchAsync(async (req, res, next) => {
    const { ...userProfileInfo } = req.body;
    const {userId}=req.body
    const result = await uploadImgCloudinary(req.file.path)
 
    const user = await User.findByIdAndUpdate(userId, {userProfileInfo,cvUrl:result.secure_url}, { new: true, runValidators: true })
   
    if (!user) throw new appError('user not found', 400)
    res.json({ message: "profile updated successful", user })
}))
router.post('/auto-login', catchAsync(async (req, res, next) => {
    const { jwtToken } = req.body;
    if (!jwtToken) throw new appError('no token', 404);
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET)
    if (!decode) throw new appError('incorrect token', 404);
    const user = await User.findById(decode.id)
    if (!user) throw new appError("user not found", 404)
    if (!user.isVerified) throw new appError("you need to verify your account", 400)
    res.cookie('jwtToken', jwtToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })

    res.json({ user, message: "log in successful" })
}))
router.post('/send-mail', validateUser, catchAsync(async (req, res, next) => {
    const { templateId, companiesId, userId } = req.body;
    console.log(req.body)
    if (!templateId || companiesId.length === 0) throw new appError("missing template or companies", 400)
    const user = await User.findById(userId)
    if (!user) throw new appError("user not found", 404)
    const template = await Template.findById(templateId)
    if (!template) throw new appError('template not found', 404)
    const companies=await Company.find({_id:{$in:companiesId}})
    if (companies.length !== companiesId.length) {
        throw new appError("One or more companies not found", 404);
      }
    console.log(companies)
    for(let company of companies){
        await sendCvEmail(company, template, user)
    }
    res.json({ message: "message sent successfully" })
}))

module.exports = router;