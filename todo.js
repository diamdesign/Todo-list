const todolist = document.querySelector("#todo-container");
const list = document.querySelector("#todolist");
const input = document.querySelector("#newtodo");
let todos;
const rawTodos = localStorage.getItem("TODOS");

if (!rawTodos) {
	todos = [];
} else {
	todos = JSON.parse(rawTodos);
}
console.log(todos);
const reversedTodos = todos.slice().reverse();
reversedTodos.forEach((todo) => {
	createTodo(todo);
});

function createTodo(newInput) {
	const todo = `<div class="todo" onclick="todoclick(event);">\
                    <div class="check"><input type="checkbox" /></div>\
                    <div class="name">${newInput}</div>\
                    <span class="arrow" onclick="moveTodoUp(this)">\
						<span class="material-symbols-outlined">keyboard_arrow_up</span></span>\
                    <span class="arrow" onclick="moveTodoDown(this)">
						<span class="material-symbols-outlined">keyboard_arrow_down</span></span>\
                    <span class="arrow delete" onclick="deleteTodo(this)">
						<span class="material-symbols-outlined">\delete</span></span>\
  </div>
                </div>`;

	list.insertAdjacentHTML("afterend", todo);
}

input.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		let newInput = input.value;

		if (newInput === "") {
			return;
		}
		createTodo(newInput);
		input.value = "";
		todos.unshift(newInput);
		localStorage.setItem("TODOS", JSON.stringify(todos));
	}
});

function todoclick(event) {
	var clickedElement = event.target.closest(".todo");

	if (
		event.target.classList.contains("arrow") ||
		event.target.classList.contains("material-symbols-outlined")
	) {
		return;
	}

	var checkbox = clickedElement.querySelector('.check input[type="checkbox"]');

	if (clickedElement.classList.contains("todo-checked")) {
		clickedElement.classList.remove("todo-checked");
		checkbox.checked = false;
	} else {
		checkbox.checked = true;
		clickedElement.classList.add("todo-checked");
	}
}

function moveTodoUp(arrow) {
	const todo = arrow.closest(".todo");
	const previousTodo = todo.previousElementSibling;

	if (previousTodo) {
		const todoText = todo.querySelector(".name").textContent.trim();
		const currentIndex = todos.indexOf(todoText);
		const prevText = previousTodo.querySelector(".name").textContent.trim();
		const prevIndex = todos.indexOf(prevText);
		[todos[currentIndex], todos[prevIndex]] = [todos[prevIndex], todos[currentIndex]];
		localStorage.setItem("TODOS", JSON.stringify(todos));
		todo.parentNode.insertBefore(todo, previousTodo);
	}
}

function moveTodoDown(arrow) {
	const todo = arrow.closest(".todo");
	const nextTodo = todo.nextElementSibling;

	if (nextTodo) {
		const todoText = todo.querySelector(".name").textContent.trim();
		const currentIndex = todos.indexOf(todoText);
		const nextText = nextTodo.querySelector(".name").textContent.trim();
		const nextIndex = todos.indexOf(nextText);
		[todos[currentIndex], todos[nextIndex]] = [todos[nextIndex], todos[currentIndex]];

		localStorage.setItem("TODOS", JSON.stringify(todos));
		todo.parentNode.insertBefore(nextTodo, todo);
	}
}

function deleteTodo(arrow) {
	const todo = arrow.closest(".todo");
	const todoText = todo.querySelector(".name").textContent.trim();
	const indexToDelete = todos.indexOf(todoText);

	if (indexToDelete !== -1) {
		todos.splice(indexToDelete, 1);
		localStorage.setItem("TODOS", JSON.stringify(todos));
		todo.remove();
	} else {
		console.error("Todo not found in the array");
	}
}
