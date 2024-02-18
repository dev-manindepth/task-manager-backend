# Project Name

This is a documentation for the project task-manager-backend.

## Setup Instructions

To set up the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/dev-manindepth/task-manager-backend
   ```

2. Navigate into the project directory:

   ```bash
   cd task-manager-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root of your project and add the following variables:

   ```plaintext
   DATABASE_URL=<your-postgres-database-url>
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

   Note: I have use Supabase with setup postgres db , You can setup in local

## Environment Variables

The following environment variables are used in this project:

- `DATABASE_URL`: This variable should contain the URL for the database connection.
- `NODE_ENV`: This variable is used to specify the environment (e.g., development, production, testing).
- `CLIENT_URL`: This variable holds the URL of the client application.

## Scripts

The project includes the following npm scripts:

- `test`: Runs tests. Currently, it echoes an error if no test is specified.
- `dev`: Starts the development server using `nodemon` for auto-reloading and `bunyan` for logging.
- `lint:check`: Checks the code for linting issues using ESLint.
- `lint:fix`: Attempts to automatically fix linting issues using ESLint.
- `prettier:check`: Checks the code for formatting issues using Prettier.
- `prettier:fix`: Attempts to automatically fix formatting issues using Prettier.
- `build`: Builds the project using TypeScript compiler (`tsc`) and generates type aliases using `tsc-alias`.

## Endpoints

The following are the API endpoints available in the project:

Replace {{baseURL}} with `http://localhost:8000` and {{urlPath}} with `api/v1`

- **POST** `{{baseURL}}/{{urlPath}}/task`

  - **Content-Type:** `application/json`
  - **Accept:** `application/json`
  - **withCredentials:** `true`
  - **Body:**
    ```json
    {
      "title": "Task 1",
      "description": "My desc 1",
      "completed": true
    }
    ```

- **GET** `{{baseURL}}/{{urlPath}}/task`

  - **Content-Type:** `application/json`
  - **Accept:** `application/json`
  - **withCredentials:** `true`

- **PATCH** `{{baseURL}}/{{urlPath}}/task/1`

  - **Content-Type:** `application/json`
  - **Accept:** `application/json`
  - **withCredentials:** `true`
  - **Body:**
    ```json
    {
      "completed": false
    }
    ```

- **DELETE** `{{baseURL}}/{{urlPath}}/task/1`
  - **Content-Type:** `application/json`
  - **Accept:** `application/json`
  - **withCredentials:** `true`
