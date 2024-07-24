
const mongoose=require('mongoose');
const templateSchema=new mongoose.Schema({

    templateName:{
        type:String,
        required:true,
        trim:true,
       unique:true,
    },
    templatePara:[
        {
            type:String,
            trim:true,           
        }
    ],
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})
const Template=mongoose.model('Template',templateSchema)
module.exports=Template;