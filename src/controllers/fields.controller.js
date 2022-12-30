import { read } from "../utils/model.js";

export let CATEGORY = (req , res) =>{
    try {
        let category = read("category")

        res.status(200).json({status:200 , message:"all subcategory" , data:category})
    } catch (error) {
        res.status(400).json({status:400 , message:error.message})
    }
}

export let SUBCATEGORY = (req , res) =>{
    try {
        let subcategory = read("subcategory")

        res.status(200).json({status:200 , message:"all subcategory" , data:subcategory})
    } catch (error) {
        res.status(400).json({status:400 , message:error.message})
    }
}

export let FULLNAMES = (req , res) =>{
    try {
        let posts = read("posts")

        let fullNames = []

        for (const item of posts) {
            fullNames.push(item.user.fullname)           
        }

        res.status(200).json({status:200 , message:"all fullnames" , data:fullNames})
    } catch (error) {
        res.status(400).json({status:400 , message:error.message})
    }
}