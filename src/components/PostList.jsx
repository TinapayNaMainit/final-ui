
import React from "react";
import "./PostList.css";

export default function PostList({
  posts,
  onEdit,
  onDelete,
  menuOpenId,
  setMenuOpenId
}) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <h3>{post.username}</h3>
            <div className="menu-container">
              <button
                className="menu-button"
                onClick={() =>
                  setMenuOpenId(menuOpenId === post.id ? null : post.id)
                }
              >
                ⋮
              </button>
              {menuOpenId === post.id && (
                <div className="menu">
                  <button onClick={() => onEdit(post)}>Edit</button>
                  <button onClick={() => onDelete(post)}>Delete</button>
                </div>
              )}
            </div>
          </div>
          <p>{post.content}</p>
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="post-image" />
          )}
        </div>
      ))}
    </div>
  );
}
