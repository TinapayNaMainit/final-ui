// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import CreatePostForm from "./components/CreatePostForm";
import PostList from "./components/PostList";
import AboutPage from "./components/AboutPage";
import "./App.css";

const API_URL = "http://localhost:8080/api/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    content: "",
    imageUrl: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.content) {
      alert("All fields are required.");
      return;
    }

    try {
      if (editPostId) {
        await axios.put(`${API_URL}/${editPostId}`, form);
        setEditPostId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ username: "", password: "", content: "", imageUrl: "" });
      setShowForm(false);
      fetchPosts();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleEdit = (post) => {
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");
    if (username === post.username && password === post.password) {
      setForm({
        username: post.username,
        password: post.password,
        content: post.content,
        imageUrl: post.imageUrl || ""
      });
      setEditPostId(post.id);
      setShowForm(true);
    } else {
      alert("Incorrect credentials.");
    }
  };

  const handleDelete = async (post) => {
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");
    if (username === post.username && password === post.password) {
      try {
        await axios.delete(`${API_URL}/${post.id}`);
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    } else {
      alert("Incorrect credentials.");
    }
  };

  return (
    <Router>
      <Navbar onCreateClick={() => setShowForm(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              {showForm && (
                <CreatePostForm
                  form={form}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  isEditing={!!editPostId}
                  onClose={() => {
                    setEditPostId(null);
                    setShowForm(false);
                  }}
                />
              )}
              <PostList
                posts={posts}
                onEdit={handleEdit}
                onDelete={handleDelete}
                menuOpenId={menuOpenId}
                setMenuOpenId={setMenuOpenId}
              />
            </div>
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
