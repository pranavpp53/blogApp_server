const express=require('express')
const { newUser, newPost, userPosts, allPosts, editPost, signinLogic, deletePost, SinglePost } = require("../controllers/logic")
const upload = require('../multerConfig/storageConfig')

const router = new express.Router()

router.post("/signin",signinLogic)

router.post("/register",newUser)

router.post("/newpost",upload.single('image_file'),newPost)

router.get("/userposts/:id",userPosts)

router.get("/singlepost/:id",SinglePost)

router.get("/getallposts",allPosts)

router.put("/editpost/:id",editPost)

router.delete("/deletepost/:id",deletePost)

module.exports=router