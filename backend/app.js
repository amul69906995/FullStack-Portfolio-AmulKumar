const express = require('express')
const app = express()
require('dotenv').config()
const userRoutes=require('./routes/userRoutes')
const companyRoutes=require('./routes/companyRoutes.js')
const templateRoutes=require('./routes/templateRoutes.js')
const projectRoutes=require('./routes/projectRoutes.js')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const appError = require('./error/appError.js')
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cookieParser
app.use(cookieParser())

//database connection
const mongoose = require('mongoose');



async function main() {
  await mongoose.connect(process.env.MONGO_URI);

}


main()
  .then(() => { console.log("database connected") })
  .catch(err => {
    console.log(err)
    console.log(process.env.MONGO_URI)
  }
  );


//cors  
//NOTE::::: add withCredentials when u set cookies in response
const cors = require('cors')
const catchAsync = require('./error/catchAsync.js')

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

// morgan req logger

app.use(morgan('tiny'))
//route

app.use('/user',userRoutes)
app.use('/company',companyRoutes)
app.use('/template',templateRoutes)
app.use('/project',projectRoutes)
app.use('*',(req,res)=>{
  throw new appError("path not found",404)
})
//error
app.use((err, req, res, next) => {
  const { message = "something went wrong/default message to debug u have to dig dipper", statusCode = 500 } = err
  console.log("**********error**************")
  console.log("**********error**************")
  console.log(message,statusCode)
  console.log("**********error**************")
  res.status(statusCode).json({ message })
})


app.listen(process.env.port, () => { console.log(`server started on port ${process.env.port}`) })