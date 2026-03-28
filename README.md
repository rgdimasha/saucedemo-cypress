# SauceDemo Cypress Automation Project

## 📌 Project Overview

This project contains automated end-to-end test cases for the SauceDemo web application using Cypress.

The goal of this project is to demonstrate UI testing, functional testing, and test automation best practices.

---

## 🚀 Tech Stack

* Cypress
* JavaScript
* Node.js

---

## 📂 Test Coverage

### 🔐 Login

* Verify user login with valid credentials

### 🛍️ Product Page

* Verify products page is loaded
* Verify product details navigation
* Verify dropdown sorting functionality
* Verify add to cart functionality

### 🛒 Cart Page

* Verify product added to cart
* Verify product details in cart
* Verify continue shopping functionality
* Verify remove product from cart

### 💳 Checkout Flow

* Verify checkout process flow (cart → checkout → form submission)
* Validate user can proceed through checkout steps successfully
* Verify navigation between checkout pages

---

## 🧠 Key Concepts Used

* `cy.session()` for login reuse
* Reusable test structure
* UI-based assertions
* Functional end-to-end testing
* Cypress best practices (timeouts, selectors, structure)

---

## ▶️ How to Run the Project

1. Install dependencies:

```bash
npm install
```

2. Open Cypress:

```bash
npx cypress open
```

---

## 📌 Application Under Test

[https://www.saucedemo.com/](https://www.saucedemo.com/)

---

## 👩‍💻 Author

Devni Ranaweera

---

## ⭐ Notes

This project was created as part of QA automation practice and portfolio building.
