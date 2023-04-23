import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";

export const UserPage = () => {
  const [userInformation, setUserInformation] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/user/${id}`).then((response) => {
      response.json().then((data) => {
        setUserInformation(data.user);
        setUserPosts(data.posts);
      });
    });
  }, []);

  console.log(userInformation);

  if (!userInformation) return "";

  return (
    <div className="post-page user-page">
      <h1>{userInformation.username}</h1>
      <h2>
        Miembro desde:{" "}
        {format(new Date(userInformation.createdAt), "MM/dd/yyyy")}
      </h2>
      {userInfo.id === userInformation._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edituser/${userInformation._id}`}>
            Editar Usuario
          </Link>
        </div>
      )}
      <h1 className="user-posts">Publicaciones</h1>
      <div className="post-list">
        {userPosts.map((post) => (
          <div className="post-page" key={post._id}>
            <div className="image">
              <Link to={`/post/${post._id}`} className="image">
                <img src={`http://localhost:4000/${post.cover}`} />
              </Link>
            </div>
            <h1 className="user-title">
              <Link className="user-title" to={`/post/${post._id}`}>
                {post.title}
              </Link>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};
