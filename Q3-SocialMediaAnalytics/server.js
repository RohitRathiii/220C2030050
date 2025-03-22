const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjIzOTUzLCJpYXQiOjE3NDI2MjM2NTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU5OTNhZDFhLTEyMGUtNGQ0ZC04ZDk3LTM1OTEyOTcwMWFhNSIsInN1YiI6InJvaGl0LnJhdGhpLjIyY3NlQGJtdS5lZHUuaW4ifSwiY29tcGFueU5hbWUiOiJCTUwgTXVuamFsIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6IjU5OTNhZDFhLTEyMGUtNGQ0ZC04ZDk3LTM1OTEyOTcwMWFhNSIsImNsaWVudFNlY3JldCI6Im5zT3R3bXh6WUNuSnNscXciLCJvd25lck5hbWUiOiJSb2hpdCBSYXRoaSIsIm93bmVyRW1haWwiOiJyb2hpdC5yYXRoaS4yMmNzZUBibXUuZWR1LmluIiwicm9sbE5vIjoiMjIwQzIwMzAwNTAifQ.GlcPvtaM3DvSo0Mw65Qfqzq9QWqjh5yGoKs1SEQRpiI";

app.get("/users", async (req, res) => {
  try {
    const response = await axios.get("http://20.244.56.144/test/users", {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await axios.get(`http://20.244.56.144/test/users/${userId}`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get("/users/:id/posts", async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await axios.get(`http://20.244.56.144/test/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get("http://20.244.56.144/test/posts", {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.get(`http://20.244.56.144/test/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.get("/analytics/mostCommented", async (req, res) => {
  try {
    const postsResponse = await axios.get("http://20.244.56.144/test/posts", {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
    });
    const allPosts = postsResponse.data.posts || [];
    let maxComments = -1;
    let mostCommentedPost = null;
    for (let i = 0; i < allPosts.length; i++) {
      const post = allPosts[i];
      try {
        const commentsResponse = await axios.get(`http://20.244.56.144/test/posts/${post.id}/comments`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
        });
        const count = (commentsResponse.data.comments || []).length;
        if (count > maxComments) {
          maxComments = count;
          mostCommentedPost = post;
        }
      } catch (err) {}
    }
    if (!mostCommentedPost) {
      return res.json({ message: "No posts or comments found" });
    }
    res.json({ post: mostCommentedPost, commentCount: maxComments });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

app.listen(3000);
