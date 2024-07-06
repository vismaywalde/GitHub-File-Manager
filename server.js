require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({ storage: storage }).single('file');

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Upload endpoint
app.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    if (!req.file) {
      return res.status(400).send('No file selected');
    }

    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const fileContent = fs.readFileSync(filePath, { encoding: 'base64' });

    // GitHub API upload
    const repoOwner = 'vismaywalde';
    const repoName = 'File-Upload-and-Download-System';
    const filePathInRepo = req.file.filename;
    const githubToken = process.env.GITHUB_TOKEN; // Use an environment variable for security

    // Log the GitHub token to verify it's being loaded correctly
    console.log('GitHub Token:', githubToken);

    const githubUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePathInRepo}`;
    const commitMessage = 'Add uploaded file';

    try {
      const response = await axios.put(githubUrl, {
        message: commitMessage,
        content: fileContent
      }, {
        headers: {
          Authorization: `token ${githubToken}`
        }
      });

      // Log successful GitHub API response
      console.log('GitHub API Response:', response.data);

      fs.unlinkSync(filePath); // Remove file from server after upload
      res.send('File uploaded successfully to GitHub');
    } catch (error) {
         // Log GitHub API error response
      console.error('GitHub API Error:', error.response.data);
      
      res.status(500).send(`GitHub upload failed: ${error.message}`);
    }
  });
});


// Download endpoint
app.get('/download', (req, res) => {
    const repoOwner = 'vismaywalde';
    const repoName = 'File-Upload-and-Download-System';
    const fileName = 'file'; // Name of the file to download from root of repository

    const githubToken = process.env.GITHUB_TOKEN; // Use an environment variable for security

    const githubUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`;

    axios.get(githubUrl, {
        headers: {
            Authorization: `token ${githubToken}`
        },
        responseType: 'arraybuffer' // Ensure response is treated as binary data
    })
    .then(response => {
        // Set content disposition header for file download
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.send(Buffer.from(response.data, 'base64')); // Send file data back as response
    })
    .catch(error => {
        console.error('GitHub API Error:', error.response.data);
        res.status(500).send(`GitHub download failed: ${error.message}`);
    });
});


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

