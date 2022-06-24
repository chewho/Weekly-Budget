// CLASSES
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }
}

// Everything related to HTML
class HTML {
  // Insert the budget when the user submits it
  insertBudget(amount) {
    budgetTotal.innerHTML = `${amount}`;
    budgetLeft.innerHTML = `${amount}`;
  }
}

// VARIABLES
const addExpenseForm = document.querySelector("#add-expense");
const html = new HTML();
const budgetTotal = document.querySelector("span#total");
const budgetLeft = document.querySelector("span#left");
let budget, userBudget;

// EVENT LISTENERS
eventListeners();
function eventListeners() {
  // APP init
  document.addEventListener("DOMContentLoaded", function () {
    userBudget = prompt("What's your budget for this week?");
    // Validate the userBudget
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      window.location.reload();
    } else {
      // Budget is valid
      budget = new Budget(userBudget);

      //Instaciate HTML class
      html.insertBudget(budget.budget);
    }
  });

  // When a new expense is added
  addExpenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });
}
