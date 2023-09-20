// server/index.js

import express from 'express';
import postsRouter from './routes/posts.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/posts', postsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));