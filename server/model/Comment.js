import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    post_id : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    createdDate : {
        type : Date,
        required : true
    }
})

const Comment = mongoose.model('comments' , commentSchema)

export default Comment