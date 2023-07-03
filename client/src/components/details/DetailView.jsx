import { useState, useEffect, useContext } from "react";
import { useParams , Link , useNavigate} from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

import { API } from "../../service/api";

import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

//Components
import Comments from "./comment/Comments";

const Container = styled(Box)(({theme}) => ({
  margin: '40px 80px',
  [theme.breakpoints.down('md')] : {
    margin : 0
  }
}))
  
;
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  text-align: center;
  font-size: 38px;
  font-weight: 600;
  margin: 50px 0px;
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  cursor: pointer;
`;
const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  cursor: pointer;
`;

const DetailView = () => {
  const [post, setPost] = useState({});
  const {userAccount} = useContext(DataContext);

  const { id } = useParams();
  
  const navigate = useNavigate()

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getPostById(id);
        if (response.isSuccess) setPost(response.data.post);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const deleteBlogPost = async () => {
    try {
      const response = await API.deletePost(id)

      if(response.isSuccess)
        navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      {post && (
        <Container>
          <Image src={url} alt="" />
          <Box style={{ float: "right" }}>
            {post.username === userAccount.username && (
              <>
                <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                <DeleteIcon onClick={deleteBlogPost} color="error" />
              </>
            )}
          </Box>

          <Heading>{post.title}</Heading>
          <Box
            style={{
              color: "#878787",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              Author:
              <Box component="span" style={{ fontWeight: 600 }}>
                {post.username}
              </Box>
            </Typography>
            <Typography>{new Date(post.createdDate).toDateString()}</Typography>
          </Box>
          <Typography style={{ margin: "10px 0" }}>
            {post.description}
          </Typography>
          <Comments post={post} />
        </Container>
      )}
    </>
  );
};

export default DetailView;
