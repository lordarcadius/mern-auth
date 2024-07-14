import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
    res.send("Ping success!");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));