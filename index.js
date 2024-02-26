 const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3000;

// Set up the Blogger API client
const blogger = google.blogger({
  version: 'v3',
  auth: AIzaSyB6_twOhogk9QSRWVQQ1QAekLed-cqNVgQ 
});

// Define routes

// Route to fetch and display a list of blog posts
app.get('/posts', async (req, res) => {
  try {
    const response = await blogger.posts.list({
      blogId: '6002212201828564022', // Replace with your Blogger blog ID
      maxResults: 10 // Number of posts to fetch
    });

    const posts = response.data.items;
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
});

// Route to fetch and display a single blog post by ID
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const response = await blogger.posts.get({
      blogId: '6002212201828564022', // Replace with your Blogger blog ID
      postId: postId
    });

    const post = response.data;
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'An error occurred while fetching the post.' });
  }
});

// Route to fetch and display comments for a specific blog post
app.get('/posts/:postId/comments', async (req, res) => {
  const postId = req.params.postId;

  try {
    const response = await blogger.comments.list({
      blogId: '6002212201828564022', // Replace with your Blogger blog ID
      postId: postId
    });

    const comments = response.data.items;
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'An error occurred while fetching comments.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
