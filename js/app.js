// CLASSES
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = this.budget;
  }

  // Substract from the budget
  substractFromBudget(amount) {
    return (this.budgetLeft -= amount);
  }
}

// Everything related to HTML
class HTML {
  // Insert the budget when the user submits it
  insertBudget(amount) {
    budgetTotal.innerHTML = `${amount}`;
    budgetLeft.innerHTML = `${amount}`;
  }

  // Display a message (correct or invalid)
  printMessage(message, className) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("text-center", "error", className);
    messageWrapper.appendChild(document.createTextNode(message));

    // Insert into HTML
    document.querySelector(".primary").insertBefore(messageWrapper, addExpenseForm);

    // Clear the error
    setTimeout(function () {
      document.querySelector(".primary .error").remove();
      addExpenseForm.reset();
    }, 2000);
  }

  // Displays the expanses from the form into the list
  addExpenseToList(name, amount) {
    const expensesList = document.querySelector(".expenses ul");
    // Create a <li></li>
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${name}</div>
      <div class="expenses__amount">$ ${amount}</div>`;
    expensesList.appendChild(li);
  }
  // Substract expense amount form budget
  trackBudget(amount) {
    const budgetLeftDollars = budget.substractFromBudget(amount);
    budgetLeft.innerHTML = `${budgetLeftDollars}`;

    // Check when 25% is spent
    if (budget.budget / 4 > budgetLeftDollars) {
      budgetLeft.parentElement.parentElement.classList.remove("budget-success");
      budgetLeft.parentElement.parentElement.classList.add("budget-danger");

      // Check when 50% is spent
    } else if (budget.budget / 2 > budgetLeftDollars) {
      budgetLeft.parentElement.parentElement.classList.remove("budget-success");
      budgetLeft.parentElement.parentElement.classList.add("budget-warning");
    }
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

    // Read the input values
    const expenseName = document.querySelector("#name").value;
    const amount = document.querySelector("#amount").value;

    if (expenseName === "" || amount === "") {
      html.printMessage("There was error, all fields are mandatory", "alert-danger");
    } else {
      // Add the expenses into the list
      html.addExpenseToList(expenseName, amount);
      html.trackBudget(amount);
    }
  });
}
