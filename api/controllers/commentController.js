import { query } from '../config/db.js';

const addCommentToArticle = async (req, res) => {
  const { articleId } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Comment text is required' });
  }
  try {
    // Basic security: Check if the article exists before adding a comment
    const articleExists = await query('SELECT id FROM articles WHERE id = $1', [articleId]);
    if (articleExists.rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const result = await query('INSERT INTO comments (article_id, text) VALUES ($1, $2) RETURNING id, text, created_at', [articleId, text]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { addCommentToArticle };