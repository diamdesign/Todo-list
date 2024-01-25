const todolist = document.querySelector("#todo-container");
const list = document.querySelector("#todolist");
const input = document.querySelector("#newtodo");
function createTodo() {
	let newInput = input.value;

	if (newInput === "") {
		return;
	}
	const todo = `<div class="todo" onclick="todoclick(event);">\
                    <div class="check"><input type="checkbox" /></div>\
                    <div class="name">${newInput}</div>\
                    <span class="arrow" onclick="moveTodoUp(this)">↑</span>\
                    <span class="arrow" onclick="moveTodoDown(this)">↓</span>\
                    <span class="arrow delete" onclick="deleteTodo(this)">x</span>\
  </div>
                </div>`;

	list.insertAdjacentHTML("beforeend", todo);
	input.value = "";
}

input.addEventListener("keydown", function (e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		createTodo();
	}
});

function todoclick(event) {
	var clickedElement = event.target.closest(".todo");

	if (event.target.classList.contains("arrow")) {
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
		todo.parentNode.insertBefore(todo, previousTodo);
	}
}

function moveTodoDown(arrow) {
	const todo = arrow.closest(".todo");
	const nextTodo = todo.nextElementSibling;

	if (nextTodo) {
		todo.parentNode.insertBefore(nextTodo, todo);
	}
}

function deleteTodo(arrow) {
	const todo = arrow.closest(".todo");
	todo.remove();
}
