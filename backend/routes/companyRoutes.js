const express = require('express')
const router = express.Router()
const catchAsync = require('../error/catchAsync.js')
const appError = require('../error/appError.js')
const Company = require('../models/company.js')
const validateUser=require('../middlewares/validateUser.js')
const User=require('../models/user.js')
const mongoose=require('mongoose')
const validateCompanySchema=require('../utils/validateCompanySchema.js')
const { isValidObjectId } = mongoose;



router.get('/', validateUser, catchAsync(async (req, res, next) => {
    const {userId}=req.body
    console.log(userId)
    const user = await User.findById(userId).populate('companyDetails').exec();
    if(!user)throw new appError('user not found',400)
    res.status(201).json({ "companyDetails": user.companyDetails })
}))


router.post('/add', validateUser, catchAsync(async (req, res, next) => {
    const {userId}=req.body //added in validateUser middleware
    const { companyHrContact, companyType, companyName, hiringManagerName, positionRole } = req.body;
    const { error } = await validateCompanySchema.validateAsync({companyHrContact, companyType, companyName, hiringManagerName, positionRole })
    if (error) throw new appError(error.details[0].message, 400)
    const isCompanyHrContact = await Company.findOne({ companyHrContact })
    if (isCompanyHrContact) throw new appError('hr already present ', 400)
   const newCompany=new Company({companyHrContact,companyType,companyName, hiringManagerName, positionRole,ownerId:userId})
    await newCompany.save();
    const user = await User.findByIdAndUpdate(userId,{ $push: { companyDetails: newCompany._id } })
    res.json({message:"added success", newCompany} )
}))

router.put('/edit/:companyId',validateUser, catchAsync(async (req, res, next) => {
    const {userId, ...updateItems } = req.body;
    const {companyId}=req.params;
    console.log(updateItems)
    if(!isValidObjectId(companyId))throw new appError('companyid is incorrect',400)
    let isCompanyPresent = await Company.findByIdAndUpdate(companyId, { $set: updateItems }, { new: true, runValidators: true })
    if (!isCompanyPresent) throw new appError('email not found', 400)
    res.json({ "message": "updated successfully","updated company":isCompanyPresent})
}))
router.delete('/remove/:companyId',validateUser, catchAsync(async (req, res, next) => {
    const { companyId } = req.params;
    const {userId}=req.body;
    const deletedDoc = await Company.findByIdAndDelete(companyId);
    if(!deletedDoc)throw new appError("company id not present",400)
        const user = await User.findByIdAndUpdate(userId,{ $pull: { companyDetails: companyId } },{new:true})
    res.json({ "message": "deleted successfully", deletedDoc ,user})
}))



module.exports = router;