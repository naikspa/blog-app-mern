import React, { useContext, useEffect, useState } from "react";
import { Post } from "../Post";
import { UserContext } from "../UserContext";

export const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const response = fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  });
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
};
