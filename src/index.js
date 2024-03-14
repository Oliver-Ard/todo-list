import { Todo, TodosList } from "./components/todos.js";

import "./main.css";

class App {
	#content;
	#sidebar;

	constructor() {
		this.todoList = new TodosList();
		this.#content = document.querySelector("#content");
		this.#sidebar = document.querySelector("#sidebar");

		this.#loadEventListeners();
	}

	#toggleSidebar() {
		this.#sidebar.classList.toggle("active");
	}

	// --Sidebar Buttons Handler--
	#clickSidebarBtn(e) {
		const target = e.target;
		const targetParent = e.target.parentNode;

		switch (target.dataset.button || targetParent.dataset.button) {
			case "slider": {
				this.#toggleSidebar();
				break;
			}
			case "inbox": {
				console.log("inbox");
				break;
			}
		}
	}

	#loadEventListeners() {
		this.#sidebar.addEventListener("click", this.#clickSidebarBtn.bind(this));
	}
}
const app = new App();

const tasks = [
	new Todo(
		"Complete JavaScript Fundamentals",
		"Finish reading and practicing JavaScript basics, including variables, data types, and operators.",
		"March 20, 2024",
		"High"
	),
	new Todo(
		"Build Portfolio Website",
		"Develop a personal portfolio website showcasing projects and skills using HTML, CSS, and JavaScript.",
		"April 10, 2024",
		"Medium"
	),
	new Todo(
		"Practice Algorithm Challenges",
		"Solve daily algorithm challenges on platforms like LeetCode or HackerRank to enhance problem-solving skills.",
		"March 25, 2024",
		"Low"
	),
	new Todo(
		"Study Node.js",
		" Learn Node.js by following tutorials and building small projects to understand server-side JavaScript development.",
		"May 5, 2024",
		"Medium"
	),
	new Todo(
		"Update GitHub Repositories",
		"Push recent code changes to GitHub repositories and ensure documentation is up to date.",
		"April 5, 2024",
		"Low"
	),
];

app.todoList.addTodo(tasks[0]);
app.todoList.addTodo(tasks[1]);
app.todoList.addTodo(tasks[2]);
app.todoList.addTodo(tasks[3]);
app.todoList.addTodo(tasks[4]);

function iterate() {
	console.log(app.todoList.todos);
	app.todoList.todos.forEach((todo) => {
		console.log(todo);
	});
}
iterate();
