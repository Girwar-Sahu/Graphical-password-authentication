import mongoose from "mongoose";
import express from "express";
import { register, login , verifyPassword } from "../controllers/user.js";
import { fetchCatagory } from "../controllers/imgData.js";
import imgData from "../models/imgData.js";
const router = express.Router();

router.get('/', async (req, res) => {
   const data = await fetchCatagory;
   res.render('user', { data });
})

router.get('/list/:catagory', async (req, res) => {
   const catagory = req.params.catagory
   const images = await imgData.find({ catagory: catagory }).select({ _id: 0, catagory: 1, fileName: 1, imgCode: 1 })
   const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
   }
   res.json(shuffle(images))
})
router.post('/register', register);

router.post('/login', login);

router.get('/login', async (req, res) => {
   const data = await fetchCatagory;
   res.render('login', { data });
})
router.post('/login/password', verifyPassword)

export default router;

router.get('/login/welcome/:name', (req,res)=>{
   const name = req.params.name
   // console.log(name)
   res.render('welcome',{name})
})