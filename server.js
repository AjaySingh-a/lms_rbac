const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Your existing API routes go here...

const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
