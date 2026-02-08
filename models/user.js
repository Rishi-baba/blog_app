const { Schema, model } = require('mongoose')
const { createHmac, randomBytes } = require('node:crypto');

const userSchema = new Schema ({
  
  
  name:{
    type:String,
    required: true,
  },
  email:{
    trype:String,
    required:true,
    unique:true,
  },
  salt:{
    trype:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  profileImageUrl:{
    type:String,
    default:'./public/images/profil.jpg' 
  },
  role:{
    type:String,
    enum:["USER", "ADMIN"],
    default:"USER"

  }


},{timestamps:true})


userSchema.pre("save", function(next){
  const user = this;
  if(!user.isModified("password")) return

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex")

  this.salt=sa;this;
  this.password=hashedPassword;

  next()
})


const userModel = new model('user', userSchema)

module.exports = user