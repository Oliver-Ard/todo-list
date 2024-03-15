import { Todo, TodosList } from "./components/Todo.js";
import Display from "./components/Display.js";

import "./main.css";

class App {
	#display;
	#sidebar;

	constructor() {
		this.todos = new TodosList();
		this.#display = new Display();
		this.#sidebar = document.querySelector("#sidebar");

		this.#loadEventListeners();
	}

	#toggleSidebar() {
		this.#sidebar.classList.toggle("active");
	}

	#showSection(sectionName) {
		switch (sectionName) {
			case "inbox": {
				this.#display.renderInbox();
			}
		}
		console.log(this.todos.list);

		const todosListEl = document.querySelector("[data-element = 'todos-list']");
		todosListEl.textContent = "";

		for (let todo of this.todos.list) {
			const todoEl = this.#display.renderTodo(
				todo.title,
				todo.description,
				todo.dueDate
			);

			todosListEl.append(todoEl);
		}
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
				this.#showSection("inbox");
				break;
			}
		}
	}

	#loadEventListeners() {
		window.addEventListener("DOMContentLoaded", () => {
			this.#showSection("inbox");
		});

		this.#sidebar.addEventListener("click", this.#clickSidebarBtn.bind(this));
	}
}
const app = new App();
