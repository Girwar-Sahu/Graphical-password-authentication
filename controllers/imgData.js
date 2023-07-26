import imgData from "../models/imgData.js";
import multer from "multer";

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public/uploads');
   },
   filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
   }
});

export const upload = multer({ storage })

export const createImg = async (req, res, next) => {
   const files = req.files;
   const catagory = req.body.catagory;
   try {
      const allData = []
      files.forEach((file) => {
         allData.push({
            fileName: file.filename,
            imgCode: file.originalname,
            catagory: catagory
         })
      })
      const saveData = imgData.insertMany(allData);
      res.redirect('/admin')
   } catch (err) {
      next(err);
   }
}

export const fetchCatagory = imgData.distinct('catagory').exec()
