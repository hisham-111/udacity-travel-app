const app = require('./app');

// Designates what port the app will listen to for incoming requests
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


