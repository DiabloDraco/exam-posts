import { Router } from "express";
import { POST } from "../middleware/post.middelware.js";
import { DOWNLOADIMG, GETIMAGE, GETINNERPOST, GETPOST, NEWPOST } from "../controllers/posts.controller.js";


let posts = Router()

posts.post("/post" , POST , NEWPOST)

posts.get("/getposts" , GETPOST)

posts.get("/getpost/:postId" , GETINNERPOST)

posts.get('/getImg/:imgName' , GETIMAGE)

posts.get('/download/:imgName' , DOWNLOADIMG)

export default posts