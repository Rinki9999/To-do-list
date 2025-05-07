let ul = document.querySelector("#todo .task-list");
let btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  let inputVal = document.getElementById("input").value.trim();
  let items = ul.getElementsByTagName("li");

  // Check for duplicate task
  let isDuplicate = false;
  for (let i = 0; i < items.length; i++) {
    let existingText = items[i].firstChild.textContent.trim().toLowerCase();
    if (existingText === inputVal.toLowerCase()) {
      isDuplicate = true;
      break;
    }
  }

  if (isDuplicate) {
    alert("Oops! You’ve already added this task.");
    return;
  }

  if (inputVal === "") {
    alert("Please enter a Task");
    return;
  }

  // Create new list item
  let list = document.createElement("li");
  list.innerText = inputVal;
  list.draggable = true;
  list.id = "task-" + new Date().getTime();
  list.ondragstart = drag;

  // Edit button
  let editBtn = document.createElement("button");
  editBtn.innerText = "📝";
  editBtn.style.marginLeft = "20px";

  // Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.style.marginLeft = "10px";

  // Date info
  let detail = document.createElement("div");
  detail.style.marginLeft = "30px";
  let now = new Date();
  let currentDate = `${now.getDate()} / ${now.getMonth() + 1} / ${now.getFullYear()}`;
  detail.innerText = `${currentDate} - [select your deadline]`;

  let dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.style.marginLeft = "20px";

  // Update deadline on input
  dateInput.addEventListener("input", function () {
    let deadline = new Date(dateInput.value);
    let deadformatted = `${deadline.getDate()} / ${deadline.getMonth() + 1} / ${deadline.getFullYear()}`;
    detail.innerText = `${currentDate} - ${deadformatted}`;
  });

  // Hover to show/hide buttons
  list.addEventListener("mouseover", function () {
    editBtn.style.display = "inline";
    deleteBtn.style.display = "inline";
    detail.style.display = "inline";
    dateInput.style.display = "inline";
  });

  list.addEventListener("mouseout", function () {
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    detail.style.display = "none";
    dateInput.style.display = "none";
  });

  // Delete task
  deleteBtn.addEventListener("click", function () {
    list.remove();
  });

  // Edit task
  editBtn.addEventListener("click", function () {
    let newText = prompt("Edit your task:", list.firstChild.textContent);
    if (newText) list.firstChild.textContent = newText;
  });

  // Append everything
  list.appendChild(editBtn);
  list.appendChild(deleteBtn);
  list.appendChild(detail);
  list.appendChild(dateInput);
  ul.appendChild(list);

  document.getElementById("input").value = "";
});

// Allow drop
function allowDrop(event) {
  event.preventDefault();
}

// Drag
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Drop
function drop(event) {
  event.preventDefault();
  let taskId = event.dataTransfer.getData("text");
  let taskElement = document.getElementById(taskId);


  // Append to new column's task list
  event.target.closest(".task-list").appendChild(taskElement);
}
