import Joi from 'joi'

// dateY,
// dateH,
// job,
// category,
// subcategory,
// type,
// fullname,
// phone,
// postImg,
// description,
// title,
// text

export const postsSchema = Joi.object({
    title: Joi.string().min(8).required(),
    text: Joi.string().min(8).required(),
    job: Joi.string().min(0).required(),
    dateY: Joi.string().min(2).required(),
    dateH: Joi.string().min(2).required(),
    phone: Joi.string().min(2).required(),
    type: Joi.string().min(2).required(),
    postImg: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|png|webp)$/i)),
    description: Joi.string().min(18).required(),
    category: Joi.string().min(0).max(28).required(),
    subcategory: Joi.string().min(0).required(),
    fullname: Joi.string().min(8).required()
})

export const schemaSign = Joi.object({
    username: Joi.string().min(8).required(),
    password: Joi.string().min(8).required()
})

