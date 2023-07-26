import User from "../models/user.js";
import bcrypt from "bcrypt";
import imgData from "../models/imgData.js";

export const register = async (req, res, next) => {
   try {
      // const sortPass = req.body.password.sort()
      // const strPass = sortPass.join(',')
      // const hash = bcrypt.hashSync(strPass, 10)
      // console.log(hash)
      const newUser = new User({
         email: req.body.email,
         name: req.body.name,
         number: req.body.number,
         catagory: req.body.catagory,
         password: req.body.password.join(','),
      })
      await newUser.save()
      res.status(200).send({ msg: "user has been create" })
   }
   catch (error) {
      if (error.code === 11000) {
         return res.send({ status: 'error', error: 'user already exists' })
      }
      throw error
   }
}


export const login = async (req, res, next) => {
   try {
      const id = req.body.email;
      const userExist = await User.findOne({ email: id })
      if (!userExist) {
         return res.json({notExist: true})
      }
      else {
         const images = await imgData.find({ catagory: userExist.catagory }).select({ _id: 0, catagory: 1, fileName: 1, imgCode: 1 })
         const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
         }
         res.json(shuffle(images))
      }
   }
   catch (err) {
      return res.send({ status: 'error', error: err })
   }

}

export const verifyPassword = async (req, res) => {
   try{
      const { email , password} = req.body
      // console.log(bcrypt.hashSync(password.join(''),10))
      const userExist = await User.findOne({ email: email })
      // console.log(userExist.password)
      // const sortPass = password.sort()
      const userPass = password.join(',')
      // const auth = bcrypt.compareSync(userExist.password,userPass)
      // console.log(auth)
      if(userPass === userExist.password){
         console.log(userExist.name)
         return res.json({name :userExist.name, msg: false})
      }
      else{
         return res.json({msg: true})
      }
   }
   catch (err) {
      return res.send({ status: 'error', error: err })
   }
}
