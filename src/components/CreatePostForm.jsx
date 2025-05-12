
import React from "react";
import "./CreatePostForm.css";

export default function CreatePostForm({
  form,
  onChange,
  onSubmit,
  isEditing,
  onClose
}) {
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <input
        name="username"
        value={form.username}
        onChange={onChange}
        placeholder="Username"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={onChange}
        placeholder="Write your post here"
        required
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={onChange}
        placeholder="Image URL (optional)"
      />
      {form.imageUrl && (
        <div className="image-preview">
          <p>Image Preview:</p>
          <img src={form.imageUrl} alt="Preview" />
        </div>
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">{isEditing ? "Update Post" : "Submit"}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
