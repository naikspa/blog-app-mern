import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export const Post = ({
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
  _id,
}) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} className="post-image" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <div className="author">
            Creador por:{" "}
            <Link
              to={`/user/${author._id}`}
              style={{ textDecoration: "underline" }}
            >
              {author.username}
            </Link>
          </div>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};
