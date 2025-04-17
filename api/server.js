import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import articleRoutes from './routes/articleRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

// Mount the routes
app.use('/articles', articleRoutes);
app.use('/articles', commentRoutes); // Mounting comment routes under /articles

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});