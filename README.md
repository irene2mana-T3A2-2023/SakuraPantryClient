# T3A2 Full Stack App (Client)

## Sakura Pantry - Japanese Online Grocery Store

Resources

- [Production site](https://sakurapantry.netlify.app/)
- [Back-end repo](https://github.com/irene2mana-T3A2-2023/SakuraPantryServer)
- [Documentation repo](https://github.com/irene2mana-T3A2-2023/SakuraPantryDocs/tree/main)
- [Trello board](https://trello.com/b/TE5Q9ZYj/t3a2-%F0%9F%8C%B8sakura-pantry)

Contributors

- [Mana Misumi](https://github.com/Mana12011207)
- [Irene Nguyen](https://github.com/irenenguyen1017)
- [Ellen Pham](https://github.com/ellenpham)

---

## Accessing the Production Application

Please visit the production app at [this link](https://sakurapantry.netlify.app/).

### Overview

This document provides a comprehensive guide to the features and functionalities available in our application. Whether you're a guest, an authenticated user, or an admin, this guide will help you navigate through the app.

#### As a guest, you have the following capabilities

- **View New Arrivals & Featured Products:** Explore our latest and most popular items.
- **Search Products:** Use keywords or categories to find exactly what you're looking for.
- **View Product Details:** Get all the information you need about our products.
- **Add Products to Cart:** Select items you wish to purchase and add them to your cart.
- **View Cart Items:** Check the items currently in your shopping cart.
- **Register a New Account:** Sign up to enjoy more features and a personalized experience.

#### As an authenticated user, you can

- **Login/Logout:** Access your personal account or log out securely.
- **Checkout Purchases:** Complete your shopping experience with a seamless checkout process.
- **Access User Account:** Manage your account details and view your profile.
- **Reset/Change Password:** Ensure your account's security by updating your password as needed.

#### As an admin, you're equipped with extensive controls

- **Admin Dashboard Access:** Oversee the application's operations from a admin dashboard.
- **CRUD Operations:** Create, read, update, and delete products and categories.
- **Manage User Accounts:** View all user accounts within the system.
- **Order Management:** View, update the status of, and cancel orders as necessary.

---

## Installation Instructions

Follow these steps to install and set up the application on your local environment.

### Requirements

**Before proceeding with the installation, ensure you have the following prerequisites:**

- Node.js (version 18 or greater): Ensure you have Node.js version 18 or greater installed on your system. Download it from the [official Node.js website](https://nodejs.org/).

- MongoDB Atlas: If you do not have MongoDB Atlas set up, please follow the MongoDB Atlas installation instructions [here](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup). MongoDB Atlas is essential for database management in the application.

- To enable the email service, set up a Google app password as detailed [here](https://support.google.com/accounts/answer/185833?hl=en), and then provide the credentials in the .`env.development` file.

#### API Server Setup

1.**Clone the Repository:**

- Visit the GitHub repository at [SakuraPantryServer](https://github.com/irene2mana-T3A2-2023/SakuraPantryServer)
- Clone the repository to your local machine:

```bash
git clone git@github.com:irene2mana-T3A2-2023/SakuraPantryServer.git
```

2.**Navigate to the Server Directory:**

```bash
cd SakuraPantryServer
```

3.**Install all the required NPM Packages:**

```bash
 npm install
```

4.**Environment Configuration**

- Create a file named `.env.development` in the root of the server directory.
- Copy the contents from `.env.example` to .`env.development` and update it with your actual configuration values.

  5.**Seed the dummy data into your MongoDB**

Make sure your MongoDB is running before seeding the database.

```bash
npm run seed:dev
```

6.**Start the local server**

```bash
npm run dev
```

The API server will run on localhost port `5000`, or on the `port` you have configured in the `.env.development` file.

#### Client Setup

1.**Clone the Repository:**

- Visit the GitHub repository at [SakuraPantryServer](https://github.com/irene2mana-T3A2-2023/SakuraPantryClient)
- Clone the repository to your local machine:

```bash
git clone git@github.com:irene2mana-T3A2-2023/SakuraPantryClient.git
```

2.**Navigate to the Server Directory:**

```bash
cd SakuraPantryClient
```

3.**Install all the required NPM Packages:**

```bash
 npm install
```

4.**Environment Configuration**

- Create a file named `.env.development` in the root of the server directory.
- Copy the contents from the `.env.example` file into your `.env.development` file and update the `REACT_APP_API_HOST` placeholder with your actual API server's local configuration.

  5.**Start the local server**

Make sure your local API server is still running on port `5000`, or on the API server port that you have configured.

```bash
npm start
```

The client server will run on on local host `3000` by default.

6.**Access your local application**

> To view the application as an admin, use the credentials from the admin account provided in the seeded data for login.

- **email**: `admin@example.com`
- **password**: `adminpassword`

> To view the application as a user, you can either use an account from the seeded data or create a new account as any user would.

For example:

- **email**: `bob.smith@example.com`
- **password**: `bobpassword`

We hope you enjoy using our application and have a wonderful experience with it.

---

## Client Available Scripts

```bash
npm start
```

> Starts the development server for the React application. This command compiles the React code and serves it usually at [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

> Compiles the React application into static files for production. The compiled version is optimized for performance and ready to be deployed.

```bash
npm test
```

> Runs the test runner. It's set up to execute tests written for the React components or other JavaScript code in the project.

```bash
npm run lint
```

> Runs [ESLint](https://eslint.org/), a tool for identifying and reporting on patterns in JavaScript, across all `.js` and `.jsx` files in the `src` directory. It helps in maintaining code quality and consistency.

```bash
npm run lint:fix
```

> Similar to the lint script, but it also automatically fixes problems that [ESLint](https://eslint.org/) can correct by itself. This is useful for quickly fixing common code discrepancies.

```bash
npm run format
```

> Runs [Prettier](https://prettier.io/), a code formatter, on all `.js` and `.jsx` files in the `src` directory. Prettier rewrites the code into a consistent style, which helps in maintaining a clean and readable codebase.

---

## Client Libraries & Dependencies

### `@hookform/resolvers`

A collection of resolvers for React Hook Form that enable seamless integration and validation using popular schema-based validation libraries. [This package](https://github.com/react-hook-form/resolvers) enhances form validation processes, making them more robust and manageable.

### `@nextui-org/react`

A modern React UI library, [nextui](https://nextui.org/docs/guide/introduction), is designed for building beautifully crafted and customizable UI components.

### `axios`

A popular and versatile HTTP client for the browser and Node.js. [Axios](https://axios-http.com/) provides a simple-to-use API for making XMLHttpRequests from the browser or HTTP requests from Node.js, supporting promises and a range of other features for handling requests and responses.

### `framer-motion`

A powerful library for React that makes it easy to add animations and transitions to your web application. [Framer Motion](https://www.framer.com/motion/) provides simple yet flexible APIs to elegantly animate your UI components.

### `joi`

A powerful schema description language and data validator for JavaScript. [Joi](https://joi.dev/api/?v=17.9.1) allows you to create blueprints or schemas for JavaScript objects (an object that might contain keys with specific value types) to ensure validation of key information.

### `react`

The core library of [React](https://react.dev/), a popular JavaScript library for building user interfaces. Known for its efficient and flexible approach to creating interactive UIs in web applications.

### `react-dom`

This package serves as the entry point to the DOM for React. [ReactDOM](https://legacy.reactjs.org/docs/react-dom.html) provides DOM-specific methods that can be used at the top level of your app for efficient DOM element management in a web page.

### `react-hook-form`

An efficient and flexible library for managing forms in React. [React Hook Form](https://react-hook-form.com/) simplifies form handling, reducing the amount of boilerplate code needed and improving performance by minimizing re-renders.

### `react-hot-toast`

A lightweight and highly customizable library for creating toasts in React applications. [React Hot Toast](https://react-hot-toast.com/) offers a simple API to show success, error, and loading notifications with minimal effort and maximum user experience.

### `react-icons`

A comprehensive library of popular icons for React applications, offering icons from various icon libraries like Font Awesome, Ionicons, Material Design, and more. [React Icons](https://react-icons.github.io/react-icons/) provides an easy way to include SVG icons in your project with the ability to customize their size, color, and other properties.

### `react-router-dom`

[React Router DOM](https://github.com/remix-run/react-router), a specialized variant of React Router, is meticulously engineered for web browser applications. It encompasses an array of hooks that facilitate seamless integration of routing within React-based projects, thereby enhancing navigation, enabling dynamic routing, and ensuring component rendering is accurately aligned with URL structures. This robust toolkit is instrumental in developing intuitive, URL-driven user interfaces.

### `react-scripts`

Included in the Create React App toolkit, `react-scripts` is a set of scripts and configurations that simplify the complex build and setup process for React apps. It abstracts away intricate details of configurations for tools like Webpack, Babel, and ESLint, allowing developers to focus more on writing code rather than setting up environments.

---

## Client Development Dependencies

### `@testing-library/jest-dom`

An extension for the [Jest](https://jestjs.io/) testing framework. It provides a set of custom matchers to extend Jest. These matchers help you test the state of your application's Document Object Model (DOM) more expressively and cleanly in your React applications.

### `@testing-library/react`

Part of the Testing Library suite, specifically designed for testing React components. It provides light utility functions on top of [react-dom](https://legacy.reactjs.org/docs/react-dom.html) and [react-dom/test-utils](https://legacy.reactjs.org/docs/test-utils.html), enabling more efficient work with DOM nodes in your tests.

### `@testing-library/user-event`

This library simulates real user interactions in tests. It allows simulating mouse clicks, keyboard text input, form submissions, and other events to test how your React components respond to user actions.

### `eslint-config-prettier`

An [ESLint](https://eslint.org/) configuration that disables rules conflicting with [Prettier](https://prettier.io/). It ensures ESLint and Prettier work together seamlessly, especially important for projects using both for code quality and formatting.

### `eslint-plugin-import`

A plugin for ESLint that provides support for linting of ES2015+ (ES6+) import/export syntax. It helps in ensuring best practices and consistent order of import statements in your JavaScript files, enhancing readability and maintainability.

### `eslint-plugin-prettier`

This plugin integrates Prettier as an ESLint rule. It allows ESLint to show formatting errors as lint errors, making it easier to maintain a consistent code style and catch formatting issues during the development process.

### `prettier`

[Prettier](https://prettier.io/) is an opinionated code formatter that enforces a consistent style across your codebase. It supports many languages and frameworks and integrates with most editors, formatting code to adhere to a consistent style.

### `tailwindcss`

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework for rapidly building custom user interfaces. It offers a wide range of classes for directly composing unique designs in your markup, mainly used during development for styling.
