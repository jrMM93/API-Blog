# API Documentation

## Base URL
`/api/v1`

## Articles

### Get All Articles
- **Endpoint:** `GET /api/v1/posts`
- **Description:** Retrieves a list of all articles.
- **Response:**
  - Success (200):
    ```json
    [
      {
        "id": 1,
        "title": "Sample Article",
        "slug": "sample-article",
        "content": "This is a sample article.",
        // Other fields...
      }
    ]
    ```
  - Error (500):
    ```json
    {
      "Error 500": "Error message"
    }
    ```

### Get Article by ID
- **Endpoint:** `GET /api/v1/posts/:id`
- **Description:** Retrieves a specific article by its ID.
- **Parameters:**
  - `id` (path parameter): Numeric ID of the article.
- **Response:**
  - Success (200):
    ```json
    {
      "id": 1,
      "title": "Sample Article",
      "slug": "sample-article",
      "content": "This is a sample article.",
      // Other fields...
    }
    ```
  - Error (500):
    ```json
    {
      "Error 500": "Error message"
    }
    ```

### Create Article
- **Endpoint:** `POST /api/v1/posts`
- **Description:** Creates a new article.
- **Authorization Required:** Yes
- **Request Body:**
  ```json
  {
    "title": "New Article Title",
    "slug": "new-article-slug",
    "content": "Content of the new article.",
    // Other fields...
  }
  ```
- **Response:**
  - Success (200):
    ```json
    "Your post has been successfully created"
    ```
  - Error (500):
    ```json
    {
      "Error 500": "Error message"
    }
    ```
  - Conflict (409):
    ```json
    "This title already exists"
    ```

### Update Article
- **Endpoint:** `PATCH /api/v1/posts/:id`
- **Description:** Updates an existing article.
- **Authorization Required:** Yes
- **Parameters:**
  - `id` (path parameter): Numeric ID of the article.
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "slug": "updated-slug",
    "content": "Updated content.",
    // Other fields...
  }
  ```
- **Response:**
  - Success (200):
    ```json
    "Your post has been successfully edited"
    ```
  - Error (500):
    ```json
    {
      "Error 500": "Error message"
    }
    ```
  - Conflict (409):
    ```json
    "This title already exists"
    ```

### Delete Article
- **Endpoint:** `DELETE /api/v1/posts/:id`
- **Description:** Deletes a specific article.
- **Authorization Required:** Yes
- **Parameters:**
  - `id` (path parameter): Numeric ID of the article.
- **Response:**
  - Success (200):
    ```json
    "Post successfully deleted"
    ```
  - Error (500):
    ```json
    {
      "Error 500": "Error message"
    }
    ```

## Categories

### Get All Categories
- **Endpoint:** `GET /api/v1/categories`
- **Description:** Retrieves a list of all categories.
- **Response:**
  - Success (200):
    ```json
    [
      {
        "id": 1,
        "name": "Category Name",
        // Other fields...
      }
    ]
    ```
  - Error (500):
    ```json
    {
      "Error 500": "Error message"
    }
    ```

### Get Articles by Category ID
- **Endpoint:** `GET /api/v1/posts/category/:id`
- **Description:** Retrieves articles belonging to a specific category.
- **Parameters:**
  - `id` (path parameter): Numeric ID of the category.
- **Response:**
  - Success (200):
    ```json
    [
      {
        "id": 1,
        "title": "Sample Article",
        "slug": "sample-article",
        "content": "This is a sample article.",
        // Other fields...
      }
    ]
    ```
  - Error (500):
    ```json
    {
      "Error 500": "Error message"
    }
    ```

## Users

### Register User
- **Endpoint:** `POST /api/v1/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - Success (200):
    ```json
    "Your account has been successfully created"
    ```
  - Error (500):
    ```json
    {
      "Error 500": "Error message"
    }
    ```
  - Conflict (409):
    ```json
    "Email already in use"
    ```

### Login User
- **Endpoint:** `POST /api/v1/login`
- **Description:** Logs in a user and provides a JWT token.
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - Success (200):
    ```json
    {
      "Message": "Successfully logged in",
      "token": "JWT token"
    }
    ```
  - Error (400):
    ```json
    {
      "Error 400": "Bad Request"
    }
    ```
  - Error (401):
    ```json
    {
      "errorMessage": "Invalid Credentials"
    }
    ```
  - Error (500):
    ```json
    {
      "Error 400": "Error message"
    }
    ```

## Main

### Welcome Message
- **Endpoint:** `GET /api/v1`
- **Description:** Returns a welcome message.
- **Response:**
  - Success (200):
    ```json
    "Welcome"
    ```

## Models

### Article Model
Methods:
- `findAllArticles()`: Retrieves all articles.
- `findOneArticle(articleId)`: Retrieves a single article by its ID.
- `createArticle(articleData)`: Creates a new article.
- `updateArticle(articleId, articleData)`: Updates an existing article by its ID.
- `deleteArticle(articleId)`: Deletes an article by its ID.
- `findByTitle(title)`: Finds articles by their title.
- `findBySlug(slug)`: Finds articles by their slug.

### Category Model
Methods:
- `findAllCategories()`: Retrieves all categories.
- `findArticlesByCategory(categoryId)`: Retrieves articles by category ID.

### User Model
Methods:
- `createUser(firstName, lastName, email, hashedPassword)`: Creates a new user.
- `findUserByEmail(email)`: Finds a user by their email address.
