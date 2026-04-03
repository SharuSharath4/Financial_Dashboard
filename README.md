# Finance Dashboard

##  Overview

A clean and interactive **Finance Dashboard Web Application** built to track income, expenses, and financial insights.
This project demonstrates frontend design, state management, and basic backend integration using Node.js and EJS.

---

##  Features

###  Dashboard Overview

* Summary cards for:

  * Total Income
  * Total Expenses
  * Current Balance
* Dynamic updates based on transactions

###  Visualizations

* **Pie Chart** – Spending breakdown by category
* **Line Chart** – Balance trend over time

###  Transactions Management

* View all transactions with:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)
* Add new transactions (Admin only)
* Delete transactions

###  Search, Filter & Sort

* Search transactions by category/type
* Filter by:

  * All
  * Income
  * Expense
* Sort by:

  * Amount (High → Low / Low → High)
  * Date (Newest / Oldest)

###  Role-Based UI

* **Viewer** → Can only view data
* **Admin** → Can add & delete transactions

###  Insights

* Shows highest spending category
* Provides quick financial observation

###  State Management

* Uses **LocalStorage** to persist data

###  Export Feature

* Export transactions as **CSV file**

###  UI Features

* Dark Mode toggle
* Smooth animations
* Clean and modern fintech UI

###  Responsive Design

* Works on:

  * Desktop 
  * Tablet 
  * Mobile 

---

##  Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Templating:** EJS
* **Charts:** Chart.js
* **Storage:** LocalStorage

---

##  Project Structure

```
Financial_Dashboard/
│── public/
│   ├── css/
│   └── js/
│── views/
│   └── index.ejs
│── app.js
│── package.json
│── .gitignore
```
##  Live Demo

 https://financial-dashboard-j0ix.onrender.com

---

##  Key Learnings

* Building responsive dashboards
* Managing state in frontend applications
* Handling dynamic UI updates
* Implementing filtering, sorting, and search together
* Working with charts and data visualization
* Using Git & GitHub for version control

---

##  Future Improvements

* Edit transactions feature
* User authentication
* Backend database integration (MongoDB / SQL)
* Advanced analytics
* Download reports (PDF/Excel)

---

##  Author

**Sharath Kumar**

---

