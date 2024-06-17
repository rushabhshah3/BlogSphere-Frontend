import React from 'react';

import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextareaAutosize,
  styled,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import { useContext, useEffect, useState } from "react";

const Image = styled("img")({
  width: "100%",
  height: "60vh",
  objectFit: "cover",
});
const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));
const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 15px;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
const intialPostVal = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};
const CreatePost = () => {
  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState(intialPostVal);
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  useEffect(()=>{
    post.categories = searchParams.get("category") || "All";
    post.username = account.username;
  },[searchParams,post.categories,account.username,post.username]);
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        //API Call
        let response = await API.uploadFile(data);
        setPost((prevPost) => ({ ...prevPost, picture: response.data }));
      }
    };
    getImage();
  },[file]);
  const savePost = async () => {
    if(post.title=="" || post.description==""){
      alert("Either title or description is empty");
      return;
    }
    await API.createPost(post);
    navigate("/");
  };
  return (
    <Container>
      <Image src={url} alt="banner"></Image>
      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" />
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          style={{ display: "none" }}
        />
        <InputTextField
          placeholder="Blog Title"
          onChange={(e) => handleChange(e)}
          name="title"
        ></InputTextField>
        <Button variant="contained" onClick={() => savePost()}>
          Publish
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={6}
        placeholder="Share your ideas..."
        onChange={(e) => handleChange(e)}
        name="description"
      ></TextArea>
    </Container>
  );
};

export default CreatePost;
