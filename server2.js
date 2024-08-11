import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
const app=express();
app.use(cors());
app.use("/",express.static("C:/Users/sabik/Downloads/Quiz"))
mongoose.connect("mongodb://localhost:27017/quizuserSign").then(()=>console.log("Hi"));
const signtemplate=mongoose.Schema({
    FirstName:String,
    LastName:String,
    Email:String,
    Password:String
});
const SignModel=mongoose.model("Signin",signtemplate);
app.use(express.json())
app.get("/",(req,res)=>{
    res.status(200).sendFile(path.join(process.cwd(),'index.html'));
})
app.post("/create-user",(req,res)=>{
    const data =req.body 
    SignModel.create(data).then(()=>{
        res.status(200).json({
            err:false,
            detail:"THE DATA IS SUCCESSFULLY SEND" 
        });
    })
    console.log(data)
});
app.post("/signin", (req, res) => {
    const { email, password } = req.body;
  
    SignModel.findOne({ email: email })
      .then(user => {
        if (!user) {
          res.status(401).json({ success: false, message: "Invalid email or password." });
          return;
        }
  
        // Compare the provided password with the hashed password stored in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            res.status(500).json({ success: false, message: "Error comparing passwords." });
            return;
          }
  
          if (isMatch) {
            res.status(200).json({ success: true });
          } else {
            res.status(401).json({ success: false, message: "Invalid email or password." });
          }
        });
      })
      .catch(err => res.status(500).json({ success: false, message: err.message }));
  });
app.listen(5000,()=>{
    console.log('Server listening at port 5000')
});