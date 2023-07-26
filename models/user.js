import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type : String,
      required: true,
      unique: true,
   },
   catagory: {
      type : String,
      required : true,
   },
   password : {
      type : String,
      required : true,
   },
   phone : {
      type : Number,
   }
})

export default mongoose.model('User',userSchema);