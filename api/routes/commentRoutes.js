import express from 'express';
import { addCommentToArticle } from '../controllers/commentController.js';

const router = express.Router();

router.post('/:articleId/comments', addCommentToArticle);

export default router;