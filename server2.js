import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
const app=express();
app.use(cors());
app.use("/",express.static("C:/Users/sabik/Downloads/Quiz"))
mongoose.connect("mongodb+srv://mohameedaasheeq1:Itboy%402006@cluster0.vxhjvv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("Hi"));
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
app.get("/check-email/:email", (req, res) => {
    const email = req.params.email;
    SignModel.findOne({Email: email })
      .then(user => {
        if (user) {
          res.status(200).json({ exists: true });
        } else {
          res.status(200).json({ exists: false });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
app.post("/create-user",(req,res)=>{ 
    const data =req.body;
    console.log(data);
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
    SignModel.findOne({Email: email})
      .then(user => {
        console.log("USER"+user);
        if (!user) {  
          res.status(401).json({ success: false, message: "Invalid email or password." });
          return;  
        }
        console.log("USER"+user.Password);
        if(user.Password!=password){
            res.status(401).json({ success: false, message: "Invalid email or password." });
        }
        else{
            res.status(200).json({success:true});
        }
      })
      .catch(err => res.status(500).json({ success: false, message: err.message}));
  });
app.listen(5000,()=>{
    console.log('Server listening at port 5000')
});
