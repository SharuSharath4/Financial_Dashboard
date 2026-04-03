const express = require("express");

const path = require("path");

const app = express();

const transactions = require("./data/transactions");

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { transactions });
});

/*app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});