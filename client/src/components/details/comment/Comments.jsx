import { useState ,useContext , useEffect } from 'react'
import { DataContext } from '../../../context/DataProvider'
import {Box , TextareaAutosize, Button ,styled} from '@mui/material'

import { API } from '../../../service/api'
import SingleComment from './SingleComment'

const imageUrl = 'https://static.thenounproject.com/png/12017-200.png'

const Container = styled(Box)`
    margin-top : 70px;
    display : flex;
    flex-direction: row;
`
const Image = styled('img')({
    width : '50px',
    height : '50px',
    borderRadius : '50%'
})

const StyledTextArea = styled(TextareaAutosize)`
    width : 100%;
    margin : 0 10px;
    font-size : 18px;

`
const CommentButton = styled(Button)`
    height : 50px;
    padding : 10px 20px;
`
const initialComment = {
    name : "",
    post_id : "",
    comment : "",
    createdDate : new Date()
}

const Comments = ({post}) => {

    const [newComment , setNewComment] = useState(initialComment)
    const [allComments , setAllComments] = useState([])
    const [toggle , setToggle] = useState(false)
    const {userAccount} = useContext(DataContext)

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await API.getComments(post._id)
                if(response.isSuccess){
                    setAllComments(response.data.comments)
                } 
            } catch (error) {
                console.log(error.message)
            }
            
        }
        fetchComment()
    },[post, toggle ])

    const handleChange = (e) => {
        setNewComment({...newComment , 
            name : userAccount.username,
            post_id : post._id,
            comment : e.target.value
        })
    }

    const postComment = async () => {
        try {
           const response = await API.addComment(newComment)
           if(response.isSuccess)
                setNewComment(initialComment)
                setToggle(toggle ? false : true)

        } catch (error) {
            console.log(error.message)
        }   
    }

    return (
        <Box>
            <Container>
                <Image src={imageUrl} alt='dp' />
                <StyledTextArea minRows={5} placeholder="What's on your mind?" onChange={handleChange} value={newComment.comment}/>
                <CommentButton variant="contained" onClick={postComment}>Comment</CommentButton>
            </Container>
            <Box style={{margin : '50px 0px 0px 30px' , width : '85%' ,}}>
                {
                    allComments && allComments.length > 0 && allComments.map(comment => (
                    
                            <SingleComment key={comment._id} comment={comment} setToggle={setToggle} toggle={toggle}/>
                    
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments