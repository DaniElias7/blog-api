import { query } from '../config/db.js';

const getAllArticles = async (req, res) => {
  try {
    const result = await query('SELECT id, title FROM articles ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching articles:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT * FROM articles WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (err) {
    console.error('Error fetching article:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createArticle = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const result = await query('INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING id, title, created_at', [title, content]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating article:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const result = await query(
      'UPDATE articles SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING id, title, updated_at',
      [title, content, id]
    );
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (err) {
    console.error('Error updating article:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM articles WHERE id = $1', [id]);
    if (result.rowCount > 0) {
      res.status(204).send(); // No content needed for successful deletion
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle };