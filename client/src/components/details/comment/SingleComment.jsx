import { Box, Typography, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

const Container = styled(Box)`
  margin-bottom: 40px;
  background: #f4f5ff;
  width: 100%;
  border-radius: 10px;
  padding: 10px 20px;
`;
const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right :20px
`;

const StyledDate = styled(Typography)`
    color : #878787;
`

const DeleteButton = styled(Delete)`
    margin : 0 0 0 auto;
    cursor : pointer;
`

const SingleComment = ({ comment  , toggle , setToggle}) => {

  const {userAccount} = useContext(DataContext)

  const removeComment = async () => {
    try {
        const response = await API.deleteComment(comment)

        response.isSuccess && setToggle(toggle ? false : true)
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <Container>
      <Box sx={{display : "flex"}}>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.createdDate).toDateString()}</StyledDate>
        <>
            {
                userAccount.username === comment.name && <DeleteButton onClick={removeComment} color="error" />
            }
        </>
      </Box>

      <Typography sx={{ marginTop : '10px'}}>{comment.comment}</Typography>
    </Container>
  );
};

export default SingleComment;
