// JavaScript to handle expense data and display

document.addEventListener("DOMContentLoaded", function () {
  // Get references to HTML elements
  const expenseForm = document.getElementById("expenseForm");
  const expenseList = document.querySelector(".expense-list");
  const totalExpensesElement = document.getElementById("totalExpenses");

  // Load expenses from local storage when the page loads
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Display the existing expenses on the page
  displayExpenses(expenses);

  // Handle form submission
  expenseForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get the input values
      const expenseName = document.getElementById("expenseName").value;
      const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
      const expenseDescription = document.getElementById("expenseDescription").value;

      // Validate the input
      if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
          alert("Please enter valid expense details.");
          return;
      }

      // Create an object to hold the expense data
      const expense = {
          name: expenseName,
          amount: expenseAmount,
          description: expenseDescription
      };

      // Add the new expense to the expenses array
      expenses.push(expense);

      // Save the updated expenses array to local storage
      localStorage.setItem("expenses", JSON.stringify(expenses));

      // Clear the form inputs
      expenseForm.reset();

      // Update the UI to display the new expense
      displayExpenses(expenses);
  });

  // Function to display the expenses on the page
  function displayExpenses(expenses) {
      // Clear the existing expense list
      expenseList.innerHTML = "";

      // Calculate the total expenses
      let totalExpenses = 0;

      // Loop through the expenses array and add each expense to the list
      expenses.forEach(function (expense) {
          const expenseItem = document.createElement("div");
          expenseItem.classList.add("expense-item");

          const expenseInfo = document.createElement("p");
          expenseInfo.innerHTML = `<strong>${expense.name}</strong> - ${expense.amount}`;
          expenseItem.appendChild(expenseInfo);

          if (expense.description) {
              const descriptionInfo = document.createElement("p");
              descriptionInfo.innerHTML = `Description: ${expense.description}`;
              expenseItem.appendChild(descriptionInfo);
          }

          expenseList.appendChild(expenseItem);

          totalExpenses += expense.amount;
      });

      // Update the total expenses on the page
      totalExpensesElement.textContent = totalExpenses.toFixed(2);
  }
});
