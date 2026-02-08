const {Router} = require('express')
const user = require('../models/user')

const router = Router()


router.get('/signin', (req,res)=>{
  res.render("signin")
})
router.get('/signup', (req,res)=>{
  res.render("signup")
})

router.post('signup', (req,res)=>{
  const {name, email, password, } = req.body
  user.create({
    name,
    email,
    password,
  })
  return res.redirect('/')
})


module.exports = router