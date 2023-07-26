import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js"
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;
const ___filename = fileURLToPath(import.meta.url);
const ___dirnaem = dirname(___filename);

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${___dirnaem}/public`));

const connectDB = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/authDB');
      console.log('connected to mongoDB');
   }
   catch (err) {
      throw err;
   }
};

app.get('/', (req, res) => {
   res.render('index');
});

//middleWare
app.use('/user',userRoute);
app.use('/admin',adminRoute);

app.listen(port, (req, res) => {
   connectDB();
   console.log(`server running on port ${port}`);
})