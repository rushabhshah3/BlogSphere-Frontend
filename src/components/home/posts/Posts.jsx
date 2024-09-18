import React from 'react';

import { useEffect, useState } from "react";
import { API } from "../../../service/api.js";
import Post from "./Post.jsx";
import { Grid } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
export const Posts = () => {
  const [posts, getPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response = await API.getAllPosts({ category: category || "" });
      if (response.isSuccess) {
        getPosts(response.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);
  if (loading)
    return (
      <div
        className="loader"
        style={{ margin: "auto", marginTop: "25px" }}
      ></div>
    );
  return (
    <>
      {" "}
      {posts && posts.length > 0 ? (
        <Grid container>
          {posts.map((post) => {
            return (
              <Grid item lg={3} sm={4} xs={12}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`details/${post._id}`}
                >
                  <Post post={post} />
                </Link>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div style={{ color: "#676767", margin: "30px", fontSize: "20px" }}>
          No posts found
        </div>
      )}
    </>
  );
};
