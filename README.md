SẠP CỦA MẸ
The ecommerce website for my mom's stall in a Vietnamese traditional market.

User Stories

Since e-commerce platforms emerged, traditional markets have slowly started fading into the past. As a daughter of a mom who inherited her stall from her own mother and has been maintaining it for the last 40 years, I can say that it’s not easy for them to adapt and simply "go digital."

But I don’t think they have to. My mom and the aunties from the traditional market offer a unique touch that e-commerce platforms can’t replicate. It’s about the small talks, the long-lasting relationships with their clients, and the mom/auntie advice for buyers—things that are irreplaceable.

This e-commerce site isn’t about boosting my mom’s sales. To be honest, we don’t have the commercial and promotional edge to compete on price. Instead, it’s a tribute—a way to preserve and honor a part of her life, and the childhood memories of so many others that started from a local market.

This project aims to reinvent the look and feel of a physical market stall, bringing it online.

Admin Functionality: Admins can post new products and update the database as needed.
User Functionality: Users can search for products based on type, brand, and category (e.g., gifts for moms or partners), add items to their cart, and place orders.

ADMIN FUNCTIONALITY
Product Management:
- As an admin, I can add, update, or delete products.
Order Management:
- As an admin, I can view and update the status of orders.

USER FUNCTIONALITY
Authentication
- As a user, I can register for a new account with email/phone and password
- As a user, I can sign in with my email and password
- As a user, I can stay signed in after refreshing the page
- As a user, I can reset my password if I forget it

User
- As a user, I can surf the products without signing-in, but I will need to sign in to checkout
- As a user, I can set my phone number and default delivery address
- As a user, I can update my profile info: name, phone, address

Products
- As a user, I can see the list of products on the main page
- As a user, I can read the information and the description of each product
- As a user, I can see the images of each product
- As a user, I can filter products by category
- As a user, I can search a specific product by name, type, and brand, and see the suggestions as I type
- As a user, I can sort products by price or rating

Add to cart
- As a user, I can add to cart with the color and quantity of the product I choose
- As a user, I can check the total items and the total costs in my current cart
- As a user, I can update the product in my cart by changing the quantity or remove items
- As a user, I can go back to my cart whenever I log in 

Order
- As a user, I can select certain products in the cart and proceed to order
- As  user, I can see the status update of the order: pending, confirmed, delivery, completed
- As a user, my phone and delivery address will be confirmed
- As a user, I can see all my previous orders: date, total costs, products, and status
- As a user, I can cancel my order before it is shipped

Rating
- As a user, I can submit a new review for the product that I ordered
- As a user, I can see the rating of each product 
- As a user, I can read the review of each product
- As a user, I can check the list of my and other people's reviews

API ENDPOINT
@Authentication Endpoints
/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public
 */

/**
 * @route POST api/auth/login
 * @description Log in a user
 * @access Public
 */

/**
 * @route POST api/auth/logout
 * @description Log out the current user
 * @access Private
 */

/**
 * @route GET api/auth/me
 * @description Get logged-in user's details
 * @access Private
 */

/**
 * @route POST api/auth/forgot-password
 * @description Send a password reset link to the user's email
 * @access Public
 */

/**
 * @route POST api/auth/reset-password
 * @description Reset password using the token
 * @access Public
 */

@User Profile Endpoints
/**
 * @route GET api/user/profile
 * @description Get the user's profile information
 * @access Private
 */

/**
 * @route PUT api/user/profile
 * @description Update the user's profile information (name, phone, address)
 * @access Private
 */

 @Product Endpoints
 /**
 * @route GET api/product
 * @description Get a list of all products with search and filter
 * @access Public
 */

/**
 * @route GET api/product/:id
 * @description Get detailed information about a specific product
 * @access Public
 */

/**
 * @route POST api/product
 * @description Add a new product (Admin only)
 * @access Admin
 */

/**
 * @route PUT api/product/:id
 * @description Update product details (Admin only)
 * @access Admin
 */

/**
 * @route DELETE api/product/:id
 * @description Delete a product (Admin only)
 * @access Admin
 */

@Cart Endpoints
/**
 * @route GET api/cart
 * @description Get the user's current cart
 * @access Private
 */

/**
 * @route POST api/cart
 * @description Add a product to the cart
 * @body { productId, quantity, color }
 * @access Private
 */

/**
 * @route PUT api/cart/:id
 * @description Update the quantity or remove a product in the cart
 * @body { quantity }
 * @access Private
 */

/**
 * @route DELETE api/cart/:id
 * @description Remove a product from the cart
 * @access Private
 */

 @Oder endpoint
 /**
 * @route POST api/order
 * @description Create a new order from selected products in the cart
 * @body { products: [{ productId, quantity }] }
 * @access Private
 */

/**
 * @route GET api/order
 * @description Get the list of all orders for the logged-in user
 * @access Private
 */

/**
 * @route GET api/order/:id
 * @description Get details of a specific order
 * @access Private
 */

/**
 * @route PUT api/order/:id/cancel
 * @description Cancel an order before it is shipped
 * @access Private
 */


 @Rating endpoint
 /**
 * @route POST api/review
 * @description Submit a review for a product
 * @body { productId, star, review }
 * @access Private
 */

/**
 * @route GET api/review/:productId
 * @description Get all reviews for a specific product
 * @access Public
 */

/**
 * @route GET api/review/user/:userId
 * @description Get all reviews written by a specific user
 * @access Public
 */

/**
 * @route PUT api/review/:id
 * @description Edit a review
 * @body { star, review }
 * @access Private
 */

 /**
 * @route DELETE api/review/:id
 * @description Soft delete a review
 * @access Private
 */

 @Admin-specific routes
 /**
 * @route GET api/admin/products
 * @description Get all products (with admin-level controls like pagination, filtering, etc.)
 * @access Admin
 */

/**
 * @route POST api/admin/products
 * @description Add a new product
 * @access Admin
 */

/**
 * @route PUT api/admin/products/:id
 * @description Update an existing product
 * @access Admin
 */

/**
 * @route DELETE api/admin/products/:id
 * @description Delete a product
 * @access Admin
 */

/**
 * @route GET api/admin/orders
 * @description Get all orders
 * @access Admin
 */

/**
 * @route PUT api/admin/orders/:id/status
 * @description Update the status of an order
 * @access Admin
 */