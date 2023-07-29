const { app, BrowserWindow } = require('electron');
const express = require('express');
const multer = require('multer');

// Create an Express app
const appExpress = express();

// Set up the storage destination and filename for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where the uploaded files will be stored.
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file.
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create a Multer middleware using the storage configuration
const upload = multer({ storage: storage });

// Define an endpoint to handle file uploads using Multer
appExpress.post('/upload', upload.single('file'), (req, res) => {
  // Multer middleware will process the file upload and store it in the 'uploads/' folder.
  // req.file contains information about the uploaded file.
  // You can now perform additional processing or save metadata in the database if needed.
  res.send('File uploaded successfully.');
});

// Start the Express server
const expressPort = 3000;
appExpress.listen(expressPort, () => {
  console.log(`Express server running on http://localhost:${expressPort}`);
});


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in the Electron window
    },
  });

  mainWindow.loadFile('index.html'); // Load your main HTML file here
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
