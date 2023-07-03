import { useState, useEffect } from "react";
import { API } from "../../service/api";
import { Box, Grid } from "@mui/material";
import {useSearchParams , Link} from 'react-router-dom'

//Componnets
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.getAllPosts({category : category || ''});
        if (response.isSuccess) {
          setPosts(response.data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPost();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        <Grid container>
          {posts.map((post) => (
            <Grid item lg={3} sm={4} xs={12} key={post._id}>
              <Link to={`details/${post._id}`} style={{textDecoration : 'none' , color : 'inherit'}}><Post post={post} /></Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          style={{ color: "#878787", margin: "30px 50px", fontSize: "18px" }}
        >
          No Posts Available
        </Box>
      )}
    </>
  );
};

export default Posts;
