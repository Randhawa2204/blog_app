import { useState, useEffect, useContext } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  styled,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddPhotoAlternate as AddImageIcon } from "@mui/icons-material/";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import CategoryButton from "../home/CategoryButton";

const Container = styled(Box)(({theme}) => ({
  margin: '60px 80px',
  [theme.breakpoints.down('md')] : {
    margin : 0
  }
}))

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const FormContainer = styled(FormControl)`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`;
const Title = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 22px;
`;

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 40px;
  border: none;
  outline: none;
  font-size: 18px;
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(""); //State for saving the uploaded image

  const location = useLocation();
  const { userAccount } = useContext(DataContext);
  
  const navigate = useNavigate()

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        //API Call
        const response = await API.uploadFile(data);
        //post.picture = response.data.imageUrl;
        setPost({...post , picture : response.data.imageUrl})
      }
    };
    getImage();
    setPost({...post , categories : location.search?.split("=")[1] || "All" , username : userAccount.username});
  }, [file]);

  const imageUrl = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const submitPost = async () => {
    try {
        const response = await API.postSubmit(post)

        if(response){
          setPost(initialPost)
          navigate("/")
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Container>
      <Image src={imageUrl} alt="Banner" />

      <FormContainer>
        <label htmlFor="fileInput">
          <AddImageIcon fontSize="large" color="primary" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Title
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button variant="contained" onClick={submitPost}>Publish</Button>
      </FormContainer>
      <CategoryButton post={post} setPost={setPost} />
      <StyledTextArea
        minRows={3}
        placeholder="Tell Your Story...."
        onChange={handleChange}
        name="description"
      />
    </Container>
  );
};

export default CreatePost;
