const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("working");
})

app.get("/dashboard",(req,res)=>{
    res.send("dashboard");
})


let PORT=5000;
app.listen(PORT,()=>{
    console.log("server is connected");
    
});