import mongoose from "mongoose";

export const imgDataSchema = mongoose.Schema({
   fileName: {
      type : String,
      required : true,
   },
   imgCode : {
      type : String,
      required : true,
   },
   catagory: {
      type : String,
      required : true,
   }
})

export default mongoose.model('ImgData',imgDataSchema);