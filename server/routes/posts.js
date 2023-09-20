// server/routes/posts.js

import express from 'express';
import { getPosts, addPost, deletePost, likePost } from '../controllers/postsController.js';

const router = express.Router();

// Definición de rutas
router.get('/', getPosts);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/like/:id', likePost);

export default router;
