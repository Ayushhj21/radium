const blogModel = require("../models/blogModel")
const AuthorModel = require("../models/authorsModel")

//Q2
const createBlog = async function (req, res) {
    try {

        let data = req.body;
        let authorId = req.body.authorId;


        //Check if the author in request is a valid author

        let authorFromRequest = await AuthorModel.findById(authorId);

        if (authorFromRequest) {
            let blogCreated = await blogModel.create(data);
            res.status(201).send({ data: blogCreated });
        }
        else {
            res.send("The author Id provided is not valid.");
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ status: false, msg: "server error" })
    }

};




//Q3
const getThisBlog = async function (req, res) {

    try {

        let array = []
        let title = req.query.title
        let authorId = req.query.authorId
        let tags = req.query.tags
        let category = req.query.category
        let subcategory = req.query.subcategory
        let blog = await blogModel.find({ $or: [{ title: title }, { authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory }] })
        console.log(blog)
        if (blog) {

            for (let element of blog) {

                if (element.isDeleted === false && element.isPublished === true) {

                    array.push(element)

                }

            }
            if (array.length >= 1) {
                res.status(200).send({ status: true, data: array })

            } else {
                res.status(404).send({ status: false, msg: "no such blog found" })

            }

        } else {
            res.status(404).send({
                status: false,
                msg: "no such blog found"
            })
        }

    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

}

//Q4-
const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        const body = req.body.body;
        const title = req.body.title;
        const tags = req.body.tags;
        const subcategory = req.body.subcategory;

        let update = {}
        update.title = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { title: title }, { new: true })
        update.body = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { body: body }, { new: true })
        update.tags = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { $push: { tags: tags } }, { new: true })
        update.subcategory = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { $push: { subcategory: subcategory } }, { new: true })
        update.isPublished = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isPublished: true }, { new: true })
        update.publishedAt = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { publishedAt: String(new Date()) }, { new: true })
       // console.log(update)
        let updatedBlog = await blogModel.find({ _id: blogId, isDeleted: false })

        res.status(201).send({ data: updatedBlog })
    } catch (err) {
        res.status(500).send({ msg: err });
    }
}
//     let blog = await blogModel.findById(blogId)
//     if (blog.authorId == req.query.authorId) {
//         let newBody = req.body
//         let tags=req.body.tags;
//         let subcategory=req.body.subcategory
//         if (newBody.isPublished === true) {
//             newBody.publishedAt = String(new Date())
//         }
//                              ///values are repeating and and replacing the arrays that we already have
//         let blogDetails = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, newBody, { new: true })
//         let updatedTags = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, {$push:{tags:{$each:tags}}}, { new: true })
//         let updatedSubcategory = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, {$push:{subcategory:{$each:subcategory}}}, { new: true })
//         let updatedBlog= await blogModel.find({_id: blogId, isDeleted: false})
//         // $push: { tags: { $each: req.body.tags } }, $push: { subcategory: { $each: req.body.subcategory } }
//         if (updatedBlog) {
//             res.status(200).send({ status: true, message: updatedBlog })
//         } else {
//             res.status(404).send({ status: false, msg: "Incorrect credentials !" })
//         }

//     } else {
//         res.status(404).send({ status: false, msg: "You are not a valid author to access this blog" })
//     }

// };





//Q5-
let deleteBlog = async function (req, res) {
    try {
        let Id = req.params.blogId;
        let blogValue = await blogModel.findById(Id)
        if (blogValue.authorId == req.query.authorId) {
            let blog = await blogModel.findOne({ _id: Id, isDeleted: false })
            if (blog) {
                let deletedTime = String(new Date());
                await blogModel.findOneAndUpdate({ _id: Id }, { isDeleted: true, deletedAt: deletedTime })
                res.status(200).send({ msg: "your blog is Deleted Successfully" })
            } else {
                res.status(404).send({
                    status: false,
                    msg: "blog is already Deleted or blockId does not exist"
                })
            }
        } else {
            res.status(404).send({ status: false, msg: "You are not a valid author to delete this blog" })
        }
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }



}

//Q6-

const specificDelete = async function (req, res) {
    try {
        const filter = {
            isDeleted: false,
        };
        if (req.query.category) {
            filter["category"] = req.query.category;
        }
        //if (req.query.AuthorId) {
        // filter["authorId"] = req.query.AuthorId;
        //}
        if (req.query.tags) {
            filter["tags"] = req.query.tags;
        }
        if (req.query.subcategory) {
            filter["subcategory"] = req.query.subcategory;
        }
        if (req.query.isPublished) {
            filter["isPublished"] = req.query.isPublished;   //blogValue.authorId == req.query.authorId
        }
        let blogValue = await blogModel.find(filter)
        console.log(filter)
        console.log(blogValue)
        if (blogValue[0].authorId == req.query.authorId) {
            let deleteData = await blogModel.updateMany(filter, {
                isDeleted: true,
                deletedAt: new Date(),
            });
            if (deleteData) {
                res.status(200).send({ status: true, msg: "Blog has been deleted" });
            } else {
                res.status(404).send({ status: false, msg: "No such blog exist" });
            }
        } else {
            res.status(404).send({ status: false, msg: "You are not a valid author to delete this blog according to conditions mentioned" })
        }
    } catch {
        res.status(500).send({ status: false, msg: "Something went wrong" });
    }
};





module.exports.createBlog = createBlog;
module.exports.getThisBlog = getThisBlog;
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.specificDelete = specificDelete



