import Post from "../model/post.js"


export const createPost = async (req ,res) => {
    try {
        const post = new Post(req.body)
        await post.save()

        return res.status(201).json({msg : "Post Successfully Published."})

    } catch (error) {
        return res.status(500).json({error})
    }   
}

export const getAllPosts = async (req, res) => {
    //console.log(req)
    let category = req.query.category;
    let posts;
    try {
        if(category)
            posts = await Post.find({categories : category})
        else
            posts = await Post.find({})

        res.status(200).json({posts})

    } catch (error) {
        res.status(500).json({'msg' : "Server Error"})
    }
}

export const getPost = async (req,res) => {
    const id = req.params.id;
    
    try {
        const post = await Post.findById(id)

        return res.status(200).json({post})
    } catch (error) {
        return res.status(500).json({msg : 'Server Error'})
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id)

        if(!post)
            return res.status(404).json({msg : 'Post Not Found'})

        await Post.findByIdAndUpdate(id , { $set : req.body})

        res.status(200).json({msg : "Post updated successfully"})
    } catch (error) {
        return res.status(500).json({msg : "Server Error"})
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id
    try {
        await Post.findByIdAndDelete(id)

        res.status(200).json({msg : "Post Deleted Successfully"})
    } catch (error) {
        res.status(500).json({msg : "Server Error"})
    }
}