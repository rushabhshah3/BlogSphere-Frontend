import React from 'react';

import { styled, Box, Typography } from "@mui/material";

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 350px;
  & > img,
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Image = styled("img")({
  width: "100%",
  objectFit: "cover",
  borderRadius: "10px 10px 0 0",
  height: 150,
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
  overflow: hidden;
`;

const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const addEllipsis = (str, limit) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = str;
    const plainText = tempDiv.innerText || tempDiv.textContent;
    console.log("Plain Text",plainText);
    return str.length > limit ? plainText.substring(0, limit) + "..." : str;
  };

  return (
    <Container>
      <Image src={url} alt="post" />
      <Text>{post.categories}</Text>
      <Heading>{addEllipsis(post.title, 20)}</Heading>
      <Text>Author: {post.username}</Text>
      <Details>
        <div style={{ overflow: "hidden" }}>
          {addEllipsis(post.description, 150)}
        </div>
      </Details>
    </Container>
  );
};

export default Post;
