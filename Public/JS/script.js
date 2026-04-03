let role = "viewer";
let sortBy = "";
let filterType = "all";


let stored = localStorage.getItem("transactions");

let data = JSON.parse(localStorage.getItem("transactions")) || transactions;


const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const insightText = document.getElementById("insightText");


function renderUI() {
  let income = 0, expense = 0;

  data.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  incomeEl.innerText = income;
  expenseEl.innerText = expense;
  balanceEl.innerText = income - expense;

  renderTable();
  renderChart();
  renderInsights();
}


function renderTable() {
  const table = document.getElementById("tableBody");
  if (!table) return;
  table.innerHTML = "";

  let filteredData = [...data];


  if (filterType !== "all") {
    filteredData = filteredData.filter(t => t.type === filterType);
  }

 
  //const searchValue = document.getElementById("search").value.toLowerCase();
   const searchValue = document.getElementById("search")?.value?.toLowerCase() || "";
  if (searchValue) {
    filteredData = filteredData.filter(t =>
      t.category.toLowerCase().includes(searchValue) ||
      t.type.toLowerCase().includes(searchValue)
    );
  }


  if (sortBy === "amount-high") {
    filteredData.sort((a, b) => b.amount - a.amount);
  } else if (sortBy === "amount-low") {
    filteredData.sort((a, b) => a.amount - b.amount);
  } else if (sortBy === "date-new") {
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === "date-old") {
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

 
  filteredData.forEach((t, index) => {
    const row = document.createElement("tr");

    row.style.opacity = "0";
    row.style.transform = "translateY(10px)";

    row.innerHTML = `
      <td>${t.date}</td>
      <td>₹${t.amount}</td>
      <td>${t.category}</td>
      <td>${t.type}</td>
      <td class="admin-only">
        <button onclick="deleteTransaction(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);

    setTimeout(() => {
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
    }, 50);
  });

  toggleAdmin();
}


function deleteTransaction(index) {
  const tableRows = document.querySelectorAll("#tableBody tr");
  const row = tableRows[index];

  const date = row.children[0].innerText;
  const amount = Number(row.children[1].innerText.replace("₹", ""));
  const category = row.children[2].innerText;

  data = data.filter(t =>
    !(t.date === date && t.amount === amount && t.category === category)
  );

  localStorage.setItem("transactions", JSON.stringify(data));
  renderUI();
}


function addTransaction() {
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!date || !category || !amount || amount <= 0) {
    alert("Please enter all fields");
    return;
  }

  data.push({ date, category, amount, type });

  localStorage.setItem("transactions", JSON.stringify(data));

  renderUI();

  document.getElementById("date").value = "";
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
}


function renderInsights() {
  const categoryTotals = {};

  data.forEach(t => {
    if (t.type === "expense") {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  insightText.innerText = `📊 Highest spending: ${highest}`;
}


let chart;

function renderChart() {
  const categoryTotals = {};

  data.forEach(t => {
    if (t.type === "expense") {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const canvas = document.getElementById("expenseChart");
  const ctx = canvas.getContext("2d");


  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals)
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 800,
        animateScale: true,
        animateRotate: true
      }
    }
  });
}
function exportCSV() {
  if (!data || data.length === 0) {
    alert("No data to export!");
    return;
  }

  let csv = "Date,Amount,Category,Type\n";

  data.forEach(t => {
    csv += `${t.date},${t.amount},${t.category},${t.type}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "transactions.csv";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


document.getElementById("role").addEventListener("change", (e) => {
  role = e.target.value;
  toggleAdmin();
});

function toggleAdmin() {
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = role === "admin" ? "table-cell" : "none";
  });
}


//document.getElementById("search").addEventListener("input", function () {
  //const value = this.value.toLowerCase();

  //document.querySelectorAll("#tableBody tr").forEach(row => {
   // row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
  //});
//});
document.getElementById("search").addEventListener("input", () => {
  renderTable();
});


document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
document.getElementById("sort").addEventListener("change", (e) => {
  sortBy = e.target.value;
  renderTable();
});
document.getElementById("filterType").addEventListener("change", (e) => {
  filterType = e.target.value;
  renderTable();
});
document.addEventListener("DOMContentLoaded", () => {
  renderUI();
});
