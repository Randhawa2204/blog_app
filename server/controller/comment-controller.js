import Comment from "../model/Comment.js"

export const postComment = async (req, res) => {
    try {
        const comment = new Comment(req.body)
        await comment.save()

        return res.status(200).json({msg : 'Comment posted sucessfully'})
    } catch (error) {
        return res.status(500).json({msg : 'Server Error'})
    }
}

export const getAllComments = async (req, res) => {

    try {
        const comments = await Comment.find({post_id : req.params.id})

        return res.status(200).json({comments})
    } catch (error) {
        return res.status(500).json({msg : 'Server Error'})
    }
}

export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)

        return res.status(200).json({msg : "Comment Deleted"})
    } catch (error) {
        return res.status(500).json({msg : "Server Error"})
    }
}