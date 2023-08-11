///////////////////////////////////////modules imported///////////////////////////////////////
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();


mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://Yash_Kshatriya:Yash%402001@cluster0.vxibuhd.mongodb.net/restDB",{useNewUrlParser:true});

/////////////////////creating a schema for blog  (structure for our blog)/////////////////////////////////

const blogSchema=new mongoose.Schema({
    title:{type: String,required:true},
    content:{type: String,required:true},
    
})

////////////////////creating a schema for user (structure for our user)/////////////////////////////////

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    password:{
        type:String,
        required:true,
    }
})

const Blog=new mongoose.model("Blog",blogSchema);
const User=mongoose.model("user",UserSchema);

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

///////////////////////////////////////*code to handle cors/////////////////////////////////////////////
app.use(cors());
///////////////////////////////////////creating authentication middleware///////////////////////////////

function CheckAuth(req,res,next){

    const x=req.headers.authorization;
    
    if(!x){
        return res.status(401).json({
            message:"Authorization failed"
        });
    }
    else{
        const token=req.headers.authorization.split(" ")[1];
        
            if(!token){
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
            try{
                const decoded=jwt.verify(token,process.env.JWT_KEY);
                req.userData=decoded;
                console.log(req.userData);
                next();
            }catch(err){
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
    }

}

/////////////////////////creating a signup route for signing up a users////////////////////////////////////////////////////////

app.post("/users/signup",(req,res)=>{

    
    User.find({email:req.body.email},(err,user)=>{
        if(err){
            return res.status(500).json({
                error:err
            });
        }
        if(user.length>0){
            return res.status(409).json({
                message:"User With This Email Already Exists"
            });
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }
                else{
                    const user =new User({
                        email:req.body.email,
                        password:hash
                    });
                    user.save((err,result)=>{
                        if(err){
                            return res.status(500).json({
                                error:err
                            });
                        }
                        if(result){
                            console.log(user);
                            return res.status(201).json({
                                message:"User SignedUp Successfully"
                            })
                            
                        }
                    });
                    
                }
            })

        }
    })
})
//////////////////////////////creating a login route for a user//////////////////////////////////////////

app.post("/users/login",(req,res)=>{

   User.find({email:req.body.email},(err,users)=>{
    if(err){
        return res.status(500).json({
            error:err
        });
    }
    if(users.length<1){
        //res.send("Auth failed");
        return res.status(401).json({
            message:"Authentication failed"
        })
    }
    else{
        bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
            if(err){
                // res.send("Auth Failed");
                return res.status(500).json({
                    message:"Authentication failed"
                })
            }
            if(result){
                const token=jwt.sign(
                    {
                    email:users[0].email,
                    userId:users[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                }
            );
            return res.status(200).json({
                message:"Authentication successfull",
                token:token
            });
            }
            else{
                // res.send("Auth Failed");
                return res.status(401).json({
                    message:"Authentication failed"
                })
            }
        })
    }
   })
})

app.get("/",(req,res)=>{
    // res.send("This is blog api");
    return res.status(200).json({
        message:"Hello this is blog api"
    })
})
//////////////////////////code to add new blog to our database////////////////////////////////////////////////

app.post("/blogs",CheckAuth,(req,res)=>{
    var blog=new Blog({
        title:req.body.title,
        content:req.body.content
    },)
    blog.save();
    // res.send("New Blog is added");
    return res.status(201).json({
        message:"New Blog Is Added",
        Blog:blog
    })
})

////////////////////////code to get all the blogs in database/////////////////////////////////////////

app.get("/blogs",(req,res)=>{

    Blog.find({},(err,blogs)=>{
        if(err){
            // console.log(err);
            return res.status(500).json({
                error:err
            })
        }
        else{
            // res.send(blogs);
            return res.status(200).json({
                Blogs:blogs
            })
        }
    })
})

////////////////code to find a blog with specific id in database//////////////////

app.get("/blogs/:id",CheckAuth,(req,res)=>{
    
    const blogId=req.params.id;

    Blog.findOne({_id:blogId},(err,blog)=>{

        if(err){
            // res.send(err)
            return res.status(500).json({
                error:err.message
            })
        }
        else if(!blog){
            // res.send("No blog exists with this id")
            return res.status(401).json({
                message:"No blog exists with this id"
            })
        }
        else{
            // res.send(blog);
            return res.status(200).json({
                Blog:blog
            })
        }
    })
})

//////////////////////////////code to delete specific blog from database/////////////////////////////
app.delete("/blogs/:id",CheckAuth,(req,res)=>{
    const blogId=req.params.id;
    Blog.deleteOne({_id:blogId},(err,result)=>{

        if(err){
            // res.send(err);
            return res.status(500).json({
                error:err
            })
        }
        else if(!result){
            // res.send("No blog exits with this id");
            return res.status(401).json({
                message:"No blog exits with this id"
            })
        }
        else{
            // res.send("blog deleted successfully");
            return res.status(204).json({
                message:"blog deleted successfully"
            })
        }
    })
})

//////////////////////////////////code to update a specific blog i an database///////////////////
app.patch("/blogs/:id",CheckAuth,(req,res)=>{

    const blogId=req.params.id;

    Blog.findOne({_id:blogId},(err,blog)=>{

        if(err){
            // res.send(err)
            return res.status(500).json({
                error:err
            })
        }
        else if(!blog){
            // res.send("No blog exists with this id")
            return res.status(401).json({
                message:"No blog exists with this id"
            })
        }
        else{
            const {title,content}=req.body;

            if(title){
                blog.title=title;
            }
            if(content){
                blog.content=content;
            }
           
            blog.save((err) => {
                if (err) {
                  res.status(500).json({
                    message:err.message
                  });
                } else {
                //   res.send("blog updated successfully");
                return res.status(201).json({
                    message:"blog updated successfully"
                })
                }
              });
        }
    })

})

app.listen(process.env.PORT || 3000,()=>console.log("server is up and running"));