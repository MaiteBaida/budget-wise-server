# Project Title

BudgetWise

## Overview

Expense Tracker, is designed to help users efficiently manage their finances by categorizing and tracking expenses.

### Problem

Managing personal finances can be challenging, especially when it comes to tracking various expenses across different categories. Without a centralized system, individuals often struggle to monitor expenses accurately. Moreover, they lack insights into payment frequencies and missed payments, leading to potential overspending and financial stress.

### User Profile

Budget-conscious individuals: - seeking a convenient way to categorize and track expenses - interested in estimating and recording actual payment amounts - looking for insights into payment frequencies and missed payments to maintain financial discipline

### Features

Expense Tracking:

- Users can track their expenses and categorize them as fixed, essential, or non-essential.
- Expenses can be recorded with estimated amounts and actual paid amounts for accurate budgeting.

Account Management:

- Users can create accounts to manage their expense records securely.
- Registered users can log in to their accounts to access personalized expense tracking features.

Payment Frequency Insights:

- Users can monitor missed payments and analyze spending patterns for better financial planning.

Notes and Comments:

- Users can add notes and comments to expense entries for additional context and reminders.
- This feature helps users keep track of specific details related to each expense.

## Implementation

### Tech Stack

- React
- JavaScript
- MySQL
- Node Express
- Client libraries:
  - react
  - react-router
  - axios
- Server libraries:
  - knex
  - node express
  - json web token
  - bcryptjs

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Home page
- Add new expense
- Edit expense
- View/edit expense entries
- New expense entry
- Signup page
- Login page
  ![](flow-chart-and-tables.pdf)

### Mockups

#### Home Page

![](home.png)

#### Signup Page

![](signup.png)

#### Login Page

![](login.png)

#### Add new expense page

![](add-expense.png)

#### Edit expense

![](edit-expense.png)

#### View/edit expense entries

![](entry-overview.png)

#### New expense entry

![](new-entry.png)

### Data

![](flow-chart-and-tables.pdf)

### Endpoints

- /users : GET
- /users/register : POST
- /users/login : POST

- /expenses : GET, POST
- /expenses/:id : PUT, DELETE
- /expenses/:id/entries : GET, POST
- /expenses/:id/entries/:id : PUT, DELETE

### Auth

- JWT auth
  - Auth will be added at the begging to the login and signup pages
  - Store JWT in localStorage
  - The only pages that don't require authentication are the Login and Signup pages, if not loged in, the user will be redirected to login page

## Roadmap

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create migrations

- Create seeds with user information for each table

- Feature: Signup

  - Implement register page + form
  - Create POST /register endpoint
  - Manage authorization and authentication
  - Client: Store JWT in local storage, include JWT on axios calls

- Feature: Login

  - Implement login page + form
  - Create POST /login endpoint
  - Manage authorization and authentication
  - Client: Store JWT in local storage, include JWT on axios calls

- Feature: Home page

  - Implement user overview
  - Implement fixed expenses table
  - Implement essential expenses table
  - Implement non-essential expenses table
  - Create GET /expenses

- Feature: Add new expense page

  - Implement add expense
  - Create POST /expenses endpoint

- Feature: Edit expense page

  - Implement edit and delete expense
  - Create PUT /expenses endpoint

- Feature: Add new expense entry

  - Implement view item page
  - Create POST and DELETE /expenses/:id/entry

- Feature: View and edit expenses entry

  - Implement view and edit expenses entry
  - Create PUT and DELETE /expenses/:id/edit

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Option to login with Google and Apple

- User will be able to edit and delete account

Estimate Savings Calculation:

- Calculate the estimated savings value for the user based on the the difference between fixed expenses and actual expenses.
- Users can set savings goals and track their progress over time.

Savings and Investments Table:

- Users can access a dedicated table to control and manage their savings and investments.
- The table allows users to input savings amounts, track investment performance, and set financial goals for the future.
- Users can view a summary of their savings and investments, including growth over time and potential returns.

Non-Essential Expenses Analysis:

- Users can view a breakdown of non-essential expenses based on their fixed and essential expenses.
- This feature provides insights into discretionary spending habits and allows users to make informed decisions about their finances.
