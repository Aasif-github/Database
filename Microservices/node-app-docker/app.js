import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World! from Node.js - docker');
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
