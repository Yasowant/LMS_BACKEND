## Project Description

This is a full-stack **User Authentication and Cart Management System** built using **Node.js**, **Express**, **MongoDB**, and **Mongoose** for managing users, authentication tokens, and cart functionality. The application supports **user registration**, **login**, and the ability to manage a **shopping cart** with **courses**, allowing users to add, view, and manage their cart items. This system is part of a larger **Learning Management System (LMS)**, where users can register, log in, and manage their course selections via the cart. The cart system uses **MongoDB Aggregation** to combine user data with course details, providing a seamless way to fetch course information linked to the products in the cart.

### Key Features

- **User Authentication**:
  - **Register**: Users can sign up with a username, email, password, and avatar. During registration, the avatar is uploaded to **Cloudinary**.
  - **Login**: Users can log in using their username and password, receiving **access** and **refresh tokens** for subsequent requests.
  - **Logout**: Secure logout functionality that clears authentication cookies and refresh tokens.
  - **Change Password**: Users can change their password by validating the old one.
  - **Refresh Token**: Supports refreshing access tokens using a refresh token to keep the user session active without re-login.

- **Cart Management**:
  - **Add to Cart**: Users can add courses to their cart by providing the product ID and quantity.
  - **View Cart**: A user’s cart is retrieved along with course details, including product name and other relevant information.
  - **Cart Updates**: The cart is updated with the appropriate products and quantities, and users can check their cart content.

- **Data Protection & Security**:
  - **Password Hashing**: Passwords are securely hashed using **bcrypt** before being saved in the database.
  - **JWT (JSON Web Tokens)**: Access tokens and refresh tokens are used for user authentication and session management, ensuring secure API access.

- **Cloud Storage Integration**:
  - **Cloudinary Integration**: Users can upload and update their avatar images to **Cloudinary**, which is stored as a URL in the MongoDB database.

- **User and Course Data Aggregation (MongoDB Aggregation Framework)**:
  - **Aggregated Cart Details**: Using MongoDB’s aggregation pipeline, the cart includes not only product IDs and quantities but also detailed course data fetched from the **CourseCollection** model. This involves using **$lookup** to join the User and CourseCollection data, and **$addFields** to restructure the cart items with additional course details, such as the course name, description, and price.

### Aggregation Steps for Cart

- **$match**: Filters the user based on the user ID from the JWT token.
- **$lookup**: Joins the cart.productId with the **CourseCollection** to get the corresponding course data.
- **$addFields**: Combines the cart details with the corresponding course information.
- **$project**: Removes sensitive fields like password and refreshToken from the response.

### Technologies Used

- **Backend**:
  - **Node.js** and **Express** for building the API and handling server-side operations.
  - **MongoDB** and **Mongoose** for database management, schema modeling, and data manipulation.
  - **JWT** for secure token-based authentication.
  - **bcrypt** for hashing and verifying passwords.
  - **Cloudinary** for cloud-based file storage and avatar management.

- **Authentication Middleware**:
  - **JWT Authentication middleware** (`verifyJWT`) to protect API routes that require authentication, ensuring that only authorized users can access specific routes.

- **Cart and User Management**:
  - **Cart System** that allows users to add courses to their cart, view the cart, and keep track of the quantities of items in the cart.
  - **Aggregation Pipeline** using MongoDB’s **$lookup** and **$addFields** operators to fetch course details for each item in the cart and reformat the cart data.
  - **MongoDB Aggregation Framework** to aggregate course information and manage data relationships efficiently between collections (users and courses).

### How It Works

The system starts with secure user authentication, where JWT tokens are used for accessing and interacting with protected routes. After logging in, users can manage their cart, add courses, and view the cart with detailed course information. MongoDB's aggregation features ensure that course data is joined seamlessly with the cart's product data, offering a rich and user-friendly experience.
