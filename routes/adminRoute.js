
import express from "express";
import { createImg ,upload} from "../controllers/imgData.js";
const router = express.Router();

//create IMG
router.get('/',(req,res)=>{
   res.render('admin')
})

router.post('/upload', upload.array('photos',25), createImg);

export default router;