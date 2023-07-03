import express from 'express'

//Components
import { signupUser , loginUser } from '../controller/user-controller.js'
import { uploadImage , getImage } from '../controller/image-controller.js'
import { authenticateToken } from '../controller/jwt-controller.js'
import { createPost , getAllPosts , getPost , updatePost, deletePost} from '../controller/post-controller.js'
import { postComment , getAllComments , deleteComment } from '../controller/comment-controller.js'
import upload from '../utils/upload.js'

const router = express.Router()


router.post('/signup' , signupUser)
router.post('/login' , loginUser)
router.post('/file/upload' ,upload.single('file'), uploadImage)
router.get('/file/:filename' , getImage)

router.post('/create' , authenticateToken , createPost)
router.get('/posts' , authenticateToken , getAllPosts)
router.get('/post/:id', authenticateToken , getPost)
router.put('/update/:id' , authenticateToken , updatePost)
router.delete('/delete/:id', authenticateToken , deletePost)

router.post('/add/comment' , authenticateToken , postComment)
router.get('/comments/:id' , authenticateToken , getAllComments)
router.delete('/remove/comment/:id' , authenticateToken , deleteComment)


export default router;