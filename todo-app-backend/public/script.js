async function signup() {
  const username = document.getElementById("id").value;
  const password = document.getElementById("pw").value;
  const confirmPassword = document.getElementById("r_pw").value;

  if (!username || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const result = await response.text();
    alert(result);
    // 성공 시 로그인 페이지로 이동
    window.location.href = "/login.html";
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred during signup. Please try again.");
  }
}

async function login() {
  const username = document.getElementById("id").value;
  const password = document.getElementById("pw").value;

  if (!username || !password) {
    alert("Both username and password are required!");
    return;
  }

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.text();
    alert(result);
    // 성공 시 메인 페이지로 이동
    window.location.href = "/";
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login. Please try again.");
  }
}

//메인페이지

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".circle-button");
  const addButton = document.getElementById("add-button");
  const popup = document.getElementById("popup");
  const saveButton = document.getElementById("save-button");
  const titleInput = document.getElementById("title-input");
  const memoInput = document.getElementById("memo-input");
  const todoList = document.getElementById("todo-list");
  const memoPopup = document.getElementById("memo-popup");
  const memoText = document.getElementById("memo-text");
  const closeMemoButton = document.getElementById("close-memo-button");
  let editMode = false;
  let currentEditLi = null;

  // 할 일 완료 처리 이벤트 리스너
  const addTaskEventListener = (button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const li = button.parentElement;
      const task = li.querySelector(".task");

      if (!li.classList.contains("completed")) {
        task.classList.add("completed");
        li.classList.add("completed");
        button.classList.add("filled");
        todoList.appendChild(li);
      } else {
        task.classList.remove("completed");
        li.classList.remove("completed");
        button.classList.remove("filled");
      }
    });
  };

  buttons.forEach((button) => addTaskEventListener(button));

  // 할 일 항목 추가 버튼 클릭 시 팝업 표시
  addButton.addEventListener("click", () => {
    editMode = false;
    titleInput.value = "";
    memoInput.value = "";
    saveButton.textContent = "Add";
    popup.style.display = "flex";
  });

  // 새 할 일 항목 추가 후 저장 버튼 클릭 시
  saveButton.addEventListener("click", () => {
    const newTaskTitle = titleInput.value.trim();
    const newTaskMemo = memoInput.value.trim();

    if (newTaskTitle !== "") {
      if (editMode && currentEditLi) {
        currentEditLi.querySelector(".task").textContent = newTaskTitle;
        currentEditLi.setAttribute("data-memo", newTaskMemo);
      } else {
        const newLi = document.createElement("li");
        newLi.innerHTML = `<button class="circle-button"></button> <span class="task">${newTaskTitle}</span>`;
        newLi.setAttribute("data-memo", newTaskMemo);

        const newButton = newLi.querySelector(".circle-button");
        addTaskEventListener(newButton);

        newLi.addEventListener("click", (e) => {
          if (e.target.classList.contains("circle-button")) return;
          memoText.innerText = newTaskMemo;
          memoPopup.style.display = "flex";
        });

        newLi.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          editMode = true;
          currentEditLi = newLi;
          titleInput.value = newTaskTitle;
          memoInput.value = newTaskMemo;
          saveButton.textContent = "Save";
          popup.style.display = "flex";
        });

        const completedItems = Array.from(todoList.children).filter((li) =>
          li.classList.contains("completed")
        );
        if (completedItems.length > 0) {
          todoList.insertBefore(newLi, completedItems[0]);
        } else {
          todoList.appendChild(newLi);
        }
      }
    }

    popup.style.display = "none";
  });

  document.querySelectorAll("#todo-list li").forEach((li) => {
    li.addEventListener("click", (e) => {
      if (e.target.classList.contains("circle-button")) return;
      memoText.innerText = li.getAttribute("data-memo");
      memoPopup.style.display = "flex";
    });

    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      editMode = true;
      currentEditLi = li;
      titleInput.value = li.querySelector(".task").textContent;
      memoInput.value = li.getAttribute("data-memo");
      saveButton.textContent = "Save";
      popup.style.display = "flex";
    });
  });

  closeMemoButton.addEventListener("click", () => {
    memoPopup.style.display = "none";
  });
});
