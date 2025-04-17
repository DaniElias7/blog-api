# Simple Blog API

This API provides basic functionality to manage blog articles and comments. You can create, read, update, and delete articles, as well as add comments to them.

## Quick Start (For Cloning)

1.  **Clone the repository:**

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your PostgreSQL database:**
    * Ensure PostgreSQL is installed and running.
    * Create a database named `blog_db` (or your preferred name).
    * Run the following SQL to create the necessary tables:

        ```sql
        CREATE TABLE articles (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE comments (
            id SERIAL PRIMARY KEY,
            article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
            text TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        ```

4.  **Configure environment variables:**
    * Create a `.env` file in the root directory.
    * Add your database credentials and the server port:

        ```
        PORT=3000
        DB_USER=your_username
        DB_HOST=localhost
        DB_NAME=blog_db
        DB_PASSWORD=your_password
        DB_PORT=5432
        ```
        *(Replace the placeholders with your actual PostgreSQL details.)*

5.  **Start the API:**
    ```bash
    npm start
    ```
    The API will be running at `http://localhost:3000` (or the port in your `.env`).

## Key Features (API Endpoints)

* **Manage Articles:**
    * `GET /articles`: List all articles.
    * `GET /articles/:id`: Get a specific article.
    * `POST /articles`: Create a new article.
    * `PUT /articles/:id`: Update an article.
    * `DELETE /articles/:id`: Delete an article.
* **Add Comments:**
    * `POST /articles/:articleId/comments`: Add a comment to an article.

## Technologies

* Node.js
* Express.js
* PostgreSQL (`pg` library)

## Testing

Use tools like Postman or `curl` to send requests to the API endpoints.