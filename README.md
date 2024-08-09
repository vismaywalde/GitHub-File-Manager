# File Management System

A web-based application that allows users to upload and download files directly to and from a GitHub repository using the GitHub API. 

## Features

- **File Upload:** Upload files directly to a specified GitHub repository.
- **File Download:** Download files from the GitHub repository.
- **Responsive UI:** Built with HTML, CSS, and Bootstrap for a clean and responsive user experience.
- **Secure Integration:** Utilizes environment variables to securely manage sensitive information like GitHub API tokens.
- **Dynamic Interface:** UI updates to provide additional functionality, such as a link to the GitHub repository after file upload.



## Deployment
Deployed on Render, accessible at https://file-management-irwi.onrender.com

## Usage
- Visit the website.
- Upload files to the GitHub repository via the "Upload File" button.
- Download files from the GitHub repository using the "Download File" button.
- After a successful upload, click on the "View GitHub Repo" button to navigate to your repository.

# To run the project on your local server 

## Prerequisites
- Node.js installed on your local machine.
- A GitHub account and a repository to connect the application to.
- A GitHub API token with appropriate permissions.

## Steps
1. Clone this repository.
2. Install dependencies using npm: using command "npm install"
3. Set up your GitHub API token in the `.env` file.
4. Start the server: using command "node server.js"
5. Open `http://localhost:3000` in your browser.


## Future Enhancements
- AI Integration: Potential integration with AI models for processing uploaded files.
- Multi-file Upload: Adding support for batch file uploads.
- Enhanced Security: Additional security measures for API token management.


## Acknowledgements
- Bootstrap for UI components.
- Render for backend deployment.
- GitHub API for file management.
