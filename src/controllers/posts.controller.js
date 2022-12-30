import { read, write } from "../utils/model.js";
import fs from "fs"
import path from "path";

export let NEWPOST = (req, res) => {
    try {
        let posts = read("posts")
        let {
            dateY,
            dateH,
            job,
            category,
            subcategory,
            type,
            fullname,
            phone,
            description,
            title,
            text
        } = req.body

        let { postImg } = req.files

        let postName = Date.now() + postImg.name

        fs.writeFileSync(path.resolve("uploads", postName), postImg.data, "utf-8")

        let newPost = {
            title,
            text,
            description,
            dateY,
            dateH,
            category,
            subcategory,
            type,
            postImg: postName,
            isDeleted: false,
            status: "pending",
            count: 0,
            postId: posts.at(-1)?.postId + 1 || 1,
            user: {
                fullname,
                phone,
                job
            },
            watched: []
        }

        posts.push(newPost)

        write("posts", posts)

        res.status(201).json({ status: 201, message: "new post added", date: newPost })
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message })
    }
}


export let GETPOST = (req, res) => {
    try {
        let posts = read("posts")

        let { category, type, dateY, fullname } = req.query

        posts = posts.filter(post => post.status == "active")

        let querryResult = posts.filter((post) => {
            let postCategory = category ? post.category == category : true
            let postType = type ? post.type == type : true
            let postDate = dateY ? post.dateY == dateY : true
            let postFullName = fullname ? post.user.fullname == fullname : true

            return postCategory || postType || postDate || postFullName
        })

        for (const q of querryResult) {
            delete q.watched
        }

        res.status(200).json({ status: 200, message: "posts", data: querryResult })

    } catch (error) {
        res.status(400).json({ status: 400, message: error.message })
    }
}

export let GETINNERPOST = (req, res) => {
    try {
        let { postId } = req.params
        let ip = req.ip
        
        let posts = read("posts")

        let findedPost = posts.find(post => post.postId == postId)


        if (findedPost.status == "pending" || findedPost.status == "rejected") {
            throw Error("This post waiting to activation")
        }

        if (!(findedPost.watched.find(watch => watch == ip))) {
            findedPost.count = +findedPost.count + 1
            findedPost.watched.push(ip)
            write("posts", posts)
        }


        if (!findedPost) {
            throw Error("Post not found")
        }

        delete findedPost.watched

        res.status(200).json({ status: 200, data: findedPost, message: "post finded" })
    } catch (error) {
        res.status(404).json({ status: 404, message: "Post not found" })
    }
}


export let GETIMAGE = (req, res) => {
    try {
        let { imgName } = req.params

        let img = fs.readFileSync(path.resolve("uploads", imgName), "utf-8")

        if (!img) {
            throw Error("Img not found")
        }

        res.status(200).sendFile(path.resolve("uploads", imgName), img)
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message })
    }
}


export let DOWNLOADIMG = (req, res) => {
    try {
        let { imgName } = req.params

        let img = fs.readFileSync(path.resolve("uploads", imgName), "utf-8")

        if (!img) {
            throw Error("Img not found")
        }

        res.status(200).download(path.resolve("uploads", imgName))
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message })
    }
}